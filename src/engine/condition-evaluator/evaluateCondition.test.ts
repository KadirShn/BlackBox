import { evaluateCondition } from '@/engine/condition-evaluator/evaluateCondition';

const context = {
  openedEvidenceIds: new Set(['evidence-a']),
  solvedPuzzleIds: new Set(['puzzle-a']),
};

describe('evaluateCondition', () => {
  it('evaluates nested all and any conditions', () => {
    expect(
      evaluateCondition(
        {
          type: 'all',
          conditions: [
            { type: 'evidence_opened', evidenceId: 'evidence-a' },
            {
              type: 'any',
              conditions: [
                { type: 'puzzle_solved', puzzleId: 'missing' },
                { type: 'puzzle_solved', puzzleId: 'puzzle-a' },
              ],
            },
          ],
        },
        context,
      ),
    ).toBe(true);
  });

  it('returns false for an unmet reference', () => {
    expect(evaluateCondition({ type: 'evidence_opened', evidenceId: 'missing' }, context)).toBe(
      false,
    );
  });
});
