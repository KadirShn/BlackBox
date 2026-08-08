import { blackBoxCase } from '@/content/cases/black-box';
import type { PlayerProgress } from '@/domain/progression/playerProgress';
import { evaluateAchievements } from '@/engine/achievements/evaluateAchievements';

const completed: PlayerProgress[] = [
  'case-night-route',
  'case-silent-station',
  'case-wrong-guest',
  'case-black-box',
].map((caseId) => ({
  caseId,
  status: 'completed',
  bestStars: 3,
  attempts: 1,
  hintsUsedBest: 0,
  completedAt: '2026-08-04T00:00:00.000Z',
  updatedAt: '2026-08-04T00:00:00.000Z',
}));

describe('achievement evaluator', () => {
  it('unlocks all applicable achievements from local completion context', () => {
    const result = evaluateAchievements({
      definition: blackBoxCase,
      progress: completed,
      stars: 3,
      session: {
        caseId: blackBoxCase.id,
        openedEvidenceIds: blackBoxCase.evidence.map((item) => item.id),
        markedFieldIds: [],
        puzzleStates: Object.fromEntries(
          blackBoxCase.puzzles.map((puzzle) => [
            puzzle.id,
            { puzzleId: puzzle.id, status: 'solved', attempts: 1, hintsUsed: 0, answer: null },
          ]),
        ),
        hintsUsed: 0,
        selectedHypothesisId: blackBoxCase.solution.correctHypothesisId,
        selectedEvidenceIds: blackBoxCase.solution.requiredEvidenceIds,
        updatedAt: '2026-08-04T00:00:00.000Z',
      },
    });

    expect(new Set(result)).toEqual(
      new Set([
        'first-report',
        'hint-free',
        'perfect-connection',
        'all-evidence',
        'four-cases',
        'three-star-investigator',
      ]),
    );
  });
});
