import { getLocales } from 'expo-localization';
import { create } from 'zustand';

import type { Language } from '@/content/locales/translations';
import type { PersistedSettings } from '@/domain/settings/settings';

export type TextSize = 'normal' | 'large' | 'extra-large';

type SettingsState = {
  language: Language;
  textSize: TextSize;
  reduceMotion: boolean;
  hapticsEnabled: boolean;
  soundEffectsEnabled: boolean;
  musicEnabled: boolean;
  setLanguage: (language: Language) => void;
  setTextSize: (textSize: TextSize) => void;
  setReduceMotion: (reduceMotion: boolean) => void;
  setHapticsEnabled: (hapticsEnabled: boolean) => void;
  setSoundEffectsEnabled: (soundEffectsEnabled: boolean) => void;
  setMusicEnabled: (musicEnabled: boolean) => void;
  hydrate: (settings: PersistedSettings) => void;
};

function getInitialLanguage(): Language {
  const primaryLanguage = getLocales()[0]?.languageCode;
  return primaryLanguage === 'tr' ? 'tr' : 'en';
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: getInitialLanguage(),
  textSize: 'normal',
  reduceMotion: false,
  hapticsEnabled: true,
  soundEffectsEnabled: true,
  musicEnabled: false,
  setLanguage: (language) => set({ language }),
  setTextSize: (textSize) => set({ textSize }),
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
  setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
  setSoundEffectsEnabled: (soundEffectsEnabled) => set({ soundEffectsEnabled }),
  setMusicEnabled: (musicEnabled) => set({ musicEnabled }),
  hydrate: (settings) => set(settings),
}));

export function getTextScale(textSize: TextSize): number {
  if (textSize === 'large') return 1.15;
  if (textSize === 'extra-large') return 1.3;
  return 1;
}
