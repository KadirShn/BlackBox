import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Animated, type ScrollView, StyleSheet } from 'react-native';

import { useSettingsStore } from '@/stores/useSettingsStore';
import { layout, spacing } from '@/theme/tokens';

type ScreenFrameProps = {
  children: ReactNode;
  /** Scrolls to the bottom whenever this value changes, so feedback under the actions is seen. */
  scrollToEndOn?: number;
};

export function ScreenFrame({ children, scrollToEndOn }: ScreenFrameProps) {
  const reduceMotion = useSettingsStore((state) => state.reduceMotion);
  const [opacity] = useState(() => new Animated.Value(reduceMotion ? 1 : 0));
  const scrollRef = useRef<ScrollView | null>(null);
  const lastScrollKey = useRef(scrollToEndOn);
  const pendingScroll = useRef(false);

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

  useEffect(() => {
    if (scrollToEndOn === lastScrollKey.current) return;
    lastScrollKey.current = scrollToEndOn;
    pendingScroll.current = true;
    scrollRef.current?.scrollToEnd({ animated: !reduceMotion });
  }, [reduceMotion, scrollToEndOn]);

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() => {
        // The feedback text may lay out after the effect ran; finish the scroll once it has.
        if (!pendingScroll.current) return;
        pendingScroll.current = false;
        scrollRef.current?.scrollToEnd({ animated: !reduceMotion });
      }}
      ref={scrollRef}
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
