import type { PlayerProgress } from '@/domain/progression/playerProgress';
import { countEarnedStars, getRankStatus } from '@/engine/progression/rank';

describe('investigator rank', () => {
  it.each([
    [0, 'trainee', 'field', 6],
    [5, 'trainee', 'field', 1],
    [6, 'field', 'senior', 6],
    [12, 'senior', 'lead', 6],
    [18, 'lead', 'blackbox', 6],
  ] as const)('%s of 24 stars is %s', (stars, rank, nextRank, starsNeeded) => {
    expect(getRankStatus(stars, 8)).toEqual({
      rank,
      totalStars: stars,
      maxStars: 24,
      next: { rank: nextRank, starsNeeded },
    });
  });

  it('reaches the final rank only with every star', () => {
    expect(getRankStatus(23, 8).rank).toBe('lead');
    expect(getRankStatus(24, 8)).toMatchObject({ rank: 'blackbox', next: null });
  });

  it('counts only completed cases', () => {
    const progress: PlayerProgress[] = [
      {
        caseId: 'a',
        status: 'completed',
        bestStars: 3,
        attempts: 1,
        hintsUsedBest: 0,
        completedAt: '2026-10-22T00:00:00.000Z',
        updatedAt: '2026-10-22T00:00:00.000Z',
      },
      {
        caseId: 'b',
        status: 'in_progress',
        bestStars: 2,
        attempts: 2,
        hintsUsedBest: 1,
        completedAt: null,
        updatedAt: '2026-10-22T00:00:00.000Z',
      },
    ];

    expect(countEarnedStars(progress)).toBe(3);
  });
});
