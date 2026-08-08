import { tutorialCase } from '@/content/cases/tutorial';
import { evaluateTimeline } from '@/engine/puzzle-runtime/timelineEvaluator';

const timeline = tutorialCase.puzzles[0];
if (timeline === undefined) throw new Error('Tutorial timeline fixture is missing');

describe('timelineEvaluator', () => {
  it('accepts only the exact ordered answer', () => {
    expect(evaluateTimeline(timeline, timeline.correctOrder)).toBe(true);
    expect(evaluateTimeline(timeline, [...timeline.correctOrder].reverse())).toBe(false);
  });
});
