import { z } from 'zod';

export const progressStatusSchema = z.enum(['locked', 'available', 'in_progress', 'completed']);

export const playerProgressSchema = z.object({
  caseId: z.string().min(1),
  status: progressStatusSchema,
  bestStars: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  attempts: z.number().int().min(0),
  hintsUsedBest: z.number().int().min(0).nullable(),
  completedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime(),
});

export type PlayerProgress = z.infer<typeof playerProgressSchema>;
