import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { useSettingsStore } from '@/stores/useSettingsStore';
import { layout, spacing } from '@/theme/tokens';

export function ScreenFrame({ children }: { children: ReactNode }) {
  const reduceMotion = useSettingsStore((state) => state.reduceMotion);
  const [opacity] = useState(() => new Animated.Value(reduceMotion ? 1 : 0));

  useEffect(() => {
    opacity.stopAnimation();
    if (reduceMotion) {
      opacity.setValue(1);
      return;
    }
    opacity.setValue(0);
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [opacity, reduceMotion]);

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      style={{ opacity }}
    >
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: 'transparent',
  },
});
