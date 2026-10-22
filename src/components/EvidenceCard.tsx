import { Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';

import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type EvidenceCardProps = {
  title: string;
  description: string;
  typeLabel: string;
  stateLabel: string;
  opened: boolean;
  selected?: boolean;
  locked?: boolean;
  onPress: () => void;
};

export function EvidenceCard({
  title,
  description,
  typeLabel,
  stateLabel,
  opened,
  selected = false,
  locked = false,
  onPress,
}: EvidenceCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: locked }}
      disabled={locked}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
        locked && styles.locked,
      ]}
    >
      <View style={[styles.glyph, locked && styles.glyphLocked]}>
        <Text style={[styles.glyphText, locked && styles.glyphTextLocked]}>
          {locked ? '◆' : opened ? '◉' : '◎'}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.type}>{typeLabel}</Text>
          <Text style={styles.state}>{stateLabel}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {locked ? null : <View style={styles.notch} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: layout.minTouchTarget,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.glass,
    overflow: 'hidden',
  },
  selected: { borderColor: colors.accent.primary, backgroundColor: colors.evidence.selected },
  pressed: { opacity: 0.82 },
  locked: { opacity: 0.6, borderStyle: 'dashed' },
  glyph: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accent.primary,
    borderRadius: 26,
    backgroundColor: colors.accent.muted,
  },
  glyphLocked: { borderColor: colors.status.locked, backgroundColor: 'transparent' },
  glyphText: { ...typography.sectionTitle, color: colors.accent.primary },
  glyphTextLocked: { color: colors.status.locked },
  body: { flex: 1, gap: spacing.sm },
  notch: {
    position: 'absolute',
    right: -12,
    bottom: -12,
    width: 24,
    height: 24,
    transform: [{ rotate: '45deg' }],
    backgroundColor: colors.accent.secondary,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  type: { ...typography.caption, color: colors.accent.primary, textTransform: 'uppercase' },
  state: { ...typography.caption, color: colors.text.secondary },
  title: { ...typography.sectionTitle, color: colors.text.primary },
  description: { ...typography.body, color: colors.text.secondary },
});
