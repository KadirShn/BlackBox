import { z } from 'zod';

export const unlockConditionSchema: z.ZodType<UnlockCondition> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({ type: z.literal('always') }),
    z.object({ type: z.literal('evidence_opened'), evidenceId: z.string().min(1) }),
    z.object({ type: z.literal('puzzle_solved'), puzzleId: z.string().min(1) }),
    z.object({ type: z.literal('all'), conditions: z.array(unlockConditionSchema).min(1) }),
    z.object({ type: z.literal('any'), conditions: z.array(unlockConditionSchema).min(1) }),
  ]),
);

export type UnlockCondition =
  | { type: 'always' }
  | { type: 'evidence_opened'; evidenceId: string }
  | { type: 'puzzle_solved'; puzzleId: string }
  | { type: 'all'; conditions: UnlockCondition[] }
  | { type: 'any'; conditions: UnlockCondition[] };

const hintSchema = z.object({
  id: z.string().min(1),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  textKey: z.string().min(1),
  highlightTargetId: z.string().min(1).optional(),
});

const timelinePuzzleSchema = z
  .object({
    id: z.string().min(1),
    type: z.literal('timeline'),
    titleKey: z.string().min(1),
    instructionsKey: z.string().min(1),
    itemIds: z.array(z.string().min(1)).min(4).max(8),
    correctOrder: z.array(z.string().min(1)).min(4).max(8),
    unlockCondition: unlockConditionSchema,
    hints: z.array(hintSchema).max(3),
  })
  .superRefine((puzzle, context) => {
    const items = new Set(puzzle.itemIds);
    const answer = new Set(puzzle.correctOrder);
    if (items.size !== puzzle.itemIds.length || answer.size !== puzzle.correctOrder.length) {
      context.addIssue({ code: 'custom', message: 'Timeline IDs must be unique' });
    }
    if (items.size !== answer.size || [...items].some((id) => !answer.has(id))) {
      context.addIssue({ code: 'custom', message: 'Timeline answer must contain the same IDs' });
    }
  });

const logRowSchema = z.object({
  id: z.string().min(1),
  time: z.string().min(1),
  source: z.string().min(1),
  level: z.enum(['info', 'warning', 'error']),
  device: z.string().min(1),
  messageKey: z.string().min(1),
});

const logAnalyzerPuzzleSchema = z.object({
  id: z.string().min(1),
  type: z.literal('log_analyzer'),
  titleKey: z.string().min(1),
  instructionsKey: z.string().min(1),
  rows: z.array(logRowSchema).min(3).max(30),
  requiredRowIds: z.array(z.string().min(1)).min(1),
  allowedMistakes: z.number().int().min(0),
  unlockCondition: unlockConditionSchema,
  hints: z.array(hintSchema).max(3),
});

const selectableSourceSchema = z.object({
  titleKey: z.string().min(1),
  segments: z.array(z.object({ id: z.string().min(1), textKey: z.string().min(1) })).min(1),
});

const contradictionPuzzleSchema = z.object({
  id: z.string().min(1),
  type: z.literal('contradiction'),
  titleKey: z.string().min(1),
  instructionsKey: z.string().min(1),
  sourceA: selectableSourceSchema,
  sourceB: selectableSourceSchema,
  validPairs: z
    .array(z.object({ aSegmentId: z.string().min(1), bSegmentId: z.string().min(1) }))
    .min(1),
  unlockCondition: unlockConditionSchema,
  hints: z.array(hintSchema).max(3),
});

export const connectionTypeSchema = z.enum(['supports', 'contradicts', 'causes']);

const connectionSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  type: connectionTypeSchema,
});

const connectionBoardPuzzleSchema = z.object({
  id: z.string().min(1),
  type: z.literal('connection_board'),
  titleKey: z.string().min(1),
  instructionsKey: z.string().min(1),
  nodeIds: z.array(z.string().min(1)).min(3).max(10),
  allowedConnectionTypes: z.array(connectionTypeSchema).min(1),
  requiredConnections: z.array(connectionSchema).min(1),
  unlockCondition: unlockConditionSchema,
  hints: z.array(hintSchema).max(3),
});

export const puzzleSchema = z.discriminatedUnion('type', [
  timelinePuzzleSchema,
  logAnalyzerPuzzleSchema,
  contradictionPuzzleSchema,
  connectionBoardPuzzleSchema,
]);

const evidenceContentSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('text'), bodyKey: z.string().min(1) }),
  z.object({
    kind: z.literal('timeline_item'),
    time: z.string().min(1),
    bodyKey: z.string().min(1),
  }),
  z.object({ kind: z.literal('log'), rowIds: z.array(z.string().min(1)).min(1) }),
]);

const evidenceSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['message', 'system_log', 'sensor_record', 'image', 'statement', 'location_record']),
  titleKey: z.string().min(1),
  descriptionKey: z.string().min(1),
  content: evidenceContentSchema,
  unlockCondition: unlockConditionSchema,
  tags: z.array(z.string().min(1)),
});

const hypothesisSchema = z.object({
  id: z.string().min(1),
  labelKey: z.string().min(1),
  explanationKey: z.string().min(1),
});

export const caseSchema = z.object({
  id: z.string().min(1),
  schemaVersion: z.number().int().positive(),
  titleKey: z.string().min(1),
  summaryKey: z.string().min(1),
  briefingKey: z.string().min(1),
  difficulty: z.enum(['tutorial', 'easy', 'medium', 'hard']),
  estimatedMinutes: z.number().int().min(1).max(30),
  evidence: z.array(evidenceSchema),
  puzzles: z.array(puzzleSchema),
  hypotheses: z.array(hypothesisSchema).min(1),
  solution: z.object({
    correctHypothesisId: z.string().min(1),
    requiredEvidenceIds: z.array(z.string().min(1)),
    requiredPuzzleIds: z.array(z.string().min(1)),
    explanationKey: z.string().min(1),
  }),
  scoring: z.object({
    maxHintsForThreeStars: z.number().int().min(0),
    maxHintsForTwoStars: z.number().int().min(0),
  }),
});

export type CaseDefinition = z.infer<typeof caseSchema>;
export type PuzzleDefinition = z.infer<typeof puzzleSchema>;
export type TimelinePuzzleDefinition = z.infer<typeof timelinePuzzleSchema>;
export type LogAnalyzerPuzzleDefinition = z.infer<typeof logAnalyzerPuzzleSchema>;
export type ContradictionPuzzleDefinition = z.infer<typeof contradictionPuzzleSchema>;
export type ConnectionBoardPuzzleDefinition = z.infer<typeof connectionBoardPuzzleSchema>;
export type Connection = z.infer<typeof connectionSchema>;
export type ConnectionType = z.infer<typeof connectionTypeSchema>;
