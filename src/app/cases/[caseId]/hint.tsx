import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '@/components/StateViews';
import { HintScreen } from '@/features/hints/HintScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function HintRoute() {
  const params = useLocalSearchParams<{
    caseId?: string | string[];
    puzzleId?: string | string[];
  }>();
  const caseId = firstRouteParam(params.caseId);
  const puzzleId = firstRouteParam(params.puzzleId);
  return caseId === null || puzzleId === null ? (
    <ErrorState
      message="İpucu rotası eksik."
      onRetry={() => undefined}
      retryLabel="Kapat"
      title="Geçersiz rota"
    />
  ) : (
    <HintScreen caseId={caseId} puzzleId={puzzleId} />
  );
}
