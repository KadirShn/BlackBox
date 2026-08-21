import { Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { StatusBadge, type CaseStatus } from '@/components/StatusBadge';
import { translate } from '@/content/locales/translations';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type CaseCardProps = {
  numberLabel: string;
  title: string;
  summary: string;
  difficulty: string;
  estimatedMinutes: number;
  status: CaseStatus;
  statusLabel: string;
  stars?: 0 | 1 | 2 | 3;
  onPress: () => void;
};

export function CaseCard({
  numberLabel,
  title,
  summary,
  difficulty,
  estimatedMinutes,
  status,
  statusLabel,
  stars = 0,
  onPress,
}: CaseCardProps) {
  const locked = status === 'locked';
  const language = useSettingsStore((state) => state.language);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: locked }}
      disabled={locked}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, locked && styles.locked]}
    >
      <View style={styles.spine} />
      <View style={[styles.corner, styles.cornerTop]} />
      <View style={[styles.corner, styles.cornerBottom]} />
      <View style={styles.header}>
        <Text style={styles.number}>{numberLabel}</Text>
        <StatusBadge label={statusLabel} status={status} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>
      <View style={styles.meta}>
        <Text style={styles.metaText}>
          {difficulty} · {estimatedMinutes} {translate('case.minutes', language)}
        </Text>
        <Text
          accessibilityLabel={`${stars} ${translate('case.stars', language)}`}
          style={styles.stars}
        >
          {'★'.repeat(stars)}
          {'☆'.repeat(3 - stars)}
        </Text>
      </View>
      <View style={styles.signalRail}>
        {[0, 1, 2, 3, 4].map((value) => (
          <View
            key={value}
            style={[styles.signalBar, value < (locked ? 1 : 4) && styles.signalBarActive]}
          />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: layout.minTouchTarget,
    gap: spacing.md,
    paddingVertical: spacing.lg,
    paddingLeft: spacing.xl,
    paddingRight: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.glass,
    overflow: 'hidden',
    boxShadow: '0 10px 28px #00000033',
  },
  pressed: { backgroundColor: colors.surface.pressed },
  locked: { opacity: 0.58 },
  spine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 5,
    backgroundColor: colors.accent.primary,
  },
  corner: {
    position: 'absolute',
    right: 0,
    width: 28,
    height: 1,
    backgroundColor: colors.accent.secondary,
  },
  cornerTop: { top: 0 },
  cornerBottom: { bottom: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  number: { ...typography.caption, color: colors.accent.secondary, letterSpacing: 1.8 },
  title: { ...typography.sectionTitle, color: colors.text.primary },
  summary: { ...typography.body, color: colors.text.secondary },
  meta: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  metaText: { ...typography.caption, color: colors.text.secondary },
  stars: { ...typography.caption, color: colors.status.warning, letterSpacing: 2 },
  signalRail: { flexDirection: 'row', gap: 4, height: 3 },
  signalBar: { flex: 1, backgroundColor: colors.border.subtle },
  signalBarActive: { backgroundColor: colors.accent.primary },
});
