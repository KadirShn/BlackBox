import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate } from '@/content/locales/translations';
import { evaluatePuzzle, restorePuzzleAnswer } from '@/engine/puzzle-runtime/puzzleRegistry';
import { useFeedback } from '@/features/feedback/useFeedback';
import { useActiveSession } from '@/features/session/useActiveSession';
import { useSessionStore } from '@/stores/useSessionStore';
import { getTextScale, useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

export function CodeEntryPuzzleScreen({ caseId, puzzleId }: { caseId: string; puzzleId: string }) {
  const router = useRouter();
  const status = useActiveSession(caseId);
  const language = useSettingsStore((state) => state.language);
  const textSize = useSettingsStore((state) => state.textSize);
  const session = useSessionStore((state) => state.session);
  const saveAnswer = useSessionStore((state) => state.setPuzzleAnswer);
  const playFeedback = useFeedback();
  const puzzle = getCaseById(caseId)?.puzzles.find((item) => item.id === puzzleId);
  const restored =
    puzzle === undefined
      ? ''
      : restorePuzzleAnswer(puzzle, session?.puzzleStates[puzzleId]?.answer);
  const [code, setCode] = useState(typeof restored === 'string' ? restored : '');
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'solved'>(
    session?.puzzleStates[puzzleId]?.status === 'solved' ? 'solved' : 'idle',
  );

  if (puzzle?.type !== 'code_entry')
    return (
      <ErrorState
        message={translate('code.missing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('puzzle.openError', language)}
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label={translate('code.loading', language)} />;
  const codePuzzle = puzzle;
  const solved = session.puzzleStates[puzzleId]?.status === 'solved';
  const inputScale = getTextScale(textSize);

  function submit(): void {
    if (code.trim().length === 0) return;
    const correct = evaluatePuzzle(codePuzzle, code);
    saveAnswer(codePuzzle.id, code, correct || solved);
    setFeedback(correct ? 'solved' : 'wrong');
    playFeedback(correct ? 'success' : 'warning');
  }

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(puzzle.titleKey, language)}
      </Text>
      <Text style={styles.instructions}>{translateCase(puzzle.instructionsKey, language)}</Text>
      <View style={styles.record}>
        <Text style={styles.recordLabel}>{translate('code.record', language)}</Text>
        <Text selectable style={styles.recordBody}>
          {translateCase(puzzle.promptKey, language)}
        </Text>
      </View>
      <View style={[styles.panel, solved && styles.panelSolved]}>
        <Text style={styles.panelLabel}>{translate('code.inputLabel', language)}</Text>
        <TextInput
          accessibilityLabel={translate('code.inputLabel', language)}
          autoCapitalize="characters"
          autoComplete="off"
          autoCorrect={false}
          editable={!solved}
          keyboardType={puzzle.inputMode === 'numeric' ? 'number-pad' : 'default'}
          maxLength={puzzle.answer.length + 6}
          onChangeText={(value) => {
            setCode(value);
            if (feedback === 'wrong') setFeedback('idle');
          }}
          onSubmitEditing={submit}
          placeholder={translate('code.placeholder', language)}
          placeholderTextColor={colors.text.secondary}
          returnKeyType="done"
          style={[
            styles.input,
            { fontSize: styles.input.fontSize * inputScale },
            feedback === 'wrong' && styles.inputWrong,
          ]}
          value={code}
        />
      </View>
      {!solved ? (
        <>
          <PrimaryButton
            disabled={code.trim().length === 0}
            label={translate('code.check', language)}
            onPress={submit}
          />
          <PrimaryButton
            label={translate('puzzle.hint', language)}
            onPress={() =>
              router.push({ pathname: '/cases/[caseId]/hint', params: { caseId, puzzleId } })
            }
            variant="secondary"
          />
        </>
      ) : null}
      {feedback === 'wrong' ? (
        <Text accessibilityLiveRegion="assertive" style={styles.error}>
          {translate('code.wrong', language)}
        </Text>
      ) : null}
      {solved ? (
        <>
          <Text accessibilityLiveRegion="polite" style={styles.success}>
            {translate('code.solved', language)}
          </Text>
          <PrimaryButton
            label={translate('puzzle.returnDesk', language)}
            onPress={() => router.back()}
          />
        </>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  instructions: { ...typography.body, color: colors.text.secondary },
  record: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.secondary,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.glass,
  },
  recordLabel: { ...typography.caption, color: colors.accent.secondary, letterSpacing: 1.2 },
  recordBody: { ...typography.log, color: colors.text.primary },
  panel: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.signal,
    borderRadius: radii.md,
    backgroundColor: colors.background.elevated,
  },
  panelSolved: { borderColor: colors.status.success },
  panelLabel: { ...typography.caption, color: colors.accent.primary, letterSpacing: 1.2 },
  input: {
    minHeight: layout.minTouchTarget + 8,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: colors.background.primary,
    color: colors.accent.primary,
    fontFamily: 'monospace',
    fontSize: 24,
    letterSpacing: 6,
    textAlign: 'center',
  },
  inputWrong: { borderColor: colors.status.danger },
  error: { ...typography.body, color: colors.status.danger },
  success: { ...typography.body, color: colors.status.success },
});
