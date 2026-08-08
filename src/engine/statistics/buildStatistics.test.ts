import { buildStatistics } from '@/engine/statistics/buildStatistics';

describe('statistics summary', () => {
  it('summarizes completed progress without using time as a score', () => {
    expect(
      buildStatistics([
        {
          caseId: 'a',
          status: 'completed',
          bestStars: 3,
          attempts: 2,
          hintsUsedBest: 0,
          completedAt: '2026-08-04T00:00:00.000Z',
          updatedAt: '2026-08-04T00:00:00.000Z',
        },
        {
          caseId: 'b',
          status: 'in_progress',
          bestStars: 0,
          attempts: 1,
          hintsUsedBest: null,
          completedAt: null,
          updatedAt: '2026-08-04T00:00:00.000Z',
        },
      ]),
    ).toEqual({ completedCases: 1, totalStars: 3, totalAttempts: 3, hintFreeCases: 1 });
  });
});
