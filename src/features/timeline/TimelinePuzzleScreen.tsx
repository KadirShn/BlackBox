import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenFrame } from '@/components/ScreenFrame';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { getCaseById } from '@/content/cases/catalog';
import { translateCase } from '@/content/locales/caseTranslations';
import type { CaseDefinition, TimelinePuzzleDefinition } from '@/domain/case/caseSchema';
import { evaluateTimeline, restoreTimelineAnswer } from '@/engine/puzzle-runtime/timelineEvaluator';
import { useActiveSession } from '@/features/session/useActiveSession';
import { TimelinePuzzle, type TimelineDisplayItem } from '@/features/timeline/TimelinePuzzle';
import { useSessionStore } from '@/stores/useSessionStore';
import { playFeedbackHaptic } from '@/services/haptics/hapticsService';
import { playUiSound } from '@/services/audio/audioService';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, typography } from '@/theme/tokens';

function TimelinePuzzleContent({
  caseId,
  definition,
  puzzle,
  savedAnswer,
}: {
  caseId: string;
  definition: CaseDefinition;
  puzzle: TimelinePuzzleDefinition;
  savedAnswer: unknown;
}) {
  const router = useRouter();
  const language = useSettingsStore((state) => state.language);
  const hapticsEnabled = useSettingsStore((state) => state.hapticsEnabled);
  const soundEffectsEnabled = useSettingsStore((state) => state.soundEffectsEnabled);
  const setPuzzleAnswer = useSessionStore((state) => state.setPuzzleAnswer);
  const [order, setOrder] = useState(() => restoreTimelineAnswer(puzzle, savedAnswer));
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'solved'>('idle');
  const items = order.flatMap<TimelineDisplayItem>((id) => {
    const evidence = definition.evidence.find((item) => item.id === id);
    if (evidence?.content.kind !== 'timeline_item') return [];
    return [
      {
        id,
        time: evidence.content.time,
        title: translateCase(evidence.titleKey, language),
        body: translateCase(evidence.content.bodyKey, language),
      },
    ];
  });

  function move(index: number, direction: -1 | 1): void {
    setOrder((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const item = next[index];
      if (item === undefined) return current;
      next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
    setFeedback('idle');
  }

  function submit(): void {
    const solved = evaluateTimeline(puzzle, order);
    setPuzzleAnswer(puzzle.id, order, solved);
    setFeedback(solved ? 'solved' : 'wrong');
    void playFeedbackHaptic(hapticsEnabled, solved ? 'success' : 'warning');
    void playUiSound(solved ? 'success' : 'warning', soundEffectsEnabled);
  }

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(puzzle.titleKey, language)}
      </Text>
      <Text style={styles.instructions}>{translateCase(puzzle.instructionsKey, language)}</Text>
      <PrimaryButton
        label="İpucu"
        onPress={() =>
          router.push({ pathname: '/cases/[caseId]/hint', params: { caseId, puzzleId: puzzle.id } })
        }
      />
      <TimelinePuzzle
        items={items}
        onMove={move}
        onSubmit={submit}
        submitLabel="Sırayı kontrol et"
      />
      {feedback === 'wrong' ? (
        <Text accessibilityLiveRegion="assertive" style={styles.error}>
          Sıra henüz tutarlı değil. Saatleri ve bakım olayını yeniden karşılaştır.
        </Text>
      ) : null}
      {feedback === 'solved' ? (
        <>
          <Text accessibilityLiveRegion="polite" style={styles.success}>
            ✓ Zaman çizelgesi doğrulandı.
          </Text>
          <PrimaryButton
            label="Delil masasına dön"
            onPress={() => router.replace({ pathname: '/cases/[caseId]/desk', params: { caseId } })}
          />
        </>
      ) : null}
    </ScreenFrame>
  );
}

export function TimelinePuzzleScreen({ caseId, puzzleId }: { caseId: string; puzzleId: string }) {
  const router = useRouter();
  const loadStatus = useActiveSession(caseId);
  const session = useSessionStore((state) => state.session);
  const definition = getCaseById(caseId);
  const puzzle = definition?.puzzles.find((item) => item.id === puzzleId);

  if (definition === null || puzzle?.type !== 'timeline')
    return (
      <ErrorState
        message="Timeline tanımı bulunamadı."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Puzzle açılamadı"
      />
    );
  if (loadStatus === 'loading' || session?.caseId !== caseId)
    return <LoadingState label="Puzzle yükleniyor" />;
  if (loadStatus === 'error')
    return (
      <ErrorState
        message="Oturum yüklenemedi."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Kayıt hatası"
      />
    );

  return (
    <TimelinePuzzleContent
      caseId={caseId}
      definition={definition}
      puzzle={puzzle}
      savedAnswer={session.puzzleStates[puzzleId]?.answer}
    />
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  instructions: { ...typography.body, color: colors.text.secondary },
  error: { ...typography.body, color: colors.status.danger },
  success: { ...typography.body, color: colors.status.success },
});
