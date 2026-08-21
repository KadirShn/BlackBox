import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { translate } from '@/content/locales/translations';
import { logger } from '@/services/logger/logger';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  failed: boolean;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  public state: AppErrorBoundaryState = { failed: false };

  public static getDerivedStateFromError(): AppErrorBoundaryState {
    return { failed: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.warn('Unhandled application render error', {
      reason: error.name,
      componentStackAvailable: info.componentStack !== null,
    });
  }

  public render(): ReactNode {
    if (!this.state.failed) return this.props.children;
    const language = useSettingsStore.getState().language;

    return (
      <View accessibilityLiveRegion="assertive" style={styles.screen}>
        <Text accessibilityRole="header" style={styles.title}>
          {translate('boundary.title', language)}
        </Text>
        <Text style={styles.message}>{translate('boundary.message', language)}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => this.setState({ failed: false })}
          style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : undefined]}
        >
          <Text style={styles.buttonLabel}>{translate('boundary.retry', language)}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.background.primary,
  },
  title: { ...typography.screenTitle, color: colors.text.primary, textAlign: 'center' },
  message: { ...typography.body, color: colors.text.secondary, textAlign: 'center' },
  button: {
    minWidth: 180,
    minHeight: layout.minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: radii.sm,
    backgroundColor: colors.accent.primary,
  },
  buttonPressed: { opacity: 0.82 },
  buttonLabel: { ...typography.button, color: colors.text.inverse },
});
