import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, radii, spacing, typography } from '@/theme/tokens';

export function EvidenceDetailScreen({
  caseId,
  evidenceId,
}: {
  caseId: string;
  evidenceId: string;
}) {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const session = useSessionStore((state) => state.session);
  const markField = useSessionStore((state) => state.markField);
  const evidence = getCaseById(caseId)?.evidence.find((item) => item.id === evidenceId);
  if (evidence === undefined)
    return (
      <ErrorState
        message="Delil bulunamadı."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Delil hatası"
      />
    );
  const marked = session?.markedFieldIds.includes(evidenceId) ?? false;
  const bodyKey =
    evidence.content.kind === 'log' ? evidence.descriptionKey : evidence.content.bodyKey;

  return (
    <ScreenFrame>
      <Text style={styles.eyebrow}>{evidence.type.replace('_', ' ').toUpperCase()}</Text>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(evidence.titleKey, language)}
      </Text>
      <View style={styles.document}>
        {evidence.content.kind === 'timeline_item' ? (
          <Text selectable style={styles.time}>
            {evidence.content.time}
          </Text>
        ) : null}
        <Text selectable style={styles.body}>
          {translateCase(bodyKey, language)}
        </Text>
      </View>
      <PrimaryButton
        label={marked ? '✓ Önemli alan işaretli' : 'Önemli alanı işaretle'}
        onPress={() => markField(evidenceId)}
      />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  eyebrow: { ...typography.caption, color: colors.accent.primary, letterSpacing: 1.2 },
  title: { ...typography.screenTitle, color: colors.text.primary },
  document: {
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  time: { ...typography.log, color: colors.accent.primary },
  body: { ...typography.body, color: colors.text.primary },
});
