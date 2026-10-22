import { activeSessionSchema } from '@/domain/session/activeSession';

describe('activeSessionSchema', () => {
  it('reads sessions saved before report mistakes were tracked', () => {
    const legacy = {
      caseId: 'tutorial-missing-eleven',
      openedEvidenceIds: [],
      markedFieldIds: [],
      puzzleStates: {},
      hintsUsed: 0,
      selectedHypothesisId: null,
      selectedEvidenceIds: [],
      updatedAt: '2026-08-04T00:00:00.000Z',
    };

    expect(activeSessionSchema.parse(legacy).reportMistakes).toBe(0);
  });
});
