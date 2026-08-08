export type Migration = {
  version: number;
  name: string;
  sql: string;
};

export const migrations: readonly Migration[] = [
  {
    version: 1,
    name: 'initial-schema',
    sql: `
      CREATE TABLE IF NOT EXISTS case_progress (
        case_id TEXT PRIMARY KEY NOT NULL,
        status TEXT NOT NULL,
        best_stars INTEGER NOT NULL DEFAULT 0,
        attempts INTEGER NOT NULL DEFAULT 0,
        hints_used_best INTEGER,
        completed_at TEXT,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS active_sessions (
        case_id TEXT PRIMARY KEY NOT NULL,
        payload_json TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS achievements (
        achievement_id TEXT PRIMARY KEY NOT NULL,
        unlocked_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY NOT NULL,
        value_json TEXT NOT NULL
      );
    `,
  },
  {
    version: 2,
    name: 'sound-settings',
    sql: `
      UPDATE settings
      SET value_json = json_set(
        value_json,
        '$.soundEffectsEnabled', json('true'),
        '$.musicEnabled', json('false')
      )
      WHERE key = 'app';
    `,
  },
];
