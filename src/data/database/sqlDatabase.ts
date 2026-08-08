import type { SQLiteDatabase, SQLiteRunResult } from 'expo-sqlite';

export type SqlValue = string | number | null;
export type SqlParams = readonly SqlValue[];

export type SqlRunResult = {
  changes: number;
  lastInsertRowId: number;
};

export interface SqlDatabase {
  execAsync(source: string): Promise<void>;
  runAsync(source: string, params?: SqlParams): Promise<SqlRunResult>;
  getFirstAsync(source: string, params?: SqlParams): Promise<unknown>;
  getAllAsync(source: string, params?: SqlParams): Promise<unknown[]>;
  withTransactionAsync(task: () => Promise<void>): Promise<void>;
}

function toRunResult(result: SQLiteRunResult): SqlRunResult {
  return { changes: result.changes, lastInsertRowId: result.lastInsertRowId };
}

export class ExpoSqlDatabase implements SqlDatabase {
  public constructor(private readonly database: SQLiteDatabase) {}

  public execAsync(source: string): Promise<void> {
    return this.database.execAsync(source);
  }

  public async runAsync(source: string, params: SqlParams = []): Promise<SqlRunResult> {
    return toRunResult(await this.database.runAsync(source, [...params]));
  }

  public getFirstAsync(source: string, params: SqlParams = []): Promise<unknown> {
    return this.database.getFirstAsync<unknown>(source, [...params]);
  }

  public getAllAsync(source: string, params: SqlParams = []): Promise<unknown[]> {
    return this.database.getAllAsync<unknown>(source, [...params]);
  }

  public withTransactionAsync(task: () => Promise<void>): Promise<void> {
    return this.database.withExclusiveTransactionAsync(task);
  }
}
