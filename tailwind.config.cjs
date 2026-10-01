/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // 音标（IPA Extensions，如 /aɪ/ 的 ɪ）在安卓的等宽字体里缺字形会显示成方框，
        // 因此在 monospace 之前插入有 IPA 覆盖的 Noto Sans 作为回退。
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          '"Noto Sans"',
          '"Droid Sans Fallback"',
          'monospace',
        ],
      },
      colors: {
        // 完整的 sky 色阶：之前只定义了 50/100/500/600/900，
        // 代码里用到的 brand-200/300/400/700 不会被 Tailwind 生成，
        // 导致渐变、浅色边框、深色模式强调色等样式静默失效。
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      animation: {
        'bounce-short': 'bounce 0.5s ease-in-out 1',
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
};
