
import { WordProgress, UserStats, AppSettings, TTSConfig, ListenSettings, Category } from '../types';

const KEYS = {
  PROGRESS: 'lingualeap_progress',
  STATS: 'lingualeap_stats',
  SETTINGS: 'lingualeap_settings',
  TTS_CONFIG: 'lingualeap_tts_config',
  LISTEN_SETTINGS: 'lingualeap_listen_settings',
};

const DEFAULT_STATS: UserStats = {
  totalStudyTime: 0,
  wordsLearned: 0,
  streakDays: 0,
  lastStudyDate: '',
  todayCount: 0,
};
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
  intervalMs: 500
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
    if (!data) return DEFAULT_STATS;
    
    const stats = JSON.parse(data);
    
    // Check for streak updates
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastStudyDate !== today) {
      // Logic for streak could be improved, but simple check:
      const last = new Date(stats.lastStudyDate);
      const curr = new Date(today);
      const diffTime = Math.abs(curr.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays > 1 && stats.lastStudyDate !== '') {
        stats.streakDays = 0; // Reset streak if missed a day
      }
      stats.todayCount = 0; // Reset daily count
    }
    
    return stats;
  },

  updateStudyTime: (minutes: number) => {
    const stats = storageService.getStats();
    stats.totalStudyTime += minutes;
    const today = new Date().toISOString().split('T')[0];
    
    if (stats.lastStudyDate !== today) {
        if (stats.lastStudyDate) {
             const last = new Date(stats.lastStudyDate);
             const curr = new Date(today);
             const diffDays = Math.ceil(Math.abs(curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
             if (diffDays === 1) stats.streakDays += 1;
             else if (diffDays > 1) stats.streakDays = 1;
        } else {
            stats.streakDays = 1;
        }
        stats.lastStudyDate = today;
    }
    
    storageService.saveStats(stats);
    return stats;
  },

  updateWordStats: (isMastered: boolean) => {
    const stats = storageService.getStats();
    const today = new Date().toISOString().split('T')[0];
    
    // Ensure date is updated to prevent reset on next read
    if (stats.lastStudyDate !== today) {
        if (stats.lastStudyDate) {
             const last = new Date(stats.lastStudyDate);
             const curr = new Date(today);
             const diffDays = Math.ceil(Math.abs(curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
             if (diffDays === 1) stats.streakDays += 1;
             else if (diffDays > 1) stats.streakDays = 1;
        } else {
            stats.streakDays = 1;
        }
        stats.lastStudyDate = today;
    }

    stats.todayCount += 1;
    if (isMastered) {
      stats.wordsLearned += 1;
    }
    
    storageService.saveStats(stats);
    return stats;
  },

  // App Settings
  saveSettings: (settings: AppSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    // Apply dark mode immediately
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  getSettings: (): AppSettings => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    const settings = data ? JSON.parse(data) : DEFAULT_SETTINGS;
    // Initial apply
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    }
    return settings;
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
  }
};