import * as StoreReview from 'expo-store-review';

import type { Repositories } from '@/data/database/initializeDatabase';
import { logger } from '@/services/logger/logger';

const LAST_PROMPT_KEY = 'review_last_prompt_at';
const PROMPT_INTERVAL_DAYS = 60;
const MIN_COMPLETED_CASES = 2;

export type ReviewEligibility = {
  stars: 1 | 2 | 3;
  completedMainCases: number;
  lastPromptAt: string | null;
  now: Date;
};

/** Ask only after a clear win, once the player is invested, and rarely. */
export function shouldRequestReview({
  stars,
  completedMainCases,
  lastPromptAt,
  now,
}: ReviewEligibility): boolean {
  if (stars !== 3 || completedMainCases < MIN_COMPLETED_CASES) return false;
  if (lastPromptAt === null) return true;
  const elapsedDays = (now.getTime() - new Date(lastPromptAt).getTime()) / 86_400_000;
  return !Number.isFinite(elapsedDays) || elapsedDays >= PROMPT_INTERVAL_DAYS;
}

export async function maybeRequestReview(
  repositories: Repositories,
  stars: 1 | 2 | 3,
  mainCaseIds: ReadonlySet<string>,
): Promise<void> {
  try {
    const [progress, lastPromptAt] = await Promise.all([
      repositories.progress.list(),
      repositories.meta.get(LAST_PROMPT_KEY),
    ]);
    const now = new Date();
    const completedMainCases = progress.filter(
      (item) => item.status === 'completed' && mainCaseIds.has(item.caseId),
    ).length;
    if (!shouldRequestReview({ stars, completedMainCases, lastPromptAt, now })) return;
    if (!(await StoreReview.isAvailableAsync())) return;
    await repositories.meta.set(LAST_PROMPT_KEY, now.toISOString());
    await StoreReview.requestReview();
  } catch (error: unknown) {
    logger.warn('Store review prompt unavailable', {
      reason: error instanceof Error ? error.name : 'unknown',
    });
  }
}
