import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '@/components/StateViews';
import { EvidenceDetailScreen } from '@/features/evidence/EvidenceDetailScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function EvidenceDetailRoute() {
  const params = useLocalSearchParams<{
    caseId?: string | string[];
    evidenceId?: string | string[];
  }>();
  const caseId = firstRouteParam(params.caseId);
  const evidenceId = firstRouteParam(params.evidenceId);
  return caseId === null || evidenceId === null ? (
    <ErrorState
      message="Delil rotası eksik."
      onRetry={() => undefined}
      retryLabel="Geri dön"
      title="Geçersiz rota"
    />
  ) : (
    <EvidenceDetailScreen caseId={caseId} evidenceId={evidenceId} />
  );
}
