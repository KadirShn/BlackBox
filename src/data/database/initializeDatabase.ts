import { openDatabaseAsync } from 'expo-sqlite';

import { ExpoSqlDatabase, type SqlDatabase } from '@/data/database/sqlDatabase';
import { runMigrations } from '@/data/migrations/runMigrations';
import { ActiveSessionRepository } from '@/data/repositories/ActiveSessionRepository';
import { AchievementRepository } from '@/data/repositories/AchievementRepository';
import { ProgressRepository } from '@/data/repositories/ProgressRepository';
import { SettingsRepository } from '@/data/repositories/SettingsRepository';

export type Repositories = {
  progress: ProgressRepository;
  sessions: ActiveSessionRepository;
  settings: SettingsRepository;
  achievements: AchievementRepository;
};

let repositories: Repositories | null = null;
let initialization: Promise<Repositories> | null = null;

export async function initializeDatabase(): Promise<Repositories> {
  if (repositories !== null) return repositories;
  if (initialization !== null) return initialization;

  initialization = openDatabaseAsync('black-box.db').then(async (sqlite) => {
    const database = new ExpoSqlDatabase(sqlite);
    return prepareDatabase(database);
  });

  try {
    repositories = await initialization;
    return repositories;
  } catch (error: unknown) {
    initialization = null;
    throw error;
  }
}

export async function prepareDatabase(
  database: SqlDatabase,
  currentTime: () => string = () => new Date().toISOString(),
): Promise<Repositories> {
  await runMigrations(database);
  const preparedRepositories = createRepositories(database);
  if ((await preparedRepositories.progress.get('tutorial-missing-eleven')) === null) {
    await preparedRepositories.progress.save({
      caseId: 'tutorial-missing-eleven',
      status: 'available',
      bestStars: 0,
      attempts: 0,
      hintsUsedBest: null,
      completedAt: null,
      updatedAt: currentTime(),
    });
  }
  return preparedRepositories;
}

export function createRepositories(database: SqlDatabase): Repositories {
  return {
    progress: new ProgressRepository(database),
    sessions: new ActiveSessionRepository(database),
    settings: new SettingsRepository(database),
    achievements: new AchievementRepository(database),
  };
}

export function getRepositories(): Repositories {
  if (repositories === null) throw new Error('Database has not been initialized');
  return repositories;
}
