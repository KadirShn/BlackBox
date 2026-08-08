import * as Haptics from 'expo-haptics';

import { logger } from '@/services/logger/logger';

export async function playSelectionHaptic(enabled: boolean): Promise<void> {
  if (!enabled) return;

  try {
    await Haptics.selectionAsync();
  } catch (error: unknown) {
    logger.warn('Selection haptic unavailable', {
      reason: error instanceof Error ? error.name : 'unknown',
    });
  }
}

export async function playFeedbackHaptic(
  enabled: boolean,
  type: 'success' | 'warning',
): Promise<void> {
  if (!enabled) return;
  try {
    await Haptics.notificationAsync(
      type === 'success'
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning,
    );
  } catch (error: unknown) {
    logger.warn('Feedback haptic unavailable', {
      reason: error instanceof Error ? error.name : 'unknown',
    });
  }
}
