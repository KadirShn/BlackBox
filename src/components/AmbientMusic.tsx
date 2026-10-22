import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { setAmbientMusicPlaying } from '@/services/audio/musicService';
import { useSettingsStore } from '@/stores/useSettingsStore';

export function AmbientMusic() {
  const musicEnabled = useSettingsStore((state) => state.musicEnabled);
  const [foreground, setForeground] = useState(AppState.currentState !== 'background');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      setForeground(state === 'active');
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    void setAmbientMusicPlaying(musicEnabled && foreground);
  }, [foreground, musicEnabled]);

  useEffect(() => () => void setAmbientMusicPlaying(false), []);

  return null;
}
