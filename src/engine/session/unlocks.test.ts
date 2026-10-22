import { getCaseById } from '@/content/cases/catalog';
import { getUnlockState } from '@/engine/session/unlocks';
import { createSession } from '@/stores/useSessionStore';

const coldChain = getCaseById('case-cold-chain');

describe('case unlock state', () => {
  if (coldChain === null) throw new Error('Cold Chain case is missing');

  it('hides gated clues and analyses at the start of a case', () => {
    const state = getUnlockState(coldChain, createSession(coldChain.id));

    expect(state.evidenceIds.has('panel-audit')).toBe(false);
    expect(state.puzzleIds.has('cold-timeline')).toBe(true);
    expect(state.puzzleIds.has('cold-code')).toBe(false);
    expect(state.puzzleIds.has('cold-logs')).toBe(false);
  });

  it('opens the code panel after its source clues are reviewed', () => {
    const session = {
      ...createSession(coldChain.id),
      openedEvidenceIds: ['maintenance-memo', 'unit-camera'],
    };

    expect(getUnlockState(coldChain, session).puzzleIds.has('cold-code')).toBe(true);
  });

  it('reveals the panel audit once the code is accepted', () => {
    const session = {
      ...createSession(coldChain.id),
      puzzleStates: {
        'cold-code': {
          puzzleId: 'cold-code',
          status: 'solved' as const,
          attempts: 1,
          hintsUsed: 0,
          answer: '7144',
        },
      },
    };

    expect(getUnlockState(coldChain, session).evidenceIds.has('panel-audit')).toBe(true);
  });

  it('keeps content the player already reached available', () => {
    const session = { ...createSession(coldChain.id), openedEvidenceIds: ['panel-audit'] };

    expect(getUnlockState(coldChain, session).evidenceIds.has('panel-audit')).toBe(true);
  });
});
