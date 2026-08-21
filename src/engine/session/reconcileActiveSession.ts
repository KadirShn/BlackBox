import type { CaseDefinition } from '@/domain/case/caseSchema';
import type { ActiveSession } from '@/domain/session/activeSession';

export function reconcileActiveSession(
  session: ActiveSession,
  definition: CaseDefinition,
): ActiveSession {
  const evidenceIds = new Set(definition.evidence.map((evidence) => evidence.id));
  const puzzleIds = new Set(definition.puzzles.map((puzzle) => puzzle.id));
  const hypothesisIds = new Set(definition.hypotheses.map((hypothesis) => hypothesis.id));
  const puzzleStates: ActiveSession['puzzleStates'] = {};

  for (const [puzzleId, state] of Object.entries(session.puzzleStates)) {
    if (puzzleIds.has(puzzleId) && state.puzzleId === puzzleId) puzzleStates[puzzleId] = state;
  }

  return {
    ...session,
    caseId: definition.id,
    openedEvidenceIds: session.openedEvidenceIds.filter((id) => evidenceIds.has(id)),
    puzzleStates,
    hintsUsed: Object.values(puzzleStates).reduce((total, state) => total + state.hintsUsed, 0),
    selectedHypothesisId:
      session.selectedHypothesisId !== null && hypothesisIds.has(session.selectedHypothesisId)
        ? session.selectedHypothesisId
        : null,
    selectedEvidenceIds: session.selectedEvidenceIds.filter((id) => evidenceIds.has(id)),
  };
}
