import type { CaseDefinition } from '@/domain/case/caseSchema';
import type { AchievementId } from '@/domain/achievements/achievement';
import type { PlayerProgress } from '@/domain/progression/playerProgress';
import type { ActiveSession } from '@/domain/session/activeSession';

export type AchievementEvaluationContext = {
  definition: CaseDefinition;
  session: ActiveSession;
  progress: readonly PlayerProgress[];
  stars: 1 | 2 | 3;
};

export function evaluateAchievements(context: AchievementEvaluationContext): AchievementId[] {
  const unlocked = new Set<AchievementId>();
  const completed = context.progress.filter((item) => item.status === 'completed');
  if (completed.length > 0) unlocked.add('first-report');
  if (context.session.hintsUsed === 0) unlocked.add('hint-free');
  if (context.stars === 3) unlocked.add('three-star-investigator');
  if (context.session.openedEvidenceIds.length === context.definition.evidence.length) {
    unlocked.add('all-evidence');
  }
  const connectionPuzzles = context.definition.puzzles.filter(
    (puzzle) => puzzle.type === 'connection_board',
  );
  if (
    connectionPuzzles.length > 0 &&
    connectionPuzzles.every((puzzle) => {
      const state = context.session.puzzleStates[puzzle.id];
      return state?.status === 'solved' && state.attempts <= 1;
    })
  ) {
    unlocked.add('perfect-connection');
  }
  const completedMainCases = completed.filter((item) => item.caseId !== 'tutorial-missing-eleven');
  if (completedMainCases.length >= 4) unlocked.add('four-cases');
  return [...unlocked];
}
