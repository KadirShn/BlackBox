import { Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';

import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type EvidenceCardProps = {
  title: string;
  description: string;
  typeLabel: string;
  opened: boolean;
  selected?: boolean;
  onPress: () => void;
};

export function EvidenceCard({
  title,
  description,
  typeLabel,
  opened,
  selected = false,
  onPress,
}: EvidenceCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.card, selected && styles.selected, pressed && styles.pressed]}
    >
      <View style={styles.glyph}>
        <Text style={styles.glyphText}>{opened ? '◉' : '◎'}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.type}>{typeLabel}</Text>
          <Text style={styles.state}>{opened ? '✓ İncelendi' : '○ Yeni'}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.notch} />
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
  glyphText: { ...typography.sectionTitle, color: colors.accent.primary },
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
