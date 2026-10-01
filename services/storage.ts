
import {
  WordProgress,
  UserStats,
  AppSettings,
  TTSConfig,
  ListenSettings,
  Category,
  PhrasesSettings,
  DailyRecord,
} from '../types';

const KEYS = {
  PROGRESS: 'lingualeap_progress',
  STATS: 'lingualeap_stats',
  SETTINGS: 'lingualeap_settings',
  TTS_CONFIG: 'lingualeap_tts_config',
  LISTEN_SETTINGS: 'lingualeap_listen_settings',
  PHRASES_SETTINGS: 'lingualeap_phrases_settings',
};

const DEFAULT_STATS: UserStats = {
  totalStudyTime: 0,
  wordsLearned: 0,
  streakDays: 0,
  lastStudyDate: '',
  todayCount: 0,
  history: [],
  totalPracticed: 0,
  masteredCount: 0,
};

/** 本地时区的日期键（原来用 toISOString 会按 UTC 算，东八区会错一天） */
function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function shiftDays(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() + delta);
  return todayKey(date);
}
const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  fontSizeScale: 1.0,
  dailyGoal: 20,
};

const DEFAULT_TTS_CONFIG: TTSConfig = {
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  voiceURI_EN: undefined,
  voiceURI_ZH: undefined
};

const DEFAULT_LISTEN_SETTINGS: ListenSettings = {
  mode: 'random',
  selectedCategory: Object.values(Category)[0],
  batchSize: 10,
  repeatCount: 2,
  intervalMs: 500,
  playbackStrategy: 'balanced',
};

const DEFAULT_PHRASES_SETTINGS: PhrasesSettings = {
  isRandomMode: true,
  repeatCount: 2,
  intervalMs: 500,
  showChinese: true,
  playRange: 'loaded',
  playMode: 'en-zh-en'
};

export const storageService = {
  // Progress
  saveProgress: (progress: Record<string, WordProgress>) => {
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  },

  getProgress: (): Record<string, WordProgress> => {
    const data = localStorage.getItem(KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  },

  // Stats
  saveStats: (stats: UserStats) => {
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
  },

  getStats: (): UserStats => {
    const data = localStorage.getItem(KEYS.STATS);
    const stats: UserStats = data
      ? { ...DEFAULT_STATS, ...JSON.parse(data) }
      : { ...DEFAULT_STATS };
    if (!Array.isArray(stats.history)) stats.history = [];

    const today = todayKey();
    // 跨天时把「今日次数」按当天记录重新取，而不是简单清零
    const todayRecord = stats.history.find((r) => r.date === today);
    stats.todayCount = todayRecord?.count ?? 0;

    // 连续天数按历史记录重算，避免多次累加导致数字虚高
    if (stats.lastStudyDate !== today) {
      const yesterday = shiftDays(today, -1);
      const hasToday = stats.history.some((r) => r.date === today && (r.count > 0 || r.minutes > 0));
      const hasYesterday = stats.history.some((r) => r.date === yesterday && (r.count > 0 || r.minutes > 0));
      // 今天还没学、昨天也没学 → 连续中断
      if (!hasToday && !hasYesterday) {
        stats.streakDays = 0;
      }
    }
    return stats;
  },

  /** 最近 N 天的记录（含没有学习的空白天，用于趋势图） */
  getDailyHistory: (days = 7): DailyRecord[] => {
    const stats = storageService.getStats();
    const map = new Map((stats.history ?? []).map((r) => [r.date, r]));
    const result: DailyRecord[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = shiftDays(todayKey(), -i);
      result.push(map.get(date) ?? { date, count: 0, minutes: 0 });
    }
    return result;
  },

  /** 从学习进度实时统计掌握情况 */
  getMasteredCount: (): number => {
    const progress = storageService.getProgress();
    return Object.values(progress).filter((p) => p.status === 'mastered').length;
  },

  /** 记录一次练习（听读一个词、学一个词、练一句短语都算一次） */
  recordPractice: (count = 1, minutes = 0) => {
    const stats = storageService.getStats();
    const today = todayKey();

    if (!stats.history) stats.history = [];
    let record = stats.history.find((r) => r.date === today);
    if (!record) {
      record = { date: today, count: 0, minutes: 0 };
      stats.history.push(record);
    }
    record.count += count;
    record.minutes = Math.round((record.minutes + minutes) * 10) / 10;
    // 只保留最近 30 天
    stats.history = stats.history
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30);

    stats.totalPracticed = (stats.totalPracticed ?? 0) + count;
    stats.todayCount = record.count;

    if (stats.lastStudyDate !== today) {
      if (stats.lastStudyDate && shiftDays(stats.lastStudyDate, 1) === today) {
        stats.streakDays += 1;
      } else {
        stats.streakDays = 1;
      }
      stats.lastStudyDate = today;
    }

    storageService.saveStats(stats);
    return stats;
  },

  updateStudyTime: (minutes: number) => {
    const stats = storageService.getStats();
    stats.totalStudyTime += minutes;
    const today = todayKey();

    if (!stats.history) stats.history = [];
    let record = stats.history.find((r) => r.date === today);
    if (!record) {
      record = { date: today, count: 0, minutes: 0 };
      stats.history.push(record);
    }
    record.minutes = Math.round((record.minutes + minutes) * 10) / 10;
    stats.history = stats.history
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30);

    if (stats.lastStudyDate !== today) {
      if (stats.lastStudyDate && shiftDays(stats.lastStudyDate, 1) === today) {
        stats.streakDays += 1;
      } else {
        stats.streakDays = 1;
      }
      stats.lastStudyDate = today;
    }

    storageService.saveStats(stats);
    return stats;
  },

  updateWordStats: (isMastered: boolean) => {
    const stats = storageService.recordPractice(1);
    if (isMastered) {
      stats.wordsLearned += 1;
      storageService.saveStats(stats);
    }
    return stats;
  },

  // App Settings
  saveSettings: (settings: AppSettings) => {
    // 只负责持久化。主题（.dark 类）由 App 统一按 themeMode / 系统偏好应用，
    // 这里若再按 darkMode 操作 classList 会与主题设置相互覆盖。
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  getSettings: (): AppSettings => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  },

  // TTS Config
  saveTTSConfig: (config: TTSConfig) => {
    localStorage.setItem(KEYS.TTS_CONFIG, JSON.stringify(config));
  },

  getTTSConfig: (): TTSConfig => {
    const data = localStorage.getItem(KEYS.TTS_CONFIG);
    return data ? JSON.parse(data) : DEFAULT_TTS_CONFIG;
  },

  // Listen View Settings
  saveListenSettings: (settings: ListenSettings) => {
    localStorage.setItem(KEYS.LISTEN_SETTINGS, JSON.stringify(settings));
  },

  getListenSettings: (): ListenSettings => {
    const data = localStorage.getItem(KEYS.LISTEN_SETTINGS);
    // Merge with default to handle potential missing keys in future updates
    return data ? { ...DEFAULT_LISTEN_SETTINGS, ...JSON.parse(data) } : DEFAULT_LISTEN_SETTINGS;
  },

  // Phrases View Settings
  savePhrasesSettings: (settings: PhrasesSettings) => {
    localStorage.setItem(KEYS.PHRASES_SETTINGS, JSON.stringify(settings));
  },

  getPhrasesSettings: (): PhrasesSettings => {
    const data = localStorage.getItem(KEYS.PHRASES_SETTINGS);
    return data ? { ...DEFAULT_PHRASES_SETTINGS, ...JSON.parse(data) } : DEFAULT_PHRASES_SETTINGS;
  }
};
