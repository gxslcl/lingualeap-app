import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Play,
  RotateCcw,
  Award,
  CheckCircle2,
  XCircle,
  Volume2,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  Speaker,
  X,
  Snail,
} from "lucide-react";
import { Category, PhraseItem, WordItem, WordProgress, TTSConfig } from "../types";
import { storageService } from "../services/storage";
import { calculateReview } from "../services/srs";
import { ttsService } from "../services/ttsService";
import { sessionService } from "../services/session";
// 内置数据 + 导入的自定义数据
import { customDataService } from "../services/customData";

interface StudySessionProps {
  ttsConfig: TTSConfig;
  onComplete: () => void;
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface PhraseToken {
  id: string;
  text: string;
  normalized: string;
}

// 听力拼句练习状态
type ListenPhase = 'idle' | 'answering' | 'checking' | 'feedback';

interface ListenExerciseState {
  phase: ListenPhase;
  playsRemaining: number;
  selectedTokens: PhraseToken[];
  availableTokens: PhraseToken[];
  targetTokens: PhraseToken[];
  feedback: 'correct' | 'wrong' | null;
  showAnswer: boolean;
}

// 难度级别定义
type DifficultyLevel = 'short' | 'medium' | 'long';

interface DifficultyConfig {
  label: string;
  minWords: number;
  maxWords: number;
  color: string;
}

const DIFFICULTY_CONFIG: Record<DifficultyLevel, DifficultyConfig> = {
  short: { label: '短句', minWords: 1, maxWords: 5, color: 'bg-emerald-500' },
  medium: { label: '中句', minWords: 5, maxWords: 7, color: 'bg-amber-500' },
  long: { label: '长句', minWords: 8, maxWords: Infinity, color: 'bg-rose-500' },
};

const getDifficultyByLength = (wordCount: number): DifficultyLevel => {
  if (wordCount <= 5) return 'short';
  if (wordCount <= 7) return 'medium';
  return 'long';
};

export const StudySession: React.FC<StudySessionProps> = ({
  ttsConfig,
  onComplete,
}) => {
  const [studyMode, setStudyMode] = useState<"quiz" | "listen">("quiz");
  const [batch, setBatch] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, WordProgress>>(
    {}
  );
  const [batchSize, setBatchSize] = useState(10);

  // 听力拼句状态（多邻国风格）
  const [phraseBatch, setPhraseBatch] = useState<PhraseItem[]>([]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [listenComplete, setListenComplete] = useState(false);
  const sessionStartTime = useRef<number>(Date.now());
  const [listenState, setListenState] = useState<ListenExerciseState>({
    phase: 'idle',
    playsRemaining: 3,
    selectedTokens: [],
    availableTokens: [],
    targetTokens: [],
    feedback: null,
    showAnswer: false,
  });
  const MAX_PLAYS = 3; // 最多播放次数

  // 难度选择 - 支持多选
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<DifficultyLevel>>(
    new Set<DifficultyLevel>(),
  );

  // Quiz State
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false); // Prevent double clicks
  const [eliminatedOptionIds, setEliminatedOptionIds] = useState<Set<string>>(
    new Set()
  );
  const [hintUsed, setHintUsed] = useState(false);
  const quizTtsTimerRef = useRef<number | null>(null);
  const nextWordTimerRef = useRef<number | null>(null);
  const nextPhraseTimerRef = useRef<number | null>(null);
  const phraseTtsTimerRef = useRef<number | null>(null);

  // Function to generate a new batch of words
  const generateBatch = useCallback(() => {
    const savedProgress = storageService.getProgress();
    setProgressMap(savedProgress);

    const now = Date.now();

    // 1. Find words due for review
    const dueWords = customDataService.allWords().filter((w) => {
      const p = savedProgress[w.id];
      // If p exists and nextReview is in the past
      return p && p.nextReview <= now;
    });

    // 2. Find new words (never studied)
    const newWords = customDataService.allWords().filter((w) => !savedProgress[w.id]);

    // 3. Create a batch of batchSize
    let sessionWords = [...dueWords];

    if (sessionWords.length < batchSize) {
      const shuffledNew = [...newWords].sort(() => 0.5 - Math.random());
      sessionWords = [
        ...sessionWords,
        ...shuffledNew.slice(0, batchSize - sessionWords.length),
      ];
    } else {
      sessionWords = sessionWords.slice(0, batchSize);
    }

    // Fallback if empty (if user mastered everything or no due words)
    // Just pick random words to keep practicing
    if (sessionWords.length === 0) {
      sessionWords = [...customDataService.allWords()]
        .sort(() => 0.5 - Math.random())
        .slice(0, batchSize);
    }

    setBatch(sessionWords);
    setCurrentIndex(0);
    setSessionComplete(false);
    setWrongAttempts(new Set());
    setSelectedOptionId(null);
    setIsProcessing(false);
  }, [batchSize]);

  const generatePhraseBatch = useCallback(() => {
    let filtered = customDataService.allPhrases();

    // 根据难度过滤句子 - 支持多选
    if (selectedDifficulties.size > 0) {
      filtered = customDataService.allPhrases().filter(phrase => {
        const wordCount = phrase.english.split(/\s+/).length;
        const difficulty = getDifficultyByLength(wordCount);
        return selectedDifficulties.has(difficulty);
      });
    }

    // 如果过滤后为空，使用全部数据
    if (filtered.length === 0) {
      filtered = customDataService.allPhrases();
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setPhraseBatch(shuffled.slice(0, batchSize));
    setPhraseIndex(0);
    setListenComplete(false);
    resetListenState();
  }, [batchSize, selectedDifficulties]);

  const resetListenState = () => {
    setListenState({
      phase: 'answering',
      playsRemaining: MAX_PLAYS,
      selectedTokens: [],
      availableTokens: [],
      targetTokens: [],
      feedback: null,
      showAnswer: false,
    });
  };

  const tokenizePhrase = (sentence: string): PhraseToken[] => {
    const tokens = sentence
      .replace(/[^\w\s']/g, " ")
      .split(/\s+/)
      .filter((word) => word.trim().length > 0);
    return tokens.map((word, index) => ({
      id: `${word}-${index}`,
      text: word,
      normalized: word.toLowerCase(),
    }));
  };

  const buildExtraTokens = (baseTokens: PhraseToken[]) => {
    const normalizedSet = new Set(
      baseTokens.map((token) => token.normalized)
    );
    const pool = customDataService.allWords()
      .filter((word) => word.category === Category.DailyLife)
      .map((word) => word.english)
      .filter((word) => !normalizedSet.has(word.toLowerCase()));
    const uniquePool = Array.from(
      new Set(pool.map((word) => word.toLowerCase()))
    );
    const extraCount = Math.min(
      4,
      Math.max(2, Math.floor(Math.random() * 3) + 2),
      uniquePool.length
    );
    return uniquePool
      .sort(() => 0.5 - Math.random())
      .slice(0, extraCount)
      .map((word, index) => ({
        id: `extra-${word}-${index}`,
        text: word,
        normalized: word.toLowerCase(),
      }));
  };

  // 恢复上次未完成的批次（关闭应用后接着学）
  const restoredBatch: WordItem[] | null = (() => {
    const saved = sessionService.getViewState<{ batchIds: string[] }>("study");
    const ids = saved?.batchIds;
    if (!ids || ids.length === 0) return null;
    const pool = new Map(customDataService.allWords().map((w) => [w.id, w]));
    const list = ids.map((id) => pool.get(id)).filter(Boolean) as WordItem[];
    return list.length > 0 ? list : null;
  })();
  const restoredIndex = sessionService.getViewState<{ currentIndex: number }>("study")?.currentIndex ?? 0;
  const skipInitialGenerate = useRef(!!restoredBatch);

  // Initialize Session on mount
  useEffect(() => {
    if (skipInitialGenerate.current) {
      // 用恢复出来的批次，避免把上次的进度冲掉
      skipInitialGenerate.current = false;
      setBatch(restoredBatch ?? []);
      setCurrentIndex(restoredIndex);
    } else {
      generateBatch();
    }
    sessionStartTime.current = Date.now();
  }, [generateBatch]);

  // 记录当前批次与进度，供下次启动恢复
  useEffect(() => {
    if (batch.length === 0) return;
    sessionService.patchViewState("study", {
      batchIds: batch.map((w) => w.id),
      currentIndex,
    });
  }, [batch, currentIndex]);

  // 听力拼句模块暂时隐藏，不需要自动加载
  // useEffect(() => {
  //   generatePhraseBatch();
  // }, [generatePhraseBatch]);

  // 记录学习时间 - 在会话完成时保存
  useEffect(() => {
    if (sessionComplete || listenComplete) {
      const studyTimeMinutes = (Date.now() - sessionStartTime.current) / 60000;
      if (studyTimeMinutes > 0.1) { // 至少学习 6 秒才记录
        storageService.updateStudyTime(Math.round(studyTimeMinutes * 10) / 10);
      }
    }
  }, [sessionComplete, listenComplete]);

  useEffect(() => {
    return () => {
      if (quizTtsTimerRef.current !== null) {
        clearTimeout(quizTtsTimerRef.current);
        quizTtsTimerRef.current = null;
      }
      if (phraseTtsTimerRef.current !== null) {
        clearTimeout(phraseTtsTimerRef.current);
        phraseTtsTimerRef.current = null;
      }
      if (nextWordTimerRef.current !== null) {
        clearTimeout(nextWordTimerRef.current);
        nextWordTimerRef.current = null;
      }
      if (nextPhraseTimerRef.current !== null) {
        clearTimeout(nextPhraseTimerRef.current);
        nextPhraseTimerRef.current = null;
      }
      ttsService.cancel();
    };
  }, []);

  // Generate Options when current index changes
  useEffect(() => {
    if (batch.length === 0 || currentIndex >= batch.length) return;

    const currentWord = batch[currentIndex];

    // 1. Pick 3 distractors
    const otherWords = customDataService.allWords().filter((w) => w.id !== currentWord.id);
    const shuffledOthers = [...otherWords]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // 2. Combine and Shuffle
    const quizOptions: QuizOption[] = [
      { id: currentWord.id, text: currentWord.chinese, isCorrect: true },
      ...shuffledOthers.map((w) => ({
        id: w.id,
        text: w.chinese,
        isCorrect: false,
      })),
    ].sort(() => 0.5 - Math.random());

    setOptions(quizOptions);
    setSelectedOptionId(null);
    setWrongAttempts(new Set());
    setIsProcessing(false);
    setEliminatedOptionIds(new Set());
    setHintUsed(false);

    // Auto-play audio on new word - DISABLED
    // Small timeout to ensure UI is ready and feels natural
    // if (quizTtsTimerRef.current !== null) {
    //   clearTimeout(quizTtsTimerRef.current);
    // }
    // const timer = window.setTimeout(() => {
    //   ttsService.speak(currentWord.english, ttsConfig);
    // }, 300);
    // quizTtsTimerRef.current = timer;

    return () => {
      if (quizTtsTimerRef.current !== null) {
        clearTimeout(quizTtsTimerRef.current);
        quizTtsTimerRef.current = null;
      }
      ttsService.cancel();
    };
  }, [currentIndex, batch, ttsConfig]);

  useEffect(() => {
    if (phraseBatch.length === 0 || phraseIndex >= phraseBatch.length) return;

    const phrase = phraseBatch[phraseIndex];
    const tokens = tokenizePhrase(phrase.english);
    const extras = buildExtraTokens(tokens);
    const shuffled = [...tokens, ...extras].sort(() => 0.5 - Math.random());

    setListenState(prev => ({
      phase: 'answering',
      playsRemaining: MAX_PLAYS,
      selectedTokens: [],
      availableTokens: shuffled,
      targetTokens: tokens,
      feedback: null,
      showAnswer: false,
    }));

    // 进入新题目时自动播放一次音频
    if (phraseTtsTimerRef.current !== null) {
      clearTimeout(phraseTtsTimerRef.current);
    }
    const timer = window.setTimeout(() => {
      ttsService.speak(phrase.english, ttsConfig, "en-US");
    }, 500);
    phraseTtsTimerRef.current = timer;

    return () => {
      clearTimeout(timer);
      if (phraseTtsTimerRef.current === timer) {
        phraseTtsTimerRef.current = null;
      }
      ttsService.cancel();
    };
  }, [phraseBatch, phraseIndex, ttsConfig]);

  const handleOptionClick = (option: QuizOption) => {
    if (isProcessing) return; // Block clicks during transition
    if (eliminatedOptionIds.has(option.id)) return;

    if (option.isCorrect) {
      // Correct Answer
      setIsProcessing(true);
      setSelectedOptionId(option.id);

      // Calculate SRS Quality
      // If 0 wrong attempts: Easy (5)
      // If 1+ wrong attempts: Hard (2) -> Effectively means 'Review'
      const quality = wrongAttempts.size === 0 ? 5 : 2;
      handleRate(quality);
    } else {
      // Wrong Answer
      setWrongAttempts((prev) => new Set(prev).add(option.id));
    }
  };

  const handleTokenPick = (token: PhraseToken) => {
    setListenState(prev => ({
      ...prev,
      availableTokens: prev.availableTokens.filter((item) => item.id !== token.id),
      selectedTokens: [...prev.selectedTokens, token],
      feedback: null,
    }));
  };

  const handleTokenRemove = (token: PhraseToken) => {
    setListenState(prev => ({
      ...prev,
      selectedTokens: prev.selectedTokens.filter((item) => item.id !== token.id),
      availableTokens: [...prev.availableTokens, token],
      feedback: null,
    }));
  };

  const handleUndoToken = () => {
    setListenState(prev => {
      if (prev.selectedTokens.length === 0) return prev;
      const last = prev.selectedTokens[prev.selectedTokens.length - 1];
      return {
        ...prev,
        selectedTokens: prev.selectedTokens.slice(0, -1),
        availableTokens: [...prev.availableTokens, last],
        feedback: null,
      };
    });
  };

  const handleClearTokens = () => {
    setListenState(prev => {
      if (prev.selectedTokens.length === 0) return prev;
      return {
        ...prev,
        availableTokens: [...prev.availableTokens, ...prev.selectedTokens],
        selectedTokens: [],
        feedback: null,
      };
    });
  };

  const handlePhraseRefresh = () => {
    generatePhraseBatch();
  };

  const handleCheck = () => {
    if (listenState.selectedTokens.length === 0) return;

    const selected = listenState.selectedTokens.map((token) => token.normalized).join(" ");
    const target = listenState.targetTokens.map((token) => token.normalized).join(" ");
    const isCorrect = selected === target;

    setListenState(prev => ({
      ...prev,
      phase: 'feedback',
      feedback: isCorrect ? 'correct' : 'wrong',
      showAnswer: true,
    }));

    if (isCorrect) {
      // 答对后自动进入下一题
      if (phraseIndex < phraseBatch.length - 1) {
        if (nextPhraseTimerRef.current !== null) {
          clearTimeout(nextPhraseTimerRef.current);
        }
        nextPhraseTimerRef.current = window.setTimeout(() => {
          setPhraseIndex((prev) => prev + 1);
        }, 1200);
      } else {
        setListenComplete(true);
      }
    }
    // 答错时不自动跳转，让用户重新尝试
  };

  const handleNextPhrase = () => {
    if (phraseIndex < phraseBatch.length - 1) {
      setPhraseIndex((prev) => prev + 1);
    }
  };

  const handlePrevPhrase = () => {
    if (phraseIndex > 0) {
      setPhraseIndex((prev) => prev - 1);
    }
  };

  const handleHint = () => {
    if (hintUsed) return;
    const wrongOptions = options.filter((option) => !option.isCorrect);
    if (wrongOptions.length === 0) return;
    const shuffled = [...wrongOptions].sort(() => 0.5 - Math.random());
    const eliminateCount = Math.min(2, shuffled.length);
    const eliminated = new Set(
      shuffled.slice(0, eliminateCount).map((option) => option.id)
    );
    setEliminatedOptionIds(eliminated);
    setHintUsed(true);
  };

  const playPhrase = (rate: number) => {
    const phrase = phraseBatch[phraseIndex];
    if (!phrase) return;
    ttsService.speak(phrase.english, { ...ttsConfig, rate }, "en-US");
  };

  // 逐词播放
  const playPhraseWordByWord = () => {
    const phrase = phraseBatch[phraseIndex];
    if (!phrase) return;
    // 使用 slowSpeak 方法，每个单词之间间隔 200ms
    ttsService.slowSpeak(phrase.english, ttsConfig, 200);
  };

  const handleRate = (quality: number) => {
    const currentWord = batch[currentIndex];
    const currentP = progressMap[currentWord.id];

    const newProgress = calculateReview(currentP, quality);

    const updatedMap = { ...progressMap, [currentWord.id]: newProgress };
    setProgressMap(updatedMap);
    storageService.saveProgress(updatedMap);

    // Update stats reliably using service method
    const isMastered =
      newProgress.status === "mastered" && currentP?.status !== "mastered";
    storageService.updateWordStats(isMastered);

    // Delay before moving to next
    if (nextWordTimerRef.current !== null) {
      clearTimeout(nextWordTimerRef.current);
    }
    nextWordTimerRef.current = window.setTimeout(() => {
      if (currentIndex < batch.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setSessionComplete(true);
      }
    }, 800); // 0.8s delay to see the green success state
  };

  const handleContinue = () => {
    generateBatch();
  };

  const currentWord = batch[currentIndex];
  const currentPhrase = phraseBatch[phraseIndex];
  const progressCurrent = studyMode === "quiz" ? currentIndex : phraseIndex;
  const progressTotal = studyMode === "quiz" ? batch.length : phraseBatch.length;
  const progressRatio =
    progressTotal > 0 ? (progressCurrent / progressTotal) * 100 : 0;
  const slowRate = Math.max(0.6, ttsConfig.rate * 0.7);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (studyMode === "quiz") {
        if (event.key === " ") {
          event.preventDefault();
          if (currentWord) {
            ttsService.speak(currentWord.english, ttsConfig);
          }
          return;
        }
        if (event.key.toLowerCase() === "h") {
          event.preventDefault();
          handleHint();
          return;
        }
        const number = Number(event.key);
        if (!Number.isNaN(number) && number >= 1 && number <= 4) {
          const option = options[number - 1];
          if (
            option &&
            !isProcessing &&
            !eliminatedOptionIds.has(option.id) &&
            !wrongAttempts.has(option.id)
          ) {
            handleOptionClick(option);
          }
        }
        return;
      }

      if (studyMode === "listen") {
        if (event.key === " ") {
          event.preventDefault();
          playPhrase(ttsConfig.rate);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          handleCheck();
          return;
        }
        if (event.key === "Backspace") {
          event.preventDefault();
          handleUndoToken();
          return;
        }
        if (event.key.toLowerCase() === "c") {
          event.preventDefault();
          handleClearTokens();
          return;
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          handlePrevPhrase();
          return;
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          handleNextPhrase();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    studyMode,
    currentWord,
    ttsConfig,
    options,
    isProcessing,
    eliminatedOptionIds,
    wrongAttempts,
    listenState,
    phraseIndex,
    phraseBatch.length,
    hintUsed,
  ]);

  if (studyMode === "quiz" && batch.length === 0)
    return (
      <div className="p-10 text-center dark:text-white">
        正在生成学习计划...
      </div>
    );

  if (studyMode === "listen" && phraseBatch.length === 0)
    return (
      <div className="p-10 text-center dark:text-white">
        正在生成听力练习...
      </div>
    );

  if (studyMode === "quiz" && sessionComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-6">
          <Award className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          本组学习完成!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          你已经完成了 {batch.length} 个单词的练习。
        </p>

        <div className="flex items-center gap-2 mb-8 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
          <SlidersHorizontal className="w-4 h-4" />
          <span>下一组数量:</span>
          <select
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="bg-transparent font-bold text-brand-600 dark:text-brand-400 outline-none cursor-pointer"
          >
            <option value={5}>5个</option>
            <option value={10}>10个</option>
            <option value={20}>20个</option>
            <option value={30}>30个</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onComplete}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            返回统计
          </button>
          <button
            onClick={handleContinue}
            className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-lg shadow-brand-200 dark:shadow-none flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            继续
          </button>
        </div>
      </div>
    );
  }

  if (studyMode === "listen" && listenComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-6">
          <Play className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          本组听力完成!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          你已经完成了 {phraseBatch.length} 个短句练习。
        </p>
        <div className="flex items-center gap-2 mb-8 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
          <SlidersHorizontal className="w-4 h-4" />
          <span>下一组数量:</span>
          <select
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="bg-transparent font-bold text-brand-600 dark:text-brand-400 outline-none cursor-pointer"
          >
            <option value={5}>5个</option>
            <option value={10}>10个</option>
            <option value={20}>20个</option>
            <option value={30}>30个</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onComplete}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            返回统计
          </button>
          <button
            onClick={generatePhraseBatch}
            className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-lg shadow-brand-200 dark:shadow-none flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            继续
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl lg:max-w-3xl 2xl:max-w-4xl mx-auto h-full flex flex-col pt-4 pb-8 px-4">
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStudyMode("quiz")}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              studyMode === "quiz"
                ? "bg-brand-500 text-white shadow-md"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            选择题
          </button>
          <button
            onClick={() => {
              setStudyMode("listen");
              generatePhraseBatch();
            }}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              studyMode === "listen"
                ? "bg-brand-500 text-white shadow-md"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            听力拼句
          </button>
        </div>
        {studyMode === "listen" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">难度:</span>
            {(['short', 'medium', 'long'] as const).map((level) => {
              const isSelected = selectedDifficulties.has(level);
              return (
                <button
                  key={level}
                  onClick={() => {
                    setSelectedDifficulties(prev => {
                      const next = new Set(prev);
                      if (next.has(level)) {
                        next.delete(level);
                      } else {
                        next.add(level);
                      }
                      return next;
                    });
                    setTimeout(generatePhraseBatch, 50);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    isSelected
                      ? `${DIFFICULTY_CONFIG[level].color} text-white shadow-sm`
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {DIFFICULTY_CONFIG[level].label}
                </button>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between text-xs font-medium text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg">
            <span className="text-slate-500 dark:text-slate-400">每组:</span>
            <select
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="bg-transparent font-bold text-brand-600 dark:text-brand-400 outline-none cursor-pointer text-xs"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
          <span>
            进度 {Math.min(progressCurrent + 1, progressTotal)} / {progressTotal}
          </span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-300 ease-out"
            style={{ width: `${progressRatio}%` }}
          />
        </div>
      </div>

      {studyMode === "quiz" ? (
        <>
          <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 dark:bg-brand-900/20 rounded-full -mr-16 -mt-16 pointer-events-none" />

            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-700 px-3 py-1 rounded-full mb-6 z-10">
              {currentWord.category}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white text-center mb-4 z-10 break-words max-w-full">
              {currentWord.english}
            </h2>

            <div className="flex items-center gap-3 z-10">
              <span className="text-xl text-slate-400 dark:text-slate-500 ipa-text">
                {currentWord.pronunciation}
              </span>
              <button
                onClick={() => ttsService.speak(currentWord.english, ttsConfig)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-brand-500 hover:scale-110 transition-transform"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleHint}
                disabled={hintUsed}
                className="px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:hover:bg-white dark:disabled:hover:bg-slate-800"
              >
                提示
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isWrong = wrongAttempts.has(option.id);
              const showCorrect = isProcessing && option.isCorrect;
              const isEliminated = eliminatedOptionIds.has(option.id);

              let buttonClass =
                "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-slate-500";
              let icon = null;

              if (showCorrect || (isSelected && option.isCorrect)) {
                buttonClass =
                  "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400 shadow-md shadow-green-100 dark:shadow-none scale-[1.02]";
                icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
              } else if (isWrong) {
                buttonClass =
                  "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400 animate-shake";
                icon = <XCircle className="w-5 h-5 text-red-500" />;
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  disabled={isProcessing || isWrong || isEliminated}
                  className={`
                        relative w-full p-4 md:p-5 rounded-xl border-2 font-bold text-lg transition-all duration-200 flex items-center justify-between
                        ${buttonClass} ${isEliminated ? "opacity-40" : ""}
                    `}
                >
                  <span className="flex-1 text-center">
                    {Array.isArray(option.text)
                      ? option.text.join(", ")
                      : option.text}
                  </span>
                  {icon && <div className="absolute right-4">{icon}</div>}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* 听力拼句模式 - 多邻国风格 */}
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 md:p-8 mb-6 relative overflow-hidden">
            {/* 顶部装饰 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-full -mr-16 -mt-16 pointer-events-none" />

            {/* 难度标签和句子信息 */}
            <div className="flex items-center justify-between mb-6 z-10">
              <div className="flex items-center gap-2">
                {selectedDifficulties.size === 0 ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-slate-700 dark:bg-slate-200">
                    全部
                  </span>
                ) : (
                  Array.from<DifficultyLevel>(selectedDifficulties).map(level => (
                    <span key={level} className={`px-3 py-1 rounded-full text-xs font-bold text-white ${DIFFICULTY_CONFIG[level].color}`}>
                      {DIFFICULTY_CONFIG[level].label}
                    </span>
                  ))
                )}
                {currentPhrase && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {currentPhrase.english.split(/\s+/).length} 个单词
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playPhrase(ttsConfig.rate)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  播放
                </button>
                <button
                  onClick={playPhraseWordByWord}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-bold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all"
                >
                  <Snail className="w-4 h-4" />
                  逐词
                </button>
              </div>
            </div>

            {/* 句子显示区域（星号占位） */}
            <div className="mb-6 z-10">
              <div className="flex flex-wrap gap-2 items-center justify-center min-h-[60px]">
                {listenState.targetTokens.map((token, index) => {
                  const isSelected = listenState.selectedTokens.findIndex(t => t.id === token.id) !== -1;
                  return (
                    <div
                      key={token.id}
                      className={`px-4 py-2 rounded-xl font-bold text-lg transition-all ${
                        isSelected
                          ? 'bg-indigo-500 text-white shadow-md scale-105'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-500'
                      }`}
                    >
                      {isSelected ? token.text : '*'.repeat(Math.min(token.text.length, 8))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 已选词块区域 */}
            <div className="min-h-[80px] bg-slate-50 dark:bg-slate-700/40 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-2xl p-4 mb-4 z-10">
              {listenState.selectedTokens.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
                  点击下方单词组成句子
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {listenState.selectedTokens.map((token) => (
                    <button
                      key={token.id}
                      onClick={() => handleTokenRemove(token)}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:border-red-300 dark:hover:border-red-500 transition-all active:scale-95"
                    >
                      {token.text}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 中文翻译（答对后显示） */}
            {listenState.feedback === 'correct' && listenState.showAnswer && (
              <div className="mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 z-10">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentPhrase?.chinese}
                </p>
              </div>
            )}

            {/* 词库区域 - 始终显示 */}
            <div className="flex flex-wrap gap-2 min-h-[120px] p-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/50 z-10">
              {listenState.availableTokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => handleTokenPick(token)}
                  disabled={listenState.feedback === 'correct'}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-sm font-bold text-slate-600 dark:text-slate-200 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {token.text}
                </button>
              ))}
            </div>

            {/* 反馈遮罩层 */}
            {listenState.feedback === 'correct' && (
              <div className="absolute inset-0 rounded-3xl z-20 pointer-events-none animate-in fade-in duration-300 bg-green-500/10" />
            )}
          </div>

          {/* 控制按钮区域 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndoToken}
                disabled={listenState.selectedTokens.length === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-4 h-4" />
                撤销
              </button>
              <button
                onClick={handleClearTokens}
                disabled={listenState.selectedTokens.length === 0}
                className="px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                清空
              </button>
              <button
                onClick={handlePhraseRefresh}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                换一批
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* 反馈信息 */}
              {listenState.feedback === 'wrong' && (
                <span className="text-sm font-bold text-red-500 animate-in slide-in-from-right-2">
                  再试一次
                </span>
              )}
              {listenState.feedback === 'correct' && (
                <span className="text-sm font-bold text-emerald-500 animate-in slide-in-from-right-2">
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  正确!
                </span>
              )}

              {/* 检测按钮 */}
              {listenState.feedback !== 'correct' ? (
                <button
                  onClick={handleCheck}
                  disabled={listenState.selectedTokens.length === 0}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  检测
                </button>
              ) : (
                <button
                  onClick={handleNextPhrase}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold shadow-lg shadow-emerald-200 dark:shadow-none hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  继续
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
