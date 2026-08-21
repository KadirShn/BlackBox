import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
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
    <InvalidRouteState />
  ) : (
    <EvidenceDetailScreen caseId={caseId} evidenceId={evidenceId} />
  );
}
