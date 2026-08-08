import type { PlayerProgress } from '@/domain/progression/playerProgress';

export type PlayerStatistics = {
  completedCases: number;
  totalStars: number;
  totalAttempts: number;
  hintFreeCases: number;
};

export function buildStatistics(progress: readonly PlayerProgress[]): PlayerStatistics {
  const completed = progress.filter((item) => item.status === 'completed');
  return {
    completedCases: completed.length,
    totalStars: completed.reduce((total, item) => total + item.bestStars, 0),
    totalAttempts: progress.reduce((total, item) => total + item.attempts, 0),
    hintFreeCases: completed.filter((item) => item.hintsUsedBest === 0).length,
  };
}
