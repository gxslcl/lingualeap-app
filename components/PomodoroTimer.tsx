import React, { useState, useEffect } from 'react';
import { Timer, Pause, Play, RotateCcw } from 'lucide-react';
import { storageService } from '../services/storage';

export const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
           if (time % 60 === 0) {
               // Update stats every minute
               storageService.updateStudyTime(1/60); // Add 1 second worth of minute
           }
           return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setSessionCount(prev => prev + 1);
      // Play sound or notify
      alert("专注时间结束！休息一下吧。");
      setTimeLeft(25 * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Log time in larger chunks to storage for performance
  useEffect(() => {
      if (isActive) {
          const saveInterval = setInterval(() => {
             storageService.updateStudyTime(1); // 1 minute
          }, 60000);
          return () => clearInterval(saveInterval);
      }
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-3 flex items-center gap-3">
      <div className={`p-2 rounded-full ${isActive ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
        <Timer className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xl font-mono font-bold text-slate-800 dark:text-white tabular-nums leading-none">
          {formatTime(timeLeft)}
        </div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
           {isActive ? '专注中...' : '番茄钟'}
        </div>
      </div>
      <div className="flex gap-1 ml-2">
        <button 
            onClick={toggleTimer}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button 
            onClick={resetTimer}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};