import { useRouter } from 'expo-router';

import { ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { ConnectionBoardPuzzleScreen } from '@/features/connection-board/ConnectionBoardPuzzleScreen';
import { ContradictionPuzzleScreen } from '@/features/contradiction/ContradictionPuzzleScreen';
import { LogAnalyzerPuzzleScreen } from '@/features/log-analyzer/LogAnalyzerPuzzleScreen';
import { useActiveSession } from '@/features/session/useActiveSession';
import { TimelinePuzzleScreen } from '@/features/timeline/TimelinePuzzleScreen';
import { useSessionStore } from '@/stores/useSessionStore';

export function PuzzleScreen({ caseId, puzzleId }: { caseId: string; puzzleId: string }) {
  const router = useRouter();
  const status = useActiveSession(caseId);
  const session = useSessionStore((state) => state.session);
  const puzzle = getCaseById(caseId)?.puzzles.find((item) => item.id === puzzleId);

  if (puzzle === undefined) {
    return (
      <ErrorState
        message="Puzzle verisi bulunamadı."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Puzzle açılamadı"
      />
    );
  }
  if (status === 'loading' || session?.caseId !== caseId) {
    return <LoadingState label="Puzzle oturumu yükleniyor" />;
  }
  if (status === 'error') {
    return (
      <ErrorState
        message="Puzzle oturumu okunamadı."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Kayıt hatası"
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
  }
}
