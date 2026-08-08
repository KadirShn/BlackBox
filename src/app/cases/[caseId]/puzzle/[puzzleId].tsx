import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '@/components/StateViews';
import { PuzzleScreen } from '@/features/puzzle/PuzzleScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function PuzzleRoute() {
  const params = useLocalSearchParams<{
    caseId?: string | string[];
    puzzleId?: string | string[];
  }>();
  const caseId = firstRouteParam(params.caseId);
  const puzzleId = firstRouteParam(params.puzzleId);
  return caseId === null || puzzleId === null ? (
    <ErrorState
      message="Puzzle rotası eksik."
      onRetry={() => undefined}
      retryLabel="Geri dön"
      title="Geçersiz rota"
    />
  ) : (
    <PuzzleScreen caseId={caseId} puzzleId={puzzleId} />
  );
}
