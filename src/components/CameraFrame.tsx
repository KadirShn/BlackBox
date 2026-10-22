import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { colors, radii, spacing, typography } from '@/theme/tokens';

const SCANLINE_COUNT = 18;

type CameraFrameProps = {
  camera: string;
  time: string;
  scene: string;
};

// Surveillance stills are drawn as a stylized feed so cases need no bitmap assets.
export function CameraFrame({ camera, time, scene }: CameraFrameProps) {
  return (
    <View accessibilityLabel={`${camera} · ${time} · ${scene}`} accessible style={styles.frame}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {Array.from({ length: SCANLINE_COUNT }, (_, index) => (
          <View
            key={index}
            style={[styles.scanline, { top: `${(index / SCANLINE_COUNT) * 100}%` }]}
          />
        ))}
      </View>
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
      <View style={styles.header}>
        <Text style={styles.rec}>● REC</Text>
        <Text style={styles.overlay}>{camera}</Text>
      </View>
      <Text style={styles.scene}>{scene}</Text>
      <Text style={styles.timestamp}>{time}</Text>
    </View>
  );
}

const cornerSize = 18;

const styles = StyleSheet.create({
  frame: {
    aspectRatio: 16 / 10,
    justifyContent: 'center',
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: '#03070B',
    overflow: 'hidden',
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#55F2D012',
  },
  corner: {
    position: 'absolute',
    width: cornerSize,
    height: cornerSize,
    borderColor: colors.accent.primary,
  },
  topLeft: { top: spacing.sm, left: spacing.sm, borderTopWidth: 2, borderLeftWidth: 2 },
  topRight: { top: spacing.sm, right: spacing.sm, borderTopWidth: 2, borderRightWidth: 2 },
  bottomLeft: { bottom: spacing.sm, left: spacing.sm, borderBottomWidth: 2, borderLeftWidth: 2 },
  bottomRight: {
    bottom: spacing.sm,
    right: spacing.sm,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  header: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.xl,
    right: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rec: { ...typography.log, color: colors.status.danger },
  overlay: { ...typography.log, color: colors.accent.primary },
  scene: {
    ...typography.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  timestamp: {
    ...typography.log,
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.xl,
    color: colors.accent.primary,
  },
});
