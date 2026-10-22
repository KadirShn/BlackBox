import { caseCatalog } from '@/content/cases/catalog';
import type { PuzzleDefinition } from '@/domain/case/caseSchema';
import { evaluatePuzzle } from '@/engine/puzzle-runtime/puzzleRegistry';
import { evaluateReport } from '@/engine/scoring/scoringEngine';

function intendedAnswer(puzzle: PuzzleDefinition): unknown {
  switch (puzzle.type) {
    case 'timeline':
      return puzzle.correctOrder;
    case 'log_analyzer':
      return puzzle.requiredRowIds;
    case 'contradiction':
      return puzzle.validPairs[0];
    case 'connection_board':
      return puzzle.requiredConnections;
    case 'code_entry':
      return puzzle.answer;
  }
}

describe('every case is solvable from its own content', () => {
  it.each(caseCatalog.map((definition) => [definition.id, definition] as const))(
    '%s accepts its intended answers and report',
    (_, definition) => {
      for (const puzzle of definition.puzzles) {
        expect(evaluatePuzzle(puzzle, intendedAnswer(puzzle))).toBe(true);
      }
      expect(
        evaluateReport(definition, {
          hypothesisId: definition.solution.correctHypothesisId,
          evidenceIds: new Set(definition.solution.requiredEvidenceIds),
          solvedPuzzleIds: new Set(definition.puzzles.map((puzzle) => puzzle.id)),
          hintsUsed: 0,
          reportMistakes: 0,
        }),
      ).toEqual({ correct: true, stars: 3 });
    },
  );
});
