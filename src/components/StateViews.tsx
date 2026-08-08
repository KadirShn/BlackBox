import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, spacing, typography } from '@/theme/tokens';

export function LoadingState({ label }: { label: string }) {
  return (
    <View accessibilityLiveRegion="polite" style={styles.container}>
      <ActivityIndicator color={colors.accent.primary} />
      <Text style={styles.body}>{label}</Text>
    </View>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.body}>{message}</Text>
    </View>
  );
}

export function ErrorState({
  title,
  message,
  retryLabel,
  onRetry,
}: {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
}) {
  return (
    <View accessibilityLiveRegion="assertive" style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text selectable style={styles.body}>
        {message}
      </Text>
      <PrimaryButton label={retryLabel} onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.md, padding: spacing.xl },
  title: { ...typography.sectionTitle, color: colors.text.primary, textAlign: 'center' },
  body: { ...typography.body, color: colors.text.secondary, textAlign: 'center' },
});
