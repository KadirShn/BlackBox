import { z } from 'zod';

import type { SqlDatabase } from '@/data/database/sqlDatabase';
import {
  achievementIdSchema,
  unlockedAchievementSchema,
  type AchievementId,
  type UnlockedAchievement,
} from '@/domain/achievements/achievement';

const rowSchema = z.object({ achievement_id: z.string(), unlocked_at: z.string() });

export class AchievementRepository {
  public constructor(private readonly database: SqlDatabase) {}

  public async list(): Promise<UnlockedAchievement[]> {
    const rows = await this.database.getAllAsync(
      'SELECT achievement_id, unlocked_at FROM achievements ORDER BY unlocked_at',
    );
    return rows.map((value) => {
      const row = rowSchema.parse(value);
      return unlockedAchievementSchema.parse({
        id: row.achievement_id,
        unlockedAt: row.unlocked_at,
      });
    });
  }

  public async unlock(ids: readonly AchievementId[], unlockedAt: string): Promise<void> {
    const validIds = ids.map((id) => achievementIdSchema.parse(id));
    await this.database.withTransactionAsync(async () => {
      for (const id of validIds) {
        await this.database.runAsync(
          'INSERT OR IGNORE INTO achievements (achievement_id, unlocked_at) VALUES (?, ?)',
          [id, unlockedAt],
        );
      }
    });
  }
}
