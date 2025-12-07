import React, { useEffect, useState } from 'react';
import { Award, Flame, Clock, BookOpen, Target, Brain } from 'lucide-react';
import { UserStats, Achievement } from '../types';
import { storageService } from '../services/storage';

export const StatisticsPanel: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(storageService.getStats());

  useEffect(() => {
    // Refresh stats when mounting
    setStats(storageService.getStats());
    const interval = setInterval(() => {
        setStats(storageService.getStats());
    }, 5000); // Poll every 5 seconds for live updates
    return () => clearInterval(interval);
  }, []);

  const achievements: Achievement[] = [
    { 
        id: 'first_blood', 
        title: '初出茅庐', 
        description: '完成第一次单词学习', 
        icon: '🌱', 
        unlocked: stats.todayCount > 0,
        condition: (s) => s.todayCount > 0 
    },
    { 
        id: 'streak_3', 
        title: '持之以恒', 
        description: '连续学习3天', 
        icon: '🔥', 
        unlocked: stats.streakDays >= 3,
        condition: (s) => s.streakDays >= 3
    },
    { 
        id: 'master_50', 
        title: '词汇达人', 
        description: '掌握50个单词', 
        icon: '🎓', 
        unlocked: stats.wordsLearned >= 50,
        condition: (s) => s.wordsLearned >= 50
    },
     { 
        id: 'time_100', 
        title: '专注大师', 
        description: '累计学习100分钟', 
        icon: '⏳', 
        unlocked: stats.totalStudyTime >= 100,
        condition: (s) => s.totalStudyTime >= 100
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-bottom-4">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-lg">
           <div className="flex items-center gap-2 mb-2 opacity-90">
             <Flame className="w-5 h-5" />
             <span className="text-sm font-bold">连续打卡</span>
           </div>
           <div className="text-3xl font-bold">{stats.streakDays} <span className="text-sm font-normal opacity-80">天</span></div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 text-white shadow-lg">
           <div className="flex items-center gap-2 mb-2 opacity-90">
             <BookOpen className="w-5 h-5" />
             <span className="text-sm font-bold">已掌握</span>
           </div>
           <div className="text-3xl font-bold">{stats.wordsLearned} <span className="text-sm font-normal opacity-80">词</span></div>
        </div>

        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 text-white shadow-lg">
           <div className="flex items-center gap-2 mb-2 opacity-90">
             <Clock className="w-5 h-5" />
             <span className="text-sm font-bold">累计时长</span>
           </div>
           <div className="text-3xl font-bold">{Math.floor(stats.totalStudyTime)} <span className="text-sm font-normal opacity-80">分</span></div>
        </div>
        
        <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl p-4 text-white shadow-lg">
           <div className="flex items-center gap-2 mb-2 opacity-90">
             <Target className="w-5 h-5" />
             <span className="text-sm font-bold">今日学习</span>
           </div>
           <div className="text-3xl font-bold">{stats.todayCount} <span className="text-sm font-normal opacity-80">次</span></div>
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            成就里程碑
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
                <div 
                    key={achievement.id}
                    className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                        achievement.unlocked 
                        ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600' 
                        : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-60 grayscale'
                    }`}
                >
                    <div className="text-4xl mr-4">{achievement.icon}</div>
                    <div>
                        <h4 className={`font-bold ${achievement.unlocked ? 'text-slate-800 dark:text-white' : 'text-slate-500'}`}>
                            {achievement.title}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && <Award className="w-6 h-6 text-yellow-500 ml-auto" />}
                </div>
            ))}
        </div>
      </div>

      {/* Recommended for Review */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
          <div className="flex items-center gap-3 mb-2">
              <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">学习建议</h3>
          </div>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
             根据艾宾浩斯遗忘曲线，建议你今天再复习 {stats.todayCount > 20 ? '0' : 20 - stats.todayCount} 个单词以达到最佳记忆效果。
             坚持每天打卡，记忆效率提升 80%！
          </p>
      </div>
    </div>
  );
};