import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { EvidenceCard } from '@/components/EvidenceCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ProgressHeader } from '@/components/ProgressHeader';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate, type TranslationKey } from '@/content/locales/translations';
import type { CaseDefinition } from '@/domain/case/caseSchema';
import { useActiveSession } from '@/features/session/useActiveSession';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, spacing, typography } from '@/theme/tokens';

const evidenceTypeKeys: Record<CaseDefinition['evidence'][number]['type'], TranslationKey> = {
  message: 'evidence.type.message',
  system_log: 'evidence.type.system_log',
  sensor_record: 'evidence.type.sensor_record',
  image: 'evidence.type.image',
  statement: 'evidence.type.statement',
  location_record: 'evidence.type.location_record',
};

export function EvidenceDeskScreen({ caseId }: { caseId: string }) {
  const router = useRouter();
  const status = useActiveSession(caseId);
  const session = useSessionStore((state) => state.session);
  const openEvidence = useSessionStore((state) => state.openEvidence);
  const language = useSettingsStore((state) => state.language);
  const definition = getCaseById(caseId);

  if (definition === null)
    return (
      <ErrorState
        message={translate('evidence.deskMissing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('evidence.fileError', language)}
      />
    );
  if (status === 'error')
    return (
      <ErrorState
        message={translate('evidence.sessionMissing', language)}
        onRetry={() => router.replace({ pathname: '/cases/[caseId]', params: { caseId } })}
        retryLabel={translate('evidence.returnBriefing', language)}
        title={translate('evidence.sessionOpenError', language)}
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label={translate('evidence.sessionLoading', language)} />;

  const solvedCount = Object.values(session.puzzleStates).filter(
    (item) => item.status === 'solved',
  ).length;
  const reportReady = definition.solution.requiredPuzzleIds.every(
    (id) => session.puzzleStates[id]?.status === 'solved',
  );

  return (
    <ScreenFrame>
      <ProgressHeader
        completed={session.openedEvidenceIds.length + solvedCount}
        label={translate('evidence.progress', language)}
        total={definition.evidence.length + definition.puzzles.length}
      />
      <Text accessibilityRole="header" style={styles.title}>
        {translate('evidence.deskTitle', language)}
      </Text>
      <Text style={styles.subtitle}>{translateCase(definition.summaryKey, language)}</Text>
      {status === 'recovered' ? (
        <Text accessibilityLiveRegion="assertive" style={styles.recoveryNotice}>
          {translate('evidence.recovered', language)}
        </Text>
      ) : null}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{translate('evidence.section', language)}</Text>
        {definition.evidence.map((evidence) => (
          <EvidenceCard
            description={translateCase(evidence.descriptionKey, language)}
            key={evidence.id}
            onPress={() => {
              openEvidence(evidence.id);
              router.push({
                pathname: '/cases/[caseId]/evidence/[evidenceId]',
                params: { caseId, evidenceId: evidence.id },
              });
            }}
            opened={session.openedEvidenceIds.includes(evidence.id)}
            title={translateCase(evidence.titleKey, language)}
            typeLabel={translate(evidenceTypeKeys[evidence.type], language)}
          />
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{translate('evidence.puzzles', language)}</Text>
        {definition.puzzles.map((puzzle) => (
          <PrimaryButton
            key={puzzle.id}
            label={`${session.puzzleStates[puzzle.id]?.status === 'solved' ? '✓ ' : ''}${translateCase(puzzle.titleKey, language)}`}
            onPress={() =>
              router.push({
                pathname: '/cases/[caseId]/puzzle/[puzzleId]',
                params: { caseId, puzzleId: puzzle.id },
              })
            }
            variant="secondary"
          />
        ))}
      </View>
      <PrimaryButton
        disabled={!reportReady}
        label={
          reportReady
            ? translate('evidence.reportReady', language)
            : translate('evidence.reportLocked', language)
        }
        onPress={() => router.push({ pathname: '/cases/[caseId]/report', params: { caseId } })}
      />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  subtitle: { ...typography.body, color: colors.text.secondary },
  recoveryNotice: { ...typography.body, color: colors.status.warning },
  section: { gap: spacing.md },
  sectionTitle: { ...typography.sectionTitle, color: colors.text.primary },
});
