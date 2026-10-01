# -*- coding: utf-8 -*-
"""
用户手册 Markdown -> RTF 转换器（供软著申请使用）
支持：标题、段落、无序/有序列表、表格（转文本）、分隔线、加粗、截图占位符框

用法: python scripts/md_to_rtf.py docs/软件用户手册.md docs/软件用户手册.rtf
"""
import os
import re
import sys

def rtf_escape(text):
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

def inline(text):
    """处理行内加粗 **xxx**。"""
    parts = re.split(r"(\*\*.+?\*\*)", text)
    out = []
    for part in parts:
        if part.startswith("**") and part.endswith("**") and len(part) > 4:
            out.append("\\b " + rtf_escape(part[2:-2]) + "\\b0 ")
        else:
            out.append(rtf_escape(part))
    return "".join(out)

HEADER_TMPL = (
    "{\\rtf1\\ansi\\deff0"
    "{\\fonttbl{\\f0 Courier New;}{\\f1 SimSun;}{\\f2 SimHei;}}"
    "\\paperw11906\\paperh16838"
    "\\margl1701\\margr1701\\margt1701\\margb1701"
    "\\deflang2052"
    "{\\footer\\pard\\qc\\f1\\fs18 "
    + rtf_escape("第 ")
    + "{\\field{\\*\\fldinst{PAGE}}}"
    + rtf_escape(" 页")
    + " \\par}"
    "{\\header\\pard\\qc\\f1\\fs16\\i "
    + rtf_escape("LinguaLeap 英语自学助手软件 V1.0 用户手册")
    + "\\i0\\par}"
    "\\f1\\fs22 "
)

def convert(md_path, out_path):
    with open(md_path, "r", encoding="utf-8") as f:
        lines = f.read().splitlines()

    body = []
    in_list = False

    def close_list():
        nonlocal in_list
        if in_list:
            in_list = False

    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()

        # 空行
        if not stripped:
            close_list()
            continue

        # 分隔线
        if re.match(r"^-{3,}$", stripped):
            close_list()
            body.append("\\pard\\qc\\brdrb\\brdrs\\brdrw10\\brsp20\\par ")
            continue

        # 标题
        m = re.match(r"^(#{1,4})\s+(.*)$", stripped)
        if m:
            close_list()
            level = len(m.group(1))
            title = inline(m.group(2).strip())
            if level == 1:
                body.append("\\pard\\qc\\f2\\b\\fs36 " + title + "\\b0\\f1\\par ")
            elif level == 2:
                body.append("\\pard\\qc\\f2\\b\\fs32 " + title + "\\b0\\f1\\par ")
            elif level == 3:
                body.append("\\pard\\f2\\b\\fs28 " + title + "\\b0\\f1\\par ")
            else:
                body.append("\\pard\\f2\\b\\fs24 " + title + "\\b0\\f1\\par ")
            continue

        # 截图占位符
        m = re.match(r"^【截图占位[:：]?\s*(.*?)】$", stripped)
        if m:
            close_list()
            cap = m.group(1).strip()
            body.append(
                "\\pard\\qc\\box\\brdrs\\brdrw15\\brsp120\\fs24\\i "
                + rtf_escape("【请在此处插入截图：%s】" % cap)
                + "\\i0\\par "
            )
            continue

        # 表格行（转为文本）
        if stripped.startswith("|") and stripped.endswith("|"):
            close_list()
            cells = [c.strip() for c in stripped.strip("|").split("|")]
            row_text = "  |  ".join(cells)
            body.append("\\pard\\qj\\f0\\fs18 " + inline(row_text) + "\\f1\\par ")
            continue

        # 无序列表
        m = re.match(r"^[-•]\s+(.*)$", stripped)
        if m:
            body.append("\\pard\\li420\\bullet\\sa60 " + inline(m.group(1).strip()) + "\\par ")
            in_list = True
            continue

        # 有序列表
        m = re.match(r"^(\d+)[.、)]\s+(.*)$", stripped)
        if m:
            body.append("\\pard\\li420\\sa60 " + rtf_escape(m.group(1) + ". ") + inline(m.group(2).strip()) + "\\par ")
            in_list = True
            continue

        # 普通段落
        close_list()
        body.append("\\pard\\qj\\sa80\\sb40 " + inline(stripped) + "\\par ")

    content = "".join(body) + "}"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(HEADER_TMPL + content)
    print("已生成: %s" % out_path)
    return 0

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("用法: python md_to_rtf.py <input.md> <output.rtf>")
        sys.exit(1)
    sys.exit(convert(sys.argv[1], sys.argv[2]))
