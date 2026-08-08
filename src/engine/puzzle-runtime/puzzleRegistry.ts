import { z } from 'zod';

import type {
  Connection,
  ConnectionBoardPuzzleDefinition,
  ContradictionPuzzleDefinition,
  LogAnalyzerPuzzleDefinition,
  PuzzleDefinition,
  TimelinePuzzleDefinition,
} from '@/domain/case/caseSchema';
import { evaluateTimeline, restoreTimelineAnswer } from '@/engine/puzzle-runtime/timelineEvaluator';

const stringArraySchema = z.array(z.string());
const contradictionAnswerSchema = z.object({
  aSegmentId: z.string(),
  bSegmentId: z.string(),
});
const connectionAnswerSchema = z.array(
  z.object({
    from: z.string(),
    to: z.string(),
    type: z.enum(['supports', 'contradicts', 'causes']),
  }),
);

export type ContradictionAnswer = z.infer<typeof contradictionAnswerSchema>;

export function evaluateLogAnalyzer(
  definition: LogAnalyzerPuzzleDefinition,
  selectedRowIds: readonly string[],
): boolean {
  const selected = new Set(selectedRowIds);
  const required = new Set(definition.requiredRowIds);
  const missingRequired = [...required].some((id) => !selected.has(id));
  const extraCount = [...selected].filter((id) => !required.has(id)).length;
  return !missingRequired && extraCount <= definition.allowedMistakes;
}

export function evaluateContradiction(
  definition: ContradictionPuzzleDefinition,
  answer: ContradictionAnswer,
): boolean {
  return definition.validPairs.some(
    (pair) => pair.aSegmentId === answer.aSegmentId && pair.bSegmentId === answer.bSegmentId,
  );
}

function connectionKey(connection: Connection): string {
  return `${connection.from}\u0000${connection.to}\u0000${connection.type}`;
}

export function evaluateConnectionBoard(
  definition: ConnectionBoardPuzzleDefinition,
  answer: readonly Connection[],
): boolean {
  const submitted = new Set(answer.map(connectionKey));
  const required = new Set(definition.requiredConnections.map(connectionKey));
  return submitted.size === required.size && [...required].every((key) => submitted.has(key));
}

type PuzzleAdapter = {
  restore: (definition: PuzzleDefinition, value: unknown) => unknown;
  evaluate: (definition: PuzzleDefinition, value: unknown) => boolean;
  serialize: (value: unknown) => unknown;
};

function restoreStringArray(value: unknown): string[] {
  const result = stringArraySchema.safeParse(value);
  return result.success ? result.data : [];
}

export const puzzleRegistry: Record<PuzzleDefinition['type'], PuzzleAdapter> = {
  timeline: {
    restore: (definition, value) =>
      definition.type === 'timeline' ? restoreTimelineAnswer(definition, value) : [],
    evaluate: (definition, value) =>
      definition.type === 'timeline' && evaluateTimeline(definition, restoreStringArray(value)),
    serialize: restoreStringArray,
  },
  log_analyzer: {
    restore: (_, value) => restoreStringArray(value),
    evaluate: (definition, value) =>
      definition.type === 'log_analyzer' &&
      evaluateLogAnalyzer(definition, restoreStringArray(value)),
    serialize: restoreStringArray,
  },
  contradiction: {
    restore: (_, value) => {
      const result = contradictionAnswerSchema.safeParse(value);
      return result.success ? result.data : { aSegmentId: '', bSegmentId: '' };
    },
    evaluate: (definition, value) => {
      const result = contradictionAnswerSchema.safeParse(value);
      return (
        definition.type === 'contradiction' &&
        result.success &&
        evaluateContradiction(definition, result.data)
      );
    },
    serialize: (value) => contradictionAnswerSchema.parse(value),
  },
  connection_board: {
    restore: (_, value) => {
      const result = connectionAnswerSchema.safeParse(value);
      return result.success ? result.data : [];
    },
    evaluate: (definition, value) => {
      const result = connectionAnswerSchema.safeParse(value);
      return (
        definition.type === 'connection_board' &&
        result.success &&
        evaluateConnectionBoard(definition, result.data)
      );
    },
    serialize: (value) => connectionAnswerSchema.parse(value),
  },
};

export function evaluatePuzzle(definition: PuzzleDefinition, answer: unknown): boolean {
  return puzzleRegistry[definition.type].evaluate(definition, answer);
}

export function restorePuzzleAnswer(definition: PuzzleDefinition, answer: unknown): unknown {
  return puzzleRegistry[definition.type].restore(definition, answer);
}

export function serializePuzzleAnswer(definition: PuzzleDefinition, answer: unknown): unknown {
  return puzzleRegistry[definition.type].serialize(answer);
}

export type { TimelinePuzzleDefinition };
