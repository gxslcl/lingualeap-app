import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  Book,
  MessageSquare,
  Gamepad2,
  Settings as SettingsIcon,
  GraduationCap,
  Smartphone,
  Monitor,
  Tablet,
  Brain,
  BarChart3,
  Headphones,
} from 'lucide-react';
import { ViewState, TTSConfig, AppSettings } from './types';
import { VocabularyView } from './components/VocabularyView';
import { PhrasesView } from './components/PhrasesView';
import { GameView } from './components/GameView';
import { StudySession } from './components/StudySession';
import { StatisticsPanel } from './components/StatisticsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { PomodoroTimer } from './components/PomodoroTimer';
import { ListenView } from './components/ListenView';
import { sessionService } from './services/session';
import { storageService } from './services/storage';
import {
  hideSplash,
  syncStatusBar,
  onBackButton,
  exitApp,
  cleanupStaleServiceWorker,
  applySafeAreaInsets,
  watchSafeAreaInsets,
} from './src/native';

type LayoutMode = 'phone' | 'tablet' | 'desktop';
type LayoutOverride = 'auto' | 'phone' | 'tablet';

interface NavItem {
  key: ViewState;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'study', label: '智能学习', shortLabel: '学习', icon: Brain },
  { key: 'listen', label: '听读', shortLabel: '听读', icon: Headphones },
  { key: 'vocabulary', label: '单词', shortLabel: '词库', icon: Book },
  { key: 'phrases', label: '短语', shortLabel: '短语', icon: MessageSquare },
  { key: 'game', label: '复习', shortLabel: '复习', icon: Gamepad2 },
  { key: 'stats', label: '统计', shortLabel: '统计', icon: BarChart3 },
];

/**
 * 依据视口宽度推断形态：手机 / 平板 / 桌面（含平板横屏）。
 *
 * 桌面阈值从 1024 提到 1200：竖屏平板大约 1000～1100 CSS px 宽，
 * 顶部横导航在这个宽度放不下（导航项会被挤成竖排文字），
 * 用左侧竖向导航（平板形态）更合适。
 */
function detectLayout(): LayoutMode {
  const w = window.innerWidth;
  if (w < 768) return 'phone';
  if (w < 1200) return 'tablet';
  return 'desktop';
}

function useDetectedLayout(): LayoutMode {
  const [mode, setMode] = useState<LayoutMode>(() =>
    typeof window === 'undefined' ? 'phone' : detectLayout(),
  );

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMode(detectLayout()));
    };
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', update);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', update);
      }
    };
  }, []);

  return mode;
}

const App: React.FC = () => {
  // 恢复上次停留的页面（关闭应用后再打开能接着学）
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const saved = sessionService.getView();
    // 「数据」已并入设置面板，不再是独立页面：恢复时回退到词库
    return saved === 'data' ? 'vocabulary' : saved;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [exitHint, setExitHint] = useState(false);

  useEffect(() => {
    sessionService.setView(currentView);
  }, [currentView]);

  const detected = useDetectedLayout();

  // Initialize TTS Config from storage
  const [ttsConfig, setTtsConfig] = useState<TTSConfig>(() =>
    storageService.getTTSConfig(),
  );

  // Initialize App Settings from storage
  const [appSettings, setAppSettings] = useState<AppSettings>(() =>
    storageService.getSettings(),
  );

  // 深色模式状态 ('auto' | 'light' | 'dark')
  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>(() => {
    const savedSettings = storageService.getSettings();
    return savedSettings.themeMode || 'auto';
  });

  // 实际应用的主题
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // 布局覆盖：'auto' 跟随屏幕宽度，也可手动锁定手机/平板布局
  const layoutOverride: LayoutOverride = appSettings.layoutMode || 'auto';
  const layout: LayoutMode = layoutOverride === 'auto' ? detected : layoutOverride;

  const setLayoutOverride = (mode: LayoutOverride) => {
    setAppSettings((prev) => ({ ...prev, layoutMode: mode }));
  };

  const cycleLayoutOverride = () => {
    const next: LayoutOverride =
      layoutOverride === 'auto' ? 'phone' : layoutOverride === 'phone' ? 'tablet' : 'auto';
    setLayoutOverride(next);
  };

  // 把主题落到 <html> 上：Tailwind 的 dark: 变体依赖 .dark 类，
  // 之前只在旧字段 darkMode 变化时才加类，导致主题切换后深色样式全部不生效。
  // 用 useLayoutEffect 保证在浏览器绘制前完成，避免闪白。
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', actualTheme === 'dark');
  }, [actualTheme]);

  // Handle settings persistence and side effects
  useEffect(() => {
    // darkMode 仅作为历史字段保持同步，真正的主题以 themeMode / actualTheme 为准
    storageService.saveSettings({
      ...appSettings,
      themeMode,
      darkMode: actualTheme === 'dark',
    });
  }, [appSettings, themeMode, actualTheme]);

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

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      if (themeMode === 'auto') {
        setActualTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [themeMode]);

  // 原生：清理旧版本遗留的 Service Worker 缓存，并隐藏启动图
  useEffect(() => {
    void cleanupStaleServiceWorker();
    const t = window.setTimeout(() => hideSplash(), 300);
    return () => window.clearTimeout(t);
  }, []);

  // 原生：测量状态栏 / 导航栏高度并写入 CSS 变量
  // （Android 15 起强制边到边，WebView 拿不到 env(safe-area-inset-*)，必须由原生下发）
  useEffect(() => {
    void applySafeAreaInsets();
    return watchSafeAreaInsets();
  }, []);

  // 原生：状态栏图标明暗跟随主题。
  // 注意：Activity 首帧绘制时系统会按主题默认值重设一次状态栏外观，
  // 会覆盖启动瞬间的设置（表现为浅色主题下状态栏图标变白、看不见），
  // 因此在首帧之后补几次同步。
  useEffect(() => {
    void syncStatusBar(actualTheme);
    const timers = [400, 1500, 3000].map((delay) =>
      window.setTimeout(() => void syncStatusBar(actualTheme), delay),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [actualTheme]);

  // 原生：硬件返回键 —— 关弹层 → 回首页 → 双击退出
  const lastBackRef = useRef(0);
  useEffect(() => {
    return onBackButton(() => {
      if (showSettings) {
        setShowSettings(false);
        return true;
      }
      if (currentView !== 'vocabulary') {
        setCurrentView('vocabulary');
        return true;
      }
      const now = Date.now();
      if (now - lastBackRef.current < 2000) {
        lastBackRef.current = 0;
        exitApp();
        return true;
      }
      lastBackRef.current = now;
      setExitHint(true);
      window.setTimeout(() => setExitHint(false), 1800);
      return true;
    });
  }, [showSettings, currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'vocabulary':
        return <VocabularyView ttsConfig={ttsConfig} />;
      case 'phrases':
        return <PhrasesView ttsConfig={ttsConfig} />;
      case 'game':
        return <GameView ttsConfig={ttsConfig} />;
      case 'study':
        return (
          <StudySession ttsConfig={ttsConfig} onComplete={() => setCurrentView('stats')} />
        );
      case 'stats':
        return <StatisticsPanel />;
      case 'listen':
        return <ListenView ttsConfig={ttsConfig} />;
      default:
        return <VocabularyView ttsConfig={ttsConfig} />;
    }
  };

  // 页面底色 / 文本颜色统一走 dark: 变体，与挂在 <html> 上的 .dark 保持一致
  const shellClass = 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100';

  // 顶栏：内容区固定 64px，额外用 pt-safe 让出状态栏高度
  const headerBaseClass =
    'bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-40 pt-safe border-b border-slate-200 dark:border-slate-700';

  // ---------- 顶部横向导航（桌面 / 大屏平板横屏） ----------
  const renderTopNav = () => (
    <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl whitespace-nowrap">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = currentView === item.key;
        const primary = item.key === 'study';
        return (
          <button
            key={item.key}
            onClick={() => setCurrentView(item.key)}
            className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              active
                ? primary
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-600 text-brand-600 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  // ---------- 侧边导航（平板竖屏 / 中等宽度）----------
  // 位于顶栏之下，left 贴边；底部同样避开手势导航栏
  const renderSideRail = () => (
    <aside
      className="fixed left-0 bottom-0 z-40 flex flex-col items-center py-3 pb-safe pl-safe bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700"
      style={{
        width: 88,
        top: 'calc(var(--header-h) + var(--safe-top))',
      }}
    >
      <nav className="flex-1 w-full flex flex-col items-center gap-1 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = currentView === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setCurrentView(item.key)}
              className={`w-[72px] py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                active
                  ? 'bg-brand-50 text-brand-600 dark:bg-slate-700 dark:text-brand-400'
                  : 'text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-slate-700'
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? 'fill-current opacity-20' : ''}`} />
              <span className="text-[11px] font-medium">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );

  // ---------- 底部导航（手机） ----------
  const renderBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`backdrop-blur-md border-t border-slate-200 dark:border-slate-700 pb-safe w-full max-w-md pointer-events-auto ${
          actualTheme === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'
        }`}
      >
        <nav className="flex justify-around items-center h-16">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                  active
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? 'fill-current opacity-20' : ''}`} />
                <span className="text-[10px] font-medium">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  const layoutToggleBtn = (
    <button
      onClick={cycleLayoutOverride}
      title={
        layoutOverride === 'auto'
          ? '当前：自动适配（点击锁定为手机布局）'
          : layoutOverride === 'phone'
            ? '当前：锁定手机布局（点击切换平板布局）'
            : '当前：锁定平板布局（点击恢复自动）'
      }
      className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
    >
      {layoutOverride === 'auto' ? (
        <Monitor className="w-5 h-5" />
      ) : layoutOverride === 'phone' ? (
        <Smartphone className="w-5 h-5" />
      ) : (
        <Tablet className="w-5 h-5" />
      )}
    </button>
  );

  const settingsBtn = (
    <button
      onClick={() => setShowSettings(true)}
      title="设置"
      className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
    >
      <SettingsIcon className="w-5 h-5" />
    </button>
  );

  // 内容区宽度：手机单列 / 平板 / 桌面大屏。
  // 原来的上限（768 / 1024）在高分平板和大屏上会在两侧留出大片空白，
  // 这里放宽到接近满宽，卡片列数由各页面自己的断点决定。
  const mainWidthClass =
    layout === 'phone'
      ? 'max-w-md'
      : layout === 'tablet'
        ? 'max-w-[1250px]'
        : 'max-w-[1700px]';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${shellClass}`}
      style={
        {
          fontSize: `${appSettings.fontSizeScale}rem`,
          // 供固定定位的悬浮按钮 / 播放条自动让开底部标签栏
          '--bottom-nav-h': layout === 'phone' ? '4rem' : '0px',
          // 主内容留白：下边距里已包含标签栏与手势栏，页面自身不必再重复预留
          '--main-pt': layout === 'phone' ? '1rem' : '1.5rem',
          '--main-pb':
            layout === 'phone'
              ? 'calc(4rem + var(--safe-bottom) + 1rem)'
              : 'calc(var(--safe-bottom) + 1.5rem)',
        } as React.CSSProperties
      }
    >
      {/* ===== 桌面：顶部横导航 ===== */}
      {layout === 'desktop' && (
        <header className={headerBaseClass}>
          <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                英语自学助手
              </h1>
            </div>
            <div className="flex-1 flex justify-center">{renderTopNav()}</div>
            <div className="flex items-center gap-2 shrink-0">
              <PomodoroTimer />
              {layoutToggleBtn}
              {settingsBtn}
            </div>
          </div>
        </header>
      )}

      {/* ===== 手机 / 平板：顶部标题栏 ===== */}
      {layout !== 'desktop' && (
        <header className={`${headerBaseClass} px-4`}>
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <GraduationCap className="w-7 h-7 text-brand-500 shrink-0" />
              <h1 className="text-base font-bold text-slate-800 dark:text-white tracking-tight whitespace-nowrap truncate">
                {/* 手机顶栏空间有限，用短标题避免被截断成「智能…」 */}
                {(() => {
                  const item = NAV_ITEMS.find((i) => i.key === currentView);
                  if (!item) return '英语自学助手';
                  return layout === 'phone' ? item.shortLabel : item.label;
                })()}
              </h1>
            </div>
            <div className="flex gap-1 items-center shrink-0">
              <PomodoroTimer />
              {layoutToggleBtn}
              {settingsBtn}
            </div>
          </div>
        </header>
      )}

      {/* ===== 平板：侧边导航栏（顶栏之下的左侧竖向导航） ===== */}
      {layout === 'tablet' && renderSideRail()}

      {/* ===== 主内容 ===== */}
      <main
        className={`flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 main-pad ${mainWidthClass} ${
          layout === 'tablet' ? 'pl-[104px] sm:pl-[112px]' : ''
        }`}
      >
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 h-full">
          {renderView()}
        </div>
      </main>

      {/* ===== 手机：底部导航 ===== */}
      {layout === 'phone' && renderBottomNav()}

      {/* 双击退出提示 */}
      {exitHint && (
        <div className="fixed bottom-above-nav left-1/2 -translate-x-1/2 z-[60] bg-slate-900/90 dark:bg-slate-700/95 text-white text-sm px-4 py-2 rounded-full shadow-lg">
          再按一次返回键退出应用
        </div>
      )}

      {/* 设置弹层 */}
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
