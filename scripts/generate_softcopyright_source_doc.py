# -*- coding: utf-8 -*-
"""
LinguaLeap 英语自学助手 - 软件著作权源代码文档生成脚本
=========================================================
功能：
  1. 按逻辑顺序收集核心源代码文件
  2. 按软著要求排版：每页 50 行，页眉含软件名称与版本号，页脚含页码
  3. 超出 60 页时取"前 30 页 + 后 30 页"，中间省略并标注
  4. 输出 RTF 文件（Word 可直接打开，再由 convert_rtf_to_docx.ps1 转为 docx）

用法：
  python scripts/generate_softcopyright_source_doc.py
"""
import os
import sys

# ---------------------------------------------------------------------------
# 配置
# ---------------------------------------------------------------------------
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SOFTWARE_NAME = "LinguaLeap 英语自学助手软件 V1.0"
DOC_TITLE = "LinguaLeap 英语自学助手软件 V1.0 源代码"
LINES_PER_PAGE = 50
FRONT_PAGES = 30          # 前 30 页
BACK_PAGES = 30           # 后 30 页
PAGE_HEADER = "LinguaLeap 英语自学助手软件 V1.0 源代码"
OUTPUT_RTF = os.path.join(ROOT, "docs", "源代码文档.rtf")

# 源代码文件（按软件逻辑结构顺序排列）
SOURCE_FILES = [
    "index.tsx",
    "App.tsx",
    "types.ts",
    "components/StudySession.tsx",
    "components/VocabularyView.tsx",
    "components/PhrasesView.tsx",
    "components/ListenView.tsx",
    "components/GameView.tsx",
    "components/StatisticsPanel.tsx",
    "components/SettingsPanel.tsx",
    "components/PomodoroTimer.tsx",
    "services/srs.ts",
    "services/ttsService.ts",
    "services/storage.ts",
    "services/wordChecker.ts",
    "scripts/clean-vocabulary-duplicates.mjs",
    "scripts/generate-vocabulary-tiers.mjs",
]

# ---------------------------------------------------------------------------
# RTF 工具
# ---------------------------------------------------------------------------
def rtf_escape(text):
    """转义 RTF 特殊字符。"""
    out = []
    for ch in text:
        o = ord(ch)
        if ch in "\\{}":
            out.append("\\" + ch)
        elif ch == "\n":
            out.append("\\line ")
        elif ch == "\t":
            out.append("\\tab ")
        elif o < 128:
            out.append(ch)
        else:
            out.append("\\u%d?" % o)
    return "".join(out)


def build_rtf(pages):
    """
    pages: list[list[str]]，每个元素为一页（list of 行文本）
    返回 RTF 文档字符串。
    """
    # A4 纸（11906 x 16838 twips），页边距：上下 2cm，左右 2cm
    header = (
        "{\\rtf1\\ansi\\deff0"
        "{\\fonttbl{\\f0 Courier New;}}"
        "\\paperw11906\\paperh16838"
        "\\margl1134\\margr1134\\margt1134\\margb1134"
        "\\deflang2052"
        "\\f0\\fs18\\sl276\\slmult0 "
    )

    # 页眉：软件名称 + 版本号 + 源代码（居中，加下划线）
    header += (
        "{\\header\\pard\\qc\\b\\fs16\\ul "
        + rtf_escape(PAGE_HEADER)
        + "\\ulnone\\b0\\fs18\\par}"
    )

    # 页脚：第 X 页（居中）
    header += (
        "{\\footer\\pard\\qc\\fs16 "
        + rtf_escape("第 ")
        + "{\\field{\\*\\fldinst{PAGE}}}"
        + rtf_escape(" 页")
        + " \\par}"
    )

    body = []
    total_pages = len(pages)
    for i, page in enumerate(pages, start=1):
        # 每页 50 行正文
        for line in page:
            body.append(rtf_escape(line) + "\\par ")
        # 除最后一页外插入分页符
        if i < total_pages:
            body.append("\\page ")
    body.append("}")

    return header + "".join(body)


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------
def main():
    print("=" * 60)
    print("LinguaLeap 软著源代码文档生成器")
    print("=" * 60)

    # 1. 收集并拼接源代码
    all_lines = []
    file_line_counts = {}
    for rel in SOURCE_FILES:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            print("[警告] 文件不存在，已跳过: %s" % rel)
            continue
        with open(path, "r", encoding="utf-8") as f:
            lines = f.read().splitlines()
        # 文件分隔注释（同时有助于审查员阅读）
        sep = "// ===================== 文件: %s =====================" % rel
        all_lines.append(sep)
        all_lines.extend(lines)
        file_line_counts[rel] = len(lines)
        print("  收集 %6d 行  %s" % (len(lines), rel))

    total = len(all_lines)
    print("-" * 60)
    print("核心源代码合计: %d 行" % total)

    # 2. 超长行检测（避免单行在 Word 中换行导致一页超过 50 个显示行）
    long_lines = [(i, len(l)) for i, l in enumerate(all_lines) if len(l) > 76]
    if long_lines:
        print("[提示] 发现 %d 行超过 76 字符，将自动截断（不影响完整源码）:" % len(long_lines))
        for i, ln in long_lines[:10]:
            print("       行 %d: %d 字符 -> %s" % (i + 1, ln, all_lines[i][:60]))
        truncated = [l[:76] for l in all_lines]
    else:
        truncated = all_lines

    # 3. 按 60 页（3000 行）规则取前 30 页 + 后 30 页
    max_lines = (FRONT_PAGES + BACK_PAGES) * LINES_PER_PAGE
    pages = []
    if total <= max_lines:
        # 不足 60 页则全部提交
        lines_for_doc = truncated
    else:
        # 前 30 页 + 后 30 页，中间省略（省略说明占前 30 页的最后 1 行，总行数恰好 3000 行 = 60 页）
        front_code = truncated[: FRONT_PAGES * LINES_PER_PAGE - 1]
        back = truncated[-BACK_PAGES * LINES_PER_PAGE:]
        omitted = total - len(front_code) - len(back)
        note = "（此处省略中间源代码 %d 行）" % omitted
        front = front_code + [note]
        lines_for_doc = front + back
        print("文档采用规则: 前 30 页(1499 行代码 + 1 行省略说明) + 后 30 页(%d 行)，中间省略 %d 行"
              % (len(back), omitted))

    # 4. 切分为 50 行/页
    pages = [
        lines_for_doc[i:i + LINES_PER_PAGE]
        for i in range(0, len(lines_for_doc), LINES_PER_PAGE)
    ]
    print("生成文档页数: %d 页（每页 %d 行）" % (len(pages), LINES_PER_PAGE))

    # 5. 输出 RTF
    os.makedirs(os.path.dirname(OUTPUT_RTF), exist_ok=True)
    rtf = build_rtf(pages)
    with open(OUTPUT_RTF, "w", encoding="utf-8") as f:
        f.write(rtf)
    print("-" * 60)
    print("已生成: %s" % OUTPUT_RTF)
    print("下一步: 运行 convert_rtf_to_docx.ps1 转为 docx")
    return 0


if __name__ == "__main__":
    sys.exit(main())
