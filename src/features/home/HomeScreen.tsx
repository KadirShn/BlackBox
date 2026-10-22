import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SignalCore } from '@/components/SignalCore';
import { caseCatalog, getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate } from '@/content/locales/translations';
import { getRepositories } from '@/data/database/initializeDatabase';
import type { PlayerProgress } from '@/domain/progression/playerProgress';
import { countEarnedStars, getRankStatus } from '@/engine/progression/rank';
import { logger } from '@/services/logger/logger';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type HomeProgress = { totalStars: number; resumeCaseId: string | null };

function summarize(progress: readonly PlayerProgress[]): HomeProgress {
  const resume = progress
    .filter((item) => item.status === 'in_progress' && getCaseById(item.caseId) !== null)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
  return { totalStars: countEarnedStars(progress), resumeCaseId: resume?.caseId ?? null };
}

export function HomeScreen() {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const [progress, setProgress] = useState<HomeProgress>({ totalStars: 0, resumeCaseId: null });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      void getRepositories()
        .progress.list()
        .then((items) => {
          if (active) setProgress(summarize(items));
        })
        .catch((error: unknown) => {
          logger.warn('Home progress load failed', {
            reason: error instanceof Error ? error.name : 'unknown',
          });
        });
      return () => {
        active = false;
      };
    }, []),
  );

  const rank = getRankStatus(progress.totalStars, caseCatalog.length);
  const resumeCase = progress.resumeCaseId === null ? null : getCaseById(progress.resumeCaseId);
  const fill = rank.maxStars === 0 ? 0 : rank.totalStars / rank.maxStars;

  return (
    <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>{translate('home.eyebrow', language)}</Text>
        <Text accessibilityRole="header" style={styles.title}>
          {translate('home.title', language)}
        </Text>
        <Text style={styles.subtitle}>{translate('home.subtitle', language)}</Text>
      </View>
      <SignalCore />
      <View style={styles.telemetry}>
        <View style={styles.telemetryRow}>
          <View style={styles.telemetryItem}>
            <Text style={styles.rankLabel}>{translate('home.clearance', language)}</Text>
            <Text style={styles.rank}>{translate(`rank.${rank.rank}`, language)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.telemetryItem}>
            <Text style={styles.rankLabel}>{translate('home.stars', language)}</Text>
            <Text style={styles.stars}>
              ★ {rank.totalStars} / {rank.maxStars}
            </Text>
          </View>
        </View>
        <View
          accessibilityLabel={`${rank.totalStars} / ${rank.maxStars}`}
          accessibilityRole="progressbar"
          style={styles.track}
        >
          <View style={[styles.fill, { width: `${Math.round(fill * 100)}%` }]} />
        </View>
        <Text style={styles.nextRank}>
          {rank.next === null
            ? translate('home.maxRank', language)
            : translate('home.nextRank', language)
                .replace('{rank}', translate(`rank.${rank.next.rank}`, language))
                .replace('{count}', String(rank.next.starsNeeded))}
        </Text>
        <Text style={styles.online}>{translate('home.offlineSecure', language)}</Text>
      </View>
      <View style={styles.actions}>
        {resumeCase !== null ? (
          <PrimaryButton
            label={translate('home.continue', language).replace(
              '{case}',
              translateCase(resumeCase.titleKey, language),
            )}
            onPress={() =>
              router.push({ pathname: '/cases/[caseId]/desk', params: { caseId: resumeCase.id } })
            }
          />
        ) : null}
        <PrimaryButton
          label={translate('home.cases', language)}
          onPress={() => router.push('/cases')}
          variant={resumeCase !== null ? 'secondary' : 'primary'}
        />
        <PrimaryButton
          label={translate('home.archive', language)}
          onPress={() => router.push('/archive')}
          variant="secondary"
        />
        <PrimaryButton
          label={translate('home.statistics', language)}
          onPress={() => router.push('/statistics')}
          variant="secondary"
        />
        <PrimaryButton
          label={translate('home.settings', language)}
          onPress={() => router.push('/settings')}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    gap: spacing.xl,
    padding: spacing.xl,
    backgroundColor: 'transparent',
  },
  hero: {
    gap: spacing.sm,
    paddingTop: spacing.xl,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent.secondary,
    paddingLeft: spacing.lg,
  },
  eyebrow: { ...typography.caption, color: colors.accent.primary, letterSpacing: 1.5 },
  title: { ...typography.display, color: colors.text.primary, letterSpacing: 1.2 },
  subtitle: { ...typography.body, color: colors.text.secondary, maxWidth: 520 },
  telemetry: {
    gap: spacing.md,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.glass,
  },
  telemetryRow: { flexDirection: 'row', alignItems: 'stretch', gap: spacing.lg },
  telemetryItem: { flex: 1, gap: spacing.xs },
  divider: { width: 1, backgroundColor: colors.border.subtle },
  rankLabel: { ...typography.caption, color: colors.text.secondary },
  rank: { ...typography.sectionTitle, color: colors.text.primary },
  stars: { ...typography.sectionTitle, color: colors.status.warning },
  track: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.border.subtle,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.accent.primary },
  nextRank: { ...typography.caption, color: colors.text.secondary },
  online: { ...typography.caption, color: colors.accent.primary, letterSpacing: 0.7 },
  actions: { gap: spacing.md },
});
