import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
import { ResultScreen } from '@/features/results/ResultScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function ResultRoute() {
  const params = useLocalSearchParams<{ caseId?: string | string[]; stars?: string | string[] }>();
  const caseId = firstRouteParam(params.caseId);
  const starsValue = Number(firstRouteParam(params.stars));
  const stars = starsValue === 2 ? 2 : starsValue === 3 ? 3 : 1;
  return caseId === null ? <InvalidRouteState /> : <ResultScreen caseId={caseId} stars={stars} />;
}
