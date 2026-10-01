import React, { useEffect, useState } from 'react';
import { Award, Flame, Clock, BookOpen, Target, Brain, Trophy, Sparkles } from 'lucide-react';
import { Achievement, UserStats, DailyRecord } from '../types';
import { storageService } from '../services/storage';
import { customDataService } from '../services/customData';

/** 近 7 日趋势图（柱高用像素，避免百分比高度在 flex 容器里解析不到而看不见） */
const CHART_HEIGHT = 96;

/** 本地时区的今天（与 storage 里的日期键保持一致） */
function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

const WeeklyChart: React.FC<{ history: DailyRecord[] }> = ({ history }) => {
  const max = Math.max(1, ...history.map((d) => d.count));
  const today = todayKey();
  return (
    <div className="flex items-end justify-between gap-1.5">
      {history.map((day) => {
        const ratio = day.count / max;
        const isToday = day.date === today;
        return (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
              {day.count}
            </span>
            <div className="w-full flex justify-center" style={{ height: CHART_HEIGHT }}>
              <div
                className={`w-full max-w-[28px] rounded-t-md self-end transition-all ${
                  isToday
                    ? 'bg-gradient-to-t from-brand-400 to-brand-600'
                    : 'bg-slate-200 dark:bg-slate-600'
                }`}
                style={{ height: Math.max(4, ratio * CHART_HEIGHT) }}
                title={`${day.date}：${day.count} 次 / ${day.minutes} 分钟`}
              />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
              {day.date.slice(5).replace('-', '/')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const StatisticsPanel: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(() => storageService.getStats());
  const [history, setHistory] = useState<DailyRecord[]>(() => storageService.getDailyHistory(7));
  const [mastered, setMastered] = useState(() => storageService.getMasteredCount());
  const [totalWords, setTotalWords] = useState(() => customDataService.allWords().length);

  useEffect(() => {
    const refresh = () => {
      setStats(storageService.getStats());
      setHistory(storageService.getDailyHistory(7));
      setMastered(storageService.getMasteredCount());
      setTotalWords(customDataService.allWords().length);
    };
    refresh();
    const interval = setInterval(refresh, 5000);
    // 导入数据后总数会变化
    const unsub = customDataService.subscribe(refresh);
    return () => {
      clearInterval(interval);
      unsub();
    };
  }, []);

  const goal = 20;
  const goalReached = Math.min(1, stats.todayCount / goal);

  const achievements: Achievement[] = [
    {
      id: 'first_blood',
      title: '初出茅庐',
      description: '完成第一次学习',
      icon: '🌱',
      unlocked: stats.todayCount > 0 || (stats.totalPracticed ?? 0) > 0,
      condition: (s) => s.todayCount > 0,
    },
    {
      id: 'streak_3',
      title: '持之以恒',
      description: '连续学习 3 天',
      icon: '🔥',
      unlocked: stats.streakDays >= 3,
      condition: (s) => s.streakDays >= 3,
    },
    {
      id: 'master_50',
      title: '词汇达人',
      description: '掌握 50 个单词',
      icon: '🎓',
      unlocked: mastered >= 50,
      condition: () => mastered >= 50,
    },
    {
      id: 'time_100',
      title: '专注大师',
      description: '累计学习 100 分钟',
      icon: '⏳',
      unlocked: stats.totalStudyTime >= 100,
      condition: (s) => s.totalStudyTime >= 100,
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-bottom-4 pb-page">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Flame className="w-5 h-5" />
            <span className="text-sm font-bold">连续打卡</span>
          </div>
          <div className="text-3xl font-bold">
            {stats.streakDays} <span className="text-sm font-normal opacity-80">天</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-bold">已掌握</span>
          </div>
          <div className="text-3xl font-bold">
            {mastered} <span className="text-sm font-normal opacity-80">词</span>
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">共 {totalWords} 词</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-bold">累计时长</span>
          </div>
          <div className="text-3xl font-bold">
            {Math.floor(stats.totalStudyTime)} <span className="text-sm font-normal opacity-80">分</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Target className="w-5 h-5" />
            <span className="text-sm font-bold">今日学习</span>
          </div>
          <div className="text-3xl font-bold">
            {stats.todayCount} <span className="text-sm font-normal opacity-80">次</span>
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">累计 {stats.totalPracticed ?? 0} 次</div>
        </div>
      </div>

      {/* 今日目标进度 */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            今日目标
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {stats.todayCount} / {goal}
          </span>
        </div>
        <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
            style={{ width: `${goalReached * 100}%` }}
          />
        </div>
      </section>

      {/* 近 7 日趋势 */}
      <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          近 7 日学习量
        </h3>
        <WeeklyChart history={history} />
      </section>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          成就里程碑
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
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
                <h4
                  className={`font-bold ${
                    achievement.unlocked ? 'text-slate-800 dark:text-white' : 'text-slate-500'
                  }`}
                >
                  {achievement.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {achievement.description}
                </p>
              </div>
              {achievement.unlocked && <Award className="w-6 h-6 text-yellow-500 ml-auto" />}
            </div>
          ))}
        </div>
      </div>

      {/* 学习建议 */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">学习建议</h3>
        </div>
        <p className="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
          {stats.todayCount >= goal
            ? '今天的目标已完成，可以复习一下标记的生词巩固记忆。'
            : `根据艾宾浩斯遗忘曲线，建议你今天再练习 ${goal - stats.todayCount} 次以达到最佳记忆效果。`}
          坚持每天打卡，记忆效率提升 80%！
        </p>
      </div>
    </div>
  );
};
