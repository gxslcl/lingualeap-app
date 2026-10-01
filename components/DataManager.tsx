import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Database,
  Download,
  Upload,
  FileText,
  Trash2,
  Plus,
  Pencil,
  ChevronDown,
  ChevronRight,
  Copy,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { CustomGroup, ImportResult } from '../types';
import { customDataService } from '../services/customData';
import {
  CSV_TEMPLATE,
  JSON_TEMPLATE,
  downloadTemplate,
  importFile,
} from '../services/importService';

type TemplateKind = 'csv' | 'json';

export const DataManager: React.FC = () => {
  const [groups, setGroups] = useState<CustomGroup[]>(() => customDataService.getGroups());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupType, setNewGroupType] = useState<'word' | 'phrase'>('word');
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [pasted, setPasted] = useState('');
  const [showTemplate, setShowTemplate] = useState<TemplateKind | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => customDataService.subscribe(() => setGroups(customDataService.getGroups())), []);

  const stats = useMemo(() => customDataService.stats(), [groups]);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      const res = importFile(text, file.name);
      setResult(res);
      setGroups(customDataService.getGroups());
    } catch (e) {
      setResult({
        total: 0,
        imported: 0,
        skipped: 0,
        errors: [`读取文件失败：${(e as Error).message}`],
        groupNames: [],
      });
    }
  };

  const handlePasteImport = () => {
    if (!pasted.trim()) return;
    const res = importFile(pasted);
    setResult(res);
    setGroups(customDataService.getGroups());
    if (res.imported > 0) setPasted('');
  };

  const [saveTip, setSaveTip] = useState<{ ok: boolean; text: string } | null>(null);

  const handleDownload = async (kind: TemplateKind) => {
    const res = await downloadTemplate(kind);
    setSaveTip({ ok: res.ok, text: res.message });
    window.setTimeout(() => setSaveTip(null), 5000);
  };

  /** 复制模板：先试剪贴板 API，失败则退回 textarea + execCommand（WebView 里更可靠） */
  const copyTemplate = async (kind: TemplateKind) => {
    const text = kind === 'csv' ? CSV_TEMPLATE : JSON_TEMPLATE;
    let done = false;
    try {
      await navigator.clipboard.writeText(text);
      done = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        done = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        done = false;
      }
    }
    if (done) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      setShowTemplate(kind);
      setSaveTip({ ok: false, text: '无法自动复制，已展开模板内容，可长按选择复制' });
      window.setTimeout(() => setSaveTip(null), 5000);
    }
  };

  return (
    <div className="space-y-5 pb-2">
      {/* ===== 概览 ===== */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '自定义分组', value: stats.groups, color: 'text-indigo-600 dark:text-indigo-400' },
          { label: '导入单词', value: stats.words, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: '导入短句', value: stats.phrases, color: 'text-amber-600 dark:text-amber-400' },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* ===== 导入 ===== */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3">
          <Upload className="w-4 h-4 text-brand-500" />
          导入数据
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => void handleDownload('csv')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            下载 CSV 模板
          </button>
          <button
            onClick={() => void handleDownload('json')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            下载 JSON 模板
          </button>
          <button
            onClick={() => copyTemplate('csv')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? '已复制' : '复制模板'}
          </button>
          <button
            onClick={() => setShowTemplate(showTemplate === 'csv' ? null : 'csv')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            查看格式说明
          </button>
        </div>

        {saveTip && (
          <div
            className={`mb-3 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
              saveTip.ok
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
            }`}
          >
            {saveTip.ok ? (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            )}
            <span className="break-all">{saveTip.text}</span>
          </div>
        )}

        {showTemplate && (
          <div className="mb-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
              CSV 第一行必须是表头，列：<code className="px-1">类型,英文,中文,音标,分类/情景,标签,分组</code>
              。其中「英文」「中文」必填；「类型」填 单词 / 短句（留空按单词处理）；
              「标签」多个用分号分隔；「分组」留空会自动创建当日分组。
            </p>
            <pre className="text-[11px] bg-white dark:bg-slate-800 p-2 rounded-lg overflow-x-auto text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {showTemplate === 'csv' ? CSV_TEMPLATE : JSON_TEMPLATE}
            </pre>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm transition-colors"
          >
            <Upload className="w-4 h-4" />
            选择文件导入（CSV / JSON）
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.json,.txt,text/csv,application/json,text/plain"
            className="hidden"
            onChange={(e) => {
              void handleFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </div>

        <div className="mt-3">
          <textarea
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            rows={3}
            placeholder="也可以直接把 CSV / JSON 内容粘贴到这里"
            className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 p-3 outline-none focus:ring-2 focus:ring-brand-300 resize-y"
          />
          <button
            onClick={handlePasteImport}
            disabled={!pasted.trim()}
            className="mt-2 px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            导入粘贴内容
          </button>
        </div>

        {result && (
          <div className="mt-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-2">
              <div className="text-xs font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                {result.errors.length > 0 && result.imported === 0 ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
                导入完成
              </div>
              <button onClick={() => setResult(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              共 {result.total} 行，成功 <b className="text-emerald-600 dark:text-emerald-400">{result.imported}</b> 条
              {result.skipped > 0 && <>，跳过 {result.skipped} 条</>}
              {result.groupNames.length > 0 && <>，写入分组：{result.groupNames.join('、')}</>}
            </div>
            {result.errors.length > 0 && (
              <ul className="mt-2 text-[11px] text-red-500 dark:text-red-400 space-y-0.5 max-h-24 overflow-y-auto no-scrollbar">
                {result.errors.slice(0, 8).map((err, i) => (
                  <li key={i}>· {err}</li>
                ))}
                {result.errors.length > 8 && <li>… 其余 {result.errors.length - 8} 条已省略</li>}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* ===== 新建分组 ===== */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-brand-500" />
          分组管理
        </h3>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="新分组名称，如「四级核心词」"
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 outline-none focus:ring-2 focus:ring-brand-300"
          />
          <select
            value={newGroupType}
            onChange={(e) => setNewGroupType(e.target.value as 'word' | 'phrase')}
            className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 outline-none"
          >
            <option value="word">单词</option>
            <option value="phrase">短句</option>
          </select>
          <button
            onClick={() => {
              const name = newGroupName.trim();
              if (!name) return;
              customDataService.createGroup(name, newGroupType);
              setNewGroupName('');
              setGroups(customDataService.getGroups());
            }}
            disabled={!newGroupName.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建
          </button>
        </div>

        {groups.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
            还没有自定义分组，导入数据或点击「新建」创建
          </p>
        ) : (
          <div className="space-y-2">
            {groups.map((group) => {
              const isOpen = expanded === group.id;
              const isRenaming = renaming?.id === group.id;
              return (
                <div
                  key={group.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-900">
                    <button
                      onClick={() => setExpanded(isOpen ? null : group.id)}
                      className="text-slate-400 hover:text-brand-500"
                      aria-label={isOpen ? '收起' : '展开'}
                    >
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {isRenaming ? (
                      <input
                        autoFocus
                        value={renaming!.name}
                        onChange={(e) => setRenaming({ id: group.id, name: e.target.value })}
                        onBlur={() => {
                          customDataService.renameGroup(group.id, renaming!.name);
                          setRenaming(null);
                          setGroups(customDataService.getGroups());
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                        }}
                        className="flex-1 px-2 py-1 text-sm rounded border border-brand-300 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 outline-none"
                      />
                    ) : (
                      <button
                        onClick={() => setExpanded(isOpen ? null : group.id)}
                        className="flex-1 text-left min-w-0"
                      >
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-200 truncate block">
                          {group.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {group.type === 'word' ? '单词' : '短句'} · {group.items.length} 条
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => setRenaming({ id: group.id, name: group.name })}
                      className="p-1.5 text-slate-400 hover:text-brand-500"
                      aria-label="重命名"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `确定删除分组「${group.name}」及其 ${group.items.length} 条数据吗？`,
                          )
                        ) {
                          customDataService.deleteGroup(group.id);
                          setGroups(customDataService.getGroups());
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500"
                      aria-label="删除分组"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-72 overflow-y-auto">
                      {group.items.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">该分组暂无数据</p>
                      ) : (
                        group.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-2 px-3 py-2 text-xs bg-white dark:bg-slate-800"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-slate-700 dark:text-slate-200 break-words">
                                {item.english}
                              </div>
                              <div className="text-slate-500 dark:text-slate-400 break-words">
                                {item.chinese}
                                {item.pronunciation && (
                                  <span className="ipa-text ml-1 opacity-70">
                                    {item.pronunciation}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                customDataService.deleteItem(group.id, item.id);
                                setGroups(customDataService.getGroups());
                              }}
                              className="p-1 text-slate-300 hover:text-red-500"
                              aria-label="删除该条"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
