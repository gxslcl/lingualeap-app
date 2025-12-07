import { WordProgress } from '../types';

// Simplified SuperMemo-2 Algorithm
export const calculateReview = (
  currentProgress: WordProgress | undefined,
  quality: number // 0-5 rating
): WordProgress => {
  const now = Date.now();
  
  if (!currentProgress) {
    // Initial learning
    return {
      wordId: '', // Set by caller
      nextReview: now + (quality < 3 ? 0 : 24 * 60 * 60 * 1000), // Next day if good, immediate if bad
      interval: quality < 3 ? 0 : 1,
      repetition: quality < 3 ? 0 : 1,
      ef: 2.5,
      status: quality < 3 ? 'learning' : 'review',
      lastReviewed: now
    };
  }
  let { interval, repetition, ef } = currentProgress;
  if (quality >= 3) {
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ef);
    }
    repetition += 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  // Update Easiness Factor
  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < 1.3) ef = 1.3;

  const nextReview = now + (interval * 24 * 60 * 60 * 1000);

  return {
    ...currentProgress,
    nextReview,
    interval,
    repetition,
    ef,
    status: interval > 21 ? 'mastered' : 'review',
    lastReviewed: now
  };
};
