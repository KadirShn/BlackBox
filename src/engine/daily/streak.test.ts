import { computeStreak, countsTowardStreak } from '@/engine/daily/streak';

describe('daily streak', () => {
  it('counts consecutive days ending today', () => {
    expect(computeStreak(['2026-11-05', '2026-11-06', '2026-11-07'], '2026-11-07')).toEqual({
      current: 3,
      best: 3,
      completedToday: true,
    });
  });

  it('keeps yesterday’s streak alive until today is played', () => {
    expect(computeStreak(['2026-11-05', '2026-11-06'], '2026-11-07')).toEqual({
      current: 2,
      best: 2,
      completedToday: false,
    });
  });

  it('resets after a missed day but remembers the best run', () => {
    expect(
      computeStreak(
        ['2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31', '2026-11-05'],
        '2026-11-07',
      ),
    ).toEqual({ current: 0, best: 4, completedToday: false });
  });

  it('follows month boundaries', () => {
    expect(computeStreak(['2026-10-31', '2026-11-01'], '2026-11-01').current).toBe(2);
  });

  it('accepts only today and yesterday toward the streak', () => {
    expect(countsTowardStreak('2026-11-07', '2026-11-07')).toBe(true);
    expect(countsTowardStreak('2026-11-06', '2026-11-07')).toBe(true);
    expect(countsTowardStreak('2026-11-05', '2026-11-07')).toBe(false);
  });
});
