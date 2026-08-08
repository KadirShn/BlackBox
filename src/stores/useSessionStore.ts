import { create } from 'zustand';

import type { ActiveSession } from '@/domain/session/activeSession';

type SessionState = {
  session: ActiveSession | null;
  load: (session: ActiveSession) => void;
  clear: () => void;
  openEvidence: (evidenceId: string) => void;
  markField: (fieldId: string) => void;
  setPuzzleAnswer: (puzzleId: string, answer: unknown, solved: boolean) => void;
  useHint: (puzzleId: string) => void;
  selectHypothesis: (hypothesisId: string) => void;
  toggleReportEvidence: (evidenceId: string) => void;
};

function now(): string {
  return new Date().toISOString();
}

function uniqueToggle(values: readonly string[], value: string): string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function createSession(caseId: string): ActiveSession {
  return {
    caseId,
    openedEvidenceIds: [],
    markedFieldIds: [],
    puzzleStates: {},
    hintsUsed: 0,
    selectedHypothesisId: null,
    selectedEvidenceIds: [],
    updatedAt: now(),
  };
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  load: (session) => set({ session }),
  clear: () => set({ session: null }),
  openEvidence: (evidenceId) =>
    set((state) => {
      if (state.session === null) return state;
      const opened = state.session.openedEvidenceIds.includes(evidenceId)
        ? state.session.openedEvidenceIds
        : [...state.session.openedEvidenceIds, evidenceId];
      return { session: { ...state.session, openedEvidenceIds: opened, updatedAt: now() } };
    }),
  markField: (fieldId) =>
    set((state) =>
      state.session === null
        ? state
        : {
            session: {
              ...state.session,
              markedFieldIds: uniqueToggle(state.session.markedFieldIds, fieldId),
              updatedAt: now(),
            },
          },
    ),
  setPuzzleAnswer: (puzzleId, answer, solved) =>
    set((state) => {
      if (state.session === null) return state;
      const previous = state.session.puzzleStates[puzzleId];
      return {
        session: {
          ...state.session,
          puzzleStates: {
            ...state.session.puzzleStates,
            [puzzleId]: {
              puzzleId,
              status: solved ? 'solved' : 'active',
              attempts: (previous?.attempts ?? 0) + 1,
              hintsUsed: previous?.hintsUsed ?? 0,
              answer,
            },
          },
          updatedAt: now(),
        },
      };
    }),
  useHint: (puzzleId) =>
    set((state) => {
      if (state.session === null) return state;
      const previous = state.session.puzzleStates[puzzleId];
      const hintsUsed = Math.min(3, (previous?.hintsUsed ?? 0) + 1);
      if (hintsUsed === (previous?.hintsUsed ?? 0)) return state;
      return {
        session: {
          ...state.session,
          hintsUsed: state.session.hintsUsed + 1,
          puzzleStates: {
            ...state.session.puzzleStates,
            [puzzleId]: {
              puzzleId,
              status: previous?.status ?? 'active',
              attempts: previous?.attempts ?? 0,
              hintsUsed,
              answer: previous?.answer ?? null,
            },
          },
          updatedAt: now(),
        },
      };
    }),
  selectHypothesis: (hypothesisId) =>
    set((state) =>
      state.session === null
        ? state
        : { session: { ...state.session, selectedHypothesisId: hypothesisId, updatedAt: now() } },
    ),
  toggleReportEvidence: (evidenceId) =>
    set((state) =>
      state.session === null
        ? state
        : {
            session: {
              ...state.session,
              selectedEvidenceIds: uniqueToggle(state.session.selectedEvidenceIds, evidenceId),
              updatedAt: now(),
            },
          },
    ),
}));
