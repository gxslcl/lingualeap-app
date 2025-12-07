import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Award, CheckCircle2, XCircle, Volume2, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { WordItem, WordProgress, TTSConfig } from '../types';
import { vocabularyData } from '../data/vocabulary';
import { storageService } from '../services/storage';
import { calculateReview } from '../services/srs';
import { ttsService } from '../services/ttsService';

interface StudySessionProps {
  ttsConfig: TTSConfig;
  onComplete: () => void;
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export const StudySession: React.FC<StudySessionProps> = ({ ttsConfig, onComplete }) => {
  const [batch, setBatch] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, WordProgress>>({});
  const [batchSize, setBatchSize] = useState(10);
  
  // Quiz State
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false); // Prevent double clicks

  // Function to generate a new batch of words
  const generateBatch = useCallback(() => {
    const savedProgress = storageService.getProgress();
    setProgressMap(savedProgress);

    const now = Date.now();
    
    // 1. Find words due for review
    const dueWords = vocabularyData.filter(w => {
      const p = savedProgress[w.id];
      // If p exists and nextReview is in the past
      return p && p.nextReview <= now;
    });

    // 2. Find new words (never studied)
    const newWords = vocabularyData.filter(w => !savedProgress[w.id]);

    // 3. Create a batch of batchSize
    let sessionWords = [...dueWords];
    
    if (sessionWords.length < batchSize) {
      const shuffledNew = [...newWords].sort(() => 0.5 - Math.random());
      sessionWords = [...sessionWords, ...shuffledNew.slice(0, batchSize - sessionWords.length)];
    } else {
        sessionWords = sessionWords.slice(0, batchSize);
    }
    
    // Fallback if empty (if user mastered everything or no due words)
    // Just pick random words to keep practicing
    if (sessionWords.length === 0) {
         sessionWords = [...vocabularyData].sort(() => 0.5 - Math.random()).slice(0, batchSize);
    }

    setBatch(sessionWords);
    setCurrentIndex(0);
    setSessionComplete(false);
    setWrongAttempts(new Set());
    setSelectedOptionId(null);
    setIsProcessing(false);
  }, [batchSize]);

  // Initialize Session on mount
  useEffect(() => {
    generateBatch();
  }, [generateBatch]);

  // Generate Options when current index changes
  useEffect(() => {
    if (batch.length === 0 || currentIndex >= batch.length) return;

    const currentWord = batch[currentIndex];
    
    // 1. Pick 3 distractors
    const otherWords = vocabularyData.filter(w => w.id !== currentWord.id);
    const shuffledOthers = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // 2. Combine and Shuffle
    const quizOptions: QuizOption[] = [
        { id: currentWord.id, text: currentWord.chinese, isCorrect: true },
        ...shuffledOthers.map(w => ({ id: w.id, text: w.chinese, isCorrect: false }))
    ].sort(() => 0.5 - Math.random());

    setOptions(quizOptions);
    setSelectedOptionId(null);
    setWrongAttempts(new Set());
    setIsProcessing(false);

    // Auto-play audio on new word
    // Small timeout to ensure UI is ready and feels natural
    const timer = setTimeout(() => {
        ttsService.speak(currentWord.english, ttsConfig);
    }, 300);

    return () => clearTimeout(timer);

  }, [currentIndex, batch, ttsConfig]);

  const handleOptionClick = (option: QuizOption) => {
    if (isProcessing) return; // Block clicks during transition

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
       setWrongAttempts(prev => new Set(prev).add(option.id));
    }
  };

  const handleRate = (quality: number) => {
    const currentWord = batch[currentIndex];
    const currentP = progressMap[currentWord.id];
    
    const newProgress = calculateReview(currentP, quality);
    
    const updatedMap = { ...progressMap, [currentWord.id]: newProgress };
    setProgressMap(updatedMap);
    storageService.saveProgress(updatedMap);

    // Update stats reliably using service method
    const isMastered = newProgress.status === 'mastered' && currentP?.status !== 'mastered';
    storageService.updateWordStats(isMastered);

    // Delay before moving to next
    setTimeout(() => {
        if (currentIndex < batch.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setSessionComplete(true);
        }
    }, 800); // 0.8s delay to see the green success state
  };

  const handleContinue = () => {
      generateBatch();
  };

  if (batch.length === 0) return <div className="p-10 text-center dark:text-white">正在生成学习计划...</div>;

  if (sessionComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-6">
          <Award className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">本组学习完成!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">你已经完成了 {batch.length} 个单词的练习。</p>
        
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

  const currentWord = batch[currentIndex];

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col pt-4 pb-8 px-4">
      {/* Header: Progress & Category */}
      <div className="mb-6 space-y-2">
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
             <span>进度 {currentIndex + 1} / {batch.length}</span>
         </div>
         <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
                className="h-full bg-brand-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex) / batch.length) * 100}%` }}
            />
         </div>
      </div>

      {/* Main Card: Question */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 mb-6 relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 dark:bg-brand-900/20 rounded-full -mr-16 -mt-16 pointer-events-none" />
          
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-slate-700 px-3 py-1 rounded-full mb-6 z-10">
              {currentWord.category}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white text-center mb-4 z-10 break-words max-w-full">
              {currentWord.english}
          </h2>
          
          <div className="flex items-center gap-3 z-10">
              <span className="text-xl text-slate-400 dark:text-slate-500 font-mono">{currentWord.pronunciation}</span>
              <button 
                onClick={() => ttsService.speak(currentWord.english, ttsConfig)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-brand-500 hover:scale-110 transition-transform"
              >
                  <Volume2 className="w-5 h-5" />
              </button>
          </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-3">
          {options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isWrong = wrongAttempts.has(option.id);
              const showCorrect = isProcessing && option.isCorrect; // Show green if processing correct answer

              let buttonClass = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-slate-500";
              let icon = null;

              if (showCorrect || (isSelected && option.isCorrect)) {
                  buttonClass = "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400 shadow-md shadow-green-100 dark:shadow-none scale-[1.02]";
                  icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
              } else if (isWrong) {
                  buttonClass = "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400 animate-shake";
                  icon = <XCircle className="w-5 h-5 text-red-500" />;
              }

              return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    disabled={isProcessing || isWrong}
                    className={`
                        relative w-full p-4 md:p-5 rounded-xl border-2 font-bold text-lg transition-all duration-200 flex items-center justify-between
                        ${buttonClass}
                    `}
                  >
                      <span className="flex-1 text-center">{option.text}</span>
                      {icon && <div className="absolute right-4">{icon}</div>}
                  </button>
              );
          })}
      </div>

    </div>
  );
};