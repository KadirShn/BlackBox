import { caseSchema, puzzleSchema } from '@/domain/case/caseSchema';

const unlock = { type: 'always' } as const;

describe('case schemas', () => {
  it('rejects timeline answers with a different ID set', () => {
    const result = puzzleSchema.safeParse({
      id: 'timeline',
      type: 'timeline',
      titleKey: 'title',
      instructionsKey: 'instructions',
      itemIds: ['a', 'b', 'c', 'd'],
      correctOrder: ['a', 'b', 'c', 'x'],
      unlockCondition: unlock,
      hints: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts a complete data-driven case', () => {
    const result = caseSchema.safeParse({
      id: 'case',
      schemaVersion: 1,
      titleKey: 'title',
      summaryKey: 'summary',
      briefingKey: 'briefing',
      difficulty: 'tutorial',
      estimatedMinutes: 5,
      evidence: [],
      puzzles: [
        {
          id: 'timeline',
          type: 'timeline',
          titleKey: 'title',
          instructionsKey: 'instructions',
          itemIds: ['a', 'b', 'c', 'd'],
          correctOrder: ['a', 'b', 'c', 'd'],
          unlockCondition: unlock,
          hints: [],
        },
      ],
      hypotheses: [{ id: 'answer', labelKey: 'answer', explanationKey: 'why' }],
      solution: {
        correctHypothesisId: 'answer',
        requiredEvidenceIds: [],
        requiredPuzzleIds: ['timeline'],
        explanationKey: 'solution',
      },
      scoring: { maxHintsForThreeStars: 0, maxHintsForTwoStars: 2 },
    });
    expect(result.success).toBe(true);
  });
});
