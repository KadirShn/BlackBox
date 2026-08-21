import { useRouter } from 'expo-router';

import { ErrorState } from '@/components/StateViews';
import { translate } from '@/content/locales/translations';
import { useSettingsStore } from '@/stores/useSettingsStore';

export function InvalidRouteState() {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);

  return (
    <ErrorState
      message={translate('common.missingRoute', language)}
      onRetry={() => {
        if (router.canGoBack()) router.back();
        else router.replace('/');
      }}
      retryLabel={translate('common.back', language)}
      title={translate('common.invalidRoute', language)}
    />
  );
}
