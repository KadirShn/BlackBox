import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme/tokens';

const GRID_LINES = Array.from({ length: 10 }, (_, index) => index);

export function InvestigationBackdrop() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
    >
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={StyleSheet.absoluteFill}>
        {GRID_LINES.map((index) => (
          <View key={`v-${index}`} style={[styles.vertical, { left: `${index * 12}%` }]} />
        ))}
        {GRID_LINES.map((index) => (
          <View key={`h-${index}`} style={[styles.horizontal, { top: `${index * 12}%` }]} />
        ))}
      </View>
      <View style={[styles.node, styles.nodeOne]} />
      <View style={[styles.node, styles.nodeTwo]} />
      <View style={[styles.node, styles.nodeThree]} />
      <View style={styles.scanline} />
    </View>
  );
}

const styles = StyleSheet.create({
  glowTop: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#123A4655',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -120,
    left: -90,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#3B281833',
  },
  vertical: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: '#55F2D00A' },
  horizontal: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#55F2D00A' },
  node: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    backgroundColor: colors.background.primary,
  },
  nodeOne: { top: '18%', left: '12%' },
  nodeTwo: { top: '42%', right: '9%' },
  nodeThree: { bottom: '16%', left: '24%' },
  scanline: {
    position: 'absolute',
    top: '37%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#F2B84B22',
  },
});
