import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { CaseCard } from '@/components/CaseCard';
import { EmptyState, ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
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
  | { status: 'ready'; completed: readonly PlayerProgress[] };

async function readArchive(): Promise<LoadState> {
  try {
    const progress = await getRepositories().progress.list();
    return {
      status: 'ready',
      completed: progress.filter((item) => item.status === 'completed'),
    };
  } catch (error: unknown) {
    logger.warn('Archive load failed', {
      cause: error instanceof Error ? error.message : 'Unknown error',
    });
    return { status: 'error' };
  }
}

export function ArchiveScreen() {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    void readArchive().then((result) => {
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
        message={translate('archive.error', language)}
        onRetry={() => {
          setLoadState({ status: 'loading' });
          void readArchive().then(setLoadState);
        }}
        retryLabel={translate('common.retry', language)}
        title={translate('archive.title', language)}
      />
    );
  }
  if (loadState.completed.length === 0) {
    return (
      <EmptyState
        message={translate('archive.empty', language)}
        title={translate('archive.title', language)}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.heading}>
        <Text accessibilityRole="header" style={styles.title}>
          {translate('archive.title', language)}
        </Text>
        <Text style={styles.subtitle}>{translate('archive.subtitle', language)}</Text>
      </View>
      {loadState.completed.map((progress) => {
        const definition = getCaseById(progress.caseId);
        if (definition === null) return null;
        return (
          <CaseCard
            difficulty={translate(`case.difficulty.${definition.difficulty}`, language)}
            estimatedMinutes={definition.estimatedMinutes}
            key={definition.id}
            numberLabel="ARŞİV"
            onPress={() =>
              router.push({ pathname: '/cases/[caseId]', params: { caseId: definition.id } })
            }
            stars={progress.bestStars}
            status="completed"
            statusLabel={translate('case.status.completed', language)}
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
