import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SignalCore } from '@/components/SignalCore';
import { translate } from '@/content/locales/translations';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, spacing, typography } from '@/theme/tokens';

export function HomeScreen() {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);

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
        <View style={styles.telemetryItem}>
          <Text style={styles.rankLabel}>{translate('home.clearance', language)}</Text>
          <Text style={styles.rank}>{translate('home.rank', language)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.telemetryItem}>
          <Text style={styles.rankLabel}>{translate('home.network', language)}</Text>
          <Text style={styles.online}>{translate('home.offlineSecure', language)}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          label={translate('home.cases', language)}
          onPress={() => router.push('/cases')}
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
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: spacing.lg,
    gap: spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.glass,
  },
  telemetryItem: { flex: 1, gap: spacing.xs },
  divider: { width: 1, backgroundColor: colors.border.subtle },
  rankLabel: { ...typography.caption, color: colors.text.secondary },
  rank: { ...typography.sectionTitle, color: colors.text.primary },
  online: { ...typography.caption, color: colors.accent.primary, letterSpacing: 0.7 },
  actions: { gap: spacing.md },
});
