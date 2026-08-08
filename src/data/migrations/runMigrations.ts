import { z } from 'zod';

import type { SqlDatabase } from '@/data/database/sqlDatabase';
import { migrations } from '@/data/migrations/migrations';

const versionRowSchema = z.object({ value: z.string().regex(/^\d+$/) });

export async function runMigrations(database: SqlDatabase): Promise<number> {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);

  const rawVersion = await database.getFirstAsync('SELECT value FROM app_meta WHERE key = ?', [
    'schema_version',
  ]);
  const currentVersion = rawVersion === null ? 0 : Number(versionRowSchema.parse(rawVersion).value);

  for (const migration of migrations) {
    if (migration.version <= currentVersion) continue;

    await database.withTransactionAsync(async () => {
      await database.execAsync(migration.sql);
      await database.runAsync(
        `INSERT INTO app_meta (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
        ['schema_version', String(migration.version)],
      );
    });
  }

  return migrations.at(-1)?.version ?? currentVersion;
}
