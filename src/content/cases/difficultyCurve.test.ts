import { caseCatalog } from '@/content/cases/catalog';

describe('MVP content difficulty curve', () => {
  it('increases estimated duration and does not reduce puzzle count', () => {
    for (let index = 1; index < caseCatalog.length; index += 1) {
      expect(caseCatalog[index]?.estimatedMinutes).toBeGreaterThanOrEqual(
        caseCatalog[index - 1]?.estimatedMinutes ?? 0,
      );
      expect(caseCatalog[index]?.puzzles.length).toBeGreaterThanOrEqual(
        caseCatalog[index - 1]?.puzzles.length ?? 0,
      );
    }
  });

  it('uses all four puzzle types in the finale', () => {
    expect(new Set(caseCatalog.at(-1)?.puzzles.map((puzzle) => puzzle.type))).toEqual(
      new Set(['timeline', 'log_analyzer', 'contradiction', 'connection_board']),
    );
  });
});
