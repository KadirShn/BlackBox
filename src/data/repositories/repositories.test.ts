import { DatabaseSync } from 'node:sqlite';

import type { SqlDatabase, SqlParams, SqlRunResult } from '@/data/database/sqlDatabase';
import { runMigrations } from '@/data/migrations/runMigrations';
import { createRepositories } from '@/data/database/initializeDatabase';
import type { ActiveSession } from '@/domain/session/activeSession';

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
});
