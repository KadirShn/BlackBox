import { getCaseById, getNextCaseId } from '@/content/cases/catalog';
import {
  dailyCaseId,
  generateDailyCase,
  isDailyCaseId,
  localDateKey,
  shiftDateKey,
  turkishLocative,
} from '@/content/daily/dailyCase';
import { hasCaseTranslation, translateCase } from '@/content/locales/caseTranslations';
import { validateCaseContent } from '@/content/validation/validateCaseContent';
import { caseSchema, type PuzzleDefinition } from '@/domain/case/caseSchema';
import { evaluatePuzzle } from '@/engine/puzzle-runtime/puzzleRegistry';
import { evaluateReport } from '@/engine/scoring/scoringEngine';

const days = Array.from({ length: 120 }, (_, index) => shiftDateKey('2026-11-01', index));

function intendedAnswer(puzzle: PuzzleDefinition): unknown {
  switch (puzzle.type) {
    case 'timeline':
      return puzzle.correctOrder;
    case 'log_analyzer':
      return puzzle.requiredRowIds;
    default:
      throw new Error(`The daily file does not use ${puzzle.type} puzzles`);
  }
}

describe('daily file generator', () => {
  it('builds the same case for the same day', () => {
    expect(generateDailyCase('2026-11-07')).toEqual(generateDailyCase('2026-11-07'));
  });

  it('routes daily ids through the catalog without joining story progression', () => {
    const caseId = dailyCaseId('2026-11-07');
    expect(isDailyCaseId(caseId)).toBe(true);
    expect(isDailyCaseId('daily-tomorrow')).toBe(false);
    expect(getCaseById(caseId)?.id).toBe(caseId);
    expect(getNextCaseId(caseId)).toBeNull();
  });

  it('uses every scenario and cause over a season of days', () => {
    const variants = new Set(
      days.map((day) => {
        const definition = generateDailyCase(day);
        return `${definition.titleKey.split('?')[0]}:${definition.solution.correctHypothesisId}`;
      }),
    );
    expect(variants.size).toBe(9);
  });

  it.each(days.map((day) => [day] as const))('%s is valid, translated, and solvable', (day) => {
    const definition = generateDailyCase(day);

    expect(caseSchema.safeParse(definition).success).toBe(true);
    expect(validateCaseContent(definition, hasCaseTranslation)).toEqual([]);
    for (const puzzle of definition.puzzles) {
      expect(evaluatePuzzle(puzzle, intendedAnswer(puzzle))).toBe(true);
    }
    const timeline = definition.puzzles.find((puzzle) => puzzle.type === 'timeline');
    expect(timeline?.type === 'timeline' && timeline.itemIds).not.toEqual(
      timeline?.type === 'timeline' && timeline.correctOrder,
    );
    expect(
      evaluateReport(definition, {
        hypothesisId: definition.solution.correctHypothesisId,
        evidenceIds: new Set(definition.solution.requiredEvidenceIds),
        solvedPuzzleIds: new Set(definition.puzzles.map((puzzle) => puzzle.id)),
        hintsUsed: 0,
        reportMistakes: 0,
      }),
    ).toEqual({ correct: true, stars: 3 });
    expect(
      evaluateReport(definition, {
        hypothesisId: definition.solution.correctHypothesisId,
        evidenceIds: new Set(definition.evidence.map((evidence) => evidence.id)),
        solvedPuzzleIds: new Set(definition.puzzles.map((puzzle) => puzzle.id)),
        hintsUsed: 0,
        reportMistakes: 0,
      }),
    ).toMatchObject({ correct: false, reason: 'misleading_evidence' });
  });

  it('fills every placeholder in both languages', () => {
    const definition = generateDailyCase('2026-11-07');
    for (const language of ['tr', 'en'] as const) {
      expect(translateCase(definition.briefingKey, language)).not.toMatch(/[{}]|\[missing/);
      expect(translateCase(definition.solution.explanationKey, language)).not.toMatch(/[{}]/);
    }
  });
});

describe('daily date helpers', () => {
  it('uses the local calendar day', () => {
    expect(localDateKey(new Date(2026, 10, 7, 23, 59))).toBe('2026-11-07');
    expect(localDateKey(new Date(2026, 10, 8, 0, 1))).toBe('2026-11-08');
  });

  it('shifts across month and year boundaries', () => {
    expect(shiftDateKey('2026-12-31', 1)).toBe('2027-01-01');
    expect(shiftDateKey('2027-03-01', -1)).toBe('2027-02-28');
  });

  it.each([
    ['01:42', '01:42’de'],
    ['01:43', '01:43’te'],
    ['01:40', '01:40’ta'],
    ['01:46', '01:46’da'],
    ['02:30', '02:30’da'],
    ['01:20', '01:20’de'],
    ['01:10', '01:10’da'],
    ['03:00', '03:00’te'],
    ['00:00', '00:00’da'],
  ] as const)('reads %s with the right Turkish suffix', (time, expected) => {
    expect(turkishLocative(time)).toBe(expected);
  });
});
