import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
import { EvidenceDeskScreen } from '@/features/evidence/EvidenceDeskScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function EvidenceDeskRoute() {
  const params = useLocalSearchParams<{ caseId?: string | string[] }>();
  const caseId = firstRouteParam(params.caseId);
  return caseId === null ? <InvalidRouteState /> : <EvidenceDeskScreen caseId={caseId} />;
}
