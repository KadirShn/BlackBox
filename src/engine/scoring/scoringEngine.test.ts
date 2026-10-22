import { tutorialCase } from '@/content/cases/tutorial';
import { evaluateReport } from '@/engine/scoring/scoringEngine';

const correctSubmission = {
  hypothesisId: 'maintenance-mode',
  evidenceIds: new Set(['flight-log', 'maintenance-ticket']),
  solvedPuzzleIds: new Set(['timeline-main']),
  hintsUsed: 0,
  reportMistakes: 0,
};

describe('scoringEngine', () => {
  it('requires the hypothesis, evidence, and solved puzzle', () => {
    expect(
      evaluateReport(tutorialCase, {
        ...correctSubmission,
        evidenceIds: new Set(['flight-log']),
      }).correct,
    ).toBe(false);
  });

  it.each([
    [0, 3],
    [1, 2],
    [3, 1],
  ] as const)('awards stars without using time: %s hints', (hintsUsed, stars) => {
    expect(evaluateReport(tutorialCase, { ...correctSubmission, hintsUsed })).toEqual({
      correct: true,
      stars,
    });
  });

  it.each([
    [0, 1, 2],
    [0, 2, 1],
    [1, 1, 1],
    [0, 5, 1],
  ] as const)(
    'removes a star per rejected report: %s hints, %s mistakes',
    (hintsUsed, reportMistakes, stars) => {
      expect(
        evaluateReport(tutorialCase, { ...correctSubmission, hintsUsed, reportMistakes }),
      ).toEqual({ correct: true, stars });
    },
  );
});
