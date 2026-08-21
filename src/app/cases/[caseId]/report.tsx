import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
import { ReportScreen } from '@/features/report/ReportScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function ReportRoute() {
  const params = useLocalSearchParams<{ caseId?: string | string[] }>();
  const caseId = firstRouteParam(params.caseId);
  return caseId === null ? <InvalidRouteState /> : <ReportScreen caseId={caseId} />;
}
