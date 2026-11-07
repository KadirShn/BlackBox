import { z } from 'zod';

import type { SqlDatabase } from '@/data/database/sqlDatabase';
import { dailyResultSchema, type DailyResult } from '@/domain/daily/dailyResult';

const dailyRowSchema = z.object({
  date: z.string(),
  best_stars: z.number(),
  hints_used: z.number(),
  report_mistakes: z.number(),
  completed_at: z.string(),
});

function mapDailyRow(value: unknown): DailyResult {
  const row = dailyRowSchema.parse(value);
  return dailyResultSchema.parse({
    date: row.date,
    bestStars: row.best_stars,
    hintsUsed: row.hints_used,
    reportMistakes: row.report_mistakes,
    completedAt: row.completed_at,
  });
}

export class DailyRepository {
  public constructor(private readonly database: SqlDatabase) {}

  public async list(): Promise<DailyResult[]> {
    return (await this.database.getAllAsync('SELECT * FROM daily_results ORDER BY date')).map(
      mapDailyRow,
    );
  }

  /** Replays keep the first completion time and the best result of the day. */
  public async record(result: DailyResult): Promise<void> {
    const value = dailyResultSchema.parse(result);
    await this.database.runAsync(
      `INSERT INTO daily_results (date, best_stars, hints_used, report_mistakes, completed_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(date) DO UPDATE SET
         best_stars = MAX(daily_results.best_stars, excluded.best_stars),
         hints_used = MIN(daily_results.hints_used, excluded.hints_used),
         report_mistakes = MIN(daily_results.report_mistakes, excluded.report_mistakes)`,
      [value.date, value.bestStars, value.hintsUsed, value.reportMistakes, value.completedAt],
    );
  }
}
