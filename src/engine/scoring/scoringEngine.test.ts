import { tutorialCase } from '@/content/cases/tutorial';
import { evaluateReport } from '@/engine/scoring/scoringEngine';

describe('scoringEngine', () => {
  it('requires the hypothesis, evidence, and solved puzzle', () => {
    expect(
      evaluateReport(tutorialCase, {
        hypothesisId: 'maintenance-mode',
        evidenceIds: new Set(['flight-log']),
        solvedPuzzleIds: new Set(['timeline-main']),
        hintsUsed: 0,
      }).correct,
    ).toBe(false);
  });

  it.each([
    [0, 3],
    [1, 2],
    [3, 1],
  ] as const)('awards stars without using time: %s hints', (hintsUsed, stars) => {
    expect(
      evaluateReport(tutorialCase, {
        hypothesisId: 'maintenance-mode',
        evidenceIds: new Set(['flight-log', 'maintenance-ticket']),
        solvedPuzzleIds: new Set(['timeline-main']),
        hintsUsed,
      }),
    ).toEqual({ correct: true, stars });
  });
});
