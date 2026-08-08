import type { CaseDefinition } from '@/domain/case/caseSchema';

export const tutorialCase = {
  id: 'tutorial-missing-eleven',
  schemaVersion: 1,
  titleKey: 'cases.tutorial.title',
  summaryKey: 'cases.tutorial.summary',
  briefingKey: 'cases.tutorial.briefing',
  difficulty: 'tutorial',
  estimatedMinutes: 5,
  evidence: [
    {
      id: 'dispatch-message',
      type: 'message',
      titleKey: 'cases.tutorial.evidence.dispatch.title',
      descriptionKey: 'cases.tutorial.evidence.dispatch.description',
      content: {
        kind: 'timeline_item',
        time: '21:04',
        bodyKey: 'cases.tutorial.evidence.dispatch.body',
      },
      unlockCondition: { type: 'always' },
      tags: ['dispatch', 'timeline'],
    },
    {
      id: 'maintenance-ticket',
      type: 'statement',
      titleKey: 'cases.tutorial.evidence.ticket.title',
      descriptionKey: 'cases.tutorial.evidence.ticket.description',
      content: {
        kind: 'timeline_item',
        time: '21:07',
        bodyKey: 'cases.tutorial.evidence.ticket.body',
      },
      unlockCondition: { type: 'always' },
      tags: ['maintenance', 'timeline'],
    },
    {
      id: 'maintenance-event',
      type: 'system_log',
      titleKey: 'cases.tutorial.evidence.maintenance.title',
      descriptionKey: 'cases.tutorial.evidence.maintenance.description',
      content: {
        kind: 'timeline_item',
        time: '21:08',
        bodyKey: 'cases.tutorial.evidence.maintenance.body',
      },
      unlockCondition: { type: 'always' },
      tags: ['maintenance', 'timeline'],
    },
    {
      id: 'flight-log',
      type: 'system_log',
      titleKey: 'cases.tutorial.evidence.flight.title',
      descriptionKey: 'cases.tutorial.evidence.flight.description',
      content: {
        kind: 'timeline_item',
        time: '21:19',
        bodyKey: 'cases.tutorial.evidence.flight.body',
      },
      unlockCondition: { type: 'always' },
      tags: ['telemetry', 'timeline'],
    },
  ],
  puzzles: [
    {
      id: 'timeline-main',
      type: 'timeline',
      titleKey: 'cases.tutorial.puzzles.timeline.title',
      instructionsKey: 'cases.tutorial.puzzles.timeline.instructions',
      itemIds: ['flight-log', 'dispatch-message', 'maintenance-event', 'maintenance-ticket'],
      correctOrder: ['dispatch-message', 'maintenance-ticket', 'maintenance-event', 'flight-log'],
      unlockCondition: { type: 'always' },
      hints: [
        { id: 'timeline-hint-1', level: 1, textKey: 'cases.tutorial.puzzles.timeline.hint1' },
        {
          id: 'timeline-hint-2',
          level: 2,
          textKey: 'cases.tutorial.puzzles.timeline.hint2',
          highlightTargetId: 'maintenance-ticket',
        },
        {
          id: 'timeline-hint-3',
          level: 3,
          textKey: 'cases.tutorial.puzzles.timeline.hint3',
          highlightTargetId: 'maintenance-event',
        },
      ],
    },
  ],
  hypotheses: [
    {
      id: 'signal-loss',
      labelKey: 'cases.tutorial.hypotheses.signal',
      explanationKey: 'cases.tutorial.hypotheses.signal.explanation',
    },
    {
      id: 'maintenance-mode',
      labelKey: 'cases.tutorial.hypotheses.maintenance',
      explanationKey: 'cases.tutorial.hypotheses.maintenance.explanation',
    },
    {
      id: 'battery-failure',
      labelKey: 'cases.tutorial.hypotheses.battery',
      explanationKey: 'cases.tutorial.hypotheses.battery.explanation',
    },
  ],
  solution: {
    correctHypothesisId: 'maintenance-mode',
    requiredEvidenceIds: ['flight-log', 'maintenance-ticket'],
    requiredPuzzleIds: ['timeline-main'],
    explanationKey: 'cases.tutorial.solution',
  },
  scoring: { maxHintsForThreeStars: 0, maxHintsForTwoStars: 2 },
} satisfies CaseDefinition;
