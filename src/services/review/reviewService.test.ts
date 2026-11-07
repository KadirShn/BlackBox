import { shouldRequestReview } from '@/services/review/reviewService';

const now = new Date('2026-11-07T12:00:00.000Z');

describe('store review eligibility', () => {
  it('asks after a three-star case once the player finished two main cases', () => {
    expect(shouldRequestReview({ stars: 3, completedMainCases: 2, lastPromptAt: null, now })).toBe(
      true,
    );
  });

  it.each([
    [2, 5, null],
    [3, 1, null],
    [3, 4, '2026-10-01T12:00:00.000Z'],
  ] as const)('waits with %s stars, %s cases, last prompt %s', (stars, cases, lastPromptAt) => {
    expect(shouldRequestReview({ stars, completedMainCases: cases, lastPromptAt, now })).toBe(
      false,
    );
  });

  it('asks again after sixty days', () => {
    expect(
      shouldRequestReview({
        stars: 3,
        completedMainCases: 4,
        lastPromptAt: '2026-09-07T12:00:00.000Z',
        now,
      }),
    ).toBe(true);
  });
});
