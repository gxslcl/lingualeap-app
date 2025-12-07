import { TTSConfig } from '../types';

class TTSService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private onVoicesChangedCallbacks: ((voices: SpeechSynthesisVoice[]) => void)[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    // Initial load
    this.loadVoices();

    // Async load (some browsers need this)
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.loadVoices();
        this.notifyListeners();
      };
    }
  }

  private loadVoices() {
    const allVoices = this.synth.getVoices();
    // Sort voices to prioritize high-quality ones
    this.voices = allVoices.sort((a, b) => {
      const getScore = (v: SpeechSynthesisVoice) => {
        let score = 0;
        // Keywords often associated with higher quality voices
        if (v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('Premium') ||
          v.name.includes('Enhanced') ||
          v.name.includes('Siri')) score += 5;
        if (v.default) score += 2;
        if (v.localService) score += 1;
        return score;
      };
      return getScore(b) - getScore(a);
    });
  }

  private notifyListeners() {
    this.onVoicesChangedCallbacks.forEach(cb => cb(this.voices));
  }

  public subscribeToVoicesChanged(callback: (voices: SpeechSynthesisVoice[]) => void) {
    this.onVoicesChangedCallbacks.push(callback);
    // Immediately invoke with current voices if available
    if (this.voices.length > 0) {
      callback(this.voices);
    }
    return () => {
      this.onVoicesChangedCallbacks = this.onVoicesChangedCallbacks.filter(cb => cb !== callback);
    };
  }

  public getVoices() {
    if (this.voices.length === 0) this.loadVoices();
    return this.voices;
  }

  public getGroupedVoices() {
    if (this.voices.length === 0) this.loadVoices();
    return {
      en: this.voices.filter(v => v.lang.startsWith('en')),
      zh: this.voices.filter(v => v.lang.startsWith('zh'))
    };
  }

  public speak(text: string, config: TTSConfig, lang: string = 'en-US', onEnd?: () => void) {
    // Cancel any ongoing speech to prevent overlap or queueing if user is skipping
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }

    // Double check voices if empty (sometimes happens on first load)
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Find voice based on requested language and config
    let preferredVoice: SpeechSynthesisVoice | undefined;

    const findVoice = (uri: string | undefined, langPrefix: string) => {
      if (uri) {
        return this.voices.find(v => v.voiceURI === uri);
      }
      // Smart fallback logic is now partly handled by the sorting in loadVoices,
      // but we double check here to ensure we pick the right language family.
      return this.voices.find(v => v.lang.startsWith(langPrefix));
    };

    if (lang.startsWith('zh')) {
      preferredVoice = findVoice(config.voiceURI_ZH, 'zh');
      // Fallback for Chinese if no voice matches 'zh' prefix exactly (rare)
      if (!preferredVoice) preferredVoice = this.voices.find(v => v.lang.includes('CN') || v.lang.includes('HK') || v.lang.includes('TW'));
    } else {
      preferredVoice = findVoice(config.voiceURI_EN, 'en');
      // Fallback for English
      if (!preferredVoice) preferredVoice = this.voices.find(v => v.lang.startsWith('en'));
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else {
      // If no voice object found, rely on lang tag
      utterance.lang = lang;
    }

    utterance.rate = config.rate;
    utterance.pitch = config.pitch;
    utterance.volume = config.volume;

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    // Robust error handling
    utterance.onerror = (e) => {
      // 'interrupted' or 'canceled' are expected when user skips or pauses
      if (e.error === 'interrupted' || e.error === 'canceled') {
        return;
      }

      // Log gracefully, e.error is a string in the spec, but let's be safe
      console.warn("TTS Playback Warning:", e.error);

      // Ensure the app flow continues even if audio fails
      if (onEnd) onEnd();
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.error("TTS System Error:", err);
      // Ensure callbacks fire so UI doesn't get stuck
      if (onEnd) onEnd();
    }
  }

  // 慢速播放功能 - 逐个单词播放
  public slowSpeak(text: string, config: TTSConfig, wordInterval: number = 0, onWordPlay?: (word: string, index: number) => void, onComplete?: () => void) {
    // 取消正在进行的语音
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }

    // 分割文本为单词数组（简单按空格分割）
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);

    if (words.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    let currentIndex = 0;

    const playNextWord = () => {
      if (currentIndex >= words.length) {
        if (onComplete) onComplete();
        return;
      }

      const word = words[currentIndex];
      if (onWordPlay) onWordPlay(word, currentIndex);

      const utterance = new SpeechSynthesisUtterance(word);

      // 设置语音配置
      let preferredVoice = this.voices.find(v => v.voiceURI === config.voiceURI_EN) ||
        this.voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = config.rate; // 使用正常速度而不是慢速
      utterance.pitch = config.pitch;
      utterance.volume = config.volume;

      utterance.onend = () => {
        currentIndex++;
        setTimeout(playNextWord, wordInterval);
      };

      utterance.onerror = () => {
        currentIndex++;
        setTimeout(playNextWord, wordInterval);
      };

      this.synth.speak(utterance);
    };

    playNextWord();
  }

  public cancel() {
    this.synth.cancel();
  }
}

export const ttsService = new TTSService();