import React, { useState, useEffect } from 'react';
import { Book, MessageSquare, Gamepad2, Settings as SettingsIcon, GraduationCap, Smartphone, Monitor, Brain, BarChart3, Headphones } from 'lucide-react';
import { ViewState, TTSConfig, AppSettings } from './types';
import { VocabularyView } from './components/VocabularyView';
import { PhrasesView } from './components/PhrasesView';
import { GameView } from './components/GameView';
import { StudySession } from './components/StudySession';
import { StatisticsPanel } from './components/StatisticsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { PomodoroTimer } from './components/PomodoroTimer';
import { ListenView } from './components/ListenView';
import { storageService } from './services/storage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('vocabulary');
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(window.innerWidth < 768);
  
  // Initialize TTS Config from storage
  const [ttsConfig, setTtsConfig] = useState<TTSConfig>(() => storageService.getTTSConfig());

  // Initialize App Settings from storage
  const [appSettings, setAppSettings] = useState<AppSettings>(() => storageService.getSettings());
  
  // 深色模式状态 ('auto' | 'light' | 'dark')
  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>(() => {
    const savedSettings = storageService.getSettings();
    return savedSettings.themeMode || 'auto';
  });

  // 实际应用的主题
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Handle settings persistence and side effects
  useEffect(() => {
    storageService.saveSettings({...appSettings, themeMode});
  }, [appSettings, themeMode]);

  // Handle TTS Config persistence
  useEffect(() => {
    storageService.saveTTSConfig(ttsConfig);
  }, [ttsConfig]);

  // 处理主题变化
  useEffect(() => {
    const updateTheme = () => {
      if (themeMode === 'auto') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setActualTheme(systemPrefersDark ? 'dark' : 'light');
      } else {
        setActualTheme(themeMode);
      }
    };

    updateTheme();

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      if (themeMode === 'auto') {
        setActualTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [themeMode]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
       // Only auto-switch if user hasn't manually toggled (logic simplified here)
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'vocabulary':
        return <VocabularyView ttsConfig={ttsConfig} />;
      case 'phrases':
        return <PhrasesView ttsConfig={ttsConfig} />;
      case 'game':
        return <GameView ttsConfig={ttsConfig} />;
      case 'study':
        return <StudySession ttsConfig={ttsConfig} onComplete={() => setCurrentView('stats')} />;
      case 'stats':
        return <StatisticsPanel />;
      case 'listen':
        return <ListenView ttsConfig={ttsConfig} />;
      default:
        return <VocabularyView ttsConfig={ttsConfig} />;
    }
  };

  const toggleViewMode = () => setIsMobileMode(!isMobileMode);

  return (
    <div 
      className={`min-h-screen flex flex-col bg-slate-50 font-sans transition-colors duration-300 ${isMobileMode ? 'pb-20' : 'pb-0'} ${actualTheme === 'dark' ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}
      style={{ fontSize: `${appSettings.fontSizeScale}rem` }}
    >
      {/* Desktop Header */}
      {!isMobileMode && (
        <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="bg-brand-500 p-2 rounded-lg shadow-sm">
                 <GraduationCap className="w-6 h-6 text-white" />
              </div> */}
              <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">英语自学助手</h1>
            </div>

            <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
               <button
                onClick={() => setCurrentView('study')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'study'
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>智能学习</span>
              </button>
              <button
                onClick={() => setCurrentView('listen')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'listen'
                    ? 'bg-white dark:bg-slate-600 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>听读</span>
              </button>
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>
              <button
                onClick={() => setCurrentView('vocabulary')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'vocabulary'
                    ? 'bg-white dark:bg-slate-600 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Book className="w-4 h-4" />
                <span>单词</span>
              </button>
              <button
                onClick={() => setCurrentView('phrases')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'phrases'
                    ? 'bg-white dark:bg-slate-600 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>短语</span>
              </button>
              <button
                onClick={() => setCurrentView('game')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'game'
                    ? 'bg-white dark:bg-slate-600 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>复习</span>
              </button>
              <button
                onClick={() => setCurrentView('stats')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'stats'
                    ? 'bg-white dark:bg-slate-600 text-brand-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>统计</span>
              </button>
            </nav>

            <div className="flex items-center gap-3">
                <PomodoroTimer />
                <div className="flex gap-1">
                    <button
                        onClick={toggleViewMode}
                        title="切换到移动端模式"
                        className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <Smartphone className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <SettingsIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Header */}
      {isMobileMode && (
        <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-40 px-4 h-16 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
             <GraduationCap className="w-8 h-8 text-brand-500" />
          </div>
          <div className="flex gap-1 items-center">
             <PomodoroTimer />
             <button
                onClick={toggleViewMode}
                title="切换到Web模式"
                className="p-2 text-slate-500 hover:text-brand-600 active:bg-slate-100 dark:active:bg-slate-700 rounded-full"
            >
                <Monitor className="w-5 h-5" />
            </button>
            <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-slate-500 hover:text-brand-600 active:bg-slate-100 dark:active:bg-slate-700 rounded-full"
            >
                <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 transition-all ${isMobileMode ? 'max-w-md bg-white dark:bg-slate-900 min-h-screen shadow-2xl my-0 md:my-4 rounded-none md:rounded-3xl border-x border-slate-100 dark:border-slate-800 overflow-hidden' : 'max-w-7xl'}`}>
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 h-full">
          {renderView()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobileMode && (
        <div className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none`}>
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 pb-safe w-full max-w-md pointer-events-auto md:rounded-b-3xl md:mb-4 md:border-x md:border-b md:shadow-2xl">
                <nav className="flex justify-around items-center h-16">
                <button
                    onClick={() => setCurrentView('study')}
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                    currentView === 'study' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                >
                    <Brain className={`w-6 h-6 ${currentView === 'study' ? 'fill-current opacity-20' : ''}`} />
                    <span className="text-[10px] font-medium">学习</span>
                </button>
                 <button
                    onClick={() => setCurrentView('listen')}
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                    currentView === 'listen' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                >
                    <Headphones className={`w-6 h-6 ${currentView === 'listen' ? 'fill-current opacity-20' : ''}`} />
                    <span className="text-[10px] font-medium">听读</span>
                </button>
                <button
                    onClick={() => setCurrentView('vocabulary')}
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                    currentView === 'vocabulary' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                >
                    <Book className={`w-6 h-6 ${currentView === 'vocabulary' ? 'fill-current opacity-20' : ''}`} />
                    <span className="text-[10px] font-medium">词库</span>
                </button>
                <button
                    onClick={() => setCurrentView('phrases')}
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                    currentView === 'phrases' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                >
                    <MessageSquare className={`w-6 h-6 ${currentView === 'phrases' ? 'fill-current opacity-20' : ''}`} />
                    <span className="text-[10px] font-medium">短语</span>
                </button>
                <button
                    onClick={() => setCurrentView('game')}
                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                    currentView === 'game' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                >
                    <Gamepad2 className={`w-6 h-6 ${currentView === 'game' ? 'fill-current opacity-20' : ''}`} />
                    <span className="text-[10px] font-medium">复习</span>
                </button>
                </nav>
            </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        ttsConfig={ttsConfig}
        onTTSChange={setTtsConfig}
        appSettings={appSettings}
        onAppSettingsChange={setAppSettings}
        themeMode={themeMode}
        onThemeModeChange={setThemeMode}
      />
    </div>
  );
};

export default App;