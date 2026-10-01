/**
 * 会话状态持久化
 *
 * 应用被杀掉后再次打开时，恢复「上次在哪个页面、学到第几个词、筛选了什么」，
 * 避免每次都从零开始。
 */
import { SessionState, ViewState } from '../types';

const KEY = 'lingualeap_session';

const DEFAULT_SESSION: SessionState = {
  view: 'vocabulary',
  savedAt: 0,
  perView: {},
};

let cache: SessionState | null = null;

function read(): SessionState {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    cache = parsed && typeof parsed === 'object' ? { ...DEFAULT_SESSION, ...parsed } : { ...DEFAULT_SESSION };
  } catch {
    cache = { ...DEFAULT_SESSION };
  }
  if (!cache!.perView || typeof cache!.perView !== 'object') cache!.perView = {};
  return cache!;
}

function write(next: SessionState) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    console.warn('[session] 保存失败', e);
  }
}

export const sessionService = {
  /** 上次停留的页面 */
  getView(): ViewState {
    const view = read().view;
    return (view ?? 'vocabulary') as ViewState;
  },

  setView(view: ViewState) {
    const s = read();
    write({ ...s, view, savedAt: Date.now() });
  },

  /** 读取某个页面上次保存的状态 */
  getViewState<T>(view: string): Partial<T> | null {
    const data = read().perView?.[view];
    return (data as Partial<T>) ?? null;
  },

  /** 写入（合并）某个页面的状态 */
  patchViewState(view: string, patch: Record<string, unknown>) {
    const s = read();
    const prev = (s.perView?.[view] as Record<string, unknown>) ?? {};
    write({
      ...s,
      savedAt: Date.now(),
      perView: { ...s.perView, [view]: { ...prev, ...patch } },
    });
  },

  clearViewState(view: string) {
    const s = read();
    const perView = { ...s.perView };
    delete perView[view];
    write({ ...s, perView });
  },
};
