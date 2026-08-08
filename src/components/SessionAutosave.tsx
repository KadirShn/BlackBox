import { useEffect } from 'react';

import { getRepositories } from '@/data/database/initializeDatabase';
import { logger } from '@/services/logger/logger';
import { useSessionStore } from '@/stores/useSessionStore';

export function SessionAutosave() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = useSessionStore.subscribe((state) => {
      if (timer !== undefined) clearTimeout(timer);
      if (state.session === null) return;
      const snapshot = state.session;
      timer = setTimeout(() => {
        void getRepositories()
          .sessions.save(snapshot)
          .catch((error: unknown) => {
            logger.warn('Session autosave failed', {
              reason: error instanceof Error ? error.name : 'unknown',
            });
          });
      }, 250);
    });

    return () => {
      if (timer !== undefined) clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return null;
}
