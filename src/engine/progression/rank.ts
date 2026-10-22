import type { PlayerProgress } from '@/domain/progression/playerProgress';

export type RankId = 'trainee' | 'field' | 'senior' | 'lead' | 'blackbox';

// Thresholds are shares of every star in the catalog, so ranks scale as cases are added.
const rankThresholds: readonly { id: RankId; share: number }[] = [
  { id: 'trainee', share: 0 },
  { id: 'field', share: 0.25 },
  { id: 'senior', share: 0.5 },
  { id: 'lead', share: 0.75 },
  { id: 'blackbox', share: 1 },
];

export type RankStatus = {
  rank: RankId;
  totalStars: number;
  maxStars: number;
  next: { rank: RankId; starsNeeded: number } | null;
};

export function countEarnedStars(progress: readonly PlayerProgress[]): number {
  return progress
    .filter((item) => item.status === 'completed')
    .reduce((total, item) => total + item.bestStars, 0);
}

export function getRankStatus(totalStars: number, caseCount: number): RankStatus {
  const maxStars = caseCount * 3;
  const required = rankThresholds.map((item) => ({
    id: item.id,
    stars: Math.ceil(item.share * maxStars),
  }));
  let currentIndex = 0;
  required.forEach((item, index) => {
    if (totalStars >= item.stars) currentIndex = index;
  });
  const current = required[currentIndex] ?? { id: 'trainee' as const, stars: 0 };
  const next = required[currentIndex + 1];
  return {
    rank: current.id,
    totalStars,
    maxStars,
    next: next === undefined ? null : { rank: next.id, starsNeeded: next.stars - totalStars },
  };
}
