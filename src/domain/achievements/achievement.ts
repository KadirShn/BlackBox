import { z } from 'zod';

export const achievementIds = [
  'first-report',
  'hint-free',
  'perfect-connection',
  'all-evidence',
  'four-cases',
  'three-star-investigator',
  'codebreaker',
  'flawless-report',
  'chapter-two',
  'all-cases',
  'perfect-archive',
] as const;

export const achievementIdSchema = z.enum(achievementIds);

export const unlockedAchievementSchema = z.object({
  id: achievementIdSchema,
  unlockedAt: z.string().datetime(),
});

export type AchievementId = z.infer<typeof achievementIdSchema>;
export type UnlockedAchievement = z.infer<typeof unlockedAchievementSchema>;
