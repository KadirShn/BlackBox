import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { caseCatalog } from '@/content/cases/catalog';
import { translate } from '@/content/locales/translations';
import { getRepositories } from '@/data/database/initializeDatabase';
import { achievementIds, type AchievementId } from '@/domain/achievements/achievement';
import { getRankStatus } from '@/engine/progression/rank';
import { buildStatistics, type PlayerStatistics } from '@/engine/statistics/buildStatistics';
import { logger } from '@/services/logger/logger';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type ViewData = { statistics: PlayerStatistics; achievementIds: readonly AchievementId[] };
type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: ViewData };

async function readStatistics(): Promise<LoadState> {
  try {
    const repositories = getRepositories();
    const [progress, achievements] = await Promise.all([
      repositories.progress.list(),
      repositories.achievements.list(),
    ]);
    return {
      status: 'ready',
      data: {
        statistics: buildStatistics(progress),
        achievementIds: achievements.map((item) => item.id),
      },
    };
  } catch (error: unknown) {
    logger.warn('Statistics load failed', {
      reason: error instanceof Error ? error.name : 'unknown',
    });
    return { status: 'error' };
  }
}

export function StatisticsScreen() {
  const language = useSettingsStore((state) => state.language);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let active = true;
    void readStatistics().then((result) => {
      if (active) setLoadState(result);
    });
    return () => {
      active = false;
    };
  }, []);

  if (loadState.status === 'loading')
    return <LoadingState label={translate('common.loading', language)} />;
  if (loadState.status === 'error') {
    return (
      <ErrorState
        message={translate('statistics.error', language)}
        onRetry={() => {
          setLoadState({ status: 'loading' });
          void readStatistics().then(setLoadState);
        }}
        retryLabel={translate('common.retry', language)}
        title={translate('statistics.title', language)}
      />
    );
  }

  const { statistics } = loadState.data;
  const unlockedIds = new Set(loadState.data.achievementIds);
  const rank = getRankStatus(statistics.totalStars, caseCatalog.length);
  const rows = [
    [translate('statistics.rank', language), translate(`rank.${rank.rank}`, language)],
    [translate('statistics.completed', language), String(statistics.completedCases)],
    [translate('statistics.stars', language), `${statistics.totalStars} / ${rank.maxStars}`],
    [translate('statistics.attempts', language), String(statistics.totalAttempts)],
    [translate('statistics.hintFree', language), String(statistics.hintFreeCases)],
  ] as const;

  return (
    <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
      <Text accessibilityRole="header" style={styles.title}>
        {translate('statistics.title', language)}
      </Text>
      <View style={styles.card}>
        {rows.map(([label, value]) => (
          <View key={label} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
      <Text accessibilityRole="header" style={styles.sectionTitle}>
        {translate('achievements.title', language)}
      </Text>
      <Text style={styles.label}>
        {translate('achievements.progress', language)
          .replace('{count}', String(unlockedIds.size))
          .replace('{total}', String(achievementIds.length))}
      </Text>
      {achievementIds.map((id) => {
        const unlocked = unlockedIds.has(id);
        return (
          <View
            accessibilityLabel={`${translate(`achievement.${id}`, language)}, ${
              unlocked
                ? translate(`achievement.${id}.description`, language)
                : translate('achievements.locked', language)
            }`}
            accessible
            key={id}
            style={[styles.achievement, !unlocked && styles.achievementLocked]}
          >
            <Text style={unlocked ? styles.value : styles.lockedTitle}>
              {unlocked ? '✓' : '◆'} {translate(`achievement.${id}`, language)}
            </Text>
            <Text style={styles.description}>
              {translate(`achievement.${id}.description`, language)}
            </Text>
          </View>
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
  },
  title: { ...typography.screenTitle, color: colors.text.primary },
  sectionTitle: { ...typography.sectionTitle, color: colors.text.primary },
  card: {
    padding: spacing.lg,
    gap: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  label: { ...typography.body, color: colors.text.secondary },
  value: { ...typography.body, color: colors.text.primary, fontWeight: '700' },
  achievement: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  achievementLocked: { opacity: 0.55 },
  lockedTitle: { ...typography.body, color: colors.text.secondary, fontWeight: '700' },
  description: { ...typography.caption, color: colors.text.secondary },
});
