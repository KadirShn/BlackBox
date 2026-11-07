import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Share, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState } from '@/components/StateViews';
import { caseCatalog, getCaseById, getNextCaseId } from '@/content/cases/catalog';
import { dailyDateFromId } from '@/content/daily/dailyCase';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate } from '@/content/locales/translations';
import { getRepositories } from '@/data/database/initializeDatabase';
import { buildShareMessage } from '@/features/results/shareMessage';
import { logger } from '@/services/logger/logger';
import { maybeRequestReview } from '@/services/review/reviewService';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, radii, spacing, typography } from '@/theme/tokens';

export function ResultScreen({
  caseId,
  stars,
  hintsUsed = null,
  reportMistakes = null,
  streak = null,
}: {
  caseId: string;
  stars: 1 | 2 | 3;
  hintsUsed?: number | null;
  reportMistakes?: number | null;
  streak?: number | null;
}) {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const definition = getCaseById(caseId);
  const dailyDate = dailyDateFromId(caseId);
  const freshCompletion = hintsUsed !== null;

  useEffect(() => {
    if (!freshCompletion) return;
    void maybeRequestReview(
      getRepositories(),
      stars,
      new Set(caseCatalog.filter((item) => item.difficulty !== 'tutorial').map((item) => item.id)),
    );
  }, [freshCompletion, stars]);

  if (definition === null)
    return (
      <ErrorState
        message={translate('result.missing', language)}
        onRetry={() => router.replace('/cases')}
        retryLabel={translate('result.returnCases', language)}
        title={translate('result.openError', language)}
      />
    );
  const nextCaseId = getNextCaseId(caseId);
  const title = translateCase(definition.titleKey, language);

  function share(): void {
    void Share.share({
      message: buildShareMessage(
        { title, dailyDate, stars, hintsUsed, reportMistakes, streak },
        language,
      ),
    }).catch((error: unknown) => {
      logger.warn('Result share failed', {
        reason: error instanceof Error ? error.name : 'unknown',
      });
    });
  }

  return (
    <ScreenFrame>
      <Text style={styles.eyebrow}>{translate('result.closed', language)}</Text>
      <Text
        accessibilityLabel={`${stars} ${translate('case.stars', language)}`}
        style={styles.stars}
      >
        {'★'.repeat(stars)}
        {'☆'.repeat(3 - stars)}
      </Text>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {streak !== null && streak > 0 ? (
        <Text style={styles.streak}>
          {translate('result.streak', language).replace('{count}', String(streak))}
        </Text>
      ) : null}
      {hintsUsed !== null && reportMistakes !== null ? (
        <View style={styles.breakdown}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>{hintsUsed}</Text>
            <Text style={styles.breakdownLabel}>{translate('result.hints', language)}</Text>
          </View>
          <View style={styles.breakdownDivider} />
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownValue}>{reportMistakes}</Text>
            <Text style={styles.breakdownLabel}>{translate('result.mistakes', language)}</Text>
          </View>
        </View>
      ) : null}
      <View style={styles.explanation}>
        <Text style={styles.body}>
          {translateCase(definition.solution.explanationKey, language)}
        </Text>
      </View>
      <PrimaryButton label={translate('result.share', language)} onPress={share} />
      <PrimaryButton
        label={translate('result.replay', language)}
        variant="secondary"
        onPress={() => router.replace({ pathname: '/cases/[caseId]', params: { caseId } })}
      />
      {nextCaseId !== null ? (
        <PrimaryButton
          label={translate('result.next', language)}
          onPress={() =>
            router.replace({ pathname: '/cases/[caseId]', params: { caseId: nextCaseId } })
          }
        />
      ) : null}
      {dailyDate !== null ? (
        <PrimaryButton
          label={translate('result.home', language)}
          onPress={() => router.replace('/')}
          variant="secondary"
        />
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    ...typography.caption,
    color: colors.status.success,
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  stars: { color: colors.status.warning, fontSize: 42, letterSpacing: 8, textAlign: 'center' },
  title: { ...typography.screenTitle, color: colors.text.primary, textAlign: 'center' },
  streak: { ...typography.sectionTitle, color: colors.status.warning, textAlign: 'center' },
  breakdown: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.subtle,
  },
  breakdownItem: { flex: 1, alignItems: 'center', gap: spacing.xs },
  breakdownDivider: { width: 1, backgroundColor: colors.border.subtle },
  breakdownValue: { ...typography.sectionTitle, color: colors.text.primary },
  breakdownLabel: { ...typography.caption, color: colors.text.secondary, textAlign: 'center' },
  explanation: {
    padding: spacing.xl,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  body: { ...typography.body, color: colors.text.primary },
});
