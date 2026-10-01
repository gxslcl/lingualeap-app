package com.lingualeap.app;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 原生语音合成插件。
 *
 * Android WebView 不实现 Web Speech API，本插件把系统 TTS 引擎暴露给前端，
 * 由 src/ttsBridge.ts 适配成符合 W3C 规范的对象供 ttsService 使用。
 *
 * 事件：ttsStart / ttsEnd / ttsError（均携带 utteranceId）
 */
@CapacitorPlugin(name = "NativeTts")
public class NativeTtsPlugin extends Plugin {

    private TextToSpeech tts;
    private volatile boolean ready = false;
    private volatile boolean initFailed = false;

    private final AtomicInteger counter = new AtomicInteger(0);
    private final List<PluginCall> pendingCalls = new ArrayList<>();

    @Override
    public void load() {
        try {
            tts = new TextToSpeech(getContext(), status -> {
                if (status != TextToSpeech.SUCCESS) {
                    initFailed = true;
                    rejectPending("TTS 初始化失败：设备可能未安装语音引擎");
                    return;
                }
                ready = true;
                tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override
                    public void onStart(String utteranceId) {
                        JSObject data = new JSObject();
                        data.put("utteranceId", utteranceId);
                        notifyListeners("ttsStart", data);
                    }

                    @Override
                    public void onDone(String utteranceId) {
                        JSObject data = new JSObject();
                        data.put("utteranceId", utteranceId);
                        notifyListeners("ttsEnd", data);
                    }

                    @Override
                    public void onError(String utteranceId) {
                        emitError(utteranceId, "synthesis-failed");
                    }

                    @Override
                    public void onError(String utteranceId, int errorCode) {
                        emitError(utteranceId, "synthesis-failed(" + errorCode + ")");
                    }

                    @Override
                    public void onStop(String utteranceId, boolean interrupted) {
                        emitError(utteranceId, interrupted ? "interrupted" : "canceled");
                    }
                });

                List<PluginCall> queued;
                synchronized (pendingCalls) {
                    queued = new ArrayList<>(pendingCalls);
                    pendingCalls.clear();
                }
                for (PluginCall call : queued) {
                    doSpeak(call);
                }
            });
        } catch (Exception e) {
            initFailed = true;
            rejectPending("TTS 初始化异常：" + e.getMessage());
        }
    }

    @Override
    protected void handleOnDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
            tts = null;
        }
        ready = false;
        super.handleOnDestroy();
    }

    private void emitError(String utteranceId, String error) {
        JSObject data = new JSObject();
        data.put("utteranceId", utteranceId);
        data.put("error", error);
        notifyListeners("ttsError", data);
    }

    private void rejectPending(String message) {
        List<PluginCall> queued;
        synchronized (pendingCalls) {
            queued = new ArrayList<>(pendingCalls);
            pendingCalls.clear();
        }
        for (PluginCall call : queued) {
            call.reject(message);
        }
    }

    @PluginMethod
    public void speak(PluginCall call) {
        if (initFailed) {
            call.reject("TTS 引擎不可用，请先在系统设置中安装语音数据");
            return;
        }
        if (!ready) {
            synchronized (pendingCalls) {
                pendingCalls.add(call);
            }
            return;
        }
        doSpeak(call);
    }

    private void doSpeak(PluginCall call) {
        String text = call.getString("text", "");
        if (text == null || text.trim().isEmpty()) {
            JSObject empty = new JSObject();
            empty.put("utteranceId", "");
            call.resolve(empty);
            return;
        }

        String lang = call.getString("lang", "en-US");
        float rate = clamp(call.getFloat("rate", 1f), 0.1f, 3f);
        float pitch = clamp(call.getFloat("pitch", 1f), 0.1f, 2f);
        float volume = clamp(call.getFloat("volume", 1f), 0f, 1f);
        String voiceURI = call.getString("voiceURI", null);

        Locale locale = toLocale(lang);
        if (!isLocaleAvailable(locale)) {
            Locale fallback = locale.getLanguage().startsWith("zh")
                    ? Locale.SIMPLIFIED_CHINESE
                    : Locale.US;
            if (isLocaleAvailable(fallback)) {
                locale = fallback;
            }
        }

        try {
            tts.setLanguage(locale);
            tts.setSpeechRate(rate);
            tts.setPitch(pitch);
            if (voiceURI != null && !voiceURI.isEmpty()) {
                applyVoice(voiceURI);
            } else {
                // 未指定音色时优先挑选离线音色：本应用主打离线学习，
                // 若落到依赖网络的音色，无网络时会长时间超时后报合成失败。
                preferLocalVoice(locale);
            }
        } catch (Exception e) {
            call.reject("设置语音参数失败：" + e.getMessage());
            return;
        }

        // 允许前端指定 utteranceId：前端能在调用前就登记好「当前语句」，
        // 从而把 ttsStart/ttsEnd/ttsError 事件与具体语句精确对应，
        // 避免上一条语句的 stop 事件把刚开始播放的新语句误判为结束。
        String utteranceId = call.getString("utteranceId");
        if (utteranceId == null || utteranceId.isEmpty()) {
            utteranceId = "u" + counter.incrementAndGet();
        }
        Bundle params = new Bundle();
        params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, volume);

        int result = tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, utteranceId);

        if (result == TextToSpeech.ERROR) {
            emitError(utteranceId, "synthesis-failed");
            call.reject("语音合成失败");
            return;
        }

        JSObject ret = new JSObject();
        ret.put("utteranceId", utteranceId);
        call.resolve(ret);
    }

    private void applyVoice(String voiceURI) {
        if (voiceURI == null || voiceURI.isEmpty()) {
            return;
        }
        try {
            Set<Voice> voices = tts.getVoices();
            if (voices == null) {
                return;
            }
            for (Voice v : voices) {
                if (voiceURI.equals(v.getName())) {
                    tts.setVoice(v);
                    return;
                }
            }
        } catch (Exception ignored) {
            // 引擎不支持 setVoice 时忽略，继续使用默认音色
        }
    }

    /** 在指定语言下挑选一个离线音色（质量优先） */
    private void preferLocalVoice(Locale locale) {
        try {
            Set<Voice> voices = tts.getVoices();
            if (voices == null) {
                return;
            }
            Voice best = null;
            for (Voice v : voices) {
                Locale voiceLocale = v.getLocale();
                if (voiceLocale == null || !voiceLocale.getLanguage().equals(locale.getLanguage())) {
                    continue;
                }
                if (v.isNetworkConnectionRequired()) {
                    continue;
                }
                if (best == null || v.getQuality() > best.getQuality()) {
                    best = v;
                }
            }
            if (best != null) {
                tts.setVoice(best);
            }
        } catch (Exception ignored) {
            // 引擎不支持音色枚举时继续使用语言默认音色
        }
    }

    private boolean isLocaleAvailable(Locale locale) {
        try {
            int availability = tts.isLanguageAvailable(locale);
            return availability != TextToSpeech.LANG_MISSING_DATA
                    && availability != TextToSpeech.LANG_NOT_SUPPORTED;
        } catch (Exception e) {
            return false;
        }
    }

    private Locale toLocale(String lang) {
        if (lang == null || lang.isEmpty()) {
            return Locale.US;
        }
        Locale locale = Locale.forLanguageTag(lang.replace('_', '-'));
        if (locale.getLanguage() == null || locale.getLanguage().isEmpty()) {
            return Locale.US;
        }
        return locale;
    }

    private static float clamp(float value, float min, float max) {
        return Math.max(min, Math.min(max, value));
    }

    /** 返回中英文可用音色，前端用于设置面板选择发音人 */
    @PluginMethod
    public void getVoices(PluginCall call) {
        JSArray array = new JSArray();
        if (ready && tts != null) {
            try {
                Set<Voice> voices = tts.getVoices();
                if (voices != null) {
                    for (Voice v : voices) {
                        Locale locale = v.getLocale();
                        String tag = locale.toLanguageTag();
                        if (!(tag.startsWith("en") || tag.startsWith("zh"))) {
                            continue;
                        }
                        if (v.isNetworkConnectionRequired()) {
                            // 离线优先，跳过依赖网络的音色
                            continue;
                        }
                        JSObject item = new JSObject();
                        item.put("name", voiceName(locale, v));
                        item.put("locale", tag);
                        item.put("voiceURI", v.getName());
                        item.put("quality", v.getQuality());
                        item.put("latency", v.getLatency());
                        array.put(item);
                    }
                }
            } catch (Exception ignored) {
                // 部分引擎不支持 getVoices（API < 21），返回空列表由前端兜底
            }
        }

        JSObject ret = new JSObject();
        ret.put("voices", array);
        ret.put("engineReady", ready);
        call.resolve(ret);
    }

    private String voiceName(Locale locale, Voice voice) {
        String display = locale.getDisplayName();
        if (display == null || display.isEmpty()) {
            display = locale.toLanguageTag();
        }
        String quality = voice.getQuality() >= Voice.QUALITY_HIGH ? " · 高清" : "";
        return display + quality;
    }

    @PluginMethod
    public void isLanguageAvailable(PluginCall call) {
        String lang = call.getString("lang", "en-US");
        JSObject ret = new JSObject();
        ret.put("available", ready && isLocaleAvailable(toLocale(lang)));
        call.resolve(ret);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        if (tts != null) {
            tts.stop();
        }
        call.resolve();
    }

    /** 跳转系统 TTS 语音数据安装页（缺少中英文语音包时使用） */
    @PluginMethod
    public void openInstall(PluginCall call) {
        try {
            Intent intent = new Intent(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(intent);
            call.resolve();
        } catch (ActivityNotFoundException e) {
            call.reject("未找到语音数据安装页面");
        }
    }
}
