import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
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
    <InvalidRouteState />
  ) : (
    <HintScreen caseId={caseId} puzzleId={puzzleId} />
  );
}
