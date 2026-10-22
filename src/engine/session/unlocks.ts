import type { CaseDefinition } from '@/domain/case/caseSchema';
import type { ActiveSession } from '@/domain/session/activeSession';
import {
  evaluateCondition,
  type UnlockContext,
} from '@/engine/condition-evaluator/evaluateCondition';

export type UnlockState = {
  evidenceIds: ReadonlySet<string>;
  puzzleIds: ReadonlySet<string>;
};

function unlockContext(session: ActiveSession): UnlockContext {
  return {
    openedEvidenceIds: new Set(session.openedEvidenceIds),
    solvedPuzzleIds: new Set(
      Object.values(session.puzzleStates)
        .filter((state) => state.status === 'solved')
        .map((state) => state.puzzleId),
    ),
  };
}

// Anything the player already reached stays available, even if content rules change later.
export function getUnlockState(definition: CaseDefinition, session: ActiveSession): UnlockState {
  const context = unlockContext(session);
  return {
    evidenceIds: new Set(
      definition.evidence
        .filter(
          (evidence) =>
            context.openedEvidenceIds.has(evidence.id) ||
            evaluateCondition(evidence.unlockCondition, context),
        )
        .map((evidence) => evidence.id),
    ),
    puzzleIds: new Set(
      definition.puzzles
        .filter(
          (puzzle) =>
            session.puzzleStates[puzzle.id] !== undefined ||
            evaluateCondition(puzzle.unlockCondition, context),
        )
        .map((puzzle) => puzzle.id),
    ),
  };
}
