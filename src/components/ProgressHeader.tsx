import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';

import { colors, radii, spacing, typography } from '@/theme/tokens';

export function ProgressHeader({
  label,
  completed,
  total,
}: {
  label: string;
  completed: number;
  total: number;
}) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <View accessibilityLabel={`${label}: yüzde ${percent}`} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.count}>
          {completed}/{total}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { ...typography.caption, color: colors.text.secondary },
  count: { ...typography.caption, color: colors.text.primary, fontVariant: ['tabular-nums'] },
  track: {
    height: 6,
    overflow: 'hidden',
    borderRadius: radii.pill,
    backgroundColor: colors.border.subtle,
  },
  fill: { height: '100%', backgroundColor: colors.accent.primary },
});
