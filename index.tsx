import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 引入单词检查器
// import { checkMissingWords } from './services/wordChecker';

// 渲染应用程序
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// 执行单词检查
// checkMissingWords();