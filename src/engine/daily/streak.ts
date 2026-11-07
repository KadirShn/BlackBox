import { shiftDateKey } from '@/content/daily/dailyCase';

export type StreakStatus = {
  current: number;
  best: number;
  completedToday: boolean;
};

/** A streak stays alive through today until midnight, so yesterday's run still counts. */
export function computeStreak(completedDates: readonly string[], today: string): StreakStatus {
  const dates = new Set(completedDates);
  const completedToday = dates.has(today);
  let current = 0;
  let cursor = completedToday ? today : shiftDateKey(today, -1);
  while (dates.has(cursor)) {
    current += 1;
    cursor = shiftDateKey(cursor, -1);
  }

  let best = 0;
  let run = 0;
  let previous: string | null = null;
  for (const date of [...dates].sort()) {
    run = previous !== null && shiftDateKey(previous, 1) === date ? run + 1 : 1;
    best = Math.max(best, run);
    previous = date;
  }
  return { current, best, completedToday };
}

/** Results count for today, and for yesterday to cover a file finished just after midnight. */
export function countsTowardStreak(dateKey: string, today: string): boolean {
  return dateKey === today || dateKey === shiftDateKey(today, -1);
}
