# -*- coding: utf-8 -*-
"""
将软著源代码文档 RTF 转换为 docx（依赖本机安装的 Microsoft Word + pywin32）
用法: python scripts/convert_rtf_to_docx.py
"""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RTF = os.path.join(ROOT, "docs", "源代码文档.rtf")
DOCX = os.path.join(ROOT, "docs", "源代码文档.docx")

def main():
    if not os.path.exists(RTF):
        print("[错误] 未找到 %s，请先运行 generate_softcopyright_source_doc.py" % RTF)
        return 1

    import win32com.client

    word = win32com.client.DispatchEx("Word.Application")
    word.Visible = False
    word.DisplayAlerts = 0
    try:
        doc = word.Documents.Open(RTF)
        # wdFormatXMLDocument = 12 (.docx)
        doc.SaveAs2(DOCX, 12)
        doc.Close(False)
        print("已生成: %s" % DOCX)
    finally:
        word.Quit()

    return 0

if __name__ == "__main__":
    sys.exit(main())
