import React, { useState, useMemo } from "react";
import {
  Volume2,
  Eye,
  BookOpen,
  Search,
  ArrowDown,
  Shuffle,
  ListOrdered,
  RefreshCw,
} from "lucide-react";
import { Category, TTSConfig } from "../types";
import { vocabularyData } from "../data/vocabulary";
import { ttsService } from "../services/ttsService";

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
const LEARNED_WORDS_KEY = "lingualeap_learned_words";

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  ttsConfig,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    Category | "All" | "Unlearned"
  >("All");
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set());
  const [learnedWords, setLearnedWords] = useState<Set<string>>(() => {
    // 从localStorage加载已学习的单词
    const saved = localStorage.getItem(LEARNED_WORDS_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  // Pagination & Display Settings
  const [pageSize, setPageSize] = useState(20);
  const [visibleCount, setVisibleCount] = useState(20);

  // New states for mode switching
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0); // Used to trigger re-shuffle

  const categories = useMemo(() => {
    return ["全部", ...Object.values(Category), "生词练习"];
  }, []);

  const [slowPlayInterval, setSlowPlayInterval] = useState(500); // 慢速播放间隔时间(ms)

  // 保存已学习单词到localStorage
  React.useEffect(() => {
    localStorage.setItem(
      LEARNED_WORDS_KEY,
      JSON.stringify(Array.from(learnedWords))
    );
  }, [learnedWords]);

  // 1. Filter by Category
  const filteredWords = useMemo(() => {
    if (activeCategory === "All") return vocabularyData;
    if (activeCategory === "Unlearned") {
      // 过滤出未学习的单词
      return vocabularyData.filter((w) => !learnedWords.has(w.id));
    }
    return vocabularyData.filter((w) => w.category === activeCategory);
  }, [activeCategory, learnedWords]);

  // 2. Apply Sorting/Shuffling
  const processedWords = useMemo(() => {
    if (isRandomMode) {
      return shuffleArray(filteredWords);
    }
    return filteredWords;
  }, [filteredWords, isRandomMode, shuffleSeed]);

  // Reset pagination when category, mode, or pageSize changes
  React.useEffect(() => {
    setVisibleCount(pageSize);
  }, [activeCategory, isRandomMode, shuffleSeed, pageSize]);

  // 3. Apply Pagination
  const displayedWords = processedWords.slice(0, visibleCount);

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
    if (activeCategory !== "Unlearned") {
      setLearnedWords((prev) => {
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
    if (activeCategory !== "Unlearned") {
      setLearnedWords((prev) => {
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
    setVisibleCount((prev) => prev + pageSize);
  };

  const handleRefreshRandom = () => {
    setShuffleSeed((prev) => prev + 1);
  };

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
            {categories.map((cat) => {
              const isSelected =
                activeCategory === cat ||
                (activeCategory === "All" && cat === "全部") ||
                (activeCategory === "Unlearned" && cat === "生词练习");
              return (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(
                      cat === "全部"
                        ? "All"
                        : cat === "生词练习"
                        ? "Unlearned"
                        : (cat as Category)
                    )
                  }
                  className={`flex-shrink-0 px-4 py-2 md:py-3 md:px-4 rounded-full md:rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-brand-500 text-white shadow-md shadow-brand-200 dark:shadow-none"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
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
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* Left: Mode Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRandomMode(!isRandomMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                isRandomMode
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {isRandomMode ? (
                <Shuffle className="w-4 h-4" />
              ) : (
                <ListOrdered className="w-4 h-4" />
              )}
              {isRandomMode ? "随机模式" : "顺序模式"}
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
                onChange={(e) => setSlowPlayInterval(Number(e.target.value))}
                className="w-20 md:w-24 accent-brand-500"
              />
              <span className="text-xs px-2 text-slate-500 dark:text-slate-400 min-w-[40px]">
                {slowPlayInterval}ms
              </span>
            </div>
          </div>

          {/* Right: Stats & Settings */}
          <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400">每页</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-transparent text-sm font-bold text-slate-600 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value={20}>20个</option>
                <option value={50}>50个</option>
                <option value={100}>100个</option>
              </select>
            </div>

            <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="hidden sm:inline">共</span>
              <span className="font-mono">{processedWords.length}</span>
              <span className="hidden sm:inline">
                个 (显 {displayedWords.length})
              </span>
              {activeCategory !== "All" && activeCategory !== "Unlearned" && (
                <span className="hidden sm:inline-block text-brand-600 dark:text-brand-400 font-bold px-2 py-0.5 bg-brand-50 dark:bg-brand-900/20 rounded-md text-xs">
                  {activeCategory}
                </span>
              )}
              {activeCategory === "Unlearned" && (
                <span className="hidden sm:inline-block text-green-600 dark:text-green-400 font-bold px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-md text-xs">
                  生词练习
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedWords.map((word) => {
            const isRevealed = revealedWords.has(word.id);
            return (
              <div
                key={word.id}
                onClick={(e) => playAudio(e, word.english, word.id)}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-lg dark:hover:shadow-slate-700/50 transition-all cursor-pointer border-2 border-transparent hover:border-brand-200 dark:hover:border-slate-600 group relative active:scale-[0.98] flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {word.category}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => playSlowAudio(e, word.english, word.id)}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReveal(word.id);
                  }}
                  className={`mt-3 p-3 rounded-lg text-center transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    isRevealed
                      ? "bg-brand-50/50 dark:bg-brand-900/20"
                      : "bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {isRevealed ? (
                    <span className="text-lg font-bold text-brand-600 dark:text-brand-400 animate-in fade-in slide-in-from-bottom-2 block">
                      {word.chinese}
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
        {/* Empty State */}
        {processedWords.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p>该分类下暂无单词</p>
          </div>
        )}
        {/* Load More Button */}
        {visibleCount < processedWords.length && (
          <div className="mt-8 flex justify-center pb-8">
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 transition-all shadow-sm active:scale-95"
            >
              <ArrowDown className="w-4 h-4" />
              加载更多单词 ({processedWords.length - visibleCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
