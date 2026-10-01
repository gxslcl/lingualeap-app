/**
 * 语音合成桥接层
 *
 * 背景：Android WebView 不实现 Web Speech API（window.speechSynthesis 不存在），
 * 而本应用的核心能力是英文/中文朗读。因此在原生容器里用 Android 系统 TTS
 * （NativeTtsPlugin）实现一套符合 W3C 语音合成接口的兼容层，
 * 让 services/ttsService.ts 无需任何改动即可工作。
 *
 * 必须在 services/ttsService.ts 之前被导入（index.tsx 的第一行导入）。
 */
import { Capacitor, registerPlugin, type PluginListenerHandle } from '@capacitor/core';

export interface NativeVoiceInfo {
  name: string;
  locale: string;
  voiceURI: string;
  quality?: number;
  latency?: number;
}

interface NativeTtsPlugin {
  getVoices(): Promise<{ voices: NativeVoiceInfo[] }>;
  speak(options: {
    text: string;
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    voiceURI?: string;
    /** 由前端指定，便于按语句过滤原生事件 */
    utteranceId?: string;
  }): Promise<{ utteranceId: string }>;
  stop(): Promise<void>;
  isLanguageAvailable(options: { lang: string }): Promise<{ available: boolean }>;
  openInstall(): Promise<void>;
  addListener(
    eventName: 'ttsStart' | 'ttsEnd' | 'ttsError',
    listenerFunc: (data: { utteranceId?: string; error?: string }) => void,
  ): Promise<PluginListenerHandle>;
}

const NativeTts = registerPlugin<NativeTtsPlugin>('NativeTts');

const isAndroidNative = Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';

interface PendingUtterance {
  utterance: SpeechSynthesisUtterance;
  done: boolean;
}

class NativeSpeechSynthesis {
  private voices: SpeechSynthesisVoice[] = [];
  private listeners: ((voices: SpeechSynthesisVoice[]) => void)[] = [];
  private current: PendingUtterance | null = null;
  private cancelRequested = false;
  private initialized = false;
  /** 当前语句的 id：原生事件必须按它过滤，否则过期事件会打断新语句 */
  private currentId: string | null = null;
  private seq = 0;

  speaking = false;
  pending = false;
  paused = false;
  onvoiceschanged: ((this: SpeechSynthesis, ev: Event) => unknown) | null = null;

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // 原生的 start/end/error 事件都是异步到达的，可能来自「已经被替换掉的上一条语句」。
    // 必须按 utteranceId 过滤：否则上一条被 cancel/FLUSH 产生的 stop 事件
    // 会被当成当前语句结束，而上层把 interrupted 视为用户主动打断并忽略，
    // 结果就是「播一条就停」。
    NativeTts.addListener('ttsStart', (data) => {
      if (!this.isCurrentUtterance(data?.utteranceId)) return;
      this.speaking = true;
    });

    NativeTts.addListener('ttsEnd', (data) => {
      if (!this.isCurrentUtterance(data?.utteranceId)) return;
      this.finishCurrent(null);
    });

    NativeTts.addListener('ttsError', (data) => {
      if (!this.isCurrentUtterance(data?.utteranceId)) return;
      this.finishCurrent(data?.error || 'synthesis-failed');
    });

    void this.refreshVoices();
    // 部分机型首次查询语音列表时 TTS 引擎尚未就绪，稍后重试一次
    window.setTimeout(() => void this.refreshVoices(), 1500);
  }

  private async refreshVoices() {
    try {
      const { voices } = await NativeTts.getVoices();
      const mapped = (voices || []).map<SpeechSynthesisVoice>((v) => ({
        name: v.name,
        lang: v.locale,
        voiceURI: v.voiceURI,
        default: false,
        localService: true,
      }));
      this.voices = mapped.length > 0 ? mapped : fallbackVoices();
    } catch {
      this.voices = fallbackVoices();
    }
    if (typeof this.onvoiceschanged === 'function') {
      this.onvoiceschanged.call(this as unknown as SpeechSynthesis, new Event('voiceschanged'));
    }
    this.listeners.forEach((cb) => cb(this.voices));
  }

  /**
   * 事件是否属于当前语句。
   * 兼容两种情况：尚未拿到 id（早期事件）时放行，避免第一句被吞掉；
   * 拿到 id 后只认当前语句，其余一律视为过期事件丢弃。
   */
  private isCurrentUtterance(utteranceId?: string) {
    if (!utteranceId) return true;
    if (this.currentId === null) return this.current !== null;
    return utteranceId === this.currentId;
  }

  private finishCurrent(error: string | null) {
    const current = this.current;
    this.current = null;
    this.currentId = null;
    this.speaking = false;
    this.pending = false;
    if (!current || current.done) return;
    current.done = true;
    const u = current.utterance as SpeechSynthesisUtterance & {
      onend?: ((ev: SpeechSynthesisEvent) => void) | null;
      onerror?: ((ev: SpeechSynthesisErrorEvent) => void) | null;
    };
    if (error) {
      // 'interrupted' / 'canceled' 属于用户主动打断，交给上层静默处理
      const code = this.cancelRequested ? 'interrupted' : error;
      u.onerror?.({ error: code } as unknown as SpeechSynthesisErrorEvent);
    } else {
      u.onend?.({} as SpeechSynthesisEvent);
    }
    this.cancelRequested = false;
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  speak(utterance: SpeechSynthesisUtterance) {
    const anyU = utterance as SpeechSynthesisUtterance & {
      voice?: SpeechSynthesisVoice | null;
      lang?: string;
      rate?: number;
      pitch?: number;
      volume?: number;
    };

    const lang = anyU.voice?.lang || anyU.lang || 'en-US';
    const voiceURI = anyU.voice?.voiceURI;

    this.cancelRequested = false;
    const record: PendingUtterance = { utterance, done: false };
    this.current = record;
    this.pending = true;
    this.speaking = true;

    // id 由前端生成并同步登记，保证回调到来前就已经知道「当前是哪一句」
    const utteranceId = `u-${++this.seq}-${Date.now()}`;
    this.currentId = utteranceId;

    NativeTts.speak({
      text: utterance.text,
      lang,
      rate: anyU.rate ?? 1,
      pitch: anyU.pitch ?? 1,
      volume: anyU.volume ?? 1,
      voiceURI,
      utteranceId,
    })
      .then((res) => {
        // 原生若回传自己的 id，以它为准（正常情况下与我们传入的一致）
        if (res?.utteranceId && this.current === record) {
          this.currentId = res.utteranceId;
        }
        this.pending = false;
      })
      .catch((err: unknown) => {
        console.warn('[ttsBridge] speak failed', err);
        this.finishCurrent('synthesis-failed');
      });
  }

  cancel() {
    this.cancelRequested = true;
    void NativeTts.stop().catch(() => {});
    if (this.current) {
      this.finishCurrent('canceled');
    } else {
      this.speaking = false;
      this.pending = false;
    }
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  subscribeToVoicesChanged(cb: (voices: SpeechSynthesisVoice[]) => void) {
    this.listeners.push(cb);
    if (this.voices.length > 0) cb(this.voices);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }
}

function fallbackVoices(): SpeechSynthesisVoice[] {
  return [
    {
      name: '系统语音（英文）',
      lang: 'en-US',
      voiceURI: 'native:en-US',
      default: true,
      localService: true,
    },
    {
      name: '系统语音（中文）',
      lang: 'zh-CN',
      voiceURI: 'native:zh-CN',
      default: false,
      localService: true,
    },
  ] as unknown as SpeechSynthesisVoice[];
}

/** 让上层可以拿到桥接实例（用于设置面板展示引擎状态） */
export const nativeSpeech = new NativeSpeechSynthesis();

if (isAndroidNative) {
  // 兜底构造器：部分 WebView 既不提供 speechSynthesis 也不提供该构造函数
  if (typeof (window as unknown as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance === 'undefined') {
    class UtteranceShim {
      text: string;
      lang = 'en-US';
      voice: SpeechSynthesisVoice | null = null;
      rate = 1;
      pitch = 1;
      volume = 1;
      onend: ((ev: SpeechSynthesisEvent) => void) | null = null;
      onerror: ((ev: SpeechSynthesisErrorEvent) => void) | null = null;
      onstart: ((ev: SpeechSynthesisEvent) => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    (window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance =
      UtteranceShim;
  }

  nativeSpeech.init();

  // 无论 WebView 是否提供 speechSynthesis，原生 TTS 都是更可靠的选择
  const synthGetter = { configurable: true, get: () => nativeSpeech as unknown as SpeechSynthesis };
  try {
    Object.defineProperty(window, 'speechSynthesis', synthGetter);
  } catch (e) {
    console.warn('[ttsBridge] 无法覆盖 window.speechSynthesis', e);
  }
  try {
    Object.defineProperty(navigator, 'speechSynthesis', synthGetter);
  } catch (e) {
    console.warn('[ttsBridge] 无法覆盖 navigator.speechSynthesis', e);
  }

  console.log('[ttsBridge] 已启用 Android 原生语音合成');
}
