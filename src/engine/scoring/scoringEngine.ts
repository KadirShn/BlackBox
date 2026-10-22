import type { CaseDefinition } from '@/domain/case/caseSchema';

export type ReportSubmission = {
  hypothesisId: string;
  evidenceIds: ReadonlySet<string>;
  solvedPuzzleIds: ReadonlySet<string>;
  hintsUsed: number;
  reportMistakes: number;
};

export type ReportEvaluation =
  | { correct: false; missingEvidenceIds: string[]; missingPuzzleIds: string[] }
  | { correct: true; stars: 1 | 2 | 3 };

export function evaluateReport(
  definition: CaseDefinition,
  submission: ReportSubmission,
): ReportEvaluation {
  const missingEvidenceIds = definition.solution.requiredEvidenceIds.filter(
    (id) => !submission.evidenceIds.has(id),
  );
  const missingPuzzleIds = definition.solution.requiredPuzzleIds.filter(
    (id) => !submission.solvedPuzzleIds.has(id),
  );
  if (
    submission.hypothesisId !== definition.solution.correctHypothesisId ||
    missingEvidenceIds.length > 0 ||
    missingPuzzleIds.length > 0
  ) {
    return { correct: false, missingEvidenceIds, missingPuzzleIds };
  }
  const hintStars =
    submission.hintsUsed <= definition.scoring.maxHintsForThreeStars
      ? 3
      : submission.hintsUsed <= definition.scoring.maxHintsForTwoStars
        ? 2
        : 1;
  // Each rejected report costs a star so hypotheses cannot be guessed for free.
  return { correct: true, stars: Math.max(1, hintStars - submission.reportMistakes) as 1 | 2 | 3 };
}
