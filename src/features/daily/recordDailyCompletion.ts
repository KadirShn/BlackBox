import { dailyDateFromId, localDateKey } from '@/content/daily/dailyCase';
import type { Repositories } from '@/data/database/initializeDatabase';
import { evaluateDailyAchievements } from '@/engine/achievements/evaluateAchievements';
import { computeStreak, countsTowardStreak } from '@/engine/daily/streak';

type DailyCompletion = {
  caseId: string;
  stars: 1 | 2 | 3;
  hintsUsed: number;
  reportMistakes: number;
  timestamp: string;
};

/** Saves today's daily result and returns the streak to show on the result screen. */
export async function recordDailyCompletion(
  repositories: Repositories,
  completion: DailyCompletion,
): Promise<number> {
  const date = dailyDateFromId(completion.caseId);
  const today = localDateKey(new Date(completion.timestamp));
  if (date !== null && countsTowardStreak(date, today)) {
    await repositories.daily.record({
      date,
      bestStars: completion.stars,
      hintsUsed: completion.hintsUsed,
      reportMistakes: completion.reportMistakes,
      completedAt: completion.timestamp,
    });
  }
  const results = await repositories.daily.list();
  const streak = computeStreak(
    results.map((item) => item.date),
    today,
  );
  if (results.length > 0) {
    await repositories.achievements.unlock(evaluateDailyAchievements(streak), completion.timestamp);
  }
  return streak.current;
}
