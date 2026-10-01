import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RefreshCw,
  Settings2,
  SkipForward,
  Headphones,
  Timer,
  Shuffle,
  FolderOpen,
  Layers,
  MessageCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { WordItem, TTSConfig, Category, ListenSettings } from "../types";
import { vocabularyTiers, type VocabularyTier } from "../data/vocabularyTiers";
import { ttsService } from "../services/ttsService";
import { storageService } from "../services/storage";
import { sessionService } from "../services/session";
// 内置数据 + 导入的自定义数据
import { customDataService } from "../services/customData";

interface ListenViewProps {
  ttsConfig: TTSConfig;
}

function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const TIER_ORDER: VocabularyTier[] = ["core", "active", "extended", "reserve"];

type PlaybackStrategy = NonNullable<ListenSettings["playbackStrategy"]>;

const STRATEGY_LABELS: Record<PlaybackStrategy, string> = {
  focus: "高频巩固",
  balanced: "均衡输入",
  explore: "扩展输入",
};

function getTierMix(
  batchSize: number,
  playbackStrategy: PlaybackStrategy,
): Record<VocabularyTier, number> {
  if (batchSize <= 10) {
    if (playbackStrategy === "focus") {
      return { core: 7, active: 2, extended: 1, reserve: 0 };
    }
    if (playbackStrategy === "explore") {
      return { core: 3, active: 4, extended: 2, reserve: 1 };
    }
    return { core: 5, active: 3, extended: 2, reserve: 0 };
  }
  if (batchSize <= 20) {
    if (playbackStrategy === "focus") {
      return { core: 12, active: 5, extended: 3, reserve: 0 };
    }
    if (playbackStrategy === "explore") {
      return { core: 6, active: 8, extended: 5, reserve: 1 };
    }
    return { core: 9, active: 7, extended: 4, reserve: 0 };
  }
  if (playbackStrategy === "focus") {
    return { core: 19, active: 8, extended: 3, reserve: 0 };
  }
  if (playbackStrategy === "explore") {
    return { core: 8, active: 11, extended: 9, reserve: 2 };
  }
  return { core: 15, active: 10, extended: 4, reserve: 1 };
}

function buildTieredBatch(
  candidates: WordItem[],
  batchSize: number,
  playbackStrategy: PlaybackStrategy,
): WordItem[] {
  const pools: Record<VocabularyTier, WordItem[]> = {
    core: [],
    active: [],
    extended: [],
    reserve: [],
  };

  for (const word of candidates) {
    const tier = vocabularyTiers[word.id] ?? "extended";
    pools[tier].push(word);
  }

  for (const tier of TIER_ORDER) {
    pools[tier] = shuffle(pools[tier]);
  }

  const targetMix = getTierMix(batchSize, playbackStrategy);
  const selected: WordItem[] = [];
  const selectedIds = new Set<string>();

  const takeFromTier = (tier: VocabularyTier, count: number) => {
    for (const word of pools[tier]) {
      if (selected.length >= batchSize || count <= 0) break;
      if (selectedIds.has(word.id)) continue;
      selected.push(word);
      selectedIds.add(word.id);
      count -= 1;
    }
  };

  for (const tier of TIER_ORDER) {
    takeFromTier(tier, targetMix[tier]);
  }

  if (selected.length < batchSize) {
    const remainder = shuffle(candidates).filter((word) => !selectedIds.has(word.id));
    for (const word of remainder) {
      if (selected.length >= batchSize) break;
      selected.push(word);
      selectedIds.add(word.id);
    }
  }

  return shuffle(selected);
}

export const ListenView: React.FC<ListenViewProps> = ({ ttsConfig }) => {
  const savedSettings = storageService.getListenSettings();

  const [mode, setMode] = useState<"random" | "category">(savedSettings.mode);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    savedSettings.selectedCategory
  );
  const [batchSize, setBatchSize] = useState(savedSettings.batchSize);
  const [repeatCount, setRepeatCount] = useState(savedSettings.repeatCount);
  const [intervalMs, setIntervalMs] = useState(savedSettings.intervalMs);
  const [playbackStrategy, setPlaybackStrategy] = useState<PlaybackStrategy>(
    savedSettings.playbackStrategy || "balanced",
  );
  const [autoSwitch, setAutoSwitch] = useState(false);
  const [autoSwitchAfter, setAutoSwitchAfter] = useState(1);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [phraseMode, setPhraseMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [showChinese, setShowChinese] = useState(true); // 全局控制中文显示
  // 单独控制每个单词的中文显示
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    storageService.saveListenSettings({
      mode,
      selectedCategory,
      batchSize,
      repeatCount,
      intervalMs,
      playbackStrategy,
    });
  }, [mode, selectedCategory, batchSize, repeatCount, intervalMs, playbackStrategy]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSettingsMenu) {
        const settingsMenu = document.querySelector(".settings-menu-container");
        if (settingsMenu && !settingsMenu.contains(event.target as Node)) {
          setShowSettingsMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettingsMenu]);

  // 恢复上次听读的批次与进度（关闭应用后再打开接着听）
  const savedBatch = sessionService.getViewState<{
    wordIds: string[];
    currentIndex: number;
    currentLoop: number;
  }>("listen");
  const restoredWords: WordItem[] | null = (() => {
    const ids = savedBatch?.wordIds;
    if (!ids || ids.length === 0) return null;
    const pool = new Map(customDataService.allWords().map((w) => [w.id, w]));
    const list = ids.map((id) => pool.get(id)).filter(Boolean) as WordItem[];
    return list.length > 0 ? list : null;
  })();

  const [words, setWords] = useState<WordItem[]>(restoredWords ?? []);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => savedBatch?.currentIndex ?? 0);
  const [currentLoop, setCurrentLoop] = useState(() => savedBatch?.currentLoop ?? 0);
  const [currentPhase, setCurrentPhase] = useState<"en" | "zh">("en");
  /** 有可恢复的批次时不再自动生成新批次 */
  const skipInitialGenerate = useRef(!!restoredWords);

  // 记录进度，供下次启动恢复
  useEffect(() => {
    if (words.length === 0) return;
    sessionService.patchViewState("listen", {
      wordIds: words.map((w) => w.id),
      currentIndex,
      currentLoop,
    });
  }, [words, currentIndex, currentLoop]);

  const isPlayingRef = useRef(false);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const activeWordPartRef = useRef<HTMLSpanElement>(null);

  const [timerShutdown, setTimerShutdown] = useState(false);
  const [shutdownTime, setShutdownTime] = useState(5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateBatch = useCallback(
    (autoPlay = false) => {
      const allWords = customDataService.allWords();
      let candidates = allWords;

      if (mode === "category") {
        candidates = allWords.filter((w) => w.category === selectedCategory);
      }

      setWords(buildTieredBatch(candidates, batchSize, playbackStrategy));

      setCurrentIndex(0);
      setCurrentLoop(0);
      setCurrentPhase("en");
      setCompletedCycles(0);
      setCurrentWordIndex(null);
      // 清空已揭示的单词
      setRevealedWords(new Set());
      // 重置全局显示设置
      setShowChinese(true);

      if (autoPlay) {
        setIsPlaying(true);
        isPlayingRef.current = true;
      } else {
        setIsPlaying(false);
        isPlayingRef.current = false;
        ttsService.cancel();
      }
    },
    [batchSize, mode, selectedCategory, playbackStrategy]
  );

  useEffect(() => {
    // 已有恢复批次时跳过首次自动生成，避免把上次的进度冲掉
    if (skipInitialGenerate.current) {
      skipInitialGenerate.current = false;
      return;
    }
    generateBatch(false);
    return () => {
      ttsService.cancel();
    };
  }, [generateBatch]);

  const playSequence = () => {
    if (!isPlayingRef.current || words.length === 0) return;

    const currentWord = words[currentIndex];
    if (!currentWord) return;

    if (phraseMode && currentPhase === "en" && currentWordIndex === null) {
      ttsService.speak(
        currentWord.english,
        { ...ttsConfig, rate: ttsConfig.rate },
        "en-US",
        () => {
          if (!isPlayingRef.current) return;

          const wordsInPhrase = currentWord.english.split(/\s+/);
          if (wordsInPhrase.length > 1) {
            setCurrentWordIndex(0);
          } else {
            handleNextStep();
          }
        }
      );
      return;
    }

    if (phraseMode && currentPhase === "en" && currentWordIndex !== null) {
      const wordsInPhrase = currentWord.english.split(/\s+/);
      const wordToSpeak = wordsInPhrase[currentWordIndex];

      ttsService.speak(
        wordToSpeak,
        { ...ttsConfig, rate: ttsConfig.rate },
        "en-US",
        () => {
          if (!isPlayingRef.current) return;

          if (currentWordIndex < wordsInPhrase.length - 1) {
            setTimeout(
              () => {
                setCurrentWordIndex(currentWordIndex + 1);
              },
              intervalMs > 0 ? intervalMs : 100
            );
          } else {
            setTimeout(
              () => {
                setCurrentWordIndex(null);
                handleNextStep();
              },
              intervalMs > 0 ? intervalMs : 100
            );
          }
        }
      );
      return;
    }

    const text =
      currentPhase === "en" ? currentWord.english : currentWord.chinese;
    const lang = currentPhase === "en" ? "en-US" : "zh-CN";

    const config =
      currentPhase === "en"
        ? { ...ttsConfig, rate: ttsConfig.rate }
        : { ...ttsConfig, rate: 1.0 };

    ttsService.speak(text, config, lang, () => {
      if (!isPlayingRef.current) return;

      if (intervalMs > 0) {
        setTimeout(() => {
          if (!isPlayingRef.current) return;
          handleNextStep();
        }, intervalMs);
      } else {
        handleNextStep();
      }
    });
  };

  const handleNextStep = () => {
    if (currentPhase === "en") {
      setCurrentPhase("zh");
      setCurrentWordIndex(null);
    } else {
      if (currentLoop < repeatCount - 1) {
        setCurrentLoop((prev) => prev + 1);
        setCurrentPhase("en");
      } else {
        setCurrentLoop(0);
        setCurrentPhase("en");
        setCurrentWordIndex(null);

        // 每完成一个词记一次练习（统计面板的数据来源）
        storageService.recordPractice(1);

        if (currentIndex < words.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          if (autoSwitch) {
            const newCompletedCycles = completedCycles + 1;
            setCompletedCycles(newCompletedCycles);

            if (newCompletedCycles >= autoSwitchAfter) {
              setCompletedCycles(0);
              setTimeout(() => {
                handleNextBatch();
              }, 0);
            } else {
              setCurrentIndex(0);
            }
          } else {
            setCurrentIndex(0);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isPlaying && isPlayingRef.current) {
      playSequence();
    }
  }, [currentIndex, currentLoop, currentPhase, currentWordIndex, isPlaying]);

  useEffect(() => {
    if (activeWordRef.current && isPlaying) {
      activeWordRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (
      activeWordPartRef.current &&
      isPlaying &&
      phraseMode &&
      currentWordIndex !== null
    ) {
      activeWordPartRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentWordIndex, isPlaying, phraseMode]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      ttsService.cancel();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setRemainingTime(null);
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      if (timerShutdown && shutdownTime > 0) {
        setRemainingTime(shutdownTime * 60);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          setIsPlaying(false);
          isPlayingRef.current = false;
          ttsService.cancel();
          setCurrentIndex(0);
          setCurrentLoop(0);
          setCurrentPhase("en");
          setCurrentWordIndex(null);
          setRemainingTime(null);
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }, shutdownTime * 60 * 1000);
      }
      // 这里不再直接调用 playSequence()：setIsPlaying(true) 会触发表格下方的
      // 播放循环 effect，直接调用会导致同一句被连续朗读两次
      // （第二次会 cancel + FLUSH 掉第一次，在原生端还会产生多余的中断事件）。
    }
  };

  const handleNextBatch = () => {
    generateBatch(true);
  };

  // 切换特定单词的中文显示状态
  const toggleWordReveal = (wordId: string) => {
    setRevealedWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(wordId)) {
        newSet.delete(wordId);
      } else {
        newSet.add(wordId);
      }
      return newSet;
    });
  };

  const getGridClass = () => {
    if (phraseMode) {
      return "grid-cols-1";
    }

    if (batchSize === 10) return "grid-cols-1 max-w-md mx-auto";
    if (batchSize === 20) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-w-5xl 2xl:max-w-[1500px] mx-auto";
    if (batchSize === 30)
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mx-auto";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 mx-auto";
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout | null = null;

    if (timerShutdown && isPlaying && remainingTime !== null) {
      countdownInterval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval!);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [timerShutdown, isPlaying, remainingTime]);

  return (
    <div className="h-viewport flex flex-col w-full mx-auto px-2">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-3 mb-2 shadow-sm border border-slate-100 dark:border-slate-700 flex-shrink-0">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Headphones className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-slate-800 dark:text-white text-sm">
                听读模式
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode("random")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  mode === "random"
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700"
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <Shuffle className="w-3 h-3" />
                纯随机
              </button>
              <button
                onClick={() => setMode("category")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  mode === "category"
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700"
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <FolderOpen className="w-3 h-3" />
                分类
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {mode === "category" && (
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex-grow md:flex-grow-0">
                <Layers className="w-3 h-3 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category)
                  }
                  className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer w-full md:w-auto"
                >
                  {Object.values(Category).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Settings2 className="w-3 h-3 text-slate-400" />
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value={10}>10词 (1列)</option>
                <option value={20}>20词 (2列)</option>
                <option value={30}>30词 (3列)</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Layers className="w-3 h-3 text-slate-400" />
              <select
                value={playbackStrategy}
                onChange={(e) =>
                  setPlaybackStrategy(e.target.value as PlaybackStrategy)
                }
                className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="focus">{STRATEGY_LABELS.focus}</option>
                <option value="balanced">{STRATEGY_LABELS.balanced}</option>
                <option value="explore">{STRATEGY_LABELS.explore}</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Timer className="w-3 h-3 text-slate-400" />
              <select
                value={intervalMs}
                onChange={(e) => setIntervalMs(Number(e.target.value))}
                className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value={0}>0s (无间隔)</option>
                <option value={100}>0.1s</option>
                <option value={200}>0.2s</option>
                <option value={500}>0.5s</option>
                <option value={800}>0.8s</option>
                <option value={1200}>1.2s</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700/50 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <RefreshCw className="w-3 h-3 text-slate-400" />
              <select
                value={repeatCount}
                onChange={(e) => setRepeatCount(Number(e.target.value))}
                className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value={1}>1遍</option>
                <option value={2}>2遍</option>
                <option value={3}>3遍</option>
              </select>
            </div>

            <button
              onClick={() => setPhraseMode(!phraseMode)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border transition-colors text-xs font-bold ${
                phraseMode
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <MessageCircle className="w-3 h-3" />
              短句模式
            </button>

            {/* 恢复全局显示中文按钮 */}
            <button
              onClick={() => setShowChinese(!showChinese)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border transition-colors text-xs font-bold ${
                showChinese
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {showChinese ? (
                <EyeOff className="w-3 h-3" />
              ) : (
                <Eye className="w-3 h-3" />
              )}
              显示中文
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto no-scrollbar pb-24 grid gap-2 content-start w-full transition-all duration-300 ${getGridClass()}`}
      >
        {words.length > 0 ? (
          words.map((word, index) => {
            const isActive = index === currentIndex;
            const isReadingEn = isActive && isPlaying && currentPhase === "en";
            const isReadingZh = isActive && isPlaying && currentPhase === "zh";
            // 单词是否被单独揭示 或者 全局显示开启
            const isRevealed = revealedWords.has(word.id) || showChinese;

            return (
              <div
                key={`${word.id}-${index}`}
                ref={isActive ? activeWordRef : null}
                className={`
                            relative flex justify-between items-center px-3 py-1.5 rounded-lg border transition-all duration-100 cursor-pointer h-fit
                            ${phraseMode ? "w-full" : ""}
                            ${
                              isActive
                                ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-sm z-10"
                                : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-slate-600"
                            }
                        `}
                onClick={() => {
                  setCurrentIndex(index);
                  setCurrentLoop(0);
                  setCurrentPhase("en");
                  setCurrentWordIndex(null);
                  setIsPlaying(true);
                  isPlayingRef.current = true;
                }}
              >
                <div
                  className={`transition-opacity duration-200 flex-1 min-w-0 ${
                    isActive && !isReadingEn && !isReadingZh
                      ? "opacity-100"
                      : isActive && isReadingZh
                      ? "opacity-40"
                      : "opacity-100"
                  }`}
                >
                  {phraseMode && isActive && currentWordIndex !== null ? (
                    <div className="text-sm font-bold whitespace-normal">
                      {word.english.split(/\s+/).map((part, partIndex) => (
                        <span
                          key={partIndex}
                          ref={
                            partIndex === currentWordIndex
                              ? activeWordPartRef
                              : null
                          }
                          className={
                            partIndex === currentWordIndex
                              ? "text-indigo-600 dark:text-indigo-400 underline"
                              : "text-slate-800 dark:text-white"
                          }
                        >
                          {part}
                          {partIndex < word.english.split(/\s+/).length - 1
                            ? " "
                            : ""}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`text-sm font-bold ${
                        isReadingEn
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-800 dark:text-white"
                      } transition-colors whitespace-normal`}
                    >
                      {word.english}
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 ipa-text truncate hidden sm:block">
                    {word.pronunciation}
                  </div>
                </div>

                {isActive && (
                  <div className="mx-1 flex-shrink-0 self-start mt-1">
                    <div className="text-[9px] font-bold text-indigo-400 bg-white dark:bg-slate-800 px-1.5 rounded-full border border-indigo-100 dark:border-slate-700">
                      {currentLoop + 1}/{repeatCount}
                    </div>
                  </div>
                )}

                <div
                  className={`text-right transition-opacity duration-200 flex-1 min-w-0 ${
                    isActive && !isReadingEn && !isReadingZh
                      ? "opacity-100"
                      : isActive && isReadingEn
                      ? "opacity-40"
                      : "opacity-100"
                  }`}
                >
                  {isRevealed ? (
                    <div
                      className={`text-sm font-medium ${
                        isReadingZh
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-600 dark:text-slate-300"
                      } transition-colors whitespace-normal cursor-pointer flex items-center justify-end gap-1`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // 如果是全局显示中文，则不处理点击事件
                        if (!showChinese) {
                          toggleWordReveal(word.id);
                        }
                      }}
                    >
                      {/* <EyeOff className="w-3 h-3 flex-shrink-0" /> */}
                      <span>
                        {Array.isArray(word.chinese)
                          ? word.chinese.join(", ")
                          : word.chinese}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors whitespace-normal cursor-pointer flex items-center justify-end gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWordReveal(word.id);
                      }}
                    >
                      <Eye className="w-3 h-3 flex-shrink-0" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-12">
            <p>该分类下暂无单词</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-bar-above-nav left-0 right-0 p-2 px-safe bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-40 transition-all">
        <div className="mx-auto flex items-center max-w-4xl 2xl:max-w-6xl relative">
          <div className="flex items-center gap-1">
            <div className="text-xs text-slate-500 font-medium w-12 text-center">
              {words.length > 0 ? `${currentIndex + 1}/${words.length}` : "0/0"}
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={togglePlay}
              disabled={words.length === 0}
              className="w-10 h-10 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full shadow-lg shadow-indigo-200 dark:shadow-none transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {remainingTime !== null && (
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                {formatTime(remainingTime)}
              </div>
            )}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors font-bold text-xs active:scale-95"
              >
                <Settings2 className="w-3 h-3" />
                <span>播放设置</span>
              </button>

              {showSettingsMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50 settings-menu-container">
                  <div className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTimerShutdown(!timerShutdown);
                      }}
                      className={`flex items-center gap-2 text-xs font-bold ${
                        timerShutdown
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <Timer className="w-3 h-3" />
                      <span>定时关闭</span>
                    </button>

                    {timerShutdown && (
                      <select
                        value={shutdownTime}
                        onChange={(e) =>
                          setShutdownTime(Number(e.target.value))
                        }
                        className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-200 outline-none cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value={5}>5分钟</option>
                        <option value={10}>10分钟</option>
                        <option value={15}>15分钟</option>
                        <option value={20}>20分钟</option>
                        <option value={30}>30分钟</option>
                        <option value={60}>60分钟</option>
                      </select>
                    )}
                  </div>

                  <div className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAutoSwitch(!autoSwitch);
                      }}
                      className={`flex items-center gap-2 text-xs font-bold ${
                        autoSwitch
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${
                          autoSwitch ? "animate-spin" : ""
                        }`}
                      />
                      <span>自动切换</span>
                    </button>

                    {autoSwitch && (
                      <select
                        value={autoSwitchAfter}
                        onChange={(e) =>
                          setAutoSwitchAfter(Number(e.target.value))
                        }
                        className="bg-transparent text-xs font-bold text-slate-600 dark:text-slate-200 outline-none cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value={1}>1轮后</option>
                        <option value={2}>2轮后</option>
                        <option value={3}>3轮后</option>
                        <option value={5}>5轮后</option>
                      </select>
                    )}
                  </div>

                  <div className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextBatch();
                        setShowSettingsMenu(false);
                      }}
                      disabled={words.length === 0}
                      className="flex items-center gap-2 w-full text-left text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-50"
                    >
                      <SkipForward className="w-3 h-3" />
                      <span>换一批</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
