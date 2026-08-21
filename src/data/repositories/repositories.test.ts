import { DatabaseSync } from 'node:sqlite';

import type { SqlDatabase, SqlParams, SqlRunResult } from '@/data/database/sqlDatabase';
import { runMigrations } from '@/data/migrations/runMigrations';
import { createRepositories, prepareDatabase } from '@/data/database/initializeDatabase';
import type { ActiveSession } from '@/domain/session/activeSession';
import { migrations } from '@/data/migrations/migrations';

class NodeSqlDatabase implements SqlDatabase {
  private readonly database = new DatabaseSync(':memory:');

  public async execAsync(source: string): Promise<void> {
    this.database.exec(source);
  }

  public async runAsync(source: string, params: SqlParams = []): Promise<SqlRunResult> {
    const result = this.database.prepare(source).run(...params);
    return { changes: Number(result.changes), lastInsertRowId: Number(result.lastInsertRowid) };
  }

  public async getFirstAsync(source: string, params: SqlParams = []): Promise<unknown> {
    return this.database.prepare(source).get(...params) ?? null;
  }

  public async getAllAsync(source: string, params: SqlParams = []): Promise<unknown[]> {
    return this.database.prepare(source).all(...params);
  }

  public async withTransactionAsync(task: () => Promise<void>): Promise<void> {
    this.database.exec('BEGIN');
    try {
      await task();
      this.database.exec('COMMIT');
    } catch (error: unknown) {
      this.database.exec('ROLLBACK');
      throw error;
    }
  }
}

describe('SQLite migrations and repositories', () => {
  it('prepares a fresh install and exposes the tutorial without network access', async () => {
    const database = new NodeSqlDatabase();
    const updatedAt = '2026-08-21T00:00:00.000Z';

    const repositories = await prepareDatabase(database, () => updatedAt);

    await expect(repositories.progress.get('tutorial-missing-eleven')).resolves.toEqual({
      caseId: 'tutorial-missing-eleven',
      status: 'available',
      bestStars: 0,
      attempts: 0,
      hintsUsedBest: null,
      completedAt: null,
      updatedAt,
    });
  });

  it('runs migration idempotently and performs basic CRUD', async () => {
    const database = new NodeSqlDatabase();
    await expect(runMigrations(database)).resolves.toBe(2);
    await expect(runMigrations(database)).resolves.toBe(2);

    const repositories = createRepositories(database);
    const updatedAt = '2026-08-04T00:00:00.000Z';
    await repositories.progress.save({
      caseId: 'tutorial-missing-eleven',
      status: 'in_progress',
      bestStars: 0,
      attempts: 1,
      hintsUsedBest: null,
      completedAt: null,
      updatedAt,
    });
    await expect(repositories.progress.get('tutorial-missing-eleven')).resolves.toMatchObject({
      status: 'in_progress',
      attempts: 1,
    });

    const session: ActiveSession = {
      caseId: 'tutorial-missing-eleven',
      openedEvidenceIds: ['flight-log'],
      markedFieldIds: [],
      puzzleStates: {},
      hintsUsed: 0,
      selectedHypothesisId: null,
      selectedEvidenceIds: [],
      updatedAt,
    };
    await repositories.sessions.save(session);
    await expect(repositories.sessions.get(session.caseId)).resolves.toEqual(session);
    await repositories.sessions.delete(session.caseId);
    await expect(repositories.sessions.get(session.caseId)).resolves.toBeNull();

    const settings = {
      language: 'tr',
      textSize: 'large',
      reduceMotion: true,
      hapticsEnabled: false,
      soundEffectsEnabled: true,
      musicEnabled: false,
    } as const;
    await repositories.settings.save(settings);
    await expect(repositories.settings.get()).resolves.toEqual(settings);

    await repositories.achievements.unlock(['first-report', 'hint-free'], updatedAt);
    await repositories.achievements.unlock(['first-report'], updatedAt);
    await expect(repositories.achievements.list()).resolves.toHaveLength(2);
  });

  it('commits completion and the next unlock atomically', async () => {
    const database = new NodeSqlDatabase();
    await runMigrations(database);
    const repositories = createRepositories(database);
    const updatedAt = '2026-08-04T00:00:00.000Z';
    await repositories.progress.completeAndUnlockNext(
      {
        caseId: 'tutorial-missing-eleven',
        status: 'completed',
        bestStars: 3,
        attempts: 1,
        hintsUsedBest: 0,
        completedAt: updatedAt,
        updatedAt,
      },
      'case-night-route',
    );
    await expect(repositories.progress.get('case-night-route')).resolves.toMatchObject({
      status: 'available',
    });
  });

  it('upgrades schema version 1 settings without losing the existing values', async () => {
    const database = new NodeSqlDatabase();
    const firstMigration = migrations[0];
    if (firstMigration === undefined) throw new Error('Initial migration is missing');
    await database.execAsync(`
      CREATE TABLE app_meta (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
      ${firstMigration.sql}
    `);
    await database.runAsync('INSERT INTO app_meta (key, value) VALUES (?, ?)', [
      'schema_version',
      '1',
    ]);
    await database.runAsync('INSERT INTO settings (key, value_json) VALUES (?, ?)', [
      'app',
      JSON.stringify({
        language: 'en',
        textSize: 'large',
        reduceMotion: true,
        hapticsEnabled: false,
      }),
    ]);

    await expect(runMigrations(database)).resolves.toBe(2);
    const repositories = createRepositories(database);
    await expect(repositories.settings.get()).resolves.toEqual({
      language: 'en',
      textSize: 'large',
      reduceMotion: true,
      hapticsEnabled: false,
      soundEffectsEnabled: true,
      musicEnabled: false,
    });
  });

  it('removes only a malformed active session and preserves case progress', async () => {
    const database = new NodeSqlDatabase();
    const repositories = await prepareDatabase(database);
    await database.runAsync(
      'INSERT INTO active_sessions (case_id, payload_json, updated_at) VALUES (?, ?, ?)',
      ['tutorial-missing-eleven', '{invalid-json', '2026-08-21T00:00:00.000Z'],
    );

    await expect(
      repositories.sessions.getRecoveringCorruption('tutorial-missing-eleven'),
    ).resolves.toEqual({ session: null, recoveredFromCorruption: true });
    await expect(repositories.sessions.get('tutorial-missing-eleven')).resolves.toBeNull();
    await expect(repositories.progress.get('tutorial-missing-eleven')).resolves.toMatchObject({
      status: 'available',
    });
  });

  it('recovers a structurally incomplete session payload', async () => {
    const database = new NodeSqlDatabase();
    const repositories = await prepareDatabase(database);
    await database.runAsync(
      'INSERT INTO active_sessions (case_id, payload_json, updated_at) VALUES (?, ?, ?)',
      [
        'tutorial-missing-eleven',
        JSON.stringify({ caseId: 'tutorial-missing-eleven' }),
        '2026-08-21T00:00:00.000Z',
      ],
    );

    await expect(
      repositories.sessions.getRecoveringCorruption('tutorial-missing-eleven'),
    ).resolves.toEqual({ session: null, recoveredFromCorruption: true });
  });

  it('resets malformed settings without changing progress', async () => {
    const database = new NodeSqlDatabase();
    const repositories = await prepareDatabase(database);
    await database.runAsync('INSERT INTO settings (key, value_json) VALUES (?, ?)', [
      'app',
      '{invalid-json',
    ]);

    await expect(repositories.settings.getRecoveringCorruption()).resolves.toEqual({
      settings: null,
      recoveredFromCorruption: true,
    });
    await expect(repositories.progress.get('tutorial-missing-eleven')).resolves.toMatchObject({
      status: 'available',
    });
  });
});
