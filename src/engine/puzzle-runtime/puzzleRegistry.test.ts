import type {
  ConnectionBoardPuzzleDefinition,
  ContradictionPuzzleDefinition,
  LogAnalyzerPuzzleDefinition,
} from '@/domain/case/caseSchema';
import {
  evaluateConnectionBoard,
  evaluateContradiction,
  evaluateLogAnalyzer,
  restorePuzzleAnswer,
} from '@/engine/puzzle-runtime/puzzleRegistry';

const always = { type: 'always' } as const;
const base = {
  titleKey: 'title',
  instructionsKey: 'instructions',
  unlockCondition: always,
  hints: [],
};

describe('puzzle registry evaluators', () => {
  it('evaluates required log rows with allowed mistakes', () => {
    const definition: LogAnalyzerPuzzleDefinition = {
      ...base,
      id: 'logs',
      type: 'log_analyzer',
      allowedMistakes: 1,
      requiredRowIds: ['r2'],
      rows: [
        { id: 'r1', time: '1', source: 'a', level: 'info', device: 'd', messageKey: 'm1' },
        { id: 'r2', time: '2', source: 'a', level: 'error', device: 'd', messageKey: 'm2' },
        { id: 'r3', time: '3', source: 'a', level: 'info', device: 'd', messageKey: 'm3' },
      ],
    };
    expect(evaluateLogAnalyzer(definition, ['r2', 'r1'])).toBe(true);
    expect(evaluateLogAnalyzer(definition, ['r1'])).toBe(false);
  });

  it('keeps contradiction pair direction explicit', () => {
    const definition: ContradictionPuzzleDefinition = {
      ...base,
      id: 'contradiction',
      type: 'contradiction',
      sourceA: { titleKey: 'a', segments: [{ id: 'a1', textKey: 'a1' }] },
      sourceB: { titleKey: 'b', segments: [{ id: 'b1', textKey: 'b1' }] },
      validPairs: [{ aSegmentId: 'a1', bSegmentId: 'b1' }],
    };
    expect(evaluateContradiction(definition, { aSegmentId: 'a1', bSegmentId: 'b1' })).toBe(true);
    expect(evaluateContradiction(definition, { aSegmentId: 'b1', bSegmentId: 'a1' })).toBe(false);
  });

  it('normalizes connection order but preserves edge direction', () => {
    const definition: ConnectionBoardPuzzleDefinition = {
      ...base,
      id: 'board',
      type: 'connection_board',
      nodeIds: ['a', 'b', 'c'],
      allowedConnectionTypes: ['causes', 'supports'],
      requiredConnections: [
        { from: 'a', to: 'b', type: 'causes' },
        { from: 'c', to: 'b', type: 'supports' },
      ],
    };
    expect(
      evaluateConnectionBoard(definition, [
        { from: 'c', to: 'b', type: 'supports' },
        { from: 'a', to: 'b', type: 'causes' },
      ]),
    ).toBe(true);
    expect(evaluateConnectionBoard(definition, [{ from: 'b', to: 'a', type: 'causes' }])).toBe(
      false,
    );
    expect(restorePuzzleAnswer(definition, { bad: true })).toEqual([]);
  });
});
