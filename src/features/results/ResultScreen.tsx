import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState } from '@/components/StateViews';
import { getCaseById, getNextCaseId } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, radii, spacing, typography } from '@/theme/tokens';

export function ResultScreen({ caseId, stars }: { caseId: string; stars: 1 | 2 | 3 }) {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const definition = getCaseById(caseId);
  if (definition === null)
    return (
      <ErrorState
        message="Sonuç verisi bulunamadı."
        onRetry={() => router.replace('/cases')}
        retryLabel="Vakalara dön"
        title="Sonuç açılamadı"
      />
    );
  const nextCaseId = getNextCaseId(caseId);

  return (
    <ScreenFrame>
      <Text style={styles.eyebrow}>DOSYA KAPANDI</Text>
      <Text accessibilityLabel={`${stars} yıldız`} style={styles.stars}>
        {'★'.repeat(stars)}
        {'☆'.repeat(3 - stars)}
      </Text>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(definition.titleKey, language)}
      </Text>
      <View style={styles.explanation}>
        <Text style={styles.body}>
          {translateCase(definition.solution.explanationKey, language)}
        </Text>
      </View>
      <PrimaryButton
        label="Tekrar oyna"
        onPress={() => router.replace({ pathname: '/cases/[caseId]', params: { caseId } })}
      />
      {nextCaseId !== null ? (
        <PrimaryButton label="Sonraki vakaya geç" onPress={() => router.replace('/cases')} />
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
  explanation: {
    padding: spacing.xl,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  body: { ...typography.body, color: colors.text.primary },
});
