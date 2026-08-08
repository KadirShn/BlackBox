import { nightRouteCase } from '@/content/cases/night-route';
import { hasCaseTranslation } from '@/content/locales/caseTranslations';
import { validateCaseContent } from '@/content/validation/validateCaseContent';
import { evaluatePuzzle } from '@/engine/puzzle-runtime/puzzleRegistry';
import { evaluateReport } from '@/engine/scoring/scoringEngine';

describe('Gece Rotası content', () => {
  it('has a reachable unlock graph and complete TR/EN translations', () => {
    expect(validateCaseContent(nightRouteCase, hasCaseTranslation)).toEqual([]);
  });

  it('accepts the authored puzzle answers and final report', () => {
    const timeline = nightRouteCase.puzzles.find((puzzle) => puzzle.type === 'timeline');
    const logs = nightRouteCase.puzzles.find((puzzle) => puzzle.type === 'log_analyzer');
    if (timeline === undefined || logs === undefined) {
      throw new Error('Gece Rotası puzzle definitions are incomplete');
    }

    expect(evaluatePuzzle(timeline, ['route-plan', 'gps-alert', 'access-audit', 'route-log'])).toBe(
      true,
    );
    expect(evaluatePuzzle(logs, ['log-4', 'log-5'])).toBe(true);
    expect(
      evaluateReport(nightRouteCase, {
        hypothesisId: 'authorized-intervention',
        evidenceIds: new Set(['access-audit', 'route-log']),
        solvedPuzzleIds: new Set(['night-timeline', 'night-logs']),
        hintsUsed: 0,
      }),
    ).toEqual({ correct: true, stars: 3 });
  });
});
