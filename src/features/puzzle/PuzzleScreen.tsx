import { useRouter } from 'expo-router';

import { ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translate } from '@/content/locales/translations';
import { CodeEntryPuzzleScreen } from '@/features/code-entry/CodeEntryPuzzleScreen';
import { ConnectionBoardPuzzleScreen } from '@/features/connection-board/ConnectionBoardPuzzleScreen';
import { ContradictionPuzzleScreen } from '@/features/contradiction/ContradictionPuzzleScreen';
import { LogAnalyzerPuzzleScreen } from '@/features/log-analyzer/LogAnalyzerPuzzleScreen';
import { getUnlockState } from '@/engine/session/unlocks';
import { useActiveSession } from '@/features/session/useActiveSession';
import { TimelinePuzzleScreen } from '@/features/timeline/TimelinePuzzleScreen';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';

export function PuzzleScreen({ caseId, puzzleId }: { caseId: string; puzzleId: string }) {
  const router = useRouter();
  const status = useActiveSession(caseId);
  const session = useSessionStore((state) => state.session);
  const language = useSettingsStore((state) => state.language);
  const definition = getCaseById(caseId);
  const puzzle = definition?.puzzles.find((item) => item.id === puzzleId);

  if (puzzle === undefined) {
    return (
      <ErrorState
        message={translate('puzzle.missing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('puzzle.openError', language)}
      />
    );
  }
  if (status === 'loading' || session?.caseId !== caseId) {
    return <LoadingState label={translate('puzzle.sessionLoading', language)} />;
  }
  if (status === 'error') {
    return (
      <ErrorState
        message={translate('puzzle.sessionMissing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('common.loadError', language)}
      />
    );
  }

  if (definition !== null && !getUnlockState(definition, session).puzzleIds.has(puzzle.id)) {
    return (
      <ErrorState
        message={translate('puzzle.lockedMessage', language)}
        onRetry={() => router.back()}
        retryLabel={translate('puzzle.returnDesk', language)}
        title={translate('puzzle.locked', language)}
      />
    );
  }

  switch (puzzle.type) {
    case 'timeline':
      return <TimelinePuzzleScreen caseId={caseId} puzzleId={puzzleId} />;
    case 'log_analyzer':
      return <LogAnalyzerPuzzleScreen caseId={caseId} puzzleId={puzzleId} />;
    case 'contradiction':
      return <ContradictionPuzzleScreen caseId={caseId} puzzleId={puzzleId} />;
    case 'connection_board':
      return <ConnectionBoardPuzzleScreen caseId={caseId} puzzleId={puzzleId} />;
    case 'code_entry':
      return <CodeEntryPuzzleScreen caseId={caseId} puzzleId={puzzleId} />;
  }
}
