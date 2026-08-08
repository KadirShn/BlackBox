import type { TimelinePuzzleDefinition } from '@/domain/case/caseSchema';

export function evaluateTimeline(
  definition: TimelinePuzzleDefinition,
  answer: readonly string[],
): boolean {
  return (
    answer.length === definition.correctOrder.length &&
    answer.every((itemId, index) => itemId === definition.correctOrder[index])
  );
}

export function restoreTimelineAnswer(
  definition: TimelinePuzzleDefinition,
  value: unknown,
): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    return [...definition.itemIds];
  }
  const restored = new Set(value);
  const expected = new Set(definition.itemIds);
  if (
    value.length !== definition.itemIds.length ||
    restored.size !== value.length ||
    [...expected].some((id) => !restored.has(id))
  ) {
    return [...definition.itemIds];
  }
  return [...value];
}
