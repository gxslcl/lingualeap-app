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
  /** 导入数据所属分组名（内置数据为空） */
  group?: string;
  /** 是否为导入的自定义数据 */
  isCustom?: boolean;
}

export interface PhraseItem {
  id: string;
  english: string;
  chinese: string;
  context: string; // e.g., "At a restaurant"
  tags: string[];
  /** 导入数据所属分组名（内置数据为空） */
  group?: string;
  /** 是否为导入的自定义数据 */
  isCustom?: boolean;
}

export type ViewState =
  | 'vocabulary'
  | 'phrases'
  | 'game'
  | 'study'
  | 'stats'
  | 'listen'
  | 'data';

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
  layoutMode?: 'auto' | 'phone' | 'tablet'; // 布局形态：自动 / 锁定手机 / 锁定平板
}

export interface ListenSettings {
  mode: 'random' | 'category';
  selectedCategory: Category;
  batchSize: number;
  repeatCount: number;
  intervalMs: number;
  playbackStrategy?: 'focus' | 'balanced' | 'explore';
}

export interface PhrasesSettings {
  isRandomMode: boolean;
  repeatCount: number;
  intervalMs: number;
  showChinese: boolean;
  playRange: 'current' | 'loaded' | 'all' | 'favorites';
  playMode: 'en-repeat' | 'en-zh-en' | 'zh-en' | 'en-only';
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

/** 单日活动记录（用于连续天数与近 7 日趋势图） */
export interface DailyRecord {
  date: string; // YYYY-MM-DD（按本地时区）
  count: number; // 当日学习/练习次数
  minutes: number; // 当日学习分钟
}

export interface UserStats {
  totalStudyTime: number; // Minutes
  wordsLearned: number;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD（按本地时区）
  todayCount: number;
  /** 近 N 天记录，最多保留 30 条 */
  history?: DailyRecord[];
  /** 累计练习过的词条数（含听读/短语），不区分是否掌握 */
  totalPracticed?: number;
  /** 已掌握（status=mastered）的单词数，由学习进度实时统计 */
  masteredCount?: number;
}

/** 导入的自定义分组 */
export interface CustomGroup {
  id: string;
  name: string;
  type: 'word' | 'phrase';
  createdAt: number;
  items: CustomItem[];
}

/** 分组内的一条数据 */
export interface CustomItem {
  id: string;
  english: string;
  chinese: string;
  pronunciation?: string;
  /** 单词：分类；短句：情景 */
  category?: string;
  tags?: string[];
  createdAt: number;
}

/** 导入结果统计 */
export interface ImportResult {
  total: number;
  imported: number;
  skipped: number;
  errors: string[];
  groupNames: string[];
}

/** 需要跨会话保留的界面状态 */
export interface SessionState {
  view: ViewState;
  savedAt: number;
  perView: Record<string, unknown>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  condition: (stats: UserStats) => boolean;
}
