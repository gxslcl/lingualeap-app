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
  EyeOff
} from "lucide-react";
import { WordItem, TTSConfig, Category } from "../types";
import { vocabularyData } from "../data/vocabulary";
import { ttsService } from "../services/ttsService";
import { storageService } from "../services/storage";

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

export const ListenView: React.FC<ListenViewProps> = ({ ttsConfig }) => {
  const savedSettings = storageService.getListenSettings();

  const [mode, setMode] = useState<"random" | "category">(savedSettings.mode);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    savedSettings.selectedCategory
  );
  const [batchSize, setBatchSize] = useState(savedSettings.batchSize);
  const [repeatCount, setRepeatCount] = useState(savedSettings.repeatCount);
  const [intervalMs, setIntervalMs] = useState(savedSettings.intervalMs);
  const [autoSwitch, setAutoSwitch] = useState(false);
  const [autoSwitchAfter, setAutoSwitchAfter] = useState(1);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [phraseMode, setPhraseMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [showChinese, setShowChinese] = useState(false); // 全局控制中文显示
  // 单独控制每个单词的中文显示
  const [revealedWords, setRevealedWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    storageService.saveListenSettings({
      mode,
      selectedCategory,
      batchSize,
      repeatCount,
      intervalMs,
    });
  }, [mode, selectedCategory, batchSize, repeatCount, intervalMs]);

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

  const [words, setWords] = useState<WordItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<"en" | "zh">("en");

  const isPlayingRef = useRef(false);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const activeWordPartRef = useRef<HTMLSpanElement>(null);

  const [timerShutdown, setTimerShutdown] = useState(false);
  const [shutdownTime, setShutdownTime] = useState(5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateBatch = useCallback(
    (autoPlay = false) => {
      let candidates = vocabularyData;

      if (mode === "category") {
        candidates = vocabularyData.filter(
          (w) => w.category === selectedCategory
        );
      }

      const shuffled = shuffle(candidates);
      setWords(shuffled.slice(0, batchSize));

      setCurrentIndex(0);
      setCurrentLoop(0);
      setCurrentPhase("en");
      setCompletedCycles(0);
      setCurrentWordIndex(null);
      // 清空已揭示的单词
      setRevealedWords(new Set());
      // 重置全局显示设置
      setShowChinese(false);

      if (autoPlay) {
        setIsPlaying(true);
        isPlayingRef.current = true;
      } else {
        setIsPlaying(false);
        isPlayingRef.current = false;
        ttsService.cancel();
      }
    },
    [batchSize, mode, selectedCategory]
  );

  useEffect(() => {
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
      playSequence();
    }
  };

  const handleNextBatch = () => {
    generateBatch(true);
  };

  // 切换特定单词的中文显示状态
  const toggleWordReveal = (wordId: string) => {
    setRevealedWords(prev => {
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
    if (batchSize === 20) return "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto";
    if (batchSize === 30)
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto";
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
    <div className="h-[calc(100vh-8rem)] flex flex-col w-full mx-auto px-2">
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
              {showChinese ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              显示中文
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto no-scrollbar pb-16 grid gap-2 content-start w-full transition-all duration-300 ${getGridClass()}`}
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
                  <div className="text-[10px] text-slate-400 font-mono truncate hidden sm:block">
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
                      <span>{word.chinese}</span>
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

      <div className="fixed bottom-0 left-0 right-0 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50 transition-all">
        <div
          className={`mx-auto flex items-center max-w-4xl relative ${
            window.innerWidth < 768 ? "mb-16" : ""
          }`}
        >
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