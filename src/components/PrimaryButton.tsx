import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { playSelectionHaptic } from '@/services/haptics/hapticsService';
import { playUiSound } from '@/services/audio/audioService';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  leading?: ReactNode;
  accessibilityHint?: string;
  variant?: 'primary' | 'secondary';
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  leading,
  accessibilityHint,
  variant = 'primary',
}: PrimaryButtonProps) {
  const hapticsEnabled = useSettingsStore((state) => state.hapticsEnabled);
  const soundEffectsEnabled = useSettingsStore((state) => state.soundEffectsEnabled);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={() => {
        void playSelectionHaptic(hapticsEnabled);
        void playUiSound('selection', soundEffectsEnabled);
        onPress();
      }}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        pressed && !isDisabled ? styles.pressed : undefined,
        isDisabled ? styles.disabled : undefined,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.inverse} />
      ) : (
        <View style={styles.content}>
          {leading}
          <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: layout.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.primary,
    boxShadow: '0 0 18px #55F2D022',
  },
  secondary: {
    borderColor: colors.border.subtle,
    backgroundColor: colors.surface.glass,
    boxShadow: 'none',
  },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.45 },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { ...typography.button, color: colors.text.inverse, textAlign: 'center' },
  secondaryLabel: { color: colors.text.primary, letterSpacing: 0.5 },
});
