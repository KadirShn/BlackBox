import { blackBoxCase } from '@/content/cases/black-box';
import { caseCatalog } from '@/content/cases/catalog';
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

function completedCase(caseId: string, bestStars: PlayerProgress['bestStars']): PlayerProgress {
  return {
    caseId,
    status: 'completed',
    bestStars,
    attempts: 1,
    hintsUsedBest: 0,
    completedAt: '2026-10-22T00:00:00.000Z',
    updatedAt: '2026-10-22T00:00:00.000Z',
  };
}

describe('achievement evaluator', () => {
  it('unlocks all applicable achievements from local completion context', () => {
    const result = evaluateAchievements({
      catalog: caseCatalog,
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
        reportMistakes: 0,
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
        'flawless-report',
      ]),
    );
  });

  it('rewards first-try code panels and File II completion', () => {
    const coldChain = caseCatalog.find((item) => item.id === 'case-cold-chain');
    if (coldChain === undefined) throw new Error('Cold Chain case is missing');
    const chapterTwo: PlayerProgress[] = caseCatalog
      .filter((item) => item.chapter === 2)
      .map((item) => completedCase(item.id, 2));

    const result = evaluateAchievements({
      catalog: caseCatalog,
      definition: coldChain,
      progress: chapterTwo,
      stars: 2,
      session: {
        caseId: coldChain.id,
        openedEvidenceIds: [],
        markedFieldIds: [],
        puzzleStates: Object.fromEntries(
          coldChain.puzzles.map((puzzle) => [
            puzzle.id,
            {
              puzzleId: puzzle.id,
              status: 'solved',
              attempts: puzzle.type === 'code_entry' ? 1 : 2,
              hintsUsed: 0,
              answer: null,
            },
          ]),
        ),
        hintsUsed: 0,
        selectedHypothesisId: coldChain.solution.correctHypothesisId,
        selectedEvidenceIds: coldChain.solution.requiredEvidenceIds,
        reportMistakes: 1,
        updatedAt: '2026-10-22T00:00:00.000Z',
      },
    });

    expect(result).toEqual(expect.arrayContaining(['codebreaker', 'chapter-two']));
    expect(result).not.toContain('flawless-report');
    expect(result).not.toContain('all-cases');
    expect(result).not.toContain('four-cases');
  });

  it('awards the full archive achievements only when every case is complete', () => {
    const everyCase = caseCatalog.map((item) => completedCase(item.id, 3));
    const tutorial = caseCatalog[0];
    if (tutorial === undefined) throw new Error('Tutorial case is missing');
    const session = {
      caseId: tutorial.id,
      openedEvidenceIds: [],
      markedFieldIds: [],
      puzzleStates: {},
      hintsUsed: 2,
      selectedHypothesisId: null,
      selectedEvidenceIds: [],
      reportMistakes: 0,
      updatedAt: '2026-10-22T00:00:00.000Z',
    };

    const perfect = evaluateAchievements({
      catalog: caseCatalog,
      definition: tutorial,
      progress: everyCase,
      stars: 3,
      session,
    });
    const imperfect = evaluateAchievements({
      catalog: caseCatalog,
      definition: tutorial,
      progress: everyCase.map((item, index) => (index === 1 ? { ...item, bestStars: 2 } : item)),
      stars: 3,
      session,
    });

    expect(perfect).toEqual(expect.arrayContaining(['all-cases', 'perfect-archive']));
    expect(imperfect).toContain('all-cases');
    expect(imperfect).not.toContain('perfect-archive');
  });
});
