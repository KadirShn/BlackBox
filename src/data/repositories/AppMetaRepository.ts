import { z } from 'zod';

import type { SqlDatabase } from '@/data/database/sqlDatabase';

const metaRowSchema = z.object({ value: z.string() });

/** Small app-level values that are not player settings, such as the last review prompt. */
export class AppMetaRepository {
  public constructor(private readonly database: SqlDatabase) {}

  public async get(key: string): Promise<string | null> {
    const row = await this.database.getFirstAsync('SELECT value FROM app_meta WHERE key = ?', [
      key,
    ]);
    return row === null ? null : metaRowSchema.parse(row).value;
  }

  public async set(key: string, value: string): Promise<void> {
    await this.database.runAsync(
      `INSERT INTO app_meta (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [key, value],
    );
  }
}
