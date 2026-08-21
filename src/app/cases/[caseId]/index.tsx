import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
import { BriefingScreen } from '@/features/briefing/BriefingScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function BriefingRoute() {
  const params = useLocalSearchParams<{ caseId?: string | string[] }>();
  const caseId = firstRouteParam(params.caseId);
  return caseId === null ? <InvalidRouteState /> : <BriefingScreen caseId={caseId} />;
}
