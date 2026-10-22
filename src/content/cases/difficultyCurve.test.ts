import { caseCatalog } from '@/content/cases/catalog';
import { puzzleRegistry } from '@/engine/puzzle-runtime/puzzleRegistry';

describe('content difficulty curve', () => {
  it('increases duration and does not reduce puzzle count within each chapter', () => {
    for (let index = 1; index < caseCatalog.length; index += 1) {
      const previous = caseCatalog[index - 1];
      const current = caseCatalog[index];
      if (previous === undefined || current === undefined) continue;
      expect(current.chapter).toBeGreaterThanOrEqual(previous.chapter);
      if (current.chapter !== previous.chapter) continue;
      expect(current.estimatedMinutes).toBeGreaterThanOrEqual(previous.estimatedMinutes);
      expect(current.puzzles.length).toBeGreaterThanOrEqual(previous.puzzles.length);
    }
  });

  it('uses every puzzle type in the final case', () => {
    expect(new Set(caseCatalog.at(-1)?.puzzles.map((puzzle) => puzzle.type))).toEqual(
      new Set(Object.keys(puzzleRegistry)),
    );
  });

  it('gives every File II case a misleading clue to rule out', () => {
    for (const definition of caseCatalog.filter((item) => item.chapter === 2)) {
      expect(definition.solution.misleadingEvidenceIds?.length ?? 0).toBeGreaterThan(0);
    }
  });
});
