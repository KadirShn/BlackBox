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
import { useActiveSession } from '@/features/session/useActiveSession';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, spacing, typography } from '@/theme/tokens';

const evidenceTypeLabels: Record<string, string> = {
  message: 'Mesaj',
  system_log: 'Sistem kaydı',
  sensor_record: 'Sensör',
  image: 'Görsel',
  statement: 'Belge',
  location_record: 'Konum',
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
        message="Vaka verisi bulunamadı."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Dosya hatası"
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label="Oturum yükleniyor" />;
  if (status === 'error')
    return (
      <ErrorState
        message="Kayıtlı oturum okunamadı."
        onRetry={() => router.replace({ pathname: '/cases/[caseId]', params: { caseId } })}
        retryLabel="Brifinge dön"
        title="Oturum açılamadı"
      />
    );

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
        label="İnceleme ilerlemesi"
        total={definition.evidence.length + definition.puzzles.length}
      />
      <Text accessibilityRole="header" style={styles.title}>
        Delil Masası
      </Text>
      <Text style={styles.subtitle}>{translateCase(definition.summaryKey, language)}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dijital deliller</Text>
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
            typeLabel={evidenceTypeLabels[evidence.type] ?? evidence.type}
          />
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Puzzle</Text>
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
        label={reportReady ? 'Raporu hazırla' : 'Rapor için puzzle’ı çöz'}
        onPress={() => router.push({ pathname: '/cases/[caseId]/report', params: { caseId } })}
      />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  subtitle: { ...typography.body, color: colors.text.secondary },
  section: { gap: spacing.md },
  sectionTitle: { ...typography.sectionTitle, color: colors.text.primary },
});
