import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { colors, radii, spacing, typography } from '@/theme/tokens';

export type CaseStatus = 'available' | 'locked' | 'completed';

type StatusBadgeProps = { label: string; status: CaseStatus };

export function StatusBadge({ label, status }: StatusBadgeProps) {
  const marker = status === 'locked' ? '◆' : status === 'completed' ? '✓' : '●';

  return (
    <View accessibilityLabel={label} style={[styles.badge, styles[status]]}>
      <Text style={styles.label}>
        {marker} {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  available: { backgroundColor: colors.accent.muted, borderColor: colors.accent.primary },
  locked: { backgroundColor: '#29313A' },
  completed: { backgroundColor: '#183C2A' },
  label: { ...typography.caption, color: colors.text.primary },
});
