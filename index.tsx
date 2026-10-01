// ⚠️ 必须最先导入：在原生容器中把 Web Speech API 桥接到 Android 系统 TTS，
// ttsService 会在模块初始化时读取 window.speechSynthesis，顺序不能调整。
import "./src/ttsBridge";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 本地构建的主题样式（取代原 CDN 版 Tailwind，保证离线可用）
import "./src/index.css";

// 引入单词检查器
import {
  checkMissingWords,
  checkMissingSentences,
} from "./services/wordChecker";

// 首帧之前先套用主题，避免暗色模式启动时白闪
try {
  const raw = localStorage.getItem("lingualeap_settings");
  const themeMode: string = raw ? JSON.parse(raw).themeMode || "auto" : "auto";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = themeMode === "dark" || (themeMode === "auto" && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
} catch {
  // 首次启动或存储损坏时忽略，交给 App 内的主题逻辑处理
}

// 渲染应用程序
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// 执行单词检查
// checkMissingWords();
// checkMissingSentences();
