import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: './', // 添加这行，使资源路径变为相对路径
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        outDir: 'dist', // 明确指定输出目录
        assetsDir: 'assets', // 资源目录
        // 由构建脚本负责清空输出目录（见 scripts/build-apk.mjs 的 cleanDir）：
        // 打包环境对 Node 的批量删除有安全拦截，交给外部工具清理更稳妥，
        // 这里关闭 Vite 的自动清空避免二次删除与残留旧资源。
        emptyOutDir: false,
        rollupOptions: {
          output: {
            // 确保资源文件名一致
            entryFileNames: 'assets/[name].[hash].js',
            chunkFileNames: 'assets/[name].[hash].js',
            assetFileNames: 'assets/[name].[hash].[ext]'
          }
        }
      },
      plugins: [
        react(),
        // 打包 Android 时不生成 Service Worker：
        // 原生包内资源本就是本地的，SW 只会带来「更新后仍加载旧版本」的缓存问题。
        // 通过 VITE_TARGET=android 控制（见 scripts/build-apk.mjs）。
        VitePWA({
          disable: process.env.VITE_TARGET === 'android',
          registerType: 'autoUpdate',
          devOptions: {
            enabled: true
          },
          manifest: {
            name: '英语自学助手',
            short_name: '英语助手',
            description: '一款帮助学习英语的离线应用程序',
            theme_color: '#0ea5e9',
            background_color: '#f0f9ff',
            display: 'standalone',
            start_url: '.',
            // icon: './public/icon-192.png',
            icons: [
              {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png'
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});