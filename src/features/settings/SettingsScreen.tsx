import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { translate, type Language } from '@/content/locales/translations';
import { type TextSize, useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

function ChoiceRow<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: readonly { label: string; value: T }[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <View accessibilityRole="radiogroup" style={styles.choices}>
      {options.map((option) => (
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === option.value }}
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={[styles.choice, selected === option.value && styles.choiceSelected]}
        >
          <Text
            style={[styles.choiceLabel, selected === option.value && styles.choiceLabelSelected]}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function SettingsScreen() {
  const router = useRouter();
  const settings = useSettingsStore();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, settings.language);
  const languages: readonly { label: string; value: Language }[] = [
    { label: 'Türkçe', value: 'tr' },
    { label: 'English', value: 'en' },
  ];
  const textSizes: readonly { label: string; value: TextSize }[] = [
    { label: t('settings.normal'), value: 'normal' },
    { label: t('settings.large'), value: 'large' },
    { label: t('settings.extraLarge'), value: 'extra-large' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
      <Text accessibilityRole="header" style={styles.title}>
        {t('settings.title')}
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        <ChoiceRow
          options={languages}
          selected={settings.language}
          onSelect={settings.setLanguage}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.textSize')}</Text>
        <ChoiceRow
          options={textSizes}
          selected={settings.textSize}
          onSelect={settings.setTextSize}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.sectionTitle}>{t('settings.reduceMotion')}</Text>
        <Switch
          accessibilityLabel={t('settings.reduceMotion')}
          onValueChange={settings.setReduceMotion}
          value={settings.reduceMotion}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.sectionTitle}>{t('settings.haptics')}</Text>
        <Switch
          accessibilityLabel={t('settings.haptics')}
          onValueChange={settings.setHapticsEnabled}
          value={settings.hapticsEnabled}
        />
      </View>
      <View style={styles.switchRow}>
        <Text style={styles.sectionTitle}>{t('settings.soundEffects')}</Text>
        <Switch
          accessibilityLabel={t('settings.soundEffects')}
          onValueChange={settings.setSoundEffectsEnabled}
          value={settings.soundEffectsEnabled}
        />
      </View>
      <View style={styles.section}>
        <PrimaryButton
          label={t('settings.privacy')}
          onPress={() => router.push('/privacy')}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    gap: spacing.xl,
    padding: spacing.xl,
    backgroundColor: 'transparent',
  },
  title: { ...typography.screenTitle, color: colors.text.primary },
  section: { gap: spacing.md },
  sectionTitle: { ...typography.body, fontWeight: '700', color: colors.text.primary },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  choice: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.pill,
  },
  choiceLabel: { color: colors.text.secondary },
  choiceSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.muted,
  },
  choiceLabelSelected: { color: colors.text.primary },
  switchRow: {
    minHeight: layout.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
});
