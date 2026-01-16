import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  MessageCircle,
  Tag,
  Sparkles,
  Shuffle,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { phrasesData } from "../data/phrases";
import { vocabularyData } from "../data/vocabulary";
import { TTSConfig, WordItem } from "../types";
import { ttsService } from "../services/ttsService";

interface PhrasesViewProps {
  ttsConfig: TTSConfig;
}

export const PhrasesView: React.FC<PhrasesViewProps> = ({ ttsConfig }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const [displayPhrases, setDisplayPhrases] = useState(phrasesData);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [pageSize] = useState(20); // 每页显示20个
  const [currentPage, setCurrentPage] = useState(1);
  const [additionalCount, setAdditionalCount] = useState(0);

  // State for word popup
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    def?: WordItem;
    x: number;
    y: number;
  } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useRef<boolean>(
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setSelectedWord(null);
      }
    };

    if (selectedWord) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedWord]);

  // Close popup when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setSelectedWord(null);
      // Show back to top button when scrolled down 300px
      setShowBackToTop(window.scrollY > 300);
    };

    if (selectedWord) {
      window.addEventListener("scroll", handleScroll);
    }

    // Add scroll event listener for back to top button
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedWord]);

  // Close popup on touch move (for mobile scroll)
  useEffect(() => {
    const handleTouchMove = () => {
      setSelectedWord(null);
    };

    if (selectedWord) {
      window.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [selectedWord]);

  useEffect(() => {
    if (isRandomMode) {
      setDisplayPhrases([...phrasesData].sort(() => Math.random() - 0.5));
    } else {
      setDisplayPhrases(phrasesData);
    }
    // Reset to first page when changing random mode
    setCurrentPage(1);
    setAdditionalCount(0);
  }, [isRandomMode]);

  // 计算当前页面显示的短语
  const totalPages = Math.ceil(displayPhrases.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize + additionalCount;
  const displayedPhrases = displayPhrases.slice(startIndex, endIndex);

  const handlePlay = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    ttsService.speak(text, ttsConfig);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const findDefinition = (word: string) => {
    // Basic cleaning
    const cleanWord = word.replace(/[.,!?;:()"]/g, "").toLowerCase();

    // 1. Exact match (High priority)
    let match = vocabularyData.find(
      (v) => v.english.toLowerCase() === cleanWord
    );
    if (match) return match;

    // Helper to search in vocabulary
    const searchInVocab = (target: string) =>
      vocabularyData.find((v) => v.english.toLowerCase() === target);

    // 2. Try variations of the clicked word (Stemming - Clicked "dogs", find "dog")
    const variations: string[] = [];

    // Plurals / Third person singular
    if (cleanWord.endsWith("s")) variations.push(cleanWord.slice(0, -1));
    if (cleanWord.endsWith("es")) variations.push(cleanWord.slice(0, -2));
    if (cleanWord.endsWith("ies"))
      variations.push(cleanWord.slice(0, -3) + "y");

    // Progressive / Gerund
    if (cleanWord.endsWith("ing")) {
      variations.push(cleanWord.slice(0, -3)); // playing -> play
      variations.push(cleanWord.slice(0, -3) + "e"); // making -> make
      // Double consonant: running -> run
      const stem = cleanWord.slice(0, -3);
      if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
        variations.push(stem.slice(0, -1));
      }
    }

    // Past tense
    if (cleanWord.endsWith("ed")) {
      variations.push(cleanWord.slice(0, -2)); // walked -> walk
      variations.push(cleanWord.slice(0, -2) + "e"); // liked -> like
      if (cleanWord.endsWith("ied"))
        variations.push(cleanWord.slice(0, -3) + "y"); // studied -> study
      // Double consonant: stopped -> stop
      const stem = cleanWord.slice(0, -2);
      if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
        variations.push(stem.slice(0, -1));
      }
    }

    for (const v of variations) {
      match = searchInVocab(v);
      if (match) return match;
    }

    // 3. Try finding if the clicked word is a base for something in DB (Reverse - Clicked "dog", find "dogs")
    // We iterate through vocabulary and check if any word is a variation of cleanWord
    match = vocabularyData.find((v) => {
      const dbWord = v.english.toLowerCase();

      // Plurals
      if (dbWord === cleanWord + "s") return true;
      if (dbWord === cleanWord + "es") return true;
      if (cleanWord.endsWith("y") && dbWord === cleanWord.slice(0, -1) + "ies")
        return true;

      // Progressive
      if (dbWord === cleanWord + "ing") return true;
      if (cleanWord.endsWith("e") && dbWord === cleanWord.slice(0, -1) + "ing")
        return true;
      // Double consonant check for reverse is tricky, but we can try simple check
      if (dbWord === cleanWord + cleanWord.slice(-1) + "ing") return true;

      // Past tense
      if (dbWord === cleanWord + "ed") return true;
      if (cleanWord.endsWith("e") && dbWord === cleanWord + "d") return true;
      if (cleanWord.endsWith("y") && dbWord === cleanWord.slice(0, -1) + "ied")
        return true;

      return false;
    });

    return match;
  };

  const handleWordMouseEnter = () => {
    // 只在非移动端生效
    if (!isMobile.current) {
      // 清除之前的定时器，防止意外关闭
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    }
  };

  const handleWordMouseLeave = () => {
    // 只在非移动端生效
    if (!isMobile.current) {
      // 设置定时器，在0.5秒后关闭弹窗
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }

      closeTimeout.current = setTimeout(() => {
        setSelectedWord(null);
      }, 500);
    }
  };

  const handlePopupMouseEnter = () => {
    // 只在非移动端生效
    if (!isMobile.current) {
      // 鼠标进入弹窗时清除关闭定时器
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
    }
  };

  const handlePopupMouseLeave = () => {
    // 只在非移动端生效
    if (!isMobile.current) {
      // 鼠标离开弹窗时设置关闭定时器
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }

      closeTimeout.current = setTimeout(() => {
        setSelectedWord(null);
      }, 500);
    }
  };

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();

    // Play audio for the word
    ttsService.speak(word, ttsConfig);

    // Find definition with fuzzy search
    const definition = findDefinition(word);

    // Calculate position (try to keep it within viewport)
    const x = Math.min(window.innerWidth - 300, Math.max(10, e.clientX - 100));
    const y = Math.min(window.innerHeight - 200, e.clientY + 20);

    setSelectedWord({
      word: word.replace(/[.,!?;:()"]/g, ""), // Display clean word
      def: definition,
      x,
      y,
    });

    // 清除文本选择（特别是在移动端）
    if (window.getSelection) {
      window.getSelection()?.removeAllRanges();
    }

    // 如果是移动端，设置4秒后自动关闭
    if (isMobile.current) {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }

      closeTimeout.current = setTimeout(() => {
        setSelectedWord(null);
      }, 4000);
    }
  };

  const renderClickableSentence = (sentence: string) => {
    const words = sentence.split(/\s+/);
    return words.map((word, index) => (
      <span
        key={index}
        onClick={(e) => handleWordClick(e, word)}
        onMouseEnter={handleWordMouseEnter}
        onMouseLeave={handleWordMouseLeave}
        className="inline-block hover:text-brand-600 hover:underline cursor-pointer transition-colors mr-1.5 rounded hover:bg-brand-50/50 px-0.5 -mx-0.5"
      >
        {word}
      </span>
    ));
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 加载更多短语
  const loadMore = () => {
    setAdditionalCount((prev) => prev + pageSize);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 md:mb-8 text-center bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          常用情景短语
        </h2>
        <p className="text-brand-100 text-sm">
          点击卡片查看中文释义，模仿发音进行跟读练习
        </p>

        <button
          onClick={() => setIsRandomMode(!isRandomMode)}
          className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            isRandomMode
              ? "bg-white text-brand-600 shadow-md transform scale-105"
              : "bg-brand-700/30 text-brand-100 hover:bg-brand-700/50"
          }`}
        >
          <Shuffle
            className={`w-4 h-4 ${isRandomMode ? "animate-pulse" : ""}`}
          />
          {isRandomMode ? "随机模式：开启" : "随机模式：关闭"}
        </button>
      </div>

      <div className="space-y-4">
        {displayedPhrases.map((phrase) => {
          const isExpanded = expandedId === phrase.id;
          return (
            <div
              key={phrase.id}
              onClick={() => toggleExpand(phrase.id)}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all cursor-pointer overflow-hidden ${
                isExpanded
                  ? "border-brand-400 shadow-md ring-1 ring-brand-100"
                  : "hover:border-brand-200"
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold rounded uppercase tracking-wider border border-indigo-100 dark:border-slate-600">
                        {phrase.context}
                      </span>
                      {phrase.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-slate-400 dark:text-slate-300 flex items-center gap-1 bg-slate-50 dark:bg-slate-700 px-1.5 py-0.5 rounded"
                        >
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed pr-8">
                      {renderClickableSentence(phrase.english)}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handlePlay(e, phrase.english)}
                    className="flex-shrink-0 p-3 rounded-full bg-brand-50 dark:bg-slate-700 text-brand-600 dark:text-brand-300 hover:bg-brand-500 hover:text-white transition-all shadow-sm active:scale-90"
                  >
                    <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-slate-100 dark:border-slate-600"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-brand-500 dark:text-brand-300 mt-0.5" />
                      <div>
                        <p className="text-lg text-slate-800 dark:text-slate-100 font-bold">
                          {phrase.chinese}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-300 mt-2 leading-relaxed">
                          💡
                          建议：多次点击喇叭图标听发音，并尝试不看屏幕复述这句话。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {endIndex < displayPhrases.length && (
        <div className="mt-8 flex justify-center pb-8">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 transition-all shadow-sm active:scale-95"
          >
            <ArrowDown className="w-4 h-4" />
            加载更多短语
          </button>
        </div>
      )}

      {/* Word Definition Popup */}
      {selectedWord && (
        <div
          ref={popupRef}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
          className="fixed z-50 bg-white dark:bg-slate-800 rounded-xl shadow-xl w-64 p-4 animate-in fade-in zoom-in duration-200"
          style={{
            left: `${selectedWord.x}px`,
            top: `${selectedWord.y}px`,
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {selectedWord.word}
              </h4>
              {selectedWord.def?.pronunciation && (
                <span className="text-sm text-slate-500 dark:text-slate-300 font-mono">
                  {selectedWord.def.pronunciation}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWord(null);
              }}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2">
            {selectedWord.def ? (
              <div className="text-slate-700 dark:text-slate-200">
                {Array.isArray(selectedWord.def.chinese)
                  ? selectedWord.def.chinese.join("; ")
                  : selectedWord.def.chinese}
              </div>
            ) : (
              <div className="text-slate-400 dark:text-slate-500 text-sm italic">暂无详细释义</div>
            )}
          </div>

          <div className="mt-3 pt-2 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                ttsService.speak(selectedWord.word, ttsConfig);
              }}
              className="text-xs flex items-center gap-1 text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200 font-medium px-2 py-1 rounded hover:bg-brand-50 dark:hover:bg-slate-700"
            >
              <Volume2 className="w-3.5 h-3.5" />
              重播发音
            </button>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[72px] right-8 z-50 p-3 bg-brand-500 text-white rounded-full shadow-lg hover:bg-brand-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
          aria-label="回到顶部"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};