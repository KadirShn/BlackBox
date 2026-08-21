import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate } from '@/content/locales/translations';
import { useActiveSession } from '@/features/session/useActiveSession';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, radii, spacing, typography } from '@/theme/tokens';

export function HintScreen({ caseId, puzzleId }: { caseId: string; puzzleId: string }) {
  const router = useRouter();
  const status = useActiveSession(caseId);
  const language = useSettingsStore((state) => state.language);
  const session = useSessionStore((state) => state.session);
  const revealHint = useSessionStore((state) => state.useHint);
  const puzzle = getCaseById(caseId)?.puzzles.find((item) => item.id === puzzleId);

  if (puzzle === undefined)
    return (
      <ErrorState
        message={translate('hint.missing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('hint.openError', language)}
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label={translate('hint.loading', language)} />;
  const used = session.puzzleStates[puzzleId]?.hintsUsed ?? 0;

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {translate('hint.title', language)}
      </Text>
      <Text style={styles.caption}>
        {translate('hint.level', language)} {Math.min(used + 1, 3)} / 3
      </Text>
      {puzzle.hints.slice(0, used).map((hint) => (
        <View key={hint.id} style={styles.hint}>
          <Text style={styles.hintText}>{translateCase(hint.textKey, language)}</Text>
        </View>
      ))}
      {used === 0 ? <Text style={styles.caption}>{translate('hint.empty', language)}</Text> : null}
      <PrimaryButton
        disabled={used >= puzzle.hints.length}
        label={
          used >= puzzle.hints.length
            ? translate('hint.complete', language)
            : translate('hint.next', language)
        }
        onPress={() => revealHint(puzzleId)}
      />
      <PrimaryButton label={translate('hint.return', language)} onPress={() => router.back()} />
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  caption: { ...typography.body, color: colors.text.secondary },
  hint: { padding: spacing.lg, borderRadius: radii.md, backgroundColor: colors.surface.card },
  hintText: { ...typography.body, color: colors.text.primary },
});
