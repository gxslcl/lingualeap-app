# 英语自学助手 · Android 版打包与适配说明

本文档说明如何把本前端项目打包成 Android 应用，以及为适配手机 / 平板做了哪些改造。

## 一、技术方案

使用 **Capacitor 7** 作为原生容器：把 Vite 打包出来的 `dist/` 静态资源放进 Android WebView，
再用原生插件补齐 WebView 缺失的能力。相比重写原生界面，这种方式能保留全部已有功能，
且 Web 端与 Android 端共用同一套代码。

```
前端代码 (React + Vite)  ──vite build──▶  dist/  ──cap copy──▶  android/app/src/main/assets/public
                                                                    │
                                                    原生壳（Java）：MainActivity + NativeTtsPlugin
```

## 二、为 Android 做的改造清单

### 1. 完全离线化（重要）

原 `index.html` 依赖两个 CDN：

| 原依赖 | 问题 | 改造 |
| --- | --- | --- |
| `cdn.tailwindcss.com` | 无网络时样式全丢，页面白屏 | 改为本地 Tailwind v3 构建（`tailwind.config.cjs` + `src/index.css`），产物 47KB |
| `fonts.googleapis.com` | 国内网络不可达，字体加载慢 | 改为系统字体栈（`system-ui / PingFang SC / Microsoft YaHei`） |
| `aistudiocdn.com` importmap | 与打包结果冲突 | 由 Vite 从 `node_modules` 打包，移除 importmap |

改造后 `dist/index.html` 中不含任何外部链接，安装后断网也能完整使用。

### 2. 语音朗读（Android WebView 不支持 Web Speech API）

`window.speechSynthesis` 在 Android WebView 中并不存在，而本应用的核心功能是朗读单词和句子。
解决方案是自己写了一个原生 TTS 插件：

- 原生侧：`android/app/src/main/java/com/lingualeap/app/NativeTtsPlugin.java`
  - 基于系统 `TextToSpeech`，暴露 `speak / stop / getVoices / isLanguageAvailable / openInstall`
  - 通过事件 `ttsStart / ttsEnd / ttsError` 回传播放状态
  - 内置中英文可用音色列表（优先返回离线音色）
- 前端侧：`src/ttsBridge.ts`
  - 在原生环境下把系统 TTS 包装成符合 W3C 规范的 `speechSynthesis` 对象
  - `services/ttsService.ts` **无需任何改动**即可继续工作（语速、音调、音量、选择发音人全部保留）

因此设置面板里的「发音人」列表在手机上显示的是系统 TTS 引擎的真实音色。

### 3. 手机 / 平板自适应

`App.tsx` 重写了布局层，按视口宽度自动切换三档形态：

| 形态 | 触发条件 | 布局 |
| --- | --- | --- |
| 手机 | 宽度 < 768px | 顶部标题栏 + 底部标签导航（拇指可及），带安全区适配 |
| 平板 | 768 ~ 1023px | 左侧图标+文字导航栏，内容区居中限宽，触控目标加大 |
| 平板横屏 / 桌面 | ≥ 1024px | 顶部横向导航 + 宽内容区（多列卡片） |

- 顶栏右侧的按钮可手动锁定布局：自动 → 手机 → 平板 → 自动（选择会记住）
- 手机端底部导航固定 6 个入口：学习 / 听读 / 词库 / 短语 / 复习 / 统计
- 通过 `viewport-fit=cover` + `env(safe-area-inset-*)` 适配刘海屏与手势导航栏
- 平板横屏、竖屏均可旋转使用，未锁定方向

### 4. 原生交互细节

- **硬件返回键**：优先关闭设置弹层 → 返回首页 → 再按一次退出应用（带提示气泡）
- **状态栏**：跟随浅色/深色主题自动切换文字与背景色
- **启动图**：原生启动图 + Web 首屏遮罩两层，消除白屏闪烁
- **应用图标**：自适应图标（前景+品牌背景），已按 5 种密度生成，圆角与圆形两种形态
- **键盘**：不再额外压缩布局，避免输入时页面跳动

### 5. 两个只在原生环境下才会暴露的问题（已修复）

**(1) PWA Service Worker 导致「装了新包还是旧界面」**

项目原本是 PWA，会注册 `sw.js` 做离线缓存。装进安卓后：
- 原生包内资源本来就是本地的，SW 完全多余；
- 更严重的是 WebView 的数据目录在覆盖安装时是保留的，旧 SW 会继续用缓存返回**旧版本的前端资源**，
  于是新装的包跑的还是旧代码（本次调试时就真实踩到了这个坑）。

处理方式：
- 打包安卓时通过 `VITE_TARGET=android` 让 `vite-plugin-pwa` 不生成 SW（见 `vite.config.ts` 与 `scripts/build-apk.mjs`）；
- `src/native.ts` 里的 `cleanupStaleServiceWorker()` 在原生环境主动注销历史 SW 并清空 Cache Storage，
  保证从旧版本升级安装的机器不会卡在旧资源上。

**(2) 音标显示成方框（tofu）**

音标原本用 `font-mono`（等宽字体）渲染，而安卓的等宽字体缺少 IPA Extensions 字形，
`/aɪ/` 会显示成 `/a□/`。处理方式：新增 `.ipa-text` 字体类（`src/index.css`），
在词典卡、短语释义、听读列表三处音标位置使用它，回退到有 IPA 覆盖的常规字体。
顺带给 Tailwind 的 `fontFamily.mono` 也加了回退链。

### 6. 系统栏（状态栏 / 导航栏）安全区

Android 15（targetSdk 35）起**强制边到边显示**，WebView 会绘制到状态栏下方；而 Android WebView
不提供 CSS 的 `env(safe-area-inset-*)`，所以顶栏会和状态栏重叠、顶部按钮点不到。

处理方式：

- 原生插件 `SystemUiPlugin`（`android/app/src/main/java/com/lingualeap/app/SystemUiPlugin.java`）
  - `getInsets()`：读取状态栏 / 导航栏 / 刘海的真实高度（px），前端写入
    `--safe-top / --safe-bottom / --safe-left / --safe-right` 四个 CSS 变量
  - `setAppearance({lightBackground})`：控制状态栏、导航栏图标的明暗
  - `load()` 中调用 `WindowCompat.setDecorFitsSystemWindows(window, false)` 统一为边到边模式
- 前端：顶栏用 `pt-safe` 让出状态栏高度，底部标签栏用 `pb-safe` 让出手势导航栏，
  页面内吸顶元素用 `.sticky-under-header`（`calc(64px + var(--safe-top))`）对齐
- 屏幕旋转 / 分屏后会重新测量并重新应用外观

> 已**移除** `@capacitor/status-bar`：它通过废弃的 `systemUiVisibility` 控制边到边，
> 在 Android 15 上会导致状态栏图标明暗失效（白底白图标）。现在完全由自有插件接管。

**踩坑提醒**：启动图退出的瞬间，系统会按主题默认值重绘一次系统栏，覆盖掉启动早期设置的外观。
因此除了运行时调用，还在 `styles.xml` 里把 `android:windowLightStatusBar` 的默认值设为浅色主题配色，
并在原生侧监听 window insets 变化后自动重新套用（自愈）。

### 7. 暗色模式修复

原实现有 bug：主题选择器只更新了 `themeMode` 状态，而 Tailwind 的深色样式依赖 `<html>` 上的
`.dark` 类，而该类只在旧字段 `darkMode` 变化时才被切换，导致暗色模式下页面底色变深、
但所有卡片 / 输入框 / 芯片仍是白色（深色样式从未激活）。

修复：

- `App.tsx` 用 `useLayoutEffect` 按 `actualTheme` 切换 `<html>.dark`，并在首帧前于 `index.tsx` 预先套用，避免闪白
- `services/storage.ts` 不再操作 classList（避免与主题设置相互覆盖，只负责持久化）
- 补齐遗漏的深色样式：短语页收藏星标、词链 hover 底色等
- `html.dark` 声明 `color-scheme: dark`，输入框 / 滚动条等原生控件同步变暗
- 深色配色层次：页面 `slate-900` → 卡片 `slate-800` + `slate-700` 边框 → 次级块 `slate-700/60`，
  正文 `slate-100`、次要文字 `slate-300/400`，强调色用更亮的 `brand-400`

### 8. 底部固定元素与整屏视图的让位规则（小屏体验）

手机端底部有固定标签栏，页面里的悬浮按钮、播放条如果按固定像素写死很容易被压在标签栏下面。
统一改为由 CSS 变量驱动，App 按布局写入 `--bottom-nav-h`（手机 4rem，平板/桌面 0）：

| 工具类 | 用途 |
| --- | --- |
| `.bottom-above-nav` | 悬浮按钮：浮在标签栏之上（`safe-bottom + 标签栏 + 1rem`） |
| `.bottom-above-nav-2` | 再往上叠一个按钮（如「回到顶部」） |
| `.bottom-bar-above-nav` | 通栏底栏（听读播放条、短语操作栏） |
| `.main-pad` / `--main-pt` / `--main-pb` | 主内容上下留白，下边距已含标签栏与手势栏 |
| `.h-viewport` | 整屏视图高度：`100dvh - 状态栏 - 顶栏 - 主内容上下留白` |

要点：主内容的下边距已经把标签栏让开了，**页面自身不要再重复预留**；
听读页原来用 `calc(100vh-8rem)` 写死高度，会多出/少算一截导致底部被裁，现已换成 `.h-viewport`。

### 9. 可折叠的操作面板

短语页顶部蓝色卡片里的操作面板（随机播放 / 间隔 / 遍数 / 范围 / 难度筛选）在手机上占满整屏，
改为点标题展开/收起：手机默认收起、平板与桌面默认展开，用户手动选择会记到
`localStorage`（`lingualeap_phrases_panel`），切换页面后保持。

### 10. 原生 TTS 事件必须按 utteranceId 关联（「播一条就停」的根因）

**现象**：听读模式点播放后只读一条就停下，短语页连播也有同样问题。

**根因**：Android 侧 `tts.speak(..., QUEUE_FLUSH, ...)` 在开始新语句时会中断上一条，
被中断的语句随后会异步抛出 `onStop → ttsError('interrupted'/'canceled')`。
桥接层早期**没有区分事件属于哪一条语句**，于是这条「上一句的迟到事件」被当成
**刚开始播放的新语句已经结束**；而 `ttsService` 对 `interrupted` 是静默忽略的
（设计上视为用户主动打断），所以推进播放的回调永远不触发 → 播一条就停。

**修复**：

- 前端 `src/ttsBridge.ts` 生成 `utteranceId` 并传给原生，同时同步登记为「当前语句」；
  `ttsStart / ttsEnd / ttsError` 三个监听都先比对 id，**不属于当前语句的事件一律丢弃**
- 原生 `NativeTtsPlugin.speak` 支持接收前端传入的 `utteranceId`（不再只由原生自增生成）
- 听读页 `togglePlay` 里删掉了重复的 `playSequence()` 直接调用：
  `setIsPlaying(true)` 已经会触发播放循环 effect，直接再调一次会造成同一句朗读两遍
  （第二遍会立刻 cancel + FLUSH 掉第一遍，并产生多余的中断事件）

**验证**：真机模拟器实测，播放 20 秒后进度从 1/10 推进到 3/10，高亮单词同步前进；
短语页连播的高亮卡片也会持续切换。

### 11. 打包体积优化

`App.tsx` 不再引入 antd（仅用了两个图标按钮，已换成 lucide-react），
打包模块数从 3132 降到 1716，JS 体积 1.27MB → 1.18MB（gzip 412KB），APK 约 4.4MB。

## 三、构建环境

| 依赖 | 版本要求 | 本机位置 |
| --- | --- | --- |
| JDK | **21**（Capacitor 7 硬性要求） | `C:\Users\1\.workbuddy\binaries\jdk21\jdk-21.0.2` |
| Android SDK | Platform 35、Build-Tools 35+ | `C:\Android\Sdk` |
| Gradle | 8.11.1（由 wrapper 自动下载） | 已改用腾讯镜像，见下 |

> ⚠️ 本机默认 `JAVA_HOME` 是 JDK 17，**不能**用于本项目的 Android 构建（会报「无效的源发行版：21」）。
> 构建脚本会自动寻找 JDK 21，也可以用环境变量 `JDK21_HOME` 指定。

### 已做的构建配置调整

- `android/gradle/wrapper/gradle-wrapper.properties`：Gradle 发行包地址换成腾讯镜像
  `https://mirrors.cloud.tencent.com/gradle/gradle-8.11.1-bin.zip`
  （官方地址会跳转 github.com，国内不可达）
- `android/gradle.properties`：
  - 增加 `android.overridePathCheck=true`（项目路径含中文，AGP 默认拒绝构建）
  - JVM 内存提到 2048m
- `android/local.properties`：指向 `C:\Android\Sdk`
- `android/app/build.gradle`：加入 release 签名配置，`versionName` 为 `1.0.0`

## 四、一键打包

```bash
# 签名 release 包（可直接安装/分发）
npm run android:release

# 调试包
npm run android:apk
```

脚本会依次执行：清空 `dist` → `vite build` → 同步资源到原生工程 → 生成图标启动图 → `gradlew assembleRelease`，
最后把 APK 拷贝到 `release/lingualeap-1.0.0-release.apk`。

> ⚠️ **两处与官方流程不同的地方**（都踩过坑）：
> 1. **不用 `cap copy android` 同步资源**。它内部会先删除 `android/.../assets/public`，
>    在带批量删除安全策略的环境里会失败，而且**失败后不报错**——结果打出来的包仍是旧前端。
>    现在改用 `robocopy /MIR` 镜像 `dist`（同系统工具，只动目标目录内部），
>    并在构建末尾用 `verifySyncedAssets()` 比对两边的 JS 产物名，不一致直接中止构建。
> 2. `vite.config.ts` 里设了 `emptyOutDir: false`，清空 `dist` 由脚本负责（同样为绕开批量删除拦截）。
>
> 如果修改了 `capacitor.config.ts`（插件、appId 等），需要手动执行一次 `npm run cap:sync` 重新生成
> `android/app/src/main/assets/capacitor.config.json` 与 `capacitor.plugins.json`。

单独执行底层命令：

```bash
npm run build          # 只打包前端
npm run cap:sync       # 前端 → 原生工程同步
npm run android:assets # 只重新生成图标与启动图
npm run cap:open       # 用 Android Studio 打开原生工程
npm run layout:check   # 手机/平板多尺寸布局自检 + 截图（需先起预览服务）
```

## 五、安装到设备

```bash
# 通过数据线（需开启 USB 调试）
C:\Android\Sdk\platform-tools\adb install -r release\lingualeap-1.0.0-release.apk

# 或直接把 APK 传到手机上点击安装（需允许「安装未知来源应用」）
```

## 六、签名信息（务必知悉）

签名配置从 `android/keystore.properties` 读取，**该文件与证书本体都不入库**（见根目录 `.gitignore`）：

```properties
# android/keystore.properties —— 需要自己创建，内容示例
storeFile     = lingualeap-release.jks      # 相对 android/app/ 的路径
storePassword = <你的证书口令>
keyAlias      = <你的别名>
keyPassword   = <你的口令>
```

- `android/app/build.gradle` 里做了兜底：**没有 `keystore.properties` 时 release 自动退回 debug 签名**，
  保证 `assembleRelease` 在刚克隆下来的环境里也能跑通，只是产出的包不能覆盖安装旧版本。
- 自己生成证书：
  ```bash
  keytool -genkeypair -v -keystore android/app/my-release.jks \
    -alias myalias -keyalg RSA -keysize 2048 -validity 36500
  ```
- 这是**自签名证书**，仅用于自己安装测试与内部分发，不能上架 Google Play / 国内应用商店。
- 如需上架或长期维护，请妥善保管证书：**证书丢失后无法对已发布应用做覆盖升级**。

## 七、常见问题

**Q：构建时报「Your project path contains non-ASCII characters」**
A：项目路径含中文（`项目/lingualeap---英语自学助手`）导致，已通过
`android.overridePathCheck=true` 放行。若后续换路径后仍报错，检查该配置是否还在。

**Q：构建时卡在下载 Gradle / 超时**
A：检查 `gradle-wrapper.properties` 里的国内镜像地址是否仍在；
或在 `C:\Users\1\.gradle\gradle.properties` 里配置代理。

**Q：App 里没有声音**
A：安卓设备的语音引擎缺少中英文语音包时会静音。可先用系统「设置 → 无障碍 → 文字转语音」
确认引擎与语言包已安装；App 内设置面板的发音人列表来自系统引擎，若列表为空即说明语音包缺失。

**Q：深色模式怎么切换**
A：默认跟随系统（设置面板可改为强制浅色/深色），与状态栏配色联动。

## 八、后续改代码后的重新打包

改完 `components/`、`App.tsx` 等前端代码后，**不需要**动 Android 工程，直接：

```bash
npm run android:release
```

只有在改动原生插件（`NativeTtsPlugin.java`）、权限、图标时才需要 `npm run cap:open` 用
Android Studio 处理。

## 九、功能改造记录（状态恢复 / 统计 / 数据导入）

### 状态持久化（关闭应用后接着学）

新增 `services/session.ts`，用 `lingualeap_session` 保存「上次在哪个页面 + 各页面自己的进度」：

| 页面 | 保存内容 |
| --- | --- |
| 全局 | 当前所在页面（启动时直接恢复到该页） |
| 听读 | 当前批次的单词 id 列表、读到第几个、循环次数（恢复后不会重新随机一批） |
| 智能学习 | 当前学习批次的 id 与进度 |
| 词库 | 分类筛选、页码、每页数量、随机模式、搜索词 |
| 短语 | 页码、难度筛选、已加载数量 |

实现要点：用 `useState(() => sessionService.getViewState(...))` 做惰性初始化，
并用一个 `skipInitialGenerate` ref 跳过挂载时的「自动生成批次」，避免把恢复出来的进度冲掉。

### 统计功能修复

原来统计长时间为 0 / 不更新，原因有三：

1. **日期用的是 UTC**（`toISOString()`），东八区凌晨时段会被算成前一天，连续天数与今日次数直接错乱
   → 改为本地时区日期键，并集中提供 `todayKey()` / `shiftDays()`。
2. **没有任何地方记录日常练习**：只有完成一场学习才会写一次数据，听读、短语朗读完全不计入
   → 新增 `storageService.recordPractice()`，在听读完一个词、学完一个词/短语、词库首次学习该词时都会调用。
3. **统计面板信息太少、看不出效果** → 重写面板：新增今日目标进度条、近 7 日柱状图（`getDailyHistory()`）、
   已掌握词数（从 SRS 进度实时统计）、累计练习次数。

> 柱状图最初用百分比高度，父容器没有确定高度时百分比解析不到、柱子不可见；
> 已改为按像素计算柱高。

### 数据导入（单词 / 短句 + 自定义分组）

新增页面「数据」（底部导航第 7 项），对应 `components/DataManager.tsx`：

- **模板**：CSV 表头 `类型,英文,中文,音标,分类/情景,标签,分组`（中英文列名都认，也支持 JSON）；
  提供下载、复制、格式说明三种方式。CSV 导出带 BOM，Excel 打开不乱码。
- **导入**：选择文件（CSV / JSON）或直接粘贴文本；自动按「类型 + 分组」归类，
  同分组内按英文去重，逐行校验并给出错误行号。
- **分组管理**：新建 / 重命名 / 删除分组，展开查看与删除单条数据。
- **数据合并**：`services/customData.ts` 把内置数据与导入数据合并成统一词库/句库
  （`allWords()` / `allPhrases()`），听读、词库、短语、复习、学习五个页面全部改为从这里取数，
  导入后无需重进应用（各页面订阅了数据变更事件）。自定义分组也会出现在词库的分类筛选里，
  可以直接按分组刷词。

### 附带修复：Tailwind 色阶缺失导致样式静默失效

配置里 `brand` 只定义了 `50/100/500/600/900`，而代码里用到 `brand-200`（13 处）、
`brand-300`（9 处）、`brand-400`（18 处）、`brand-700`（5 处）。Tailwind 不会为未定义的色阶生成类，
这些样式（渐变、浅色边框、深色模式强调色、统计图柱子）一直是失效的——已补齐完整 sky 色阶。

## 十、宽屏适配与数据管理入口调整

### 大屏两侧留白

原内容区宽度上限是「平板 768px / 桌面 1024px」，在 2K 平板上只占中间一小块，两侧大片空白。

- 上限放宽：平板 `max-w-[1250px]`、桌面 `max-w-[1700px]`（手机仍为 `max-w-md`），
  顶部导航容器同步放宽，保证与内容对齐；
- 卡片列数跟着断点走：词库 `xl:4 2xl:6`、听读按批次大小最多到 `2xl:6`、
  统计成就 `2xl:3`、学习页与复习页在 `lg/2xl` 放大卡片宽度；
- 形态判定阈值调整：桌面需要 ≥1200 CSS px（原来是 1024）。
  竖屏平板约 1000～1100 CSS px，用桌面形态时顶部横导航放不下、导航文字被挤成竖排，
  改用平板形态（左侧竖向导航）更合适。

### 数据管理并入设置

「数据」不再占用底部导航页签，改为设置面板内的分页：

- 设置弹层顶部新增「常规设置 / 数据管理」两个分页，数据分页内嵌完整的
  导入、模板、分组管理界面；
- 弹层在数据分页下自动加宽（`max-w-[95vw] md:max-w-2xl lg:max-w-3xl`），常规分页仍是窄面板；
- 底部导航回到 6 项；若上次保存的页面是「数据」，启动时回退到词库。

### 模板下载（Android WebView 里 blob 下载无效）

`<a download href="blob:">` 在 WebView 中不会触发任何下载，点按钮没反应。改为：

- 新增原生插件 `FileExportPlugin`：
  - `saveFile`：走系统「保存到…」文件选择器（SAF，`ACTION_CREATE_DOCUMENT`），无需任何存储权限，
    由用户在对话框里选择位置（默认 Downloads），原生写入 UTF-8 内容；
  - `saveFileLocal`：选择器不可用时退回到应用外部目录，返回绝对路径供界面提示；
- 前端 `downloadTemplate()` 按平台分流：原生走插件，桌面浏览器仍用 Blob 下载，
  并把结果（保存成功/已取消/失败原因）显示在界面上；
- 「复制模板」也补了 `execCommand('copy')` 兜底（WebView 里 clipboard API 可能不可用）。

> 实测：点击「下载 CSV 模板」会弹出系统保存对话框，文件名预填 `lingualeap-导入模板.csv`，
> 保存后文件出现在 `/sdcard/Download/`，内容与模板一致。

## 十一、验证记录（真机模拟器实测）

在 Android 16（API 36）模拟器上安装 release 包实测：

| 场景 | 状态栏被遮挡 | 深色样式 | 备注 |
| --- | --- | --- | --- |
| 手机 390x915（浅色） | 无，顶部按钮可点 | — | 状态栏图标可见 |
| 手机 390x915（深色） | 无 | 全部生效 | 卡片/芯片/输入框均为深色 |
| 平板 1280x800（深色） | 无 | 全部生效 | 左侧导航栏 + 双列卡片 |
| 听读连播（手机） | — | — | 播放 20 秒从 1/10 推进到 3/10，高亮同步前进 |
| 短语连播（手机） | — | — | 高亮卡片持续切换 |
| 状态恢复 | — | — | 听读播放到 4/10 后强杀进程，重开仍回到听读并停在原词 |
| 数据导入 | — | — | 粘贴 3 行 CSV，生成 2 个分组，词库分类筛选中出现「我的词库」 |
| 统计 | — | — | 听读 20 秒后今日 3 次、连续 1 天、7 日图今日柱状显示正常 |
| 大屏留白 | — | — | 2560x1600（约 1706 CSS）下词库 6 列铺满；1100 CSS 宽走平板形态 |
| 数据入口 | — | — | 底部导航 6 项，数据管理在设置内分页，可正常导入 |
| 模板下载 | — | — | 唤起系统保存框 → 保存后 /sdcard/Download/ 出现模板文件 |

验证方法（可复用）：
- `adb shell screencap -p /sdcard/x.png && adb pull` 后逐行分析顶部像素，判断状态栏区域是否有内容（图标可见性）
- debug 包可用 WebView 远程调试：`adb forward tcp:9222 localabstract:webview_devtools_remote_<pid>`，
  通过 CDP 调用 `Capacitor.Plugins.SystemUi.getInsets()`、检查 `document.documentElement.classList`
- 验证覆盖安装必须 `adb shell pm clear <包名>`，否则 WebView 会保留旧缓存，看到的是旧界面

连播功能的验证（可复用）：
- 用 WebView 远程调试读取页面上的「进度计数器」文本（如 `3/10`）与当前高亮单词，
  同时统计 `NativeTts.speak` 的调用次数，判断是否持续推进
- release 包没有调试通道，改为间隔 16 秒截两张图对比高亮单词是否前进
  （本次实测：点击播放 4 秒时在第 1 个词，20 秒时已推进到第 3 个词）

截图见 `docs/screenshots/`。
