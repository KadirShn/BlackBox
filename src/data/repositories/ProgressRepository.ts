import { z } from 'zod';

import type { SqlDatabase } from '@/data/database/sqlDatabase';
import { playerProgressSchema, type PlayerProgress } from '@/domain/progression/playerProgress';

const progressRowSchema = z.object({
  case_id: z.string(),
  status: z.string(),
  best_stars: z.number(),
  attempts: z.number(),
  hints_used_best: z.number().nullable(),
  completed_at: z.string().nullable(),
  updated_at: z.string(),
});

function mapProgressRow(value: unknown): PlayerProgress {
  const row = progressRowSchema.parse(value);
  return playerProgressSchema.parse({
    caseId: row.case_id,
    status: row.status,
    bestStars: row.best_stars,
    attempts: row.attempts,
    hintsUsedBest: row.hints_used_best,
    completedAt: row.completed_at,
    updatedAt: row.updated_at,
  });
}

export class ProgressRepository {
  public constructor(private readonly database: SqlDatabase) {}

  public async get(caseId: string): Promise<PlayerProgress | null> {
    const row = await this.database.getFirstAsync('SELECT * FROM case_progress WHERE case_id = ?', [
      caseId,
    ]);
    return row === null ? null : mapProgressRow(row);
  }

  public async list(): Promise<PlayerProgress[]> {
    return (await this.database.getAllAsync('SELECT * FROM case_progress ORDER BY case_id')).map(
      mapProgressRow,
    );
  }

  public async save(progress: PlayerProgress): Promise<void> {
    const value = playerProgressSchema.parse(progress);
    await this.database.runAsync(
      `INSERT INTO case_progress (
        case_id, status, best_stars, attempts, hints_used_best, completed_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(case_id) DO UPDATE SET
        status = excluded.status,
        best_stars = MAX(case_progress.best_stars, excluded.best_stars),
        attempts = excluded.attempts,
        hints_used_best = excluded.hints_used_best,
        completed_at = excluded.completed_at,
        updated_at = excluded.updated_at`,
      [
        value.caseId,
        value.status,
        value.bestStars,
        value.attempts,
        value.hintsUsedBest,
        value.completedAt,
        value.updatedAt,
      ],
    );
  }

  public async completeAndUnlockNext(
    completed: PlayerProgress,
    nextCaseId: string | null,
  ): Promise<void> {
    await this.database.withTransactionAsync(async () => {
      await this.save(completed);
      if (nextCaseId !== null) {
        const now = completed.updatedAt;
        await this.database.runAsync(
          `INSERT INTO case_progress (
            case_id, status, best_stars, attempts, hints_used_best, completed_at, updated_at
          ) VALUES (?, 'available', 0, 0, NULL, NULL, ?)
          ON CONFLICT(case_id) DO UPDATE SET
            status = CASE WHEN case_progress.status = 'locked' THEN 'available' ELSE case_progress.status END,
            updated_at = ?`,
          [nextCaseId, now, now],
        );
      }
    });
  }
}
