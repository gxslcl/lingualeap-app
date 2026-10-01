import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lingualeap.app',
  appName: '英语自学助手',
  webDir: 'dist',
  // 使用 https 协议承载本地资源，WebView 才会把页面当作安全上下文
  // （Web Speech API 等能力在安全上下文下才稳定可用）
  android: {
    // androidScheme 在 @capacitor/cli 的 TS 类型里缺失，但运行时确实支持，故做一次断言
    androidScheme: 'https',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  } as CapacitorConfig['android'],
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#f0f9ff',
      showSpinner: false,
      splashFullScreen: false,
    },
    // 说明：不使用 @capacitor/status-bar。它依赖已废弃的 systemUiVisibility 控制边到边，
    // 在 Android 15 上会导致状态栏图标明暗失效；改由自有插件 SystemUiPlugin 控制。
    Keyboard: {
      resizeOnFullScreen: true,
    },
  },
};

export default config;
