import { z } from 'zod';

export const puzzleRuntimeStateSchema = z.object({
  puzzleId: z.string().min(1),
  status: z.enum(['not_started', 'active', 'solved']),
  attempts: z.number().int().min(0),
  hintsUsed: z.number().int().min(0),
  answer: z.unknown(),
});

export const activeSessionSchema = z.object({
  caseId: z.string().min(1),
  openedEvidenceIds: z.array(z.string().min(1)),
  markedFieldIds: z.array(z.string().min(1)),
  puzzleStates: z.record(z.string(), puzzleRuntimeStateSchema),
  hintsUsed: z.number().int().min(0),
  selectedHypothesisId: z.string().min(1).nullable(),
  selectedEvidenceIds: z.array(z.string().min(1)),
  updatedAt: z.string().datetime(),
});

export type ActiveSession = z.infer<typeof activeSessionSchema>;
