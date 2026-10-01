/**
 * 数据导入：支持 CSV / JSON
 *
 * CSV 模板（第一行是表头，支持中文或英文列名）：
 *   类型,英文,中文,音标,分类/情景,标签,分组
 *   单词,apple,苹果,/ˈæpl/,基础知识,水果,我的词库
 *   短句,How are you?,你好吗？,,日常沟通常用短句,问候,我的句库
 *
 * JSON 支持两种形式：
 *   1) [{ type:'word'|'phrase', english, chinese, pronunciation?, category?, tags?, group? }, ...]
 *   2) { words:[...], phrases:[...] }
 */
import { Capacitor, registerPlugin } from '@capacitor/core';
import { CustomItem, ImportResult } from '../types';
import { customDataService } from './customData';

/** 表头别名（中文 / 英文都支持） */
const FIELD_ALIASES: Record<string, keyof RawRow> = {
  类型: 'type',
  type: 'type',
  英文: 'english',
  english: 'english',
  en: 'english',
  中文: 'chinese',
  释义: 'chinese',
  chinese: 'chinese',
  zh: 'chinese',
  音标: 'pronunciation',
  pronunciation: 'pronunciation',
  分类: 'category',
  情景: 'category',
  category: 'category',
  context: 'category',
  标签: 'tags',
  tags: 'tags',
  分组: 'group',
  group: 'group',
};

interface RawRow {
  type?: string;
  english?: string;
  chinese?: string;
  pronunciation?: string;
  category?: string;
  tags?: string;
  group?: string;
}

export const CSV_TEMPLATE =
  '类型,英文,中文,音标,分类/情景,标签,分组\n' +
  '单词,apple,苹果,/ˈæpl/,基础知识,水果,我的词库\n' +
  '单词,airport,机场,/ˈerpɔːrt/,旅行沟通常用短句,交通,我的词库\n' +
  '短句,How much is this?,这个多少钱？,,日常沟通常用短句,购物,我的句库\n';

export const JSON_TEMPLATE = JSON.stringify(
  [
    {
      type: 'word',
      english: 'apple',
      chinese: '苹果',
      pronunciation: '/ˈæpl/',
      category: '基础知识',
      tags: ['水果'],
      group: '我的词库',
    },
    {
      type: 'phrase',
      english: 'How much is this?',
      chinese: '这个多少钱？',
      category: '日常沟通常用短句',
      tags: ['购物'],
      group: '我的句库',
    },
  ],
  null,
  2,
);

/** 通用 CSV 解析：支持引号包裹、引号内逗号、CRLF、BOM */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^﻿/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(cur);
      cur = '';
    } else if (c === '\n') {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = '';
    } else if (c !== '\r') {
      cur += c;
    }
  }
  if (cur !== '' || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

function normalizeType(value?: string): 'word' | 'phrase' {
  const v = (value || '').trim().toLowerCase();
  if (v === 'phrase' || v === '短句' || v === '句子' || v === 'sentence') return 'phrase';
  return 'word';
}

function splitTags(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[;；,，、]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function defaultGroupName(type: 'word' | 'phrase') {
  const d = new Date();
  const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
  return type === 'word' ? `导入词库 ${stamp}` : `导入句库 ${stamp}`;
}

/** 把解析出的原始行落到分组里 */
function commit(rows: RawRow[]): ImportResult {
  const result: ImportResult = {
    total: rows.length,
    imported: 0,
    skipped: 0,
    errors: [],
    groupNames: [],
  };

  const grouped = new Map<string, { type: 'word' | 'phrase'; items: Omit<CustomItem, 'id' | 'createdAt'>[] }>();

  rows.forEach((row, index) => {
    const lineNo = index + 2; // 表头占第 1 行
    const english = (row.english || '').trim();
    const chinese = (row.chinese || '').trim();
    if (!english || !chinese) {
      result.errors.push(`第 ${lineNo} 行：英文和中文为必填，已跳过`);
      result.skipped += 1;
      return;
    }
    const type = normalizeType(row.type);
    const groupName = (row.group || '').trim() || defaultGroupName(type);
    const key = `${type}::${groupName}`;
    if (!grouped.has(key)) grouped.set(key, { type, items: [] });

    const bucket = grouped.get(key)!;
    // 同一分组内按英文去重
    if (bucket.items.some((it) => it.english.toLowerCase() === english.toLowerCase())) {
      result.skipped += 1;
      return;
    }

    bucket.items.push({
      english,
      chinese,
      pronunciation: (row.pronunciation || '').trim() || undefined,
      category: (row.category || '').trim() || undefined,
      tags: splitTags(row.tags),
    });
    result.imported += 1;
  });

  grouped.forEach((bucket, key) => {
    const groupName = key.split('::').slice(1).join('::');
    customDataService.addItems(bucket.type, groupName, bucket.items);
    if (!result.groupNames.includes(groupName)) result.groupNames.push(groupName);
  });

  return result;
}

/** 解析 CSV 文本并导入 */
export function importCsv(text: string): ImportResult {
  const rows = parseCsv(text);
  if (rows.length === 0) {
    return { total: 0, imported: 0, skipped: 0, errors: ['文件为空'], groupNames: [] };
  }

  const header = rows[0].map((h) => h.trim());
  const fieldByIndex = header.map((h) => FIELD_ALIASES[h.toLowerCase()] ?? FIELD_ALIASES[h]);
  if (!fieldByIndex.some(Boolean)) {
    return {
      total: rows.length - 1,
      imported: 0,
      skipped: rows.length - 1,
      errors: ['表头无法识别，请先用「下载模板」确认格式'],
      groupNames: [],
    };
  }

  const rawRows: RawRow[] = rows.slice(1).map((cells) => {
    const row: RawRow = {};
    cells.forEach((cell, i) => {
      const field = fieldByIndex[i];
      if (field) row[field] = cell;
    });
    return row;
  });

  return commit(rawRows);
}

/** 解析 JSON 文本并导入 */
export function importJson(text: string): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return {
      total: 0,
      imported: 0,
      skipped: 0,
      errors: [`JSON 解析失败：${(e as Error).message}`],
      groupNames: [],
    };
  }

  let list: unknown[] = [];
  if (Array.isArray(data)) {
    list = data;
  } else if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    const words = Array.isArray(obj.words) ? obj.words : [];
    const phrases = Array.isArray(obj.phrases) ? obj.phrases : [];
    list = [
      ...words.map((w) => ({ type: 'word', ...(w as object) })),
      ...phrases.map((p) => ({ type: 'phrase', ...(p as object) })),
    ];
  } else {
    return { total: 0, imported: 0, skipped: 0, errors: ['JSON 结构不支持'], groupNames: [] };
  }

  const rawRows: RawRow[] = list.map((entry) => {
    const row = (entry ?? {}) as Record<string, unknown>;
    return {
      type: String(row.type ?? ''),
      english: String(row.english ?? ''),
      chinese: row.chinese != null ? String(row.chinese) : '',
      pronunciation: row.pronunciation != null ? String(row.pronunciation) : '',
      category: row.category != null ? String(row.category) : row.context != null ? String(row.context) : '',
      tags: Array.isArray(row.tags) ? (row.tags as string[]).join(';') : String(row.tags ?? ''),
      group: String(row.group ?? ''),
    };
  });

  return commit(rawRows);
}

/** 根据文件名/内容自动选择解析方式 */
export function importFile(text: string, fileName = ''): ImportResult {
  const looksJson = fileName.toLowerCase().endsWith('.json') || text.trim().startsWith('[') || text.trim().startsWith('{');
  return looksJson ? importJson(text) : importCsv(text);
}

/** 原生文件导出插件（见 android/.../FileExportPlugin.java） */
interface FileExportPlugin {
  saveFile(options: {
    fileName: string;
    content: string;
    mimeType?: string;
  }): Promise<{ uri: string }>;
  saveFileLocal(options: { fileName: string; content: string }): Promise<{ path: string }>;
}

const FileExport = registerPlugin<FileExportPlugin>('FileExport');

export interface SaveResult {
  ok: boolean;
  message: string;
}

/**
 * 保存模板文件。
 *
 * Android WebView 不支持 <a download href="blob:">，点了没有任何反应，
 * 因此原生端走系统「保存到…」文件选择器（SAF，无需权限），
 * 桌面浏览器仍用 Blob 下载。
 */
export async function downloadTemplate(type: 'csv' | 'json'): Promise<SaveResult> {
  const isCsv = type === 'csv';
  // CSV 加 BOM，Excel 打开不乱码
  const content = isCsv ? '\ufeff' + CSV_TEMPLATE : JSON_TEMPLATE;
  const fileName = isCsv ? 'lingualeap-导入模板.csv' : 'lingualeap-导入模板.json';
  const mimeType = isCsv ? 'text/csv' : 'application/json';

  if (Capacitor.isNativePlatform()) {
    try {
      await FileExport.saveFile({ fileName, content, mimeType });
      return { ok: true, message: '已保存到你选择的位置' };
    } catch (e) {
      const msg = (e as Error)?.message || '';
      if (msg.includes('取消')) {
        return { ok: false, message: '已取消保存' };
      }
      // 选择器不可用时退回到应用目录
      try {
        const { path } = await FileExport.saveFileLocal({ fileName, content });
        return { ok: true, message: `已保存到：${path}` };
      } catch {
        return { ok: false, message: `保存失败：${msg || '未知错误'}` };
      }
    }
  }

  try {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    return { ok: true, message: '已开始下载' };
  } catch (e) {
    return { ok: false, message: `下载失败：${(e as Error).message}` };
  }
}
