import { playUiSound } from '@/services/audio/audioService';
import { playFeedbackHaptic } from '@/services/haptics/hapticsService';
import { useSettingsStore } from '@/stores/useSettingsStore';

export function useFeedback(): (type: 'success' | 'warning') => void {
  const hapticsEnabled = useSettingsStore((state) => state.hapticsEnabled);
  const soundEffectsEnabled = useSettingsStore((state) => state.soundEffectsEnabled);
  return (type) => {
    void playFeedbackHaptic(hapticsEnabled, type);
    void playUiSound(type, soundEffectsEnabled);
  };
}
