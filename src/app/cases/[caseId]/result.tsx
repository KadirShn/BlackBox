import { useLocalSearchParams } from 'expo-router';

import { InvalidRouteState } from '@/components/InvalidRouteState';
import { ResultScreen } from '@/features/results/ResultScreen';
import { firstRouteParam } from '@/utils/routeParams';

function countParam(value: string | string[] | undefined): number | null {
  const parsed = Number(firstRouteParam(value));
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

export default function ResultRoute() {
  const params = useLocalSearchParams<{
    caseId?: string | string[];
    stars?: string | string[];
    hints?: string | string[];
    mistakes?: string | string[];
  }>();
  const caseId = firstRouteParam(params.caseId);
  const starsValue = Number(firstRouteParam(params.stars));
  const stars = starsValue === 2 ? 2 : starsValue === 3 ? 3 : 1;
  return caseId === null ? (
    <InvalidRouteState />
  ) : (
    <ResultScreen
      caseId={caseId}
      hintsUsed={countParam(params.hints)}
      reportMistakes={countParam(params.mistakes)}
      stars={stars}
    />
  );
}
