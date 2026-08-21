import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { ScreenFrame } from '@/components/ScreenFrame';
import { translate, type TranslationKey } from '@/content/locales/translations';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, radii, spacing, typography } from '@/theme/tokens';

const sections: readonly { title: TranslationKey; body: TranslationKey }[] = [
  { title: 'privacy.dataTitle', body: 'privacy.dataBody' },
  { title: 'privacy.storageTitle', body: 'privacy.storageBody' },
  { title: 'privacy.contactTitle', body: 'privacy.contactBody' },
];

export function PrivacyScreen() {
  const language = useSettingsStore((state) => state.language);
  const t = (key: TranslationKey) => translate(key, language);

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {t('privacy.title')}
      </Text>
      <Text style={styles.summary}>{t('privacy.summary')}</Text>
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            {t(section.title)}
          </Text>
          <Text style={styles.body}>{t(section.body)}</Text>
        </View>
      ))}
      <Text style={styles.date}>{t('privacy.date')}</Text>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  summary: { ...typography.body, color: colors.text.secondary },
  section: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.glass,
  },
  sectionTitle: { ...typography.sectionTitle, color: colors.text.primary },
  body: { ...typography.body, color: colors.text.secondary },
  date: { ...typography.caption, color: colors.text.secondary },
});
