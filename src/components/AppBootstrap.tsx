import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ErrorState, LoadingState } from '@/components/StateViews';
import { SessionAutosave } from '@/components/SessionAutosave';
import { initializeDatabase } from '@/data/database/initializeDatabase';
import type { PersistedSettings } from '@/domain/settings/settings';
import { logger } from '@/services/logger/logger';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors } from '@/theme/tokens';

type BootstrapStatus = 'loading' | 'ready' | 'error';

function selectPersistedSettings(): PersistedSettings {
  const state = useSettingsStore.getState();
  return {
    language: state.language,
    textSize: state.textSize,
    reduceMotion: state.reduceMotion,
    hapticsEnabled: state.hapticsEnabled,
    soundEffectsEnabled: state.soundEffectsEnabled,
    musicEnabled: state.musicEnabled,
  };
}

export function AppBootstrap({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<BootstrapStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    void initializeDatabase()
      .then(async (repositories) => {
        const savedSettings = await repositories.settings.get();
        if (!active) return;
        if (savedSettings !== null) useSettingsStore.getState().hydrate(savedSettings);

        let saveQueue = Promise.resolve();
        unsubscribe = useSettingsStore.subscribe(() => {
          const snapshot = selectPersistedSettings();
          saveQueue = saveQueue
            .then(() => repositories.settings.save(snapshot))
            .catch((error: unknown) => {
              logger.warn('Settings persistence failed', {
                reason: error instanceof Error ? error.name : 'unknown',
              });
            });
        });
        setStatus('ready');
      })
      .catch((error: unknown) => {
        logger.warn('Database bootstrap failed', {
          reason: error instanceof Error ? error.name : 'unknown',
        });
        if (active) setStatus('error');
      });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [attempt]);

  if (status === 'loading') {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background.primary }}
      >
        <LoadingState label="Yerel arşiv hazırlanıyor" />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background.primary }}
      >
        <ErrorState
          message="Yerel kayıt alanı açılamadı. İlerlemeniz silinmedi."
          onRetry={() => {
            setStatus('loading');
            setAttempt((value) => value + 1);
          }}
          retryLabel="Tekrar dene"
          title="Arşiv kullanılamıyor"
        />
      </View>
    );
  }

  return (
    <>
      <SessionAutosave />
      {children}
    </>
  );
}
