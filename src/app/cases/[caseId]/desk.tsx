import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '@/components/StateViews';
import { EvidenceDeskScreen } from '@/features/evidence/EvidenceDeskScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function EvidenceDeskRoute() {
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
    <EvidenceDeskScreen caseId={caseId} />
  );
}
