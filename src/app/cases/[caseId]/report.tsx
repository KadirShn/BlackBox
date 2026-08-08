import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '@/components/StateViews';
import { ReportScreen } from '@/features/report/ReportScreen';
import { firstRouteParam } from '@/utils/routeParams';

export default function ReportRoute() {
  const params = useLocalSearchParams<{ caseId?: string | string[] }>();
  const caseId = firstRouteParam(params.caseId);
  return caseId === null ? (
    <ErrorState
      message="Rapor rotası eksik."
      onRetry={() => undefined}
      retryLabel="Geri dön"
      title="Geçersiz rota"
    />
  ) : (
    <ReportScreen caseId={caseId} />
  );
}
