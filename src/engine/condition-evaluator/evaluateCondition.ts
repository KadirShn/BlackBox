import type { UnlockCondition } from '@/domain/case/caseSchema';

export type UnlockContext = {
  openedEvidenceIds: ReadonlySet<string>;
  solvedPuzzleIds: ReadonlySet<string>;
};

export function evaluateCondition(condition: UnlockCondition, context: UnlockContext): boolean {
  switch (condition.type) {
    case 'always':
      return true;
    case 'evidence_opened':
      return context.openedEvidenceIds.has(condition.evidenceId);
    case 'puzzle_solved':
      return context.solvedPuzzleIds.has(condition.puzzleId);
    case 'all':
      return condition.conditions.every((child) => evaluateCondition(child, context));
    case 'any':
      return condition.conditions.some((child) => evaluateCondition(child, context));
  }
}
