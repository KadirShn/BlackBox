import type { CaseDefinition } from '@/domain/case/caseSchema';

const always = { type: 'always' } as const;

export const wrongGuestCase: CaseDefinition = {
  id: 'case-wrong-guest',
  schemaVersion: 1,
  titleKey: 'cases.guest.title',
  summaryKey: 'cases.guest.summary',
  briefingKey: 'cases.guest.briefing',
  difficulty: 'medium',
  estimatedMinutes: 15,
  evidence: [
    {
      id: 'lobby-entry',
      type: 'location_record',
      titleKey: 'cases.guest.evidence.lobby.title',
      descriptionKey: 'cases.guest.evidence.lobby.description',
      content: { kind: 'timeline_item', time: '20:02', bodyKey: 'cases.guest.evidence.lobby.body' },
      unlockCondition: always,
      tags: ['timeline'],
    },
    {
      id: 'lift-scan',
      type: 'sensor_record',
      titleKey: 'cases.guest.evidence.lift.title',
      descriptionKey: 'cases.guest.evidence.lift.description',
      content: { kind: 'timeline_item', time: '20:06', bodyKey: 'cases.guest.evidence.lift.body' },
      unlockCondition: always,
      tags: ['timeline'],
    },
    {
      id: 'room-entry',
      type: 'location_record',
      titleKey: 'cases.guest.evidence.room.title',
      descriptionKey: 'cases.guest.evidence.room.description',
      content: { kind: 'timeline_item', time: '20:09', bodyKey: 'cases.guest.evidence.room.body' },
      unlockCondition: always,
      tags: ['timeline'],
    },
    {
      id: 'duplicate-token',
      type: 'system_log',
      titleKey: 'cases.guest.evidence.token.title',
      descriptionKey: 'cases.guest.evidence.token.description',
      content: { kind: 'timeline_item', time: '20:11', bodyKey: 'cases.guest.evidence.token.body' },
      unlockCondition: { type: 'puzzle_solved', puzzleId: 'guest-timeline' },
      tags: ['identity'],
    },
    {
      id: 'desk-statement',
      type: 'statement',
      titleKey: 'cases.guest.evidence.desk.title',
      descriptionKey: 'cases.guest.evidence.desk.description',
      content: { kind: 'text', bodyKey: 'cases.guest.evidence.desk.body' },
      unlockCondition: always,
      tags: ['statement'],
    },
  ],
  puzzles: [
    {
      id: 'guest-timeline',
      type: 'timeline',
      titleKey: 'cases.guest.timeline.title',
      instructionsKey: 'cases.guest.timeline.instructions',
      itemIds: ['duplicate-token', 'room-entry', 'lobby-entry', 'lift-scan'],
      correctOrder: ['lobby-entry', 'lift-scan', 'room-entry', 'duplicate-token'],
      unlockCondition: always,
      hints: [
        { id: 'gu-time-h1', level: 1, textKey: 'cases.guest.timeline.hint1' },
        {
          id: 'gu-time-h2',
          level: 2,
          textKey: 'cases.guest.timeline.hint2',
          highlightTargetId: 'lift-scan',
        },
        {
          id: 'gu-time-h3',
          level: 3,
          textKey: 'cases.guest.timeline.hint3',
          highlightTargetId: 'duplicate-token',
        },
      ],
    },
    {
      id: 'guest-contradiction',
      type: 'contradiction',
      titleKey: 'cases.guest.contradiction.title',
      instructionsKey: 'cases.guest.contradiction.instructions',
      sourceA: {
        titleKey: 'cases.guest.contradiction.sourceA',
        segments: [
          { id: 'desk-one-card', textKey: 'cases.guest.contradiction.a1' },
          { id: 'desk-owner', textKey: 'cases.guest.contradiction.a2' },
        ],
      },
      sourceB: {
        titleKey: 'cases.guest.contradiction.sourceB',
        segments: [
          { id: 'audit-two-tokens', textKey: 'cases.guest.contradiction.b1' },
          { id: 'audit-floors', textKey: 'cases.guest.contradiction.b2' },
        ],
      },
      validPairs: [{ aSegmentId: 'desk-one-card', bSegmentId: 'audit-two-tokens' }],
      unlockCondition: { type: 'puzzle_solved', puzzleId: 'guest-timeline' },
      hints: [
        { id: 'gu-con-h1', level: 1, textKey: 'cases.guest.contradiction.hint1' },
        {
          id: 'gu-con-h2',
          level: 2,
          textKey: 'cases.guest.contradiction.hint2',
          highlightTargetId: 'desk-one-card',
        },
        {
          id: 'gu-con-h3',
          level: 3,
          textKey: 'cases.guest.contradiction.hint3',
          highlightTargetId: 'audit-two-tokens',
        },
      ],
    },
    {
      id: 'guest-connections',
      type: 'connection_board',
      titleKey: 'cases.guest.connections.title',
      instructionsKey: 'cases.guest.connections.instructions',
      nodeIds: ['lobby-entry', 'lift-scan', 'room-entry', 'duplicate-token', 'desk-statement'],
      allowedConnectionTypes: ['supports', 'contradicts', 'causes'],
      requiredConnections: [
        { from: 'duplicate-token', to: 'lift-scan', type: 'causes' },
        { from: 'duplicate-token', to: 'room-entry', type: 'causes' },
        { from: 'desk-statement', to: 'duplicate-token', type: 'contradicts' },
      ],
      unlockCondition: { type: 'puzzle_solved', puzzleId: 'guest-contradiction' },
      hints: [
        { id: 'gu-link-h1', level: 1, textKey: 'cases.guest.connections.hint1' },
        {
          id: 'gu-link-h2',
          level: 2,
          textKey: 'cases.guest.connections.hint2',
          highlightTargetId: 'duplicate-token',
        },
        {
          id: 'gu-link-h3',
          level: 3,
          textKey: 'cases.guest.connections.hint3',
          highlightTargetId: 'desk-statement',
        },
      ],
    },
  ],
  hypotheses: [
    {
      id: 'guest-cloned',
      labelKey: 'cases.guest.hypothesis.clone',
      explanationKey: 'cases.guest.hypothesis.clone.explanation',
    },
    {
      id: 'sensor-delay',
      labelKey: 'cases.guest.hypothesis.delay',
      explanationKey: 'cases.guest.hypothesis.delay.explanation',
    },
    {
      id: 'staff-master',
      labelKey: 'cases.guest.hypothesis.staff',
      explanationKey: 'cases.guest.hypothesis.staff.explanation',
    },
  ],
  solution: {
    correctHypothesisId: 'guest-cloned',
    requiredEvidenceIds: ['duplicate-token', 'desk-statement', 'lift-scan'],
    requiredPuzzleIds: ['guest-timeline', 'guest-contradiction', 'guest-connections'],
    explanationKey: 'cases.guest.solution',
  },
  scoring: { maxHintsForThreeStars: 1, maxHintsForTwoStars: 4 },
};
