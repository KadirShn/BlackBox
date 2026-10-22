import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { EvidenceCard } from '@/components/EvidenceCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { caseCatalog, getCaseById, getNextCaseId } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate, type TranslationKey } from '@/content/locales/translations';
import { getRepositories } from '@/data/database/initializeDatabase';
import {
  countsAsReportMistake,
  evaluateReport,
  type ReportRejection,
} from '@/engine/scoring/scoringEngine';
import { evaluateAchievements } from '@/engine/achievements/evaluateAchievements';
import { useActiveSession } from '@/features/session/useActiveSession';
import { logger } from '@/services/logger/logger';
import { playFeedbackHaptic } from '@/services/haptics/hapticsService';
import { playUiSound } from '@/services/audio/audioService';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

const rejectionKeys: Record<ReportRejection, TranslationKey> = {
  missing_puzzles: 'report.incorrect.puzzles',
  hypothesis: 'report.incorrect.hypothesis',
  misleading_evidence: 'report.incorrect.misleading',
  missing_evidence: 'report.incorrect.missing',
};

export function ReportScreen({ caseId }: { caseId: string }) {
  const router = useRouter();
  const status = useActiveSession(caseId);
  const language = useSettingsStore((state) => state.language);
  const hapticsEnabled = useSettingsStore((state) => state.hapticsEnabled);
  const soundEffectsEnabled = useSettingsStore((state) => state.soundEffectsEnabled);
  const session = useSessionStore((state) => state.session);
  const selectHypothesis = useSessionStore((state) => state.selectHypothesis);
  const toggleEvidence = useSessionStore((state) => state.toggleReportEvidence);
  const recordReportMistake = useSessionStore((state) => state.recordReportMistake);
  const clearSession = useSessionStore((state) => state.clear);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const definition = getCaseById(caseId);

  if (definition === null)
    return (
      <ErrorState
        message={translate('report.missing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('report.openError', language)}
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label={translate('report.loading', language)} />;
  if (status === 'error')
    return (
      <ErrorState
        message={translate('report.sessionMissing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('common.loadError', language)}
      />
    );

  const activeSession = session;
  const caseDefinition = definition;

  async function submit(): Promise<void> {
    if (activeSession.selectedHypothesisId === null) {
      setFeedback(translate('report.selectHypothesis', language));
      return;
    }
    const solvedPuzzleIds = new Set(
      Object.values(activeSession.puzzleStates)
        .filter((item) => item.status === 'solved')
        .map((item) => item.puzzleId),
    );
    const evaluation = evaluateReport(caseDefinition, {
      hypothesisId: activeSession.selectedHypothesisId,
      evidenceIds: new Set(activeSession.selectedEvidenceIds),
      solvedPuzzleIds,
      hintsUsed: activeSession.hintsUsed,
      reportMistakes: activeSession.reportMistakes,
    });
    if (!evaluation.correct) {
      if (countsAsReportMistake(evaluation.reason)) recordReportMistake();
      setFeedback(
        translate(rejectionKeys[evaluation.reason], language).replace(
          '{count}',
          String(evaluation.missingEvidenceIds.length),
        ),
      );
      void playFeedbackHaptic(hapticsEnabled, 'warning');
      void playUiSound('warning', soundEffectsEnabled);
      return;
    }
    setSubmitting(true);
    try {
      const repositories = getRepositories();
      const previous = await repositories.progress.get(caseId);
      const timestamp = new Date().toISOString();
      await repositories.progress.completeAndUnlockNext(
        {
          caseId,
          status: 'completed',
          bestStars: evaluation.stars,
          attempts: previous?.attempts ?? 1,
          hintsUsedBest:
            previous?.hintsUsedBest === null || previous?.hintsUsedBest === undefined
              ? activeSession.hintsUsed
              : Math.min(previous.hintsUsedBest, activeSession.hintsUsed),
          completedAt: timestamp,
          updatedAt: timestamp,
        },
        getNextCaseId(caseId),
      );
      const progress = await repositories.progress.list();
      await repositories.achievements.unlock(
        evaluateAchievements({
          catalog: caseCatalog,
          definition: caseDefinition,
          session: activeSession,
          progress,
          stars: evaluation.stars,
        }),
        timestamp,
      );
      void playFeedbackHaptic(hapticsEnabled, 'success');
      void playUiSound('success', soundEffectsEnabled);
      clearSession();
      await repositories.sessions.delete(caseId);
      router.replace({
        pathname: '/cases/[caseId]/result',
        params: {
          caseId,
          stars: String(evaluation.stars),
          hints: String(activeSession.hintsUsed),
          mistakes: String(activeSession.reportMistakes),
        },
      });
    } catch (caught: unknown) {
      logger.warn('Report submission persistence failed', {
        reason: caught instanceof Error ? caught.name : 'unknown',
      });
      setFeedback(translate('report.saveError', language));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {translate('report.title', language)}
      </Text>
      <Text style={styles.sectionTitle}>{translate('report.hypothesis', language)}</Text>
      {definition.hypotheses.map((hypothesis) => {
        const selected = session.selectedHypothesisId === hypothesis.id;
        return (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            key={hypothesis.id}
            onPress={() => selectHypothesis(hypothesis.id)}
            style={[styles.hypothesis, selected && styles.selected]}
          >
            <Text style={styles.hypothesisTitle}>
              {selected ? '◉' : '○'} {translateCase(hypothesis.labelKey, language)}
            </Text>
            <Text style={styles.hypothesisBody}>
              {translateCase(hypothesis.explanationKey, language)}
            </Text>
          </Pressable>
        );
      })}
      <Text style={styles.sectionTitle}>{translate('report.evidence', language)}</Text>
      <View style={styles.evidenceList}>
        {definition.evidence
          .filter((evidence) => session.openedEvidenceIds.includes(evidence.id))
          .map((evidence) => (
            <EvidenceCard
              description={translateCase(evidence.descriptionKey, language)}
              key={evidence.id}
              onPress={() => toggleEvidence(evidence.id)}
              opened
              selected={session.selectedEvidenceIds.includes(evidence.id)}
              stateLabel={translate('evidence.state.opened', language)}
              title={translateCase(evidence.titleKey, language)}
              typeLabel={translate('report.evidenceType', language)}
            />
          ))}
      </View>
      {session.reportMistakes > 0 ? (
        <Text style={styles.mistakes}>
          {translate('report.mistakes', language).replace(
            '{count}',
            String(session.reportMistakes),
          )}
        </Text>
      ) : null}
      {feedback !== null ? (
        <Text accessibilityLiveRegion="assertive" style={styles.feedback}>
          {feedback}
        </Text>
      ) : null}
      <PrimaryButton
        label={translate('report.submit', language)}
        loading={submitting}
        onPress={() => void submit()}
      />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  sectionTitle: { ...typography.sectionTitle, color: colors.text.primary },
  hypothesis: {
    minHeight: layout.minTouchTarget,
    gap: spacing.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  selected: { borderColor: colors.accent.primary, backgroundColor: colors.accent.muted },
  hypothesisTitle: { ...typography.body, fontWeight: '700', color: colors.text.primary },
  hypothesisBody: { ...typography.caption, color: colors.text.secondary },
  evidenceList: { gap: spacing.md },
  feedback: { ...typography.body, color: colors.status.danger },
  mistakes: { ...typography.caption, color: colors.status.warning },
});
