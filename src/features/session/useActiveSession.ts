import { useEffect, useState } from 'react';

import { getRepositories } from '@/data/database/initializeDatabase';
import { getCaseById } from '@/content/cases/catalog';
import { reconcileActiveSession } from '@/engine/session/reconcileActiveSession';
import { logger } from '@/services/logger/logger';
import { createSession, useSessionStore } from '@/stores/useSessionStore';

export type SessionLoadStatus = 'loading' | 'ready' | 'recovered' | 'error';

export function useActiveSession(caseId: string): SessionLoadStatus {
  const session = useSessionStore((state) => state.session);
  const load = useSessionStore((state) => state.load);
  const [status, setStatus] = useState<SessionLoadStatus>(
    session?.caseId === caseId ? 'ready' : 'loading',
  );

  useEffect(() => {
    if (session?.caseId === caseId) {
      return;
    }
    let active = true;
    const repositories = getRepositories();
    void repositories.sessions
      .getRecoveringCorruption(caseId)
      .then(async (result) => {
        if (!active) return;
        const definition = getCaseById(caseId);
        if (definition === null) {
          setStatus('error');
          return;
        }
        const restored =
          result.session === null
            ? createSession(caseId)
            : reconcileActiveSession(result.session, definition);
        if (result.session !== null) await repositories.sessions.save(restored);
        if (!active) return;
        load(restored);
        setStatus(result.recoveredFromCorruption ? 'recovered' : 'ready');
      })
      .catch((caught: unknown) => {
        logger.warn('Active session restore failed', {
          reason: caught instanceof Error ? caught.name : 'unknown',
        });
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, [caseId, load, session?.caseId]);

  if (session?.caseId !== caseId) return status;
  return status === 'recovered' ? 'recovered' : 'ready';
}
