import type { CaseDefinition } from '@/domain/case/caseSchema';
import type { AchievementId } from '@/domain/achievements/achievement';
import type { PlayerProgress } from '@/domain/progression/playerProgress';
import type { ActiveSession } from '@/domain/session/activeSession';

export type AchievementEvaluationContext = {
  catalog: readonly CaseDefinition[];
  definition: CaseDefinition;
  session: ActiveSession;
  progress: readonly PlayerProgress[];
  stars: 1 | 2 | 3;
};

function solvedFirstTry(
  session: ActiveSession,
  puzzles: readonly CaseDefinition['puzzles'][number][],
): boolean {
  return (
    puzzles.length > 0 &&
    puzzles.every((puzzle) => {
      const state = session.puzzleStates[puzzle.id];
      return state?.status === 'solved' && state.attempts <= 1;
    })
  );
}

export function evaluateAchievements(context: AchievementEvaluationContext): AchievementId[] {
  const { catalog, definition, session } = context;
  const unlocked = new Set<AchievementId>();
  const completed = context.progress.filter((item) => item.status === 'completed');
  const completedIds = new Set(completed.map((item) => item.caseId));
  if (completed.length > 0) unlocked.add('first-report');
  if (session.hintsUsed === 0) unlocked.add('hint-free');
  if (context.stars === 3) unlocked.add('three-star-investigator');
  if (session.openedEvidenceIds.length === definition.evidence.length) {
    unlocked.add('all-evidence');
  }
  if (
    solvedFirstTry(
      session,
      definition.puzzles.filter((puzzle) => puzzle.type === 'connection_board'),
    )
  ) {
    unlocked.add('perfect-connection');
  }
  if (
    solvedFirstTry(
      session,
      definition.puzzles.filter((puzzle) => puzzle.type === 'code_entry'),
    )
  ) {
    unlocked.add('codebreaker');
  }
  if (
    definition.difficulty !== 'tutorial' &&
    session.hintsUsed === 0 &&
    session.reportMistakes === 0 &&
    solvedFirstTry(session, definition.puzzles)
  ) {
    unlocked.add('flawless-report');
  }
  const mainCases = catalog.filter((item) => item.difficulty !== 'tutorial');
  if (mainCases.filter((item) => completedIds.has(item.id)).length >= 4) {
    unlocked.add('four-cases');
  }
  const chapterTwo = catalog.filter((item) => item.chapter === 2);
  if (chapterTwo.length > 0 && chapterTwo.every((item) => completedIds.has(item.id))) {
    unlocked.add('chapter-two');
  }
  if (catalog.length > 0 && catalog.every((item) => completedIds.has(item.id))) {
    unlocked.add('all-cases');
    const bestStars = new Map(completed.map((item) => [item.caseId, item.bestStars]));
    if (catalog.every((item) => bestStars.get(item.id) === 3)) unlocked.add('perfect-archive');
  }
  return [...unlocked];
}
