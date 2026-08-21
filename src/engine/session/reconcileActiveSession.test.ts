import { caseCatalog } from '@/content/cases/catalog';
import type { ActiveSession } from '@/domain/session/activeSession';
import { reconcileActiveSession } from '@/engine/session/reconcileActiveSession';

describe('reconcileActiveSession', () => {
  it('removes references that no longer exist after a content update', () => {
    const definition = caseCatalog[0];
    if (definition === undefined) throw new Error('Tutorial fixture is missing');
    const validEvidenceId = definition.evidence[0]?.id;
    const validPuzzleId = definition.puzzles[0]?.id;
    if (validEvidenceId === undefined || validPuzzleId === undefined)
      throw new Error('Tutorial content fixture is incomplete');

    const session: ActiveSession = {
      caseId: definition.id,
      openedEvidenceIds: [validEvidenceId, 'removed-evidence'],
      markedFieldIds: [],
      puzzleStates: {
        [validPuzzleId]: {
          puzzleId: validPuzzleId,
          status: 'active',
          attempts: 1,
          hintsUsed: 1,
          answer: null,
        },
        'removed-puzzle': {
          puzzleId: 'removed-puzzle',
          status: 'active',
          attempts: 1,
          hintsUsed: 2,
          answer: null,
        },
      },
      hintsUsed: 3,
      selectedHypothesisId: 'removed-hypothesis',
      selectedEvidenceIds: [validEvidenceId, 'removed-evidence'],
      updatedAt: '2026-08-21T00:00:00.000Z',
    };

    const reconciled = reconcileActiveSession(session, definition);

    expect(reconciled.openedEvidenceIds).toEqual([validEvidenceId]);
    expect(Object.keys(reconciled.puzzleStates)).toEqual([validPuzzleId]);
    expect(reconciled.hintsUsed).toBe(1);
    expect(reconciled.selectedHypothesisId).toBeNull();
    expect(reconciled.selectedEvidenceIds).toEqual([validEvidenceId]);
  });
});
