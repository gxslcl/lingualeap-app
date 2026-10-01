/**
 * 原生能力桥接层
 * 仅在 Capacitor 原生容器（Android/iOS）中生效，浏览器环境下全部安全降级为空操作。
 */
import { Capacitor, registerPlugin } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

export const isNative = Capacitor.isNativePlatform();
export const platformName = Capacitor.getPlatform();

interface SystemInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SystemUiPlugin {
  getInsets(): Promise<SystemInsets>;
  setAppearance(options: { lightBackground: boolean }): Promise<void>;
}

const SystemUi = registerPlugin<SystemUiPlugin>('SystemUi');

/**
 * 把系统栏（状态栏 / 导航栏 / 刘海）实际高度写入 CSS 变量。
 *
 * Android 15 起强制边到边显示，WebView 会画到状态栏下面，
 * 而 Android WebView 不提供 env(safe-area-inset-*)，所以由原生读取后下发。
 * 前端 CSS 用 var(--safe-top) 等变量做内边距（未生效时退回 env()）。
 */
export async function applySafeAreaInsets(): Promise<void> {
  if (!isNative) return;
  try {
    const insets = await SystemUi.getInsets();
    const root = document.documentElement;
    const px = (v: number) => `${Math.max(0, Math.round(v))}px`;
    root.style.setProperty('--safe-top', px(insets.top));
    root.style.setProperty('--safe-bottom', px(insets.bottom));
    root.style.setProperty('--safe-left', px(insets.left));
    root.style.setProperty('--safe-right', px(insets.right));
  } catch (e) {
    console.warn('[native] 读取系统栏高度失败，回退到 CSS env()', e);
  }
}

/** 屏幕旋转 / 折叠 / 分屏会改变 inset 与系统栏外观，需要重新应用 */
export function watchSafeAreaInsets() {
  if (!isNative) return () => {};
  const reapply = () => {
    void applySafeAreaInsets();
    void syncStatusBar(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  };
  window.addEventListener('resize', reapply);
  window.addEventListener('orientationchange', reapply);
  const timer = window.setTimeout(reapply, 800);
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener('resize', reapply);
    window.removeEventListener('orientationchange', reapply);
  };
}

/**
 * 清理历史版本遗留的 Service Worker 与缓存。
 * 旧版本（PWA 版）注册过 SW，升级安装后会继续用缓存返回旧的前端资源，
 * 导致「装了新包却还是旧界面」，必须在原生环境下主动注销。
 */
export async function cleanupStaleServiceWorker() {
  if (!isNative) return;
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((r) => r.unregister().catch(() => false)));
      if (registrations.length) {
        console.log(`[native] 已注销 ${registrations.length} 个遗留 Service Worker`);
      }
    }
    if (typeof caches !== 'undefined') {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k).catch(() => false)));
    }
  } catch (e) {
    console.warn('[native] 清理 Service Worker 缓存失败', e);
  }
}

/** 隐藏原生启动图（Web 下无副作用） */
export async function hideSplash() {
  if (!isNative) return;
  try {
    await SplashScreen.hide();
  } catch (e) {
    console.warn('[native] hideSplash failed', e);
  }
}

/**
 * 同步系统栏图标明暗。
 *
 * 不用 @capacitor/status-bar：它通过已废弃的 systemUiVisibility 控制边到边，
 * 在 Android 15 上图标明暗会失效（表现为浅色主题下白底白图标、状态栏消失）。
 * 这里直接用 WindowInsetsControllerCompat 设置，行为在各版本一致。
 * 状态栏底色由页面顶栏自己绘制（顶栏已用 --safe-top 让出高度）。
 */
export async function syncStatusBar(theme: 'light' | 'dark') {
  if (!isNative) return;
  try {
    await SystemUi.setAppearance({ lightBackground: theme === 'light' });
  } catch (e) {
    console.warn('[native] syncStatusBar failed', e);
  }
}

/**
 * 监听硬件返回键。
 * 回调返回 true 表示"已消费该事件"（阻止默认退出），返回 false 则交给系统处理。
 */
export function onBackButton(handler: () => boolean) {
  if (!isNative) return () => {};
  let removed = false;
  const cleanup = { current: () => {} };
  CapApp.addListener('backButton', () => {
    handler();
  }).then((handle) => {
    if (removed) {
      handle.remove();
    } else {
      cleanup.current = () => handle.remove();
    }
  });
  return () => {
    removed = true;
    cleanup.current();
  };
}

/** 彻底退出应用 */
export function exitApp() {
  if (!isNative) return;
  CapApp.exitApp().catch(() => {});
}
