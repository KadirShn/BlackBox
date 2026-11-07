import { z } from 'zod';

export const dailyResultSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  bestStars: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  hintsUsed: z.number().int().min(0),
  reportMistakes: z.number().int().min(0),
  completedAt: z.string().datetime(),
});

export type DailyResult = z.infer<typeof dailyResultSchema>;
