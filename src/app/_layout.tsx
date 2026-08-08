import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppBootstrap } from '@/components/AppBootstrap';
import { InvestigationBackdrop } from '@/components/InvestigationBackdrop';
import { colors } from '@/theme/tokens';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <SafeAreaProvider>
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
              <Stack.Screen name="cases" options={{ title: 'Vakalar' }} />
              <Stack.Screen name="archive" options={{ title: 'Arşiv' }} />
              <Stack.Screen name="statistics" options={{ title: 'İstatistikler' }} />
              <Stack.Screen name="settings" options={{ title: 'Ayarlar' }} />
              <Stack.Screen name="cases/[caseId]/index" options={{ title: 'Brifing' }} />
              <Stack.Screen name="cases/[caseId]/desk" options={{ title: 'Delil masası' }} />
              <Stack.Screen
                name="cases/[caseId]/evidence/[evidenceId]"
                options={{ title: 'Delil' }}
              />
              <Stack.Screen name="cases/[caseId]/puzzle/[puzzleId]" options={{ title: 'Analiz' }} />
              <Stack.Screen name="cases/[caseId]/report" options={{ title: 'Rapor' }} />
              <Stack.Screen name="cases/[caseId]/result" options={{ title: 'Sonuç' }} />
              <Stack.Screen
                name="cases/[caseId]/hint"
                options={{ presentation: 'formSheet', title: 'İpucu' }}
              />
            </Stack>
          </View>
        </AppBootstrap>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
