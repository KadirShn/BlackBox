import { z } from 'zod';

export const persistedSettingsSchema = z.object({
  language: z.enum(['tr', 'en']),
  textSize: z.enum(['normal', 'large', 'extra-large']),
  reduceMotion: z.boolean(),
  hapticsEnabled: z.boolean(),
  soundEffectsEnabled: z.boolean(),
  musicEnabled: z.boolean(),
});

export type PersistedSettings = z.infer<typeof persistedSettingsSchema>;
