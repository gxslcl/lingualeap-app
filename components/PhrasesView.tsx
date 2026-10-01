import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Volume2,
  MessageCircle,
  Tag,
  Sparkles,
  Shuffle,
  Timer,
  RefreshCw,
  Play,
  Pause,
  Eye,
  EyeOff,
  Layers,
  Star,
  CheckCircle,
  X,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { TTSConfig, WordItem } from "../types";
import { ttsService } from "../services/ttsService";
import { storageService } from "../services/storage";
import { sessionService } from "../services/session";
// 内置数据 + 导入的自定义数据
import { customDataService } from "../services/customData";

// 难度级别定义
type DifficultyLevel = "short" | "medium" | "long" | "all";

interface DifficultyConfig {
  label: string;
  minWords: number;
  maxWords: number;
  color: string;
}

const DIFFICULTY_CONFIG: Record<DifficultyLevel, DifficultyConfig> = {
  short: { label: "短句", minWords: 1, maxWords: 3, color: "bg-emerald-500" },
  medium: { label: "中句", minWords: 4, maxWords: 6, color: "bg-amber-500" },
  long: {
    label: "长句",
    minWords: 7,
    maxWords: Infinity,
    color: "bg-rose-500",
  },
  all: {
    label: "全部",
    minWords: 1,
    maxWords: Infinity,
    color: "bg-slate-700",
  },
};

const getDifficultyByLength = (wordCount: number): DifficultyLevel => {
  if (wordCount <= DIFFICULTY_CONFIG.short.maxWords) return "short";
  if (wordCount <= DIFFICULTY_CONFIG.medium.maxWords) return "medium";
  return "long";
};

interface PhrasesViewProps {
  ttsConfig: TTSConfig;
}

export const PhrasesView: React.FC<PhrasesViewProps> = ({ ttsConfig }) => {
  const savedSettings = storageService.getPhrasesSettings();
  // 自定义数据发生增删时重新读取（导入后不必重进应用）
  const [dataVersion, setDataVersion] = useState(0);
  useEffect(() => {
    const unsub = customDataService.subscribe(() => setDataVersion((v) => v + 1));
    return () => {
      unsub();
    };
  }, []);
  const allPhrases = useMemo(
    () => customDataService.allPhrases(),
    [dataVersion],
  );
  const allWords = useMemo(() => customDataService.allWords(), [dataVersion]);

  // 恢复上次的浏览进度（页码 / 难度筛选等）
  const savedView = sessionService.getViewState<{
    currentPage: number;
    selectedDifficulty: DifficultyLevel;
    additionalCount: number;
  }>("phrases");

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRandomMode, setIsRandomMode] = useState(savedSettings.isRandomMode);
  const [displayPhrases, setDisplayPhrases] = useState(allPhrases);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [pageSize, setPageSize] = useState(20); // 每页显示20个
  const [currentPage, setCurrentPage] = useState(() => savedView?.currentPage ?? 1);
  const [additionalCount, setAdditionalCount] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>(
    savedView?.selectedDifficulty ?? "all",
  );
  const [intervalMs, setIntervalMs] = useState(savedSettings.intervalMs);
  const [repeatCount, setRepeatCount] = useState(savedSettings.repeatCount);
  const [playRange, setPlayRange] = useState(savedSettings.playRange);
  const [playMode, setPlayMode] = useState(savedSettings.playMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [showChinese, setShowChinese] = useState(savedSettings.showChinese);
  const isPlayingRef = useRef(false);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activePhraseRef = useRef<HTMLDivElement>(null);
  const pendingAutoAdvanceRef = useRef(false);
  const isAutoLoadingRef = useRef(false);
  const playSequenceTokenRef = useRef(0);
  const isPausedRef = useRef(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("lingualeap_phrase_favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("lingualeap_phrase_mastered");
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

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
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
  );

  // 蓝色卡片里的操作面板（随机播放 / 间隔 / 遍数 / 范围 / 难度筛选等）
  // 手机上默认收起，避免占满首屏；用户的手动选择会记住
  const [panelOpen, setPanelOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("lingualeap_phrases_panel");
      if (saved === "open") return true;
      if (saved === "closed") return false;
    } catch {
      // 隐私模式等场景下忽略存储异常
    }
    return window.innerWidth >= 768;
  });
  const togglePanel = () => {
    setPanelOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("lingualeap_phrases_panel", next ? "open" : "closed");
      } catch {
        // 忽略
      }
      return next;
    });
  };

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

  useEffect(() => {
    const handleViewportMove = () => {
      if (selectedWord) {
        setSelectedWord(null);
      }
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleViewportMove);
    window.addEventListener("touchmove", handleViewportMove);

    return () => {
      window.removeEventListener("scroll", handleViewportMove);
      window.removeEventListener("touchmove", handleViewportMove);
    };
  }, [selectedWord]);

  useEffect(() => {
    if (isRandomMode) {
      setDisplayPhrases([...allPhrases].sort(() => Math.random() - 0.5));
    } else {
      setDisplayPhrases(allPhrases);
    }
    // Reset to first page when changing random mode
    setCurrentPage(1);
    setAdditionalCount(0);
  }, [isRandomMode]);

  useEffect(() => {
    storageService.savePhrasesSettings({
      isRandomMode,
      intervalMs,
      repeatCount,
      showChinese,
      playRange,
      playMode,
    });
  }, [isRandomMode, intervalMs, repeatCount, showChinese, playRange, playMode]);

  // 计算当前页面显示的短语
  const basePhrases = useMemo(() => {
    let filtered = displayPhrases;

    // 根据难度过滤
    if (selectedDifficulty !== "all") {
      const config = DIFFICULTY_CONFIG[selectedDifficulty];
      filtered = filtered.filter((phrase) => {
        const wordCount = phrase.english.split(/\s+/).length;
        return wordCount >= config.minWords && wordCount <= config.maxWords;
      });
    }

    if (playRange === "favorites") {
      return filtered.filter((phrase) => favoriteIds.has(phrase.id));
    }
    return filtered;
  }, [displayPhrases, playRange, favoriteIds, selectedDifficulty]);
  const totalPages = Math.ceil(basePhrases.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize + additionalCount;
  const displayedPhrases = useMemo(() => {
    if (playRange === "favorites") {
      return basePhrases;
    }
    return basePhrases.slice(startIndex, endIndex);
  }, [basePhrases, startIndex, endIndex, playRange]);
  const playPhrases = useMemo(() => {
    if (playRange === "favorites") {
      return basePhrases;
    }
    if (playRange === "current") {
      return basePhrases.slice(startIndex, endIndex);
    }
    if (playRange === "loaded") {
      return basePhrases.slice(0, endIndex);
    }
    return basePhrases;
  }, [basePhrases, startIndex, endIndex, playRange]);
  const activePhraseId = useMemo(
    () => playPhrases[currentIndex]?.id ?? null,
    [playPhrases, currentIndex],
  );

  // 记录浏览进度，供下次启动恢复
  useEffect(() => {
    sessionService.patchViewState("phrases", {
      currentPage,
      selectedDifficulty,
      additionalCount,
    });
  }, [currentPage, selectedDifficulty, additionalCount]);

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
    let match = allWords.find(
      (v) => v.english.toLowerCase() === cleanWord,
    );
    if (match) return match;

    // Helper to search in vocabulary
    const searchInVocab = (target: string) =>
      allWords.find((v) => v.english.toLowerCase() === target);

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
    match = allWords.find((v) => {
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
        className="inline-block hover:text-brand-600 hover:underline cursor-pointer transition-colors mr-1.5 rounded hover:bg-brand-50/50 dark:hover:bg-brand-900/40 px-0.5 -mx-0.5"
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

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleMastered = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem(
      "lingualeap_phrase_favorites",
      JSON.stringify(Array.from(favoriteIds)),
    );
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem(
      "lingualeap_phrase_mastered",
      JSON.stringify(Array.from(masteredIds)),
    );
  }, [masteredIds]);

  const shufflePhrases = () => {
    setIsRandomMode(true);
    setDisplayPhrases([...allPhrases].sort(() => Math.random() - 0.5));
    setCurrentPage(1);
    setAdditionalCount(0);
    setExpandedId(null);
  };

  const stopPlayback = (resetIndex: boolean, markPaused: boolean) => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    isPausedRef.current = markPaused;
    playSequenceTokenRef.current += 1;
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
    ttsService.cancel();
    if (resetIndex) {
      setCurrentIndex(0);
      setCurrentLoop(0);
    }
  };

  const interruptPlayback = () => {
    playSequenceTokenRef.current += 1;
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
    ttsService.cancel();
  };

  const handlePhraseClick = (id: string) => {
    toggleExpand(id);

    if (!isPlayingRef.current && !isPausedRef.current) return;

    const targetIndex = playPhrases.findIndex((phrase) => phrase.id === id);
    if (targetIndex < 0) return;

    interruptPlayback();
    setCurrentLoop(0);
    setCurrentIndex(targetIndex);

    if (!isPlayingRef.current) {
      isPlayingRef.current = true;
      isPausedRef.current = false;
      setIsPlaying(true);
    }
  };

  const playSequence = () => {
    if (!isPlayingRef.current || playPhrases.length === 0) return;

    const sequenceId = ++playSequenceTokenRef.current;
    const phrase = playPhrases[currentIndex];
    if (!phrase) return;

    const isActive = () =>
      playSequenceTokenRef.current === sequenceId && isPlayingRef.current;

    const speakEnglish = (onEnd: () => void) => {
      if (!isActive()) return;
      ttsService.speak(
        phrase.english,
        { ...ttsConfig, rate: ttsConfig.rate },
        "en-US",
        () => {
          if (!isActive()) return;
          onEnd();
        },
      );
    };

    const speakChinese = (onEnd: () => void) => {
      if (!isActive()) return;
      ttsService.speak(
        phrase.chinese,
        { ...ttsConfig, rate: 1.0 },
        "zh-CN",
        () => {
          if (!isActive()) return;
          onEnd();
        },
      );
    };

    const speakWithMode = (onComplete: () => void) => {
      if (!isActive()) return;
      if (playMode === "en") {
        speakEnglish(onComplete);
        return;
      }
      if (playMode === "zh") {
        speakChinese(onComplete);
        return;
      }
      speakEnglish(() => {
        if (!isActive()) return;
        if (intervalMs > 0) {
          playTimeoutRef.current = setTimeout(() => {
            if (!isActive()) return;
            speakChinese(onComplete);
          }, intervalMs);
        } else {
          speakChinese(onComplete);
        }
      });
    };

    speakWithMode(() => {
      if (!isActive()) return;

      const proceed = () => {
        if (!isActive()) return;

        if (currentLoop < repeatCount - 1) {
          setCurrentLoop((prev) => prev + 1);
          return;
        }

        setCurrentLoop(0);
        // 每读完一句记一次练习（统计面板的数据来源）
        storageService.recordPractice(1);

        if (currentIndex < playPhrases.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          return;
        }

        if (playRange === "loaded" && endIndex < basePhrases.length) {
          pendingAutoAdvanceRef.current = true;
          isAutoLoadingRef.current = true;
          loadMore();
          return;
        }

        stopPlayback(true, false);
      };

      if (intervalMs > 0) {
        playTimeoutRef.current = setTimeout(proceed, intervalMs);
      } else {
        proceed();
      }
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback(false, true);
      return;
    }

    if (playPhrases.length === 0) return;

    if (currentIndex >= playPhrases.length) {
      setCurrentIndex(0);
      setCurrentLoop(0);
    }

    isPlayingRef.current = true;
    isPausedRef.current = false;
    setIsPlaying(true);
  };

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying && playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && isPlayingRef.current) {
      playSequence();
    }
  }, [
    currentIndex,
    currentLoop,
    isPlaying,
    playPhrases,
    intervalMs,
    repeatCount,
    playMode,
    playRange,
  ]);

  useEffect(() => {
    if (pendingAutoAdvanceRef.current && isPlaying) {
      pendingAutoAdvanceRef.current = false;
      setCurrentIndex((prev) => Math.min(prev + 1, playPhrases.length - 1));
    }
  }, [playPhrases, isPlaying]);

  useEffect(() => {
    if (isPlaying && activePhraseRef.current) {
      activePhraseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (playPhrases.length === 0 && isPlaying) {
      stopPlayback(true, false);
      return;
    }
    if (currentIndex >= playPhrases.length && playPhrases.length > 0) {
      setCurrentIndex(0);
      setCurrentLoop(0);
    }
  }, [playPhrases, currentIndex, isPlaying]);

  useEffect(() => {
    if (playRange === "all" && isPlaying) {
      const needed = Math.max(0, currentIndex + 1 - pageSize);
      setAdditionalCount((prev) => Math.max(prev, needed));
    }
  }, [playRange, isPlaying, currentIndex, pageSize]);

  useEffect(() => {
    if (isAutoLoadingRef.current) {
      isAutoLoadingRef.current = false;
      return;
    }
    if (isPlayingRef.current) {
      stopPlayback(true, false);
      return;
    }
    setCurrentIndex(0);
    setCurrentLoop(0);
  }, [displayPhrases, currentPage, additionalCount]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
      ttsService.cancel();
    };
  }, []);

  return (
    <div
      className="max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto pb-page"
      // 桌面/平板浏览器会显示底部通栏播放条，这里把它占的高度预留下来
      style={{ "--bottom-bar-h": isMobile.current ? "0px" : "5rem" } as React.CSSProperties}
    >
      <div className="mb-6 md:mb-8 text-center bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-5 md:p-6 text-white shadow-lg">
        <button
          type="button"
          onClick={togglePanel}
          aria-expanded={panelOpen}
          className="w-full flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-lg"
        >
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            常用情景短语
          </h2>
          <ChevronDown
            className={`w-5 h-5 text-white/80 transition-transform duration-300 ${
              panelOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <p className="text-brand-100 text-sm mt-2">
          点击卡片查看中文释义，模仿发音进行跟读练习
        </p>
        {!panelOpen && (
          <p className="text-[11px] text-white/70 mt-1">
            点标题可展开随机播放、间隔与难度筛选
          </p>
        )}

        {panelOpen && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => setIsRandomMode(!isRandomMode)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 w-full ${
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
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1.5 rounded-full border border-white/30 w-full justify-center">
            <Timer className="w-3 h-3 text-white/80" />
            <select
              value={intervalMs}
              onChange={(e) => setIntervalMs(Number(e.target.value))}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value={0}>0s (无间隔)</option>
              <option value={100}>0.1s</option>
              <option value={200}>0.2s</option>
              <option value={500}>0.5s</option>
              <option value={800}>0.8s</option>
              <option value={1200}>1.2s</option>
            </select>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1.5 rounded-full border border-white/30 w-full justify-center">
            <RefreshCw className="w-3 h-3 text-white/80" />
            <select
              value={repeatCount}
              onChange={(e) => setRepeatCount(Number(e.target.value))}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value={1}>1遍</option>
              <option value={2}>2遍</option>
              <option value={3}>3遍</option>
            </select>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1.5 rounded-full border border-white/30 w-full justify-center">
            <Layers className="w-3 h-3 text-white/80" />
            <select
              value={playRange}
              onChange={(e) =>
                setPlayRange(e.target.value as "current" | "loaded" | "all")
              }
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value="current">当前页</option>
              <option value="loaded">已加载</option>
              <option value="all">全部短语</option>
            </select>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1.5 rounded-full border border-white/30 w-full justify-center">
            <Volume2 className="w-3 h-3 text-white/80" />
            <select
              value={playMode}
              onChange={(e) =>
                setPlayMode(e.target.value as "en" | "en-zh" | "zh")
              }
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
            >
              <option value="en">英文</option>
              <option value="en-zh">英+中</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <button
            onClick={() => setShowChinese(!showChinese)}
            className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border transition-colors text-xs font-bold w-full ${
              showChinese
                ? "bg-white text-brand-600 border-white"
                : "bg-white/20 text-white border-white/30"
            }`}
          >
            {showChinese ? (
              <Eye className="w-3 h-3" />
            ) : (
              <EyeOff className="w-3 h-3" />
            )}
            {showChinese ? "中文：开" : "中文：关"}
          </button>
          <button
            onClick={shufflePhrases}
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border transition-colors text-xs font-bold bg-white/20 text-white border-white/30 hover:bg-white/30 w-full"
          >
            <Shuffle className="w-3 h-3" />
            换一批
          </button>
          <button
            onClick={() =>
              setPlayRange(playRange === "favorites" ? "loaded" : "favorites")
            }
            className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border transition-colors text-xs font-bold w-full ${
              playRange === "favorites"
                ? "bg-white text-brand-600 border-white"
                : "bg-white/20 text-white border-white/30 hover:bg-white/30"
            }`}
          >
            <Star className="w-3 h-3" />
            已收藏
          </button>

          {/* 难度选择 */}
          {(["all", "short", "medium", "long"] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedDifficulty(level);
                setCurrentPage(1);
                setAdditionalCount(0);
              }}
              className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-full border transition-colors text-xs font-bold w-full ${
                selectedDifficulty === level
                  ? level === "all"
                    ? "bg-slate-700 text-white border-slate-600"
                    : `${DIFFICULTY_CONFIG[level].color} text-white border-white/50`
                  : "bg-white/20 text-white border-white/30 hover:bg-white/30"
              }`}
            >
              {level === "all" ? "全部" : DIFFICULTY_CONFIG[level].label}
            </button>
          ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {displayedPhrases.map((phrase) => {
          const isExpanded = expandedId === phrase.id;
          const isActivePlaying = isPlaying && phrase.id === activePhraseId;
          const shouldShowChinese =
            isExpanded || (showChinese && isActivePlaying);
          const isFavorite = favoriteIds.has(phrase.id);
          const isMastered = masteredIds.has(phrase.id);
          return (
            <div
              key={phrase.id}
              ref={isActivePlaying ? activePhraseRef : undefined}
              onClick={() => handlePhraseClick(phrase.id)}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all cursor-pointer overflow-hidden ${
                isExpanded
                  ? "border-brand-400 shadow-md ring-1 ring-brand-100"
                  : "hover:border-brand-200"
              } ${
                isActivePlaying
                  ? "ring-2 ring-indigo-400 border-indigo-300 bg-indigo-50/40 dark:bg-slate-800"
                  : ""
              }`}
            >
              <div className="p-5">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
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
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                    {renderClickableSentence(phrase.english)}
                  </h3>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => toggleFavorite(e, phrase.id)}
                      className={`p-2 rounded-full border transition-colors ${
                        isFavorite
                          ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
                          : "bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-yellow-500"
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFavorite ? "fill-yellow-400" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => toggleMastered(e, phrase.id)}
                      className={`p-2 rounded-full border transition-colors ${
                        isMastered
                          ? "bg-emerald-50 text-emerald-500 border-emerald-200"
                          : "bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-emerald-500"
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 ${
                          isMastered ? "fill-emerald-400" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={(e) => handlePlay(e, phrase.english)}
                      className="flex-shrink-0 p-3 rounded-full bg-brand-50 dark:bg-slate-700 text-brand-600 dark:text-brand-300 hover:bg-brand-500 hover:text-white transition-all shadow-sm active:scale-90"
                    >
                      <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    shouldShowChinese
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
      {playRange !== "favorites" && endIndex < basePhrases.length && (
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
                <span className="text-sm text-slate-500 dark:text-slate-300 ipa-text">
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
              <div className="text-slate-400 dark:text-slate-500 text-sm italic">
                暂无详细释义
              </div>
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

      {isMobile.current && (
        <button
          onClick={togglePlay}
          disabled={playPhrases.length === 0}
          className="fixed bottom-above-nav right-6 md:right-8 z-50 p-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:bg-slate-300 dark:disabled:bg-slate-700"
          aria-label={isPlaying ? "暂停播放" : "开始播放"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed right-6 md:right-8 z-50 p-3 bg-brand-500 text-white rounded-full shadow-lg hover:bg-brand-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 ${
            isMobile.current ? "bottom-above-nav-2" : "bottom-above-nav"
          }`}
          aria-label="回到顶部"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {!isMobile.current && (
        <div className="fixed bottom-bar-above-nav left-0 right-0 p-3 md:p-4 px-safe bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-40 transition-all">
          <div className="mx-auto flex items-center max-w-3xl xl:max-w-5xl 2xl:max-w-6xl relative">
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-500 font-medium w-12 text-center">
                {playPhrases.length > 0
                  ? `${Math.min(currentIndex + 1, playPhrases.length)}/${playPhrases.length}`
                  : "0/0"}
              </div>
              <div className="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-slate-700">
                {playPhrases.length > 0
                  ? `${Math.min(currentLoop + 1, repeatCount)}/${repeatCount}遍`
                  : `0/${repeatCount}遍`}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <span>每页:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                    setAdditionalCount(0);
                  }}
                  className="bg-transparent font-bold text-brand-600 dark:text-brand-400 outline-none cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <button
                onClick={togglePlay}
                disabled={playPhrases.length === 0}
                className="w-10 h-10 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full shadow-lg shadow-indigo-200 dark:shadow-none transition-transform active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
