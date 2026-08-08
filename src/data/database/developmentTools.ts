import type { SqlDatabase } from '@/data/database/sqlDatabase';

export async function resetDevelopmentData(database: SqlDatabase): Promise<void> {
  if (!__DEV__) throw new Error('Development reset is unavailable in production');
  await database.withTransactionAsync(async () => {
    await database.execAsync(`
      DELETE FROM active_sessions;
      DELETE FROM case_progress;
      DELETE FROM achievements;
      DELETE FROM settings;
    `);
    const now = new Date().toISOString();
    await database.runAsync(
      `INSERT INTO case_progress (
        case_id, status, best_stars, attempts, hints_used_best, completed_at, updated_at
      ) VALUES ('tutorial-missing-eleven', 'available', 0, 0, NULL, NULL, ?)`,
      [now],
    );
  });
}
