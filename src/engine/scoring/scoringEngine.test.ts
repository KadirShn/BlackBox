import { getCaseById } from '@/content/cases/catalog';
import { tutorialCase } from '@/content/cases/tutorial';
import { countsAsReportMistake, evaluateReport } from '@/engine/scoring/scoringEngine';

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

  describe('rejection reasons', () => {
    const coldChain = getCaseById('case-cold-chain');
    if (coldChain === null) throw new Error('Cold Chain case is missing');
    const solved = new Set(coldChain.puzzles.map((puzzle) => puzzle.id));
    const required = coldChain.solution.requiredEvidenceIds;
    const submit = (overrides: Partial<Parameters<typeof evaluateReport>[1]>) =>
      evaluateReport(coldChain, {
        hypothesisId: coldChain.solution.correctHypothesisId,
        evidenceIds: new Set(required),
        solvedPuzzleIds: solved,
        hintsUsed: 0,
        reportMistakes: 0,
        ...overrides,
      });

    it('blocks the report without penalty until required puzzles are solved', () => {
      const result = submit({ solvedPuzzleIds: new Set() });
      expect(result).toMatchObject({ correct: false, reason: 'missing_puzzles' });
      expect(countsAsReportMistake('missing_puzzles')).toBe(false);
    });

    it('reports a wrong hypothesis before evidence problems', () => {
      expect(submit({ hypothesisId: 'compressor-failure', evidenceIds: new Set() })).toMatchObject({
        correct: false,
        reason: 'hypothesis',
      });
    });

    it('rejects a report that cites a misleading clue', () => {
      expect(submit({ evidenceIds: new Set([...required, 'compressor-cycle']) })).toMatchObject({
        correct: false,
        reason: 'misleading_evidence',
        misleadingEvidenceIds: ['compressor-cycle'],
      });
    });

    it('rejects selecting every clue instead of reasoning about them', () => {
      expect(
        submit({ evidenceIds: new Set(coldChain.evidence.map((item) => item.id)) }),
      ).toMatchObject({ correct: false, reason: 'misleading_evidence' });
    });

    it('counts the critical clues that are missing', () => {
      expect(submit({ evidenceIds: new Set(required.slice(1)) })).toMatchObject({
        correct: false,
        reason: 'missing_evidence',
        missingEvidenceIds: [required[0]],
      });
      expect(countsAsReportMistake('missing_evidence')).toBe(true);
    });
  });
});
