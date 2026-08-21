import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { z } from 'zod';

import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import { translate } from '@/content/locales/translations';
import { evaluatePuzzle, restorePuzzleAnswer } from '@/engine/puzzle-runtime/puzzleRegistry';
import { useActiveSession } from '@/features/session/useActiveSession';
import { useFeedback } from '@/features/feedback/useFeedback';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

export function ContradictionPuzzleScreen({
  caseId,
  puzzleId,
}: {
  caseId: string;
  puzzleId: string;
}) {
  const router = useRouter();
  const status = useActiveSession(caseId);
  const language = useSettingsStore((state) => state.language);
  const session = useSessionStore((state) => state.session);
  const saveAnswer = useSessionStore((state) => state.setPuzzleAnswer);
  const playFeedback = useFeedback();
  const puzzle = getCaseById(caseId)?.puzzles.find((item) => item.id === puzzleId);
  const restored = z
    .object({ aSegmentId: z.string(), bSegmentId: z.string() })
    .safeParse(
      puzzle === undefined
        ? null
        : restorePuzzleAnswer(puzzle, session?.puzzleStates[puzzleId]?.answer),
    );
  const [aSegmentId, setA] = useState(restored.success ? restored.data.aSegmentId : '');
  const [bSegmentId, setB] = useState(restored.success ? restored.data.bSegmentId : '');
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'solved'>('idle');

  if (puzzle?.type !== 'contradiction')
    return (
      <ErrorState
        message={translate('contradiction.missing', language)}
        onRetry={() => router.back()}
        retryLabel={translate('common.back', language)}
        title={translate('puzzle.openError', language)}
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label={translate('contradiction.loading', language)} />;
  const contradictionPuzzle = puzzle;

  function submit(): void {
    const answer = { aSegmentId, bSegmentId };
    const solved = evaluatePuzzle(contradictionPuzzle, answer);
    saveAnswer(contradictionPuzzle.id, answer, solved);
    setFeedback(solved ? 'solved' : 'wrong');
    playFeedback(solved ? 'success' : 'warning');
  }

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(puzzle.titleKey, language)}
      </Text>
      <Text style={styles.instructions}>{translateCase(puzzle.instructionsKey, language)}</Text>
      {[
        { source: puzzle.sourceA, selected: aSegmentId, select: setA, label: 'A' },
        { source: puzzle.sourceB, selected: bSegmentId, select: setB, label: 'B' },
      ].map((group) => (
        <View key={group.label} style={styles.group}>
          <Text style={styles.groupTitle}>
            {group.label} · {translateCase(group.source.titleKey, language)}
          </Text>
          {group.source.segments.map((segment) => (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: group.selected === segment.id }}
              key={segment.id}
              onPress={() => group.select(segment.id)}
              style={[styles.segment, group.selected === segment.id && styles.selected]}
            >
              <Text style={styles.segmentText}>
                {group.selected === segment.id ? '◉ ' : '○ '}
                {translateCase(segment.textKey, language)}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
      <PrimaryButton
        label={translate('puzzle.hint', language)}
        onPress={() =>
          router.push({ pathname: '/cases/[caseId]/hint', params: { caseId, puzzleId } })
        }
      />
      <PrimaryButton
        disabled={aSegmentId === '' || bSegmentId === ''}
        label={translate('contradiction.check', language)}
        onPress={submit}
      />
      {feedback === 'wrong' ? (
        <Text style={styles.error}>{translate('contradiction.wrong', language)}</Text>
      ) : null}
      {feedback === 'solved' ? (
        <Text style={styles.success}>{translate('contradiction.solved', language)}</Text>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  instructions: { ...typography.body, color: colors.text.secondary },
  group: { gap: spacing.sm },
  groupTitle: { ...typography.sectionTitle, color: colors.text.primary },
  segment: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.secondary,
    backgroundColor: colors.surface.glass,
  },
  selected: { borderColor: colors.accent.primary, backgroundColor: colors.evidence.selected },
  segmentText: { ...typography.body, color: colors.text.primary },
  error: { ...typography.body, color: colors.status.danger },
  success: { ...typography.body, color: colors.status.success },
});
