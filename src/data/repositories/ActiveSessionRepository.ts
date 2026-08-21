import type { SqlDatabase } from '@/data/database/sqlDatabase';
import { DataValidationError, parseStoredJson } from '@/data/database/dataErrors';
import { activeSessionSchema, type ActiveSession } from '@/domain/session/activeSession';
import { z, ZodError } from 'zod';

const sessionRowSchema = z.object({ payload_json: z.string() });

export type SessionRecoveryResult = {
  session: ActiveSession | null;
  recoveredFromCorruption: boolean;
};

function parseSessionRow(raw: unknown, caseId: string): ActiveSession {
  const row = sessionRowSchema.parse(raw);
  return activeSessionSchema.parse(parseStoredJson(row.payload_json, `session:${caseId}`));
}

export class ActiveSessionRepository {
  public constructor(private readonly database: SqlDatabase) {}

  public async get(caseId: string): Promise<ActiveSession | null> {
    const raw = await this.database.getFirstAsync(
      'SELECT payload_json FROM active_sessions WHERE case_id = ?',
      [caseId],
    );
    if (raw === null) return null;
    return parseSessionRow(raw, caseId);
  }

  public async getRecoveringCorruption(caseId: string): Promise<SessionRecoveryResult> {
    const raw = await this.database.getFirstAsync(
      'SELECT payload_json FROM active_sessions WHERE case_id = ?',
      [caseId],
    );
    if (raw === null) return { session: null, recoveredFromCorruption: false };

    try {
      return { session: parseSessionRow(raw, caseId), recoveredFromCorruption: false };
    } catch (error: unknown) {
      if (!(error instanceof DataValidationError) && !(error instanceof ZodError)) throw error;
      await this.delete(caseId);
      return { session: null, recoveredFromCorruption: true };
    }
  }

  public async save(session: ActiveSession): Promise<void> {
    const value = activeSessionSchema.parse(session);
    await this.database.runAsync(
      `INSERT INTO active_sessions (case_id, payload_json, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(case_id) DO UPDATE SET payload_json = excluded.payload_json, updated_at = excluded.updated_at`,
      [value.caseId, JSON.stringify(value), value.updatedAt],
    );
  }

  public async delete(caseId: string): Promise<void> {
    await this.database.runAsync('DELETE FROM active_sessions WHERE case_id = ?', [caseId]);
  }
}
