/**
 * 生成 Android 图标与启动图（纯 Node 实现，不依赖 sharp / canvas）
 *
 * 源图：public/icon-512.png（200x200 RGBA）
 * 产出（目录中的星号代表各密度后缀 mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi）：
 *   android/app/src/main/res/mipmap-xxx/ic_launcher.png        传统方形图标
 *   android/app/src/main/res/mipmap-xxx/ic_launcher_round.png  圆形图标
 *   android/app/src/main/res/mipmap-xxx/ic_launcher_foreground.png  自适应图标前景层
 *   android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml    自适应图标描述
 *   android/app/src/main/res/values/ic_launcher_background.xml    自适应图标背景色
 *   android/app/src/main/res/drawable-xxx/splash.png           启动图
 *
 * 用法：node scripts/generate-android-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RES = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');
const SRC_ICON = path.join(ROOT, 'public', 'icon-512.png');

// ---------- 基础 PNG 编解码 ----------
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function decodePNG(file) {
  const buf = fs.readFileSync(file);
  let offset = 8; // skip signature
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];
  let palette = null;
  let trns = null;

  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error('不支持隔行扫描 PNG');
    } else if (type === 'PLTE') {
      palette = Buffer.from(data);
    } else if (type === 'tRNS') {
      trns = Buffer.from(data);
    } else if (type === 'IDAT') {
      idat.push(Buffer.from(data));
    } else if (type === 'IEND') {
      break;
    }
    offset += 12 + len;
  }

  if (bitDepth !== 8) throw new Error('仅支持 8 位 PNG，实际 ' + bitDepth);
  const raw = zlib.inflateSync(Buffer.concat(idat));

  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error('不支持的 colorType ' + colorType);
  const stride = width * channels;
  const out = Buffer.alloc(width * height * 4);
  const line = Buffer.alloc(stride);
  const prev = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    raw.copy(line, 0, y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? line[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let v = line[i];
      switch (filter) {
        case 0:
          break;
        case 1:
          v = v + a;
          break;
        case 2:
          v = v + b;
          break;
        case 3:
          v = v + ((a + b) >> 1);
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          v = v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default:
          throw new Error('未知过滤器 ' + filter);
      }
      line[i] = v & 0xff;
    }

    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * 4;
      const s = x * channels;
      if (colorType === 6) {
        out[o] = line[s];
        out[o + 1] = line[s + 1];
        out[o + 2] = line[s + 2];
        out[o + 3] = line[s + 3];
      } else if (colorType === 2) {
        out[o] = line[s];
        out[o + 1] = line[s + 1];
        out[o + 2] = line[s + 2];
        out[o + 3] = 255;
      } else if (colorType === 0) {
        out[o] = out[o + 1] = out[o + 2] = line[s];
        out[o + 3] = 255;
      } else if (colorType === 4) {
        out[o] = out[o + 1] = out[o + 2] = line[s];
        out[o + 3] = line[s + 1];
      } else if (colorType === 3) {
        const idx = line[s];
        out[o] = palette[idx * 3];
        out[o + 1] = palette[idx * 3 + 1];
        out[o + 2] = palette[idx * 3 + 2];
        out[o + 3] = trns && idx < trns.length ? trns[idx] : 255;
      }
    }
    line.copy(prev);
  }

  return { width, height, data: out };
}

function encodePNG(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------- 画布 / 缩放 / 合成 ----------
function createCanvas(width, height, bg) {
  const data = Buffer.alloc(width * height * 4);
  if (bg) {
    for (let i = 0; i < width * height; i++) {
      data[i * 4] = bg[0];
      data[i * 4 + 1] = bg[1];
      data[i * 4 + 2] = bg[2];
      data[i * 4 + 3] = bg[3] ?? 255;
    }
  }
  return { width, height, data };
}

/** 双线性缩放（预乘 alpha，避免边缘发黑） */
function resize(src, dw, dh) {
  if (src.width === dw && src.height === dh) return { width: dw, height: dh, data: Buffer.from(src.data) };
  const out = createCanvas(dw, dh, null);
  const sx = src.width / dw;
  const sy = src.height / dh;

  const sample = (x, y) => {
    const cx = Math.min(src.width - 1, Math.max(0, x));
    const cy = Math.min(src.height - 1, Math.max(0, y));
    const o = (cy * src.width + cx) * 4;
    const a = src.data[o + 3] / 255;
    return [src.data[o] * a, src.data[o + 1] * a, src.data[o + 2] * a, a];
  };

  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const fx = (x + 0.5) * sx - 0.5;
      const fy = (y + 0.5) * sy - 0.5;
      const x0 = Math.floor(fx);
      const y0 = Math.floor(fy);
      const tx = fx - x0;
      const ty = fy - y0;
      const p00 = sample(x0, y0);
      const p10 = sample(x0 + 1, y0);
      const p01 = sample(x0, y0 + 1);
      const p11 = sample(x0 + 1, y0 + 1);
      const mix = (i) =>
        p00[i] * (1 - tx) * (1 - ty) +
        p10[i] * tx * (1 - ty) +
        p01[i] * (1 - tx) * ty +
        p11[i] * tx * ty;
      const a = mix(3);
      const o = (y * dw + x) * 4;
      if (a > 0.0001) {
        out.data[o] = Math.round(mix(0) / a);
        out.data[o + 1] = Math.round(mix(1) / a);
        out.data[o + 2] = Math.round(mix(2) / a);
      }
      out.data[o + 3] = Math.round(a * 255);
    }
  }
  return out;
}

/** 把 src 按 alpha 合成到 dst 的 (dx,dy) 处，尺寸为 w×h */
function drawImage(dst, src, dx, dy, w, h) {
  const scaled = resize(src, w, h);
  for (let y = 0; y < h; y++) {
    const ty = dy + y;
    if (ty < 0 || ty >= dst.height) continue;
    for (let x = 0; x < w; x++) {
      const tx = dx + x;
      if (tx < 0 || tx >= dst.width) continue;
      const s = (y * w + x) * 4;
      const d = (ty * dst.width + tx) * 4;
      const sa = scaled.data[s + 3] / 255;
      if (sa <= 0) continue;
      const da = dst.data[d + 3] / 255;
      const oa = sa + da * (1 - sa);
      if (oa <= 0) continue;
      for (let i = 0; i < 3; i++) {
        dst.data[d + i] = Math.round(
          (scaled.data[s + i] * sa + dst.data[d + i] * da * (1 - sa)) / oa,
        );
      }
      dst.data[d + 3] = Math.round(oa * 255);
    }
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, canvas) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, encodePNG(canvas.width, canvas.height, canvas.data));
}

// ---------- 主流程 ----------
const BRAND_BG = [240, 249, 255]; // #f0f9ff
const ADAPTIVE_BG = '#F0F9FF';

function main() {
  if (!fs.existsSync(SRC_ICON)) throw new Error('找不到源图标：' + SRC_ICON);
  if (!fs.existsSync(RES)) throw new Error('找不到 Android 资源目录，请先执行 cap add android：' + RES);

  const icon = decodePNG(SRC_ICON);
  console.log(`源图 ${icon.width}x${icon.height}`);

  // 各密度图标尺寸（launcher icon = 48dp）
  const densities = [
    ['mdpi', 48],
    ['hdpi', 72],
    ['xhdpi', 96],
    ['xxhdpi', 144],
    ['xxxhdpi', 192],
  ];

  for (const [density, size] of densities) {
    const dir = path.join(RES, `mipmap-${density}`);
    // 传统图标（透明背景）
    const legacy = createCanvas(size, size, null);
    drawImage(legacy, icon, 0, 0, size, size);
    write(path.join(dir, 'ic_launcher.png'), legacy);
    write(path.join(dir, 'ic_launcher_round.png'), legacy);

    // 自适应图标前景层：108dp 画布，内容缩到约 60% 以避开裁切安全区
    const fgSize = Math.round((size * 108) / 48);
    const contentSize = Math.round(fgSize * 0.6);
    const fg = createCanvas(fgSize, fgSize, null);
    const offset = Math.round((fgSize - contentSize) / 2);
    drawImage(fg, icon, offset, offset, contentSize, contentSize);
    write(path.join(dir, 'ic_launcher_foreground.png'), fg);
  }

  // 自适应图标描述文件
  const anydpi = path.join(RES, 'mipmap-anydpi-v26');
  ensureDir(anydpi);
  const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
</adaptive-icon>
`;
  fs.writeFileSync(path.join(anydpi, 'ic_launcher.xml'), adaptiveXml);
  fs.writeFileSync(path.join(anydpi, 'ic_launcher_round.xml'), adaptiveXml);
  fs.writeFileSync(
    path.join(RES, 'values', 'ic_launcher_background.xml'),
    `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">${ADAPTIVE_BG}</color>
</resources>
`,
  );

  // 启动图：为每个 drawable-* 目录按原有尺寸重绘（深浅色屏幕、横竖屏分别适配），
  // 保持 Capacitor 模板的尺寸约定，避免拉伸变形。
  const splashDirs = fs
    .readdirSync(RES)
    .filter((d) => d === 'drawable' || d.startsWith('drawable-'))
    .filter((d) => fs.existsSync(path.join(RES, d, 'splash.png')));

  const splashInfo = [];
  for (const dir of splashDirs) {
    const target = path.join(RES, dir, 'splash.png');
    const original = decodePNG(target);
    const w = original.width;
    const h = original.height;
    const splash = createCanvas(w, h, BRAND_BG);
    const logoSize = Math.round(Math.min(w, h) * 0.22);
    drawImage(
      splash,
      icon,
      Math.round((w - logoSize) / 2),
      Math.round((h - logoSize) / 2),
      logoSize,
      logoSize,
    );
    write(target, splash);
    splashInfo.push(`${dir} ${w}x${h}`);
  }

  console.log('已生成图标与启动图：');
  console.log('  mipmap-*  ic_launcher / ic_launcher_round / ic_launcher_foreground');
  console.log('  splash    ' + splashInfo.join(', '));
}

main();
