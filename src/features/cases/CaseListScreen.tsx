import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { CaseCard } from '@/components/CaseCard';
import { EmptyState, ErrorState, LoadingState } from '@/components/StateViews';
import { caseCatalog } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate } from '@/content/locales/translations';
import { getRepositories } from '@/data/database/initializeDatabase';
import type { PlayerProgress } from '@/domain/progression/playerProgress';
import { logger } from '@/services/logger/logger';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, spacing, typography } from '@/theme/tokens';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; progress: ReadonlyMap<string, PlayerProgress> };

async function readProgress(): Promise<LoadState> {
  try {
    const progress = await getRepositories().progress.list();
    return {
      status: 'ready',
      progress: new Map(progress.map((item) => [item.caseId, item])),
    };
  } catch (error: unknown) {
    logger.warn('Case list load failed', {
      cause: error instanceof Error ? error.message : 'Unknown error',
    });
    return { status: 'error' };
  }
}

export function CaseListScreen() {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    void readProgress().then((result) => {
      if (active) setLoadState(result);
    });
    return () => {
      active = false;
    };
  }, []);

  if (loadState.status === 'loading') {
    return <LoadingState label={translate('common.loading', language)} />;
  }

  if (loadState.status === 'error') {
    return (
      <ErrorState
        message={translate('cases.error', language)}
        onRetry={() => {
          setLoadState({ status: 'loading' });
          void readProgress().then(setLoadState);
        }}
        retryLabel={translate('common.retry', language)}
        title={translate('cases.title', language)}
      />
    );
  }

  if (caseCatalog.length === 0) {
    return (
      <EmptyState
        message={translate('cases.empty', language)}
        title={translate('cases.title', language)}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.heading}>
        <Text accessibilityRole="header" style={styles.title}>
          {translate('cases.title', language)}
        </Text>
        <Text style={styles.subtitle}>{translate('cases.subtitle', language)}</Text>
      </View>
      {caseCatalog.map((definition, index) => {
        const progress = loadState.progress.get(definition.id);
        const progressStatus = progress?.status ?? 'locked';
        const visualStatus =
          progressStatus === 'completed'
            ? 'completed'
            : progressStatus === 'locked'
              ? 'locked'
              : 'available';
        const statusKey =
          progressStatus === 'completed'
            ? 'case.status.completed'
            : progressStatus === 'in_progress'
              ? 'case.status.inProgress'
              : progressStatus === 'locked'
                ? 'case.status.locked'
                : 'case.status.available';
        const difficultyKey = `case.difficulty.${definition.difficulty}` as const;

        return (
          <CaseCard
            difficulty={translate(difficultyKey, language)}
            estimatedMinutes={definition.estimatedMinutes}
            key={definition.id}
            numberLabel={`DOSYA / ${String(index).padStart(2, '0')}`}
            onPress={() =>
              router.push({ pathname: '/cases/[caseId]', params: { caseId: definition.id } })
            }
            stars={progress?.bestStars ?? 0}
            status={visualStatus}
            statusLabel={translate(statusKey, language)}
            summary={translateCase(definition.summaryKey, language)}
            title={translateCase(definition.titleKey, language)}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: 'transparent',
  },
  heading: { gap: spacing.sm, paddingBottom: spacing.sm },
  title: { ...typography.screenTitle, color: colors.text.primary },
  subtitle: { ...typography.body, color: colors.text.secondary },
});
