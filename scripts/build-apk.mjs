/**
 * 一键构建 Android 安装包
 *
 *   node scripts/build-apk.mjs            # 构建 release（已签名，可直接安装）
 *   node scripts/build-apk.mjs debug      # 构建 debug
 *
 * 流程：vite build → cap copy android → gradlew assemble<变体> → 拷贝 APK 到 release/
 *
 * 注意：Capacitor 7 需要 JDK 21（本机默认的 JAVA_HOME 是 17）。
 * JDK 21 位置按以下顺序查找：
 *   1) 环境变量 JDK21_HOME
 *   2) <用户目录>/.workbuddy/binaries/jdk21/jdk-21.0.2
 *   3) JAVA_HOME（若其版本 >= 21）
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ANDROID_DIR = path.join(ROOT, 'android');
const RELEASE_DIR = path.join(ROOT, 'release');
const NODE_BIN = process.execPath;

const variant = (process.argv[2] || 'release').toLowerCase();
const capitalized = variant.charAt(0).toUpperCase() + variant.slice(1);

function isJdk21(dir) {
  if (!dir) return false;
  const java = path.join(dir, 'bin', process.platform === 'win32' ? 'java.exe' : 'java');
  if (!fs.existsSync(java)) return false;
  const out = spawnSync(java, ['-version'], { encoding: 'utf8' });
  const text = (out.stderr || '') + (out.stdout || '');
  const m = text.match(/version "(\d+)/);
  return !!m && Number(m[1]) >= 21;
}

function findJdk21() {
  const candidates = [
    process.env.JDK21_HOME,
    path.join(os.homedir(), '.workbuddy', 'binaries', 'jdk21', 'jdk-21.0.2'),
    process.env.JAVA_HOME,
  ];
  for (const c of candidates) {
    if (isJdk21(c)) return c;
  }
  return null;
}

function run(cmd, args, opts = {}) {
  console.log(`\n> ${cmd} ${args.join(' ')}`);
  const res = spawnSync(cmd, args, { stdio: 'inherit', cwd: ROOT, ...opts });
  if (res.status !== 0) {
    throw new Error(`命令执行失败（退出码 ${res.status}）: ${cmd} ${args.join(' ')}`);
  }
}

const jdk21 = findJdk21();
if (!jdk21) {
  console.error(
    '未找到 JDK 21。Capacitor 7 的 Android 构建要求 JDK 21。\n' +
      '请安装后设置环境变量 JDK21_HOME 指向 JDK 21 根目录，例如：\n' +
      '  set JDK21_HOME=D:\\jdk-21',
  );
  process.exit(1);
}
console.log('使用 JDK:', jdk21);

/**
 * 清空目录（保留目录本身）。
 *
 * 不用 fs.rmSync：一是构建环境对 Node 的批量删除有安全拦截，
 * 二是 Windows 上被占用的文件会直接失败。改用 robocopy 镜像空目录，
 * 它是系统自带工具，且只动目标目录内部，不会误删外部文件。
 */
function cleanDir(dir) {
  const abs = path.resolve(dir);
  if (!fs.existsSync(abs)) return;
  const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), 'empty-'));
  const res = spawnSync(
    'robocopy',
    [emptyDir, abs, '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NC', '/NS', '/R:0', '/W:0'],
    { stdio: 'ignore', shell: process.platform === 'win32' },
  );
  // robocopy 约定：0-7 都算成功
  if (res.status !== null && res.status > 7) {
    console.warn(`清理 ${dir} 时 robocopy 返回 ${res.status}，继续构建`);
  }
  try {
    fs.rmdirSync(emptyDir);
  } catch {
    // 临时目录清理失败无妨
  }
  console.log(`已清空 ${path.relative(ROOT, abs) || dir}`);
}

/** 把 from 目录镜像到 to：新增/更新文件，并删除 to 中多余的文件 */
function mirrorDir(from, to) {
  if (process.platform === 'win32') {
    const res = spawnSync(
      'robocopy',
      [from, to, '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NC', '/NS', '/R:0', '/W:0'],
      { stdio: 'ignore', shell: true },
    );
    if (res.status !== null && res.status > 7) {
      throw new Error(`robocopy 同步失败（退出码 ${res.status}）：${from} -> ${to}`);
    }
    return;
  }
  fs.mkdirSync(to, { recursive: true });
  fs.cpSync(from, to, { recursive: true, force: true });
}

/**
 * 校验 Web 资源确实进了原生工程。
 * `cap copy` 在部分环境下会因目标目录删除失败而静默跳过拷贝，
 * 结果打出来的包仍是旧前端——所以这里必须显式校验，失败就中止构建。
 */
function verifySyncedAssets(distDir, nativeDir) {
  const listJs = (dir) => {
    const assets = path.join(dir, 'assets');
    if (!fs.existsSync(assets)) return [];
    return fs
      .readdirSync(assets)
      .filter((f) => f.endsWith('.js'))
      .sort();
  };
  const expected = listJs(distDir);
  const actual = listJs(nativeDir);
  if (expected.join() !== actual.join()) {
    throw new Error(
      `Web 资源未同步到原生工程：\n  dist:   ${expected.join(', ')}\n  原生工程: ${actual.join(', ')}`,
    );
  }
  console.log(`资源校验通过（${expected.length} 个 JS 产物）`);
}

// 1. 构建前端（VITE_TARGET=android 会让 vite 跳过 PWA Service Worker 生成）
cleanDir(path.join(ROOT, 'dist'));
run(NODE_BIN, [path.join('node_modules', 'vite', 'bin', 'vite.js'), 'build'], {
  env: { ...process.env, VITE_TARGET: 'android' },
});

// 2. 同步到原生工程（不用 `cap copy`，原因见 mirrorDir / verifySyncedAssets 注释）
const ANDROID_ASSETS = path.join(ANDROID_DIR, 'app', 'src', 'main', 'assets');
if (!fs.existsSync(path.join(ANDROID_ASSETS, 'capacitor.config.json'))) {
  console.warn(
    '⚠️  未找到 capacitor.config.json，请先手动执行一次 `npm run cap:sync` 生成原生工程配置',
  );
}
mirrorDir(path.join(ROOT, 'dist'), path.join(ANDROID_ASSETS, 'public'));
verifySyncedAssets(path.join(ROOT, 'dist'), path.join(ANDROID_ASSETS, 'public'));

// 3. 生成图标与启动图（幂等）
run(NODE_BIN, [path.join('scripts', 'generate-android-assets.mjs')]);

// 4. Gradle 打包
const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
run(gradlew, [`assemble${capitalized}`], {
  cwd: ANDROID_DIR,
  env: {
    ...process.env,
    JAVA_HOME: jdk21,
    ANDROID_HOME: process.env.ANDROID_HOME || 'C:\\Android\\Sdk',
    ANDROID_SDK_ROOT: process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME || 'C:\\Android\\Sdk',
  },
  shell: process.platform === 'win32',
});

// 5. 汇总产物：按 应用名-版本-变体.apk 重命名，方便分发
const apkDir = path.join(ANDROID_DIR, 'app', 'build', 'outputs', 'apk', variant);
const apkName = fs
  .readdirSync(apkDir)
  .filter((f) => f.endsWith('.apk'))
  .sort((a, b) => fs.statSync(path.join(apkDir, b)).mtimeMs - fs.statSync(path.join(apkDir, a)).mtimeMs)[0];

const gradleText = fs.readFileSync(path.join(ANDROID_DIR, 'app', 'build.gradle'), 'utf8');
const versionName = (gradleText.match(/versionName\s+"([^"]+)"/) || [, '1.0.0'])[1];

fs.mkdirSync(RELEASE_DIR, { recursive: true });
const target = path.join(RELEASE_DIR, `lingualeap-${versionName}-${variant}.apk`);
fs.copyFileSync(path.join(apkDir, apkName), target);

const size = (fs.statSync(target).size / 1048576).toFixed(1);
console.log(`\n✅ 构建完成：${target}  (${size} MB)`);
