# -*- mode: powershell -*-
# 将软著源代码文档 RTF 转换为 docx（依赖本机安装的 Microsoft Word）
# 用法: powershell -ExecutionPolicy Bypass -File scripts/convert_rtf_to_docx.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$rtf = Join-Path $root "docs\源代码文档.rtf"
$docx = Join-Path $root "docs\源代码文档.docx"

if (-not (Test-Path $rtf)) {
    Write-Error "未找到 $rtf，请先运行 generate_softcopyright_source_doc.py"
    exit 1
}

$word = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0

    $doc = $word.Documents.Open($rtf)
    # wdFormatXMLDocument = 12 (.docx)
    $doc.SaveAs2($docx, 12)
    $doc.Close($false)

    Write-Output "已生成: $docx"
} catch {
    Write-Error "Word 转换失败: $_"
    exit 1
} finally {
    if ($word) {
        $word.Quit()
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
    }
}
