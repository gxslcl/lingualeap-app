import React, { useState } from 'react';
import { Volume2, MessageCircle, Tag, Sparkles } from 'lucide-react';
import { phrasesData } from '../data/phrases';
import { TTSConfig } from '../types';
import { ttsService } from '../services/ttsService';

interface PhrasesViewProps {
  ttsConfig: TTSConfig;
}

export const PhrasesView: React.FC<PhrasesViewProps> = ({ ttsConfig }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handlePlay = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    ttsService.speak(text, ttsConfig);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 md:mb-8 text-center bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          常用情景短语
        </h2>
        <p className="text-brand-100 text-sm">点击卡片查看中文释义，模仿发音进行跟读练习</p>
      </div>

      <div className="space-y-4">
        {phrasesData.map(phrase => {
          const isExpanded = expandedId === phrase.id;
          return (
            <div
              key={phrase.id}
              onClick={() => toggleExpand(phrase.id)}
              className={`bg-white rounded-xl shadow-sm border transition-all cursor-pointer overflow-hidden ${
                isExpanded ? 'border-brand-400 shadow-md ring-1 ring-brand-100' : 'border-slate-100 hover:border-brand-200'
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider border border-indigo-100">
                        {phrase.context}
                      </span>
                      {phrase.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded">
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-800 leading-relaxed pr-8">
                      {phrase.english}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handlePlay(e, phrase.english)}
                    className="flex-shrink-0 p-3 rounded-full bg-brand-50 text-brand-600 hover:bg-brand-500 hover:text-white transition-all shadow-sm active:scale-90"
                  >
                    <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-brand-500 mt-0.5" />
                      <div>
                        <p className="text-lg text-slate-800 font-bold">{phrase.chinese}</p>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          💡 建议：多次点击喇叭图标听发音，并尝试不看屏幕复述这句话。
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
    </div>
  );
};