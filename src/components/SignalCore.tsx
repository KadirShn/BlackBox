import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, typography } from '@/theme/tokens';

export function SignalCore() {
  const reduceMotion = useSettingsStore((state) => state.reduceMotion);
  const [rotation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (reduceMotion) {
      rotation.stopAnimation();
      rotation.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, rotation]);

  return (
    <View accessibilityLabel="Olay sinyal tarayıcısı aktif" style={styles.container}>
      <View style={[styles.ring, styles.outer]} />
      <View style={[styles.ring, styles.middle]} />
      <View style={styles.crossHorizontal} />
      <View style={styles.crossVertical} />
      <Animated.View
        style={[
          styles.sweep,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
      <View style={styles.core}>
        <Text style={styles.coreCode}>BBX</Text>
        <Text style={styles.coreLabel}>SIGNAL / LIVE</Text>
      </View>
      <View style={[styles.blip, styles.blipOne]} />
      <View style={[styles.blip, styles.blipTwo]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border.signal,
  },
  outer: { width: 216, height: 216, borderStyle: 'dashed' },
  middle: { width: 154, height: 154, borderColor: colors.accent.primary },
  crossHorizontal: {
    position: 'absolute',
    width: 198,
    height: 1,
    backgroundColor: colors.border.signal,
  },
  crossVertical: {
    position: 'absolute',
    width: 1,
    height: 198,
    backgroundColor: colors.border.signal,
  },
  sweep: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderTopWidth: 2,
    borderRightWidth: 1,
    borderColor: colors.accent.primary,
  },
  core: {
    width: 102,
    height: 102,
    borderRadius: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.accent.secondary,
    backgroundColor: '#0B1720',
  },
  coreCode: { ...typography.screenTitle, color: colors.text.primary, letterSpacing: 4 },
  coreLabel: {
    ...typography.caption,
    fontSize: 9,
    color: colors.accent.primary,
    letterSpacing: 1.2,
  },
  blip: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent.secondary,
    boxShadow: '0 0 12px #F2B84B',
  },
  blipOne: { top: 42, right: 44 },
  blipTwo: { bottom: 54, left: 36, width: 6, height: 6 },
});
