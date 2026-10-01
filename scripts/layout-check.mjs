/**
 * 响应式布局自检脚本（开发辅助，不参与打包）
 *
 * 通过 Chrome DevTools Protocol 在手机 / 平板 / 桌面三种视口下打开页面，
 * 输出关键布局指标（视口、文档宽度、是否横向溢出、导航渲染情况），并截图。
 *
 * 用法：
 *   1) 先启动本地服务： npm run preview  （或 vite preview --port 4173）
 *   2) node scripts/layout-check.mjs [url]
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, '.shots');
const URL_TARGET = process.argv[2] || 'http://127.0.0.1:4173/';
const PORT = 9333;

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];

const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844, mobile: true, label: '手机 390x844' },
  { name: 'phone-landscape', width: 844, height: 390, mobile: true, label: '手机横屏 844x390' },
  { name: 'tablet-portrait', width: 800, height: 1280, mobile: true, label: '平板竖屏 800x1280' },
  { name: 'tablet-landscape', width: 1280, height: 800, mobile: true, label: '平板横屏 1280x800' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  for (const c of CHROME_CANDIDATES) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error('未找到 Chrome / Edge');
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error('CDP 超时: ' + method));
        }
      }, 30000);
    });
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const chrome = findChrome();
  const userDataDir = path.join(process.env.TEMP || '.', 'chrome-layout-check');
  const child = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--hide-scrollbars',
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  let wsUrl = null;
  for (let i = 0; i < 40 && !wsUrl; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page) wsUrl = page.webSocketDebuggerUrl;
    } catch {
      // 等待 Chrome 就绪
    }
  }
  if (!wsUrl) throw new Error('无法连接 Chrome 调试端口');

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });
  const cdp = new CDP(ws);

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');

  const report = [];

  for (const vp of VIEWPORTS) {
    cdp.events.length = 0;
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.mobile,
    });
    await cdp.send('Page.navigate', { url: URL_TARGET });
    await sleep(3500);

    const { result } = await cdp.send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const de = document.documentElement;
        const nav = document.querySelector('nav');
        const buttons = nav ? nav.querySelectorAll('button').length : 0;
        return {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          scrollWidth: de.scrollWidth,
          overflowX: de.scrollWidth - de.clientWidth,
          rootChildren: document.getElementById('root').children.length,
          navButtons: buttons,
          navText: nav ? nav.innerText.replace(/\\n/g, '/') : null,
          headerHeight: (document.querySelector('header')||{getBoundingClientRect:()=>({height:0})}).getBoundingClientRect().height,
          bodyBg: getComputedStyle(document.body).backgroundColor,
        };
      })()`,
    });

    const errors = cdp.events
      .filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params.entry.level === 'error'))
      .map((e) =>
        e.method === 'Runtime.exceptionThrown'
          ? e.params.exceptionDetails.text + ' ' + (e.params.exceptionDetails.exception?.description || '')
          : e.params.entry.text,
      );

    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, `${vp.name}.png`), Buffer.from(shot.data, 'base64'));

    report.push({ viewport: vp.label, ...result.value, errors });
  }

  console.log(JSON.stringify(report, null, 2));

  ws.close();
  child.kill();
  await sleep(500);
}

main().catch((e) => {
  console.error('布局自检失败:', e.message);
  process.exit(1);
});
