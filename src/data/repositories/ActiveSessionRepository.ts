import type { SqlDatabase } from '@/data/database/sqlDatabase';
import { parseStoredJson } from '@/data/database/dataErrors';
import { activeSessionSchema, type ActiveSession } from '@/domain/session/activeSession';
import { z } from 'zod';

const sessionRowSchema = z.object({ payload_json: z.string() });

export class ActiveSessionRepository {
  public constructor(private readonly database: SqlDatabase) {}

  public async get(caseId: string): Promise<ActiveSession | null> {
    const raw = await this.database.getFirstAsync(
      'SELECT payload_json FROM active_sessions WHERE case_id = ?',
      [caseId],
    );
    if (raw === null) return null;
    const row = sessionRowSchema.parse(raw);
    return activeSessionSchema.parse(parseStoredJson(row.payload_json, `session:${caseId}`));
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
