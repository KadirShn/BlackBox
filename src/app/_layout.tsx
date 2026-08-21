import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppBootstrap } from '@/components/AppBootstrap';
import { AppErrorBoundary } from '@/components/AppErrorBoundary';
import { InvestigationBackdrop } from '@/components/InvestigationBackdrop';
import { translate } from '@/content/locales/translations';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors } from '@/theme/tokens';

export default function RootLayout() {
  const language = useSettingsStore((state) => state.language);
  const t = (key: Parameters<typeof translate>[0]) => translate(key, language);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <SafeAreaProvider>
        <AppErrorBoundary>
          <StatusBar style="light" />
          <AppBootstrap>
            <View style={{ flex: 1 }}>
              <InvestigationBackdrop />
              <Stack
                screenOptions={{
                  contentStyle: { backgroundColor: 'transparent' },
                  headerStyle: { backgroundColor: '#0A131CDD' },
                  headerTintColor: colors.text.primary,
                  headerShadowVisible: false,
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="cases" options={{ title: t('navigation.cases') }} />
                <Stack.Screen name="archive" options={{ title: t('navigation.archive') }} />
                <Stack.Screen name="statistics" options={{ title: t('navigation.statistics') }} />
                <Stack.Screen name="settings" options={{ title: t('navigation.settings') }} />
                <Stack.Screen name="privacy" options={{ title: t('navigation.privacy') }} />
                <Stack.Screen
                  name="cases/[caseId]/index"
                  options={{ title: t('navigation.briefing') }}
                />
                <Stack.Screen
                  name="cases/[caseId]/desk"
                  options={{ title: t('navigation.evidenceDesk') }}
                />
                <Stack.Screen
                  name="cases/[caseId]/evidence/[evidenceId]"
                  options={{ title: t('navigation.evidence') }}
                />
                <Stack.Screen
                  name="cases/[caseId]/puzzle/[puzzleId]"
                  options={{ title: t('navigation.analysis') }}
                />
                <Stack.Screen
                  name="cases/[caseId]/report"
                  options={{ title: t('navigation.report') }}
                />
                <Stack.Screen
                  name="cases/[caseId]/result"
                  options={{ title: t('navigation.result') }}
                />
                <Stack.Screen
                  name="cases/[caseId]/hint"
                  options={{ presentation: 'formSheet', title: t('navigation.hint') }}
                />
              </Stack>
            </View>
          </AppBootstrap>
        </AppErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
