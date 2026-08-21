import { Stack } from 'expo-router/stack';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@/components/AppErrorBoundary';
import { InvestigationBackdrop } from '@/components/InvestigationBackdrop';
import { colors } from '@/theme/tokens';

export default function WebRootLayout() {
  return (
    <SafeAreaProvider>
      <AppErrorBoundary>
        <View style={styles.root}>
          <InvestigationBackdrop />
          <Stack screenOptions={{ contentStyle: styles.content, headerShown: false }} />
        </View>
      </AppErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background.primary },
  content: { backgroundColor: 'transparent' },
});
