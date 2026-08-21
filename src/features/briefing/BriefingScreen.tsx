import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate } from '@/content/locales/translations';
import { getRepositories } from '@/data/database/initializeDatabase';
import { logger } from '@/services/logger/logger';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { createSession, useSessionStore } from '@/stores/useSessionStore';
import { colors, radii, spacing, typography } from '@/theme/tokens';

export function BriefingScreen({ caseId }: { caseId: string }) {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const load = useSessionStore((state) => state.load);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(false);
  const definition = getCaseById(caseId);

  if (definition === null) {
    return (
      <ErrorState
        message={translate('briefing.missing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('briefing.openError', language)}
      />
    );
  }

  async function startCase(): Promise<void> {
    setStarting(true);
    setError(false);
    try {
      const repositories = getRepositories();
      const recovery = await repositories.sessions.getRecoveringCorruption(caseId);
      const existingSession = recovery.session;
      const session = existingSession ?? createSession(caseId);
      await repositories.sessions.save(session);
      const progress = await repositories.progress.get(caseId);
      await repositories.progress.save({
        caseId,
        status: 'in_progress',
        bestStars: progress?.bestStars ?? 0,
        attempts: (progress?.attempts ?? 0) + (existingSession === null ? 1 : 0),
        hintsUsedBest: progress?.hintsUsedBest ?? null,
        completedAt: progress?.completedAt ?? null,
        updatedAt: new Date().toISOString(),
      });
      load(session);
      router.replace({ pathname: '/cases/[caseId]/desk', params: { caseId } });
    } catch (caught: unknown) {
      logger.warn('Case start failed', {
        reason: caught instanceof Error ? caught.name : 'unknown',
      });
      setError(true);
    } finally {
      setStarting(false);
    }
  }

  return (
    <ScreenFrame>
      <Text style={styles.eyebrow}>
        {translate('briefing.eyebrow', language)} / {definition.estimatedMinutes}{' '}
        {translate('case.minutes', language).toUpperCase()}
      </Text>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(definition.titleKey, language)}
      </Text>
      <View style={styles.message}>
        <View style={styles.messageRail} />
        <Text style={styles.messageText}>{translateCase(definition.briefingKey, language)}</Text>
      </View>
      <View style={styles.objectives}>
        <Text style={styles.section}>{translate('briefing.objectives', language)}</Text>
        <Text style={styles.objective}>{translate('briefing.objectiveEvidence', language)}</Text>
        <Text style={styles.objective}>{translate('briefing.objectiveTimeline', language)}</Text>
        <Text style={styles.objective}>{translate('briefing.objectiveReport', language)}</Text>
      </View>
      {error ? (
        <Text accessibilityLiveRegion="assertive" style={styles.error}>
          {translate('briefing.startError', language)}
        </Text>
      ) : null}
      <PrimaryButton
        label={translate('briefing.start', language)}
        loading={starting}
        onPress={() => void startCase()}
      />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  eyebrow: { ...typography.caption, color: colors.accent.primary, letterSpacing: 1.3 },
  title: { ...typography.screenTitle, color: colors.text.primary },
  message: {
    padding: spacing.xl,
    paddingLeft: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.glass,
    overflow: 'hidden',
  },
  messageRail: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 5,
    backgroundColor: colors.accent.secondary,
  },
  messageText: { ...typography.body, color: colors.text.primary },
  objectives: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.subtle,
  },
  section: { ...typography.sectionTitle, color: colors.text.primary },
  objective: { ...typography.body, color: colors.text.secondary },
  error: { ...typography.body, color: colors.status.danger },
});
