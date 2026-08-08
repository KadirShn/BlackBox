import { blackBoxCase } from '@/content/cases/black-box';
import { evaluatePuzzle } from '@/engine/puzzle-runtime/puzzleRegistry';

describe('puzzle evaluator smoke performance', () => {
  it('evaluates the largest authored puzzle repeatedly without state growth', () => {
    const puzzle = blackBoxCase.puzzles.find((item) => item.type === 'connection_board');
    if (puzzle?.type !== 'connection_board') throw new Error('Final connection puzzle missing');
    for (let iteration = 0; iteration < 2_000; iteration += 1) {
      expect(evaluatePuzzle(puzzle, puzzle.requiredConnections)).toBe(true);
    }
  });
});
