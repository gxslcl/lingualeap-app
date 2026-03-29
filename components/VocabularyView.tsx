import React, { useState, useMemo } from 'react';
import {
  Volume2,
  Eye,
  EyeOff,
  BookOpen,
  Search,
  ArrowDown,
  Shuffle,
  ListOrdered,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  MoreVertical,
} from 'lucide-react';
import { Category, TTSConfig, WordItem } from '../types';
import { vocabularyData } from '../data/vocabulary';
import { ttsService } from '../services/ttsService';

interface VocabularyViewProps {
  ttsConfig: TTSConfig;
}

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// 保存已学习单词的键名
const LEARNED_WORDS_KEY = 'lingualeap_learned_words';

export const VocabularyView: React.FC<VocabularyViewProps> = ({ ttsConfig }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All' | 'Unlearned'>('All');
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set());
  const [learnedWords, setLearnedWords] = useState<Set<string>>(() => {
    // 从 localStorage 加载已学习的单词
    const saved = localStorage.getItem(LEARNED_WORDS_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  // Pagination & Display Settings
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [additionalCount, setAdditionalCount] = useState(0);

  // New states for mode switching
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0); // Used to trigger re-shuffle

  // 显示中文切换状态 - 从 localStorage 加载
  const [showChineseInVocab, setShowChineseInVocab] = useState(() => {
    const saved = localStorage.getItem('lingualeap_vocab_show_chinese');
    return saved ? JSON.parse(saved) : false;
  });

  // 搜索功能状态
  const [searchQuery, setSearchQuery] = useState('');

  // 移动端分页器展开状态
  const [showPaginationMenu, setShowPaginationMenu] = useState(false);

  const categories = useMemo(() => {
    return ['全部', ...Object.values(Category), '生词练习'];
  }, []);

  const [slowPlayInterval, setSlowPlayInterval] = useState(500); // 慢速播放间隔时间 (ms)

  // 保存已学习单词到 localStorage
  React.useEffect(() => {
    localStorage.setItem(LEARNED_WORDS_KEY, JSON.stringify(Array.from(learnedWords)));
  }, [learnedWords]);

  // 保存显示中文设置到 localStorage
  React.useEffect(() => {
    localStorage.setItem('lingualeap_vocab_show_chinese', JSON.stringify(showChineseInVocab));
  }, [showChineseInVocab]);

  // 1. Filter by Category
  // 优化：分离基础分类过滤逻辑，保持引用稳定
  const categoryBaseWords = useMemo(() => {
    if (activeCategory === 'All') return vocabularyData;
    if (activeCategory === 'Unlearned') return null;
    return vocabularyData.filter(w => w.category === activeCategory);
  }, [activeCategory]);

  const filteredWords = useMemo(() => {
    let words: typeof vocabularyData;

    if (activeCategory === 'All') {
      words = vocabularyData;
    } else if (activeCategory === 'Unlearned') {
      // 过滤出未学习的单词
      words = vocabularyData.filter(w => !learnedWords.has(w.id));
    } else {
      // 其他分类下，使用稳定的引用，避免 learnedWords 变化触发重排
      words = categoryBaseWords || [];
    }

    // 应用搜索过滤和排序（支持英文和中文模糊匹配）
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      // 先过滤出匹配的单词，然后计算匹配度评分
      const matchedWords = words
        .filter(word => {
          // 英文匹配
          const englishMatch = word.english.toLowerCase().includes(query);
          // 中文匹配
          const chineseMatch = Array.isArray(word.chinese)
            ? word.chinese.some(c => c.toLowerCase().includes(query))
            : word.chinese.toLowerCase().includes(query);
          return englishMatch || chineseMatch;
        })
        .map(word => {
          // 计算匹配度评分（分数越高越匹配）
          let score = 0;

          // 英文精确匹配（最高优先级）
          if (word.english.toLowerCase() === query) {
            score += 1000;
          }
          // 英文单词边界匹配（如查询 "text" 匹配 "text" 而不是 "context"）
          else if (new RegExp(`\\b${query}\\b`, 'i').test(word.english)) {
            score += 500;
          }
          // 英文部分匹配
          else if (word.english.toLowerCase().includes(query)) {
            score += 100;
            // 从开头匹配得分更高
            if (word.english.toLowerCase().startsWith(query)) {
              score += 50;
            }
          }

          // 中文匹配评分
          if (Array.isArray(word.chinese)) {
            const matchingChinese = word.chinese.filter(c => c.toLowerCase().includes(query));
            const nonMatchingCount = word.chinese.length - matchingChinese.length;

            // 完全匹配（所有中文含义都包含查询且没有其他含义）
            if (
              matchingChinese.length === word.chinese.length &&
              matchingChinese.every((c, i) => c.toLowerCase() === query || c.toLowerCase().includes(query))
            ) {
              score += 800; // 所有含义都匹配
            }
            // 部分匹配，根据匹配比例给分
            else if (matchingChinese.length > 0) {
              // 匹配比例越高分数越高，但有其他含义会扣分
              const matchRatio = matchingChinese.length / word.chinese.length;
              score += 300 * matchRatio;
              // 含义越多（越不精确）分数越低
              score -= nonMatchingCount * 20;
            }
          } else {
            // 单个中文含义
            if (word.chinese.toLowerCase() === query) {
              score += 800; // 精确匹配
            } else if (word.chinese.toLowerCase().includes(query)) {
              score += 300; // 部分匹配
            }
          }

          // 句子优先级最低（通过检查是否包含空格判断是否为句子）
          if (word.english.includes(' ')) {
            score -= 1000; // 句子始终排在最后
          }

          return { word, score };
        })
        // 按评分降序排序
        .sort((a, b) => b.score - a.score)
        .map(({ word }) => word);

      words = matchedWords;
    }

    return words;
  }, [activeCategory, learnedWords, categoryBaseWords, searchQuery]);

  // 2. Apply Sorting/Shuffling
  const processedWords = useMemo(() => {
    if (isRandomMode) {
      return shuffleArray(filteredWords);
    }
    return filteredWords;
  }, [filteredWords, isRandomMode, shuffleSeed]);

  // Reset pagination when category, mode, or pageSize changes
  React.useEffect(() => {
    setCurrentPage(1);
    setAdditionalCount(0);
  }, [activeCategory, isRandomMode, shuffleSeed, pageSize]);

  // 3. Apply Pagination
  const totalPages = Math.ceil(processedWords.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize + additionalCount;
  const displayedWords = processedWords.slice(startIndex, endIndex);

  const toggleReveal = (id: string) => {
    const newSet = new Set(revealedWords);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedWords(newSet);
  };

  const playAudio = (e: React.MouseEvent, text: string, wordId: string) => {
    e.stopPropagation();
    // 标记单词为已学习，但不在"生词练习"模式下进行
    if (activeCategory !== 'Unlearned') {
      setLearnedWords(prev => {
        const newSet = new Set(prev);
        newSet.add(wordId);
        return newSet;
      });
    }
    ttsService.speak(text, ttsConfig);
  };

  const playSlowAudio = (e: React.MouseEvent, text: string, wordId: string) => {
    e.stopPropagation();
    // 标记单词为已学习，但不在"生词练习"模式下进行
    if (activeCategory !== 'Unlearned') {
      setLearnedWords(prev => {
        const newSet = new Set(prev);
        newSet.add(wordId);
        return newSet;
      });
    }
    // 如果只有一个单词，则正常播放
    if (text.trim().split(/\s+/).length <= 1) {
      ttsService.speak(text, ttsConfig);
    } else {
      // 多个单词则使用慢速播放
      ttsService.slowSpeak(text, ttsConfig, slowPlayInterval);
    }
  };

  const loadMore = () => {
    setAdditionalCount(prev => prev + pageSize);
  };

  const handleRefreshRandom = () => {
    setShuffleSeed(prev => prev + 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setAdditionalCount(0); // Reset load more when changing pages
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // 点击外部关闭分页菜单
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showPaginationMenu && !target.closest('.pagination-menu-container')) {
        setShowPaginationMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPaginationMenu]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters (Desktop) / Horizontal Scroll (Mobile) */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-3 md:p-4 sticky top-16 md:top-24 border border-slate-100 dark:border-slate-700">
          <h3 className="hidden md:flex font-bold text-slate-800 dark:text-white mb-4 items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-500" />
            分类列表
          </h3>

          {/* Mobile Horizontal Scroll */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 no-scrollbar touch-pan-x">
            {categories.map(cat => {
              const isSelected =
                activeCategory === cat ||
                (activeCategory === 'All' && cat === '全部') ||
                (activeCategory === 'Unlearned' && cat === '生词练习');
              return (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(cat === '全部' ? 'All' : cat === '生词练习' ? 'Unlearned' : (cat as Category))
                  }
                  className={`flex-shrink-0 px-4 py-2 md:py-3 md:px-4 rounded-full md:rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-200 dark:shadow-none'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex-1 min-h-[50vh]">
        {/* Controls Bar */}
        <div className="mb-4">
          {/* First Row: Mode Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            {/* Left: Mode Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setIsRandomMode(!isRandomMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  isRandomMode
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {isRandomMode ? <Shuffle className="w-4 h-4" /> : <ListOrdered className="w-4 h-4" />}
                {isRandomMode ? '随机模式' : '顺序模式'}
              </button>

              <button
                onClick={() => setShowChineseInVocab(!showChineseInVocab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  showChineseInVocab
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {showChineseInVocab ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{showChineseInVocab ? '显示中文' : '隐藏中文'}</span>
              </button>

              {isRandomMode && (
                <button
                  onClick={handleRefreshRandom}
                  title="刷新列表"
                  className="p-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:text-brand-500 hover:border-brand-200 dark:hover:border-slate-600 transition-colors active:rotate-180 duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={slowPlayInterval}
                  onChange={e => setSlowPlayInterval(Number(e.target.value))}
                  className="w-20 md:w-24 accent-brand-500"
                />
                <span className="text-xs px-2 text-slate-500 dark:text-slate-400 min-w-[40px]">
                  {slowPlayInterval}ms
                </span>
              </div>
              {/* Mobile: Pagination Menu Button - aligned to right */}
              <div className="sm:hidden ml-auto">
                <div className="relative pagination-menu-container">
                  <button
                    onClick={() => setShowPaginationMenu(!showPaginationMenu)}
                    className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Pagination Dropdown */}
                  {showPaginationMenu && (
                    <div className="absolute right-0 top-10 z-10 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-3">
                      {/* Page Size */}
                      <div className="mb-3">
                        <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">每页数量</label>
                        <div className="flex gap-1">
                          {[20, 50, 100].map(size => (
                            <button
                              key={size}
                              onClick={() => setPageSize(size)}
                              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                pageSize === size
                                  ? 'bg-brand-500 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Page Navigation */}
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            handlePageChange(Math.max(1, currentPage - 1));
                          }}
                          disabled={currentPage === 1}
                          className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg disabled:opacity-30 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-700 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </button>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 font-mono">
                          {currentPage} / {Math.max(1, totalPages)}
                        </span>
                        <button
                          onClick={() => {
                            handlePageChange(Math.min(totalPages, currentPage + 1));
                          }}
                          disabled={currentPage === totalPages || totalPages === 0}
                          className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg disabled:opacity-30 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-700 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </button>
                      </div>

                      {/* Total count */}
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center">
                        共 {processedWords.length} 个单词
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Right: Desktop Pagination & Stats + Mobile Menu Button */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Desktop Only: Pagination & Stats */}
              <div className="hidden sm:flex flex-wrap items-center gap-3">
                {/* Page Size Selector */}
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <span className="text-xs text-slate-400">每页</span>
                  <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="bg-transparent text-sm font-bold text-slate-600 dark:text-slate-300 outline-none cursor-pointer"
                  >
                    <option value={20}>20 个</option>
                    <option value={50}>50 个</option>
                    <option value={100}>100 个</option>
                  </select>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </button>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[3rem] text-center font-mono">
                    {currentPage} / {Math.max(1, totalPages)}
                  </span>
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </button>
                </div>

                <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="font-mono">{processedWords.length}</span>
                  <span>个</span>
                  {activeCategory !== 'All' && activeCategory !== 'Unlearned' && (
                    <span className="text-brand-600 dark:text-brand-400 font-bold px-2 py-0.5 bg-brand-50 dark:bg-brand-900/20 rounded-md text-xs">
                      {activeCategory}
                    </span>
                  )}
                  {activeCategory === 'Unlearned' && (
                    <span className="text-green-600 dark:text-green-400 font-bold px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-md text-xs">
                      生词练习
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索英文单词或中文释义..."
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                title="清除搜索"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedWords.map(word => {
            const isRevealed = revealedWords.has(word.id);
            return (
              <div
                key={word.id}
                onClick={e => playAudio(e, word.english, word.id)}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-lg dark:hover:shadow-slate-700/50 transition-all cursor-pointer border-2 border-transparent hover:border-brand-200 dark:hover:border-slate-600 group relative active:scale-[0.98] flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {word.category}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={e => playSlowAudio(e, word.english, word.id)}
                      className="p-2 -mr-2 -mt-2 rounded-full text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-center py-2 flex-grow">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1 tracking-tight">
                    {word.english}
                  </h3>
                  {word.pronunciation && (
                    <p className="text-sm text-slate-400 dark:text-slate-500 font-mono font-medium">
                      {word.pronunciation}
                    </p>
                  )}
                </div>

                <div
                  onClick={e => {
                    e.stopPropagation();
                    toggleReveal(word.id);
                  }}
                  className={`mt-3 p-3 rounded-lg text-center transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    isRevealed || showChineseInVocab
                      ? 'bg-brand-50/50 dark:bg-brand-900/20'
                      : 'bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {isRevealed || showChineseInVocab ? (
                    <span className="text-lg font-bold text-brand-600 dark:text-brand-400 animate-in fade-in slide-in-from-bottom-2 block">
                      {Array.isArray(word.chinese) ? word.chinese.join(', ') : word.chinese}
                    </span>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 py-0.5">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs font-medium">点击查看释义</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State - No Results */}
        {searchQuery && processedWords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
            <Search className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">未找到匹配的单词</p>
            <p className="text-sm">尝试搜索其他英文单词或中文释义</p>
            <button
              onClick={clearSearch}
              className="mt-4 px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors"
            >
              清除搜索
            </button>
          </div>
        )}

        {/* Empty State - No Words in Category */}
        {!searchQuery && processedWords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>该分类下暂无单词</p>
          </div>
        )}

        {/* Load More Button */}
        {endIndex < processedWords.length && (
          <div className="mt-8 flex justify-center pb-8">
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 transition-all shadow-sm active:scale-95"
            >
              <ArrowDown className="w-4 h-4" />
              加载更多单词
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
