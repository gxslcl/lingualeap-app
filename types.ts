export enum Category {
  DailyLife = "日常生活",  // Contains: DailyLife, Shopping, Travel, Work, Transportation
  People = "人物相关",     // Contains: FamilyMembers, BodyParts, Occupations, Emotions
  Basics = "基础知识",     // Contains: Colors, Numbers, Time, Grammar
  Home = "居家物品",     // Contains: Home
  DailyCommunication = "日常沟通常用短句",  // 日常交流常用短句
  TravelCommunication = "旅行沟通常用短句", // 旅行交流常用短句
  WorkCommunication = "工作沟通常用短句"    // 工作交流常用短句
}

export interface WordItem {
  id: string;
  english: string;
  chinese: string | string[];
  pronunciation?: string; // IPA
  category: Category;
}

export interface PhraseItem {
  id: string;
  english: string;
  chinese: string;
  context: string; // e.g., "At a restaurant"
  tags: string[];
}

export type ViewState = 'vocabulary' | 'phrases' | 'game' | 'study' | 'stats' | 'listen';

export interface TTSConfig {
  rate: number; // 0.5 to 2
  pitch: number; // 0 to 2
  volume: number; // 0 to 1
  voiceURI_EN?: string; // Preferred English Voice URI
  voiceURI_ZH?: string; // Preferred Chinese Voice URI
}

// === New Types for Study Features ===

export interface AppSettings {
  darkMode: boolean;
  fontSizeScale: number; // 0.8 to 1.2
  dailyGoal: number; // words per day
  themeMode?: 'auto' | 'light' | 'dark'; // 主题模式
}

export interface ListenSettings {
  mode: 'random' | 'category';
  selectedCategory: Category;
  batchSize: number;
  repeatCount: number;
  intervalMs: number;
}

export interface PhrasesSettings {
  isRandomMode: boolean;
  repeatCount: number;
  intervalMs: number;
  showChinese: boolean;
  playRange: 'current' | 'loaded' | 'all' | 'favorites';
  playMode: 'en' | 'en-zh' | 'zh';
}

export interface WordProgress {
  wordId: string;
  nextReview: number; // Timestamp
  interval: number; // Days
  repetition: number;
  ef: number; // Easiness Factor
  status: 'new' | 'learning' | 'review' | 'mastered';
  lastReviewed: number;
}

export interface UserStats {
  totalStudyTime: number; // Minutes
  wordsLearned: number;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  todayCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  condition: (stats: UserStats) => boolean;
}
