import { z } from 'zod';

import { parseStoredJson } from '@/data/database/dataErrors';
import type { SqlDatabase } from '@/data/database/sqlDatabase';
import { persistedSettingsSchema, type PersistedSettings } from '@/domain/settings/settings';

const settingsRowSchema = z.object({ value_json: z.string() });
const SETTINGS_KEY = 'app';

export class SettingsRepository {
  public constructor(private readonly database: SqlDatabase) {}

  public async get(): Promise<PersistedSettings | null> {
    const raw = await this.database.getFirstAsync('SELECT value_json FROM settings WHERE key = ?', [
      SETTINGS_KEY,
    ]);
    if (raw === null) return null;
    const row = settingsRowSchema.parse(raw);
    return persistedSettingsSchema.parse(parseStoredJson(row.value_json, 'settings'));
  }

  public async save(settings: PersistedSettings): Promise<void> {
    const value = persistedSettingsSchema.parse(settings);
    await this.database.runAsync(
      `INSERT INTO settings (key, value_json) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json`,
      [SETTINGS_KEY, JSON.stringify(value)],
    );
  }
}
