import { useEffect, useState } from 'react';

import { getRepositories } from '@/data/database/initializeDatabase';
import { logger } from '@/services/logger/logger';
import { createSession, useSessionStore } from '@/stores/useSessionStore';

type SessionLoadStatus = 'loading' | 'ready' | 'error';

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
    void getRepositories()
      .sessions.get(caseId)
      .then((saved) => {
        if (!active) return;
        load(saved ?? createSession(caseId));
        setStatus('ready');
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

  return session?.caseId === caseId ? 'ready' : status;
}
