import type { CaseDefinition } from '@/domain/case/caseSchema';

export type ReportSubmission = {
  hypothesisId: string;
  evidenceIds: ReadonlySet<string>;
  solvedPuzzleIds: ReadonlySet<string>;
  hintsUsed: number;
  reportMistakes: number;
};

export type ReportRejection =
  'missing_puzzles' | 'hypothesis' | 'misleading_evidence' | 'missing_evidence';

export type ReportEvaluation =
  | {
      correct: false;
      reason: ReportRejection;
      missingEvidenceIds: string[];
      missingPuzzleIds: string[];
      misleadingEvidenceIds: string[];
    }
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
  const misleadingEvidenceIds = (definition.solution.misleadingEvidenceIds ?? []).filter((id) =>
    submission.evidenceIds.has(id),
  );
  const reason: ReportRejection | null =
    missingPuzzleIds.length > 0
      ? 'missing_puzzles'
      : submission.hypothesisId !== definition.solution.correctHypothesisId
        ? 'hypothesis'
        : misleadingEvidenceIds.length > 0
          ? 'misleading_evidence'
          : missingEvidenceIds.length > 0
            ? 'missing_evidence'
            : null;
  if (reason !== null) {
    return { correct: false, reason, missingEvidenceIds, missingPuzzleIds, misleadingEvidenceIds };
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

export function countsAsReportMistake(reason: ReportRejection): boolean {
  return reason !== 'missing_puzzles';
}
