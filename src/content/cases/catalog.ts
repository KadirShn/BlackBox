import { caseSchema, type CaseDefinition } from '@/domain/case/caseSchema';
import { blackBoxCase } from '@/content/cases/black-box';
import { nightRouteCase } from '@/content/cases/night-route';
import { silentStationCase } from '@/content/cases/silent-station';
import { tutorialCase } from '@/content/cases/tutorial';
import { wrongGuestCase } from '@/content/cases/wrong-guest';

const rawCases: readonly unknown[] = [
  tutorialCase,
  nightRouteCase,
  silentStationCase,
  wrongGuestCase,
  blackBoxCase,
];

export const caseCatalog: readonly CaseDefinition[] = rawCases.map((value) =>
  caseSchema.parse(value),
);

export function getCaseById(caseId: string): CaseDefinition | null {
  return caseCatalog.find((item) => item.id === caseId) ?? null;
}

export function getNextCaseId(caseId: string): string | null {
  const index = caseCatalog.findIndex((item) => item.id === caseId);
  return index >= 0 ? (caseCatalog[index + 1]?.id ?? null) : null;
}
