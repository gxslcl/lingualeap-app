import React, { useEffect, useState } from 'react';
import { Settings, X, Volume2, Gauge, Moon, Sun, Type, Mic } from 'lucide-react';
import { TTSConfig, AppSettings } from '../types';
import { ttsService } from '../services/ttsService';

interface SettingsPanelProps {
  ttsConfig: TTSConfig;
  appSettings: AppSettings;
  onTTSChange: (newConfig: TTSConfig) => void;
  onAppSettingsChange: (newSettings: AppSettings) => void;
  isOpen: boolean;
  onClose: () => void;
  themeMode: 'auto' | 'light' | 'dark';
  onThemeModeChange: (mode: 'auto' | 'light' | 'dark') => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
    ttsConfig, appSettings, onTTSChange, onAppSettingsChange, isOpen, onClose, themeMode, onThemeModeChange
}) => {
  const [availableVoices, setAvailableVoices] = useState<{en: SpeechSynthesisVoice[], zh: SpeechSynthesisVoice[]}>({ en: [], zh: [] });

  useEffect(() => {
    // Subscribe to voice changes to ensure list is populated
    const unsubscribe = ttsService.subscribeToVoicesChanged((voices) => {
        setAvailableVoices(ttsService.getGroupedVoices());
    });
    
    // Initial fetch
    setAvailableVoices(ttsService.getGroupedVoices());

    return () => unsubscribe();
  }, []);

  const handleTestVoice = (lang: 'en' | 'zh', uri: string) => {
      const text = lang === 'en' ? "Hello, how do I sound?" : "你好，这个声音怎么样？";
      // Use the newly selected URI for the test
      const tempConfig = { ...ttsConfig };
      if (lang === 'en') tempConfig.voiceURI_EN = uri;
      if (lang === 'zh') tempConfig.voiceURI_ZH = uri;
      
      ttsService.speak(text, tempConfig, lang === 'en' ? 'en-US' : 'zh-CN');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative overflow-hidden text-slate-800 dark:text-slate-100 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 dark:bg-brand-900/20 rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="flex justify-between items-center mb-6 relative z-10 flex-shrink-0">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-500" />
            设置选项
          </h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 relative z-10 overflow-y-auto no-scrollbar pr-2 flex-1">
          
          {/* Appearance Section */}
          <div className="space-y-4 border-b border-slate-100 dark:border-slate-700 pb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">外观显示</h3>
              
              {/* Dark Mode */}
              <div className="space-y-3">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  深色模式
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onThemeModeChange('auto')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      themeMode === 'auto'
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    自动
                  </button>
                  <button
                    onClick={() => onThemeModeChange('light')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      themeMode === 'light'
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    浅色
                  </button>
                  <button
                    onClick={() => onThemeModeChange('dark')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      themeMode === 'dark'
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    深色
                  </button>
                </div>
              </div>

               {/* Font Size */}
               <div>
                <div className="flex justify-between mb-2 items-center">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        字体大小
                    </label>
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{Math.round(appSettings.fontSizeScale * 100)}%</span>
                </div>
                <input
                    type="range"
                    min="0.8"
                    max="1.2"
                    step="0.1"
                    value={appSettings.fontSizeScale}
                    onChange={(e) => onAppSettingsChange({ ...appSettings, fontSizeScale: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>
          </div>

          {/* Audio Section */}
          <div className="space-y-5">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">语音设置</h3>
             
             {/* Voice Selection - English */}
             <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Mic className="w-4 h-4" />
                    英文发音人
                </label>
                <div className="flex gap-2">
                    <select 
                        value={ttsConfig.voiceURI_EN || ''}
                        onChange={(e) => {
                            const newUri = e.target.value;
                            onTTSChange({ ...ttsConfig, voiceURI_EN: newUri });
                            handleTestVoice('en', newUri);
                        }}
                        className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-xs text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                    >
                        <option value="">自动推荐 (System Default)</option>
                        {availableVoices.en.map(v => (
                            <option key={v.voiceURI} value={v.voiceURI}>
                                {v.name.replace(/English|United States/g, '').trim()}
                            </option>
                        ))}
                    </select>
                </div>
             </div>

             {/* Voice Selection - Chinese */}
             <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Mic className="w-4 h-4" />
                    中文发音人
                </label>
                <div className="flex gap-2">
                    <select 
                        value={ttsConfig.voiceURI_ZH || ''}
                        onChange={(e) => {
                             const newUri = e.target.value;
                             onTTSChange({ ...ttsConfig, voiceURI_ZH: newUri });
                             handleTestVoice('zh', newUri);
                        }}
                        className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-xs text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
                    >
                        <option value="">自动推荐 (System Default)</option>
                        {availableVoices.zh.map(v => (
                            <option key={v.voiceURI} value={v.voiceURI}>
                                {v.name.replace(/Chinese|China|Hong Kong|Taiwan/g, '').trim()}
                            </option>
                        ))}
                    </select>
                </div>
             </div>

             {/* Rate Control */}
            <div>
                <div className="flex justify-between mb-2 items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    语速
                </label>
                <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{ttsConfig.rate}x</span>
                </div>
                <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={ttsConfig.rate}
                onChange={(e) => onTTSChange({ ...ttsConfig, rate: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
            </div>

            {/* Volume Control */}
            <div>
                <div className="flex justify-between mb-2 items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    音量
                </label>
                <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{Math.round(ttsConfig.volume * 100)}%</span>
                </div>
                <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={ttsConfig.volume}
                onChange={(e) => onTTSChange({ ...ttsConfig, volume: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-xl font-bold shadow-lg shadow-brand-200 dark:shadow-none transition-all"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};