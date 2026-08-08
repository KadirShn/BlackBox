import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '@/components/StateViews';
import { BriefingScreen } from '@/features/briefing/BriefingScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function BriefingRoute() {
  const params = useLocalSearchParams<{ caseId?: string | string[] }>();
  const caseId = firstRouteParam(params.caseId);
  return caseId === null ? (
    <ErrorState
      message="Vaka kimliği eksik."
      onRetry={() => undefined}
      retryLabel="Geri dön"
      title="Geçersiz rota"
    />
  ) : (
    <BriefingScreen caseId={caseId} />
  );
}
