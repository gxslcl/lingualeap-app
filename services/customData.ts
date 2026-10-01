/**
 * 自定义数据（导入的单词 / 短句）与分组管理
 *
 * 内置数据来自 data/vocabulary.ts、data/phrases.ts，导入的数据单独存 localStorage，
 * 读取时合并返回，这样听读 / 单词 / 短语 / 复习等页面无需关心数据来源。
 */
import { Category, CustomGroup, CustomItem, PhraseItem, WordItem } from '../types';
import { vocabularyData } from '../data/vocabulary';
import { phrasesData } from '../data/phrases';

const STORAGE_KEY = 'lingualeap_custom_groups';

type Listener = () => void;

let groups: CustomGroup[] | null = null;
const listeners = new Set<Listener>();

function read(): CustomGroup[] {
  if (groups) return groups;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    groups = Array.isArray(parsed) ? parsed : [];
  } catch {
    groups = [];
  }
  return groups!;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups ?? []));
  } catch (e) {
    console.warn('[customData] 保存失败', e);
  }
}

function emit() {
  listeners.forEach((cb) => cb());
}

function makeId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/** 把分组里的条目转成 WordItem（内置页面直接使用） */
function toWordItem(item: CustomItem, group: CustomGroup): WordItem {
  const category =
    (Object.values(Category).find((c) => c === item.category) as Category | undefined) ??
    Category.DailyLife;
  return {
    id: item.id,
    english: item.english,
    chinese: item.chinese,
    pronunciation: item.pronunciation,
    category,
    group: group.name,
    isCustom: true,
  };
}

function toPhraseItem(item: CustomItem, group: CustomGroup): PhraseItem {
  return {
    id: item.id,
    english: item.english,
    chinese: item.chinese,
    context: item.category || group.name,
    tags: item.tags ?? [],
    group: group.name,
    isCustom: true,
  };
}

export const customDataService = {
  /** 订阅变更（导入/删除分组后刷新界面） */
  subscribe(cb: Listener) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },

  getGroups(): CustomGroup[] {
    return read().slice();
  },

  getGroup(id: string): CustomGroup | undefined {
    return read().find((g) => g.id === id);
  },

  /** 新建分组（同名同类型会复用已有分组） */
  createGroup(name: string, type: 'word' | 'phrase'): CustomGroup {
    const list = read();
    const trimmed = name.trim();
    const existing = list.find((g) => g.name === trimmed && g.type === type);
    if (existing) return existing;
    const group: CustomGroup = {
      id: makeId('g'),
      name: trimmed,
      type,
      createdAt: Date.now(),
      items: [],
    };
    list.push(group);
    persist();
    emit();
    return group;
  },

  renameGroup(id: string, name: string) {
    const list = read();
    const group = list.find((g) => g.id === id);
    if (!group) return;
    group.name = name.trim();
    persist();
    emit();
  },

  deleteGroup(id: string) {
    groups = read().filter((g) => g.id !== id);
    persist();
    emit();
  },

  deleteItem(groupId: string, itemId: string) {
    const group = read().find((g) => g.id === groupId);
    if (!group) return;
    group.items = group.items.filter((i) => i.id !== itemId);
    persist();
    emit();
  },

  /**
   * 批量写入导入的数据。
   * @param type 数据类型
   * @param groupName 目标分组名（不存在会自动创建）
   * @param items 待写入条目
   */
  addItems(
    type: 'word' | 'phrase',
    groupName: string,
    items: Omit<CustomItem, 'id' | 'createdAt'>[],
  ): CustomGroup {
    const group = customDataService.createGroup(groupName, type);
    group.items.push(
      ...items.map((it) => ({
        ...it,
        id: makeId(type === 'word' ? 'cw' : 'cp'),
        createdAt: Date.now(),
      })),
    );
    persist();
    emit();
    return group;
  },

  /** 内置 + 自定义的全部单词 */
  allWords(): WordItem[] {
    const custom = read()
      .filter((g) => g.type === 'word')
      .flatMap((g) => g.items.map((it) => toWordItem(it, g)));
    return [...vocabularyData, ...custom];
  },

  /** 内置 + 自定义的全部短句 */
  allPhrases(): PhraseItem[] {
    const custom = read()
      .filter((g) => g.type === 'phrase')
      .flatMap((g) => g.items.map((it) => toPhraseItem(it, g)));
    return [...phrasesData, ...custom];
  },

  /** 自定义单词分组名（供筛选使用） */
  wordGroupNames(): string[] {
    return read()
      .filter((g) => g.type === 'word' && g.items.length > 0)
      .map((g) => g.name);
  },

  /** 自定义短句分组名 */
  phraseGroupNames(): string[] {
    return read()
      .filter((g) => g.type === 'phrase' && g.items.length > 0)
      .map((g) => g.name);
  },

  stats() {
    const list = read();
    const words = list.filter((g) => g.type === 'word');
    const phrases = list.filter((g) => g.type === 'phrase');
    return {
      groups: list.length,
      words: words.reduce((n, g) => n + g.items.length, 0),
      phrases: phrases.reduce((n, g) => n + g.items.length, 0),
    };
  },
};
