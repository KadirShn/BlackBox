import { z } from 'zod';

export const achievementIdSchema = z.enum([
  'first-report',
  'hint-free',
  'perfect-connection',
  'all-evidence',
  'four-cases',
  'three-star-investigator',
]);

export const unlockedAchievementSchema = z.object({
  id: achievementIdSchema,
  unlockedAt: z.string().datetime(),
});

export type AchievementId = z.infer<typeof achievementIdSchema>;
export type UnlockedAchievement = z.infer<typeof unlockedAchievementSchema>;
