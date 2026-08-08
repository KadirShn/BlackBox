import { useMemo, useState } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

export type TimelineDisplayItem = { id: string; time: string; title: string; body: string };

function TimelineRow({
  item,
  index,
  total,
  onMove,
}: {
  item: TimelineDisplayItem;
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
}) {
  const [translateY] = useState(() => new Animated.Value(0));
  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 6,
        onPanResponderMove: Animated.event([null, { dy: translateY }], { useNativeDriver: false }),
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dy > 24 && index < total - 1) onMove(1);
          if (gesture.dy < -24 && index > 0) onMove(-1);
          translateY.setValue(0);
        },
        onPanResponderTerminate: () => translateY.setValue(0),
      }),
    [index, onMove, total, translateY],
  );

  return (
    <Animated.View
      accessibilityLabel={`${index + 1}. ${item.time}, ${item.title}`}
      style={[styles.row, { transform: [{ translateY }] }]}
      {...responder.panHandlers}
    >
      <View style={styles.position}>
        <Text style={styles.positionText}>{index + 1}</Text>
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemBody}>{item.body}</Text>
      </View>
      <View style={styles.controls}>
        <Pressable
          accessibilityLabel={`${item.title} yukarı taşı`}
          accessibilityRole="button"
          disabled={index === 0}
          onPress={() => onMove(-1)}
          style={styles.arrow}
        >
          <Text style={styles.arrowText}>↑</Text>
        </Pressable>
        <Pressable
          accessibilityLabel={`${item.title} aşağı taşı`}
          accessibilityRole="button"
          disabled={index === total - 1}
          onPress={() => onMove(1)}
          style={styles.arrow}
        >
          <Text style={styles.arrowText}>↓</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

export function TimelinePuzzle({
  items,
  onMove,
  onSubmit,
  submitLabel,
}: {
  items: readonly TimelineDisplayItem[];
  onMove: (index: number, direction: -1 | 1) => void;
  onSubmit: () => void;
  submitLabel: string;
}) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TimelineRow
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          onMove={(direction) => onMove(index, direction)}
        />
      ))}
      <PrimaryButton label={submitLabel} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  position: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    backgroundColor: colors.accent.muted,
  },
  positionText: {
    ...typography.caption,
    color: colors.accent.primary,
    fontVariant: ['tabular-nums'],
  },
  rowBody: { flex: 1, gap: spacing.xs },
  time: { ...typography.log, color: colors.accent.primary },
  itemTitle: { ...typography.body, fontWeight: '700', color: colors.text.primary },
  itemBody: { ...typography.caption, color: colors.text.secondary },
  controls: { gap: spacing.xs },
  arrow: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
    backgroundColor: colors.background.elevated,
  },
  arrowText: { color: colors.text.primary, fontSize: 22 },
});
