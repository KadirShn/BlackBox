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

export type CaseCatalogIssue = {
  index: number;
};

export type ParsedCaseCatalog = {
  cases: readonly CaseDefinition[];
  issues: readonly CaseCatalogIssue[];
};

export function parseCaseCatalog(values: readonly unknown[]): ParsedCaseCatalog {
  const cases: CaseDefinition[] = [];
  const issues: CaseCatalogIssue[] = [];

  values.forEach((value, index) => {
    const result = caseSchema.safeParse(value);
    if (result.success) cases.push(result.data);
    else issues.push({ index });
  });

  return { cases, issues };
}

const parsedCatalog = parseCaseCatalog(rawCases);

export const caseCatalog = parsedCatalog.cases;
export const caseCatalogIssues = parsedCatalog.issues;

export function getCaseById(caseId: string): CaseDefinition | null {
  return caseCatalog.find((item) => item.id === caseId) ?? null;
}

export function getNextCaseId(caseId: string): string | null {
  const index = caseCatalog.findIndex((item) => item.id === caseId);
  return index >= 0 ? (caseCatalog[index + 1]?.id ?? null) : null;
}
