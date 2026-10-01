import React, { useState, useEffect, useCallback, useRef } from "react";
import { Trophy, RefreshCw, CheckCircle, XCircle, Play } from "lucide-react";
import { customDataService } from "../services/customData";
import { WordItem, TTSConfig } from "../types";
import { ttsService } from "../services/ttsService";

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

interface LineCoordinates {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface GameViewProps {
  ttsConfig: TTSConfig;
}

export const GameView: React.FC<GameViewProps> = ({ ttsConfig }) => {
  const [leftColumn, setLeftColumn] = useState<WordItem[]>([]);
  const [rightColumn, setRightColumn] = useState<WordItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<"playing" | "won">("playing");
  const [feedback, setFeedback] = useState<"none" | "correct" | "wrong">(
    "none"
  );
  const [lines, setLines] = useState<LineCoordinates[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const initializeGame = useCallback(() => {
    // Pick 8 random words for a fuller game
    const shuffledAll = shuffle(customDataService.allWords());
    const gameWords = shuffledAll.slice(0, 8);

    setLeftColumn(shuffle(gameWords)); // English
    setRightColumn(shuffle(gameWords)); // Chinese
    setMatchedIds(new Set());
    setScore(0);
    setStatus("playing");
    setSelectedLeft(null);
    setSelectedRight(null);
    setFeedback("none");
    setLines([]);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const drawLine = (id: string) => {
    if (!containerRef.current) return;

    const leftEl = document.getElementById(`word-left-${id}`);
    const rightEl = document.getElementById(`word-right-${id}`);
    const containerRect = containerRef.current.getBoundingClientRect();

    if (leftEl && rightEl) {
      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();

      // Calculate center points relative to container
      const x1 = leftRect.right - containerRect.left;
      const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
      const x2 = rightRect.left - containerRect.left;
      const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

      setLines((prev) => [...prev, { id, x1, y1, x2, y2 }]);
    }
  };

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const leftWord = leftColumn.find((w) => w.id === selectedLeft);
      const rightWord = rightColumn.find((w) => w.id === selectedRight);

      if (leftWord && rightWord && leftWord.id === rightWord.id) {
        // Match
        setFeedback("correct");
        // Draw the line immediately for visual feedback
        drawLine(leftWord.id);

        setTimeout(() => {
          setMatchedIds((prev) => new Set(prev).add(leftWord.id));
          setSelectedLeft(null);
          setSelectedRight(null);
          setScore((prev) => prev + 10);
          setFeedback("none");
        }, 300);
      } else {
        // No Match
        setFeedback("wrong");
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setFeedback("none");
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight, leftColumn, rightColumn]);

  useEffect(() => {
    if (matchedIds.size > 0 && matchedIds.size === leftColumn.length) {
      setStatus("won");
    }
  }, [matchedIds, leftColumn]);

  // Handle resize to redraw lines (optional, simple clear for now to avoid complexity)
  useEffect(() => {
    const handleResize = () => setLines([]); // Simplification: clear lines on resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-4xl 2xl:max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 sticky-under-header z-20">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">
              得分
            </p>
            <span className="font-bold text-2xl text-slate-800 dark:text-white">
              {score}
            </span>
          </div>
        </div>
        <button
          onClick={initializeGame}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm active:scale-95"
        >
          <RefreshCw className="w-4 h-4" /> 重新开始
        </button>
      </div>

      {status === "won" ? (
        <div className="text-center py-16 animate-bounce-short bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-brand-100 dark:border-slate-700">
          <div className="inline-flex p-6 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 ring-8 ring-green-50 dark:ring-green-900/10">
            <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            太棒了！全部通关！
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 px-4">
            你成功匹配了所有单词，继续保持！
          </p>
          <button
            onClick={initializeGame}
            className="px-8 py-3 bg-brand-500 text-white rounded-full font-bold shadow-lg shadow-brand-200 dark:shadow-none hover:bg-brand-600 transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            再玩一次
          </button>
        </div>
      ) : (
        <div className="relative" ref={containerRef}>
          {/* SVG Overlay for Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ minHeight: "600px" }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#22c55e" // green-500
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-in fade-in duration-300"
              />
            ))}
          </svg>

          <div className="grid grid-cols-2 gap-12 md:gap-32 relative select-none">
            {/* Feedback Overlay */}
            {feedback !== "none" && (
              <div className="fixed inset-0 pointer-events-none flex justify-center items-center z-50">
                <div
                  className={`p-4 rounded-full shadow-xl transform scale-110 transition-transform ${
                    feedback === "correct"
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {feedback === "correct" ? (
                    <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
                  )}
                </div>
              </div>
            )}

            {/* Left Column (English) */}
            <div className="space-y-4">
              <h3 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                English
              </h3>
              {leftColumn.map((word) => {
                const isMatched = matchedIds.has(word.id);
                const isSelected = selectedLeft === word.id;
                const isWrong = feedback === "wrong" && isSelected;

                return (
                  <button
                    key={word.id}
                    id={`word-left-${word.id}`}
                    disabled={isMatched || feedback !== "none"}
                    onClick={() => {
                      setSelectedLeft(word.id);
                      ttsService.speak(word.english, ttsConfig);
                    }}
                    className={`w-full h-14 md:h-16 rounded-xl flex items-center justify-center text-sm md:text-lg font-bold transition-all shadow-sm border-2 active:scale-95 ${
                      isMatched
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 opacity-80"
                        : isSelected
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 z-10 scale-105"
                        : "border-white dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750"
                    } ${
                      isWrong
                        ? "animate-shake border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                        : ""
                    }`}
                  >
                    {word.english}
                  </button>
                );
              })}
            </div>

            {/* Right Column (Chinese) */}
            <div className="space-y-4">
              <h3 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                中文
              </h3>
              {rightColumn.map((word) => {
                const isMatched = matchedIds.has(word.id);
                const isSelected = selectedRight === word.id;
                const isWrong = feedback === "wrong" && isSelected;

                return (
                  <button
                    key={word.id}
                    id={`word-right-${word.id}`}
                    disabled={isMatched || feedback !== "none"}
                    onClick={() => setSelectedRight(word.id)}
                    className={`w-full h-14 md:h-16 rounded-xl flex items-center justify-center text-sm md:text-lg font-medium transition-all shadow-sm border-2 active:scale-95 ${
                      isMatched
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 opacity-80"
                        : isSelected
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 z-10 scale-105"
                        : "border-white dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-200 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-750"
                    } ${
                      isWrong
                        ? "animate-shake border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                        : ""
                    }`}
                  >
                    {/* {word.chinese} */}
                    {Array.isArray(word.chinese)
                      ? word.chinese.join(", ")
                      : word.chinese}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
