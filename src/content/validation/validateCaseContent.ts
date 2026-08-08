import type { CaseDefinition, PuzzleDefinition, UnlockCondition } from '@/domain/case/caseSchema';
import { evaluateCondition } from '@/engine/condition-evaluator/evaluateCondition';

function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicate = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicate.add(value);
    seen.add(value);
  }
  return [...duplicate];
}

function conditionReferences(condition: UnlockCondition): {
  evidenceIds: string[];
  puzzleIds: string[];
} {
  switch (condition.type) {
    case 'always':
      return { evidenceIds: [], puzzleIds: [] };
    case 'evidence_opened':
      return { evidenceIds: [condition.evidenceId], puzzleIds: [] };
    case 'puzzle_solved':
      return { evidenceIds: [], puzzleIds: [condition.puzzleId] };
    case 'all':
    case 'any':
      return condition.conditions.reduce(
        (result, child) => {
          const refs = conditionReferences(child);
          return {
            evidenceIds: [...result.evidenceIds, ...refs.evidenceIds],
            puzzleIds: [...result.puzzleIds, ...refs.puzzleIds],
          };
        },
        { evidenceIds: [] as string[], puzzleIds: [] as string[] },
      );
  }
}

function puzzleTranslationKeys(puzzle: PuzzleDefinition): string[] {
  const base = [
    puzzle.titleKey,
    puzzle.instructionsKey,
    ...puzzle.hints.map((hint) => hint.textKey),
  ];
  if (puzzle.type === 'log_analyzer') return [...base, ...puzzle.rows.map((row) => row.messageKey)];
  if (puzzle.type === 'contradiction')
    return [
      ...base,
      puzzle.sourceA.titleKey,
      puzzle.sourceB.titleKey,
      ...puzzle.sourceA.segments.map((segment) => segment.textKey),
      ...puzzle.sourceB.segments.map((segment) => segment.textKey),
    ];
  return base;
}

export function validateCaseContent(
  definition: CaseDefinition,
  hasTranslation: (key: string, language: 'tr' | 'en') => boolean,
): string[] {
  const issues: string[] = [];
  const evidenceIds = new Set(definition.evidence.map((item) => item.id));
  const puzzleIds = new Set(definition.puzzles.map((item) => item.id));
  const hypothesisIds = new Set(definition.hypotheses.map((item) => item.id));

  for (const id of duplicates(definition.evidence.map((item) => item.id)))
    issues.push(`duplicate evidence:${id}`);
  for (const id of duplicates(definition.puzzles.map((item) => item.id)))
    issues.push(`duplicate puzzle:${id}`);
  for (const id of duplicates(definition.hypotheses.map((item) => item.id)))
    issues.push(`duplicate hypothesis:${id}`);
  if (!hypothesisIds.has(definition.solution.correctHypothesisId))
    issues.push('missing solution hypothesis');
  for (const id of definition.solution.requiredEvidenceIds)
    if (!evidenceIds.has(id)) issues.push(`missing solution evidence:${id}`);
  for (const id of definition.solution.requiredPuzzleIds)
    if (!puzzleIds.has(id)) issues.push(`missing solution puzzle:${id}`);

  for (const item of [...definition.evidence, ...definition.puzzles]) {
    const refs = conditionReferences(item.unlockCondition);
    for (const id of refs.evidenceIds)
      if (!evidenceIds.has(id)) issues.push(`missing unlock evidence:${id}`);
    for (const id of refs.puzzleIds)
      if (!puzzleIds.has(id)) issues.push(`missing unlock puzzle:${id}`);
  }

  for (const puzzle of definition.puzzles) {
    if (puzzle.type === 'log_analyzer') {
      const rowIds = new Set(puzzle.rows.map((row) => row.id));
      for (const id of puzzle.requiredRowIds)
        if (!rowIds.has(id)) issues.push(`missing log row:${id}`);
    }
    if (puzzle.type === 'contradiction') {
      const aIds = new Set(puzzle.sourceA.segments.map((item) => item.id));
      const bIds = new Set(puzzle.sourceB.segments.map((item) => item.id));
      for (const pair of puzzle.validPairs) {
        if (!aIds.has(pair.aSegmentId) || !bIds.has(pair.bSegmentId))
          issues.push(`invalid contradiction pair:${pair.aSegmentId}:${pair.bSegmentId}`);
      }
    }
    if (puzzle.type === 'connection_board') {
      const nodes = new Set(puzzle.nodeIds);
      for (const connection of puzzle.requiredConnections) {
        if (
          !nodes.has(connection.from) ||
          !nodes.has(connection.to) ||
          !puzzle.allowedConnectionTypes.includes(connection.type)
        )
          issues.push(`invalid connection:${connection.from}:${connection.to}:${connection.type}`);
      }
    }
  }

  const translationKeys = [
    definition.titleKey,
    definition.summaryKey,
    definition.briefingKey,
    definition.solution.explanationKey,
    ...definition.evidence
      .flatMap((item) => [
        item.titleKey,
        item.descriptionKey,
        item.content.kind === 'log' ? [] : item.content.bodyKey,
      ])
      .flat(),
    ...definition.hypotheses.flatMap((item) => [item.labelKey, item.explanationKey]),
    ...definition.puzzles.flatMap(puzzleTranslationKeys),
  ];
  for (const key of translationKeys) {
    for (const language of ['tr', 'en'] as const)
      if (!hasTranslation(key, language)) issues.push(`missing ${language}:${key}`);
  }

  const openedEvidenceIds = new Set<string>();
  const solvedPuzzleIds = new Set<string>();
  let changed = true;
  while (changed) {
    changed = false;
    for (const evidence of definition.evidence) {
      if (
        !openedEvidenceIds.has(evidence.id) &&
        evaluateCondition(evidence.unlockCondition, { openedEvidenceIds, solvedPuzzleIds })
      ) {
        openedEvidenceIds.add(evidence.id);
        changed = true;
      }
    }
    for (const puzzle of definition.puzzles) {
      if (
        !solvedPuzzleIds.has(puzzle.id) &&
        evaluateCondition(puzzle.unlockCondition, { openedEvidenceIds, solvedPuzzleIds })
      ) {
        solvedPuzzleIds.add(puzzle.id);
        changed = true;
      }
    }
  }
  if (
    openedEvidenceIds.size !== definition.evidence.length ||
    solvedPuzzleIds.size !== definition.puzzles.length
  )
    issues.push('unlock graph contains unreachable content');

  return issues;
}
