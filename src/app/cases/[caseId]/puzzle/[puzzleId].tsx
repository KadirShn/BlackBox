import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
import { PuzzleScreen } from '@/features/puzzle/PuzzleScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function PuzzleRoute() {
  const params = useLocalSearchParams<{
    caseId?: string | string[];
    puzzleId?: string | string[];
  }>();
  const caseId = firstRouteParam(params.caseId);
  const puzzleId = firstRouteParam(params.puzzleId);
  return caseId === null || puzzleId === null ? (
    <InvalidRouteState />
  ) : (
    <PuzzleScreen caseId={caseId} puzzleId={puzzleId} />
  );
}
