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
import { evaluatePuzzle, restorePuzzleAnswer } from '@/engine/puzzle-runtime/puzzleRegistry';
import { useActiveSession } from '@/features/session/useActiveSession';
import { useFeedback } from '@/features/feedback/useFeedback';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type LevelFilter = 'all' | 'info' | 'warning' | 'error';

export function LogAnalyzerPuzzleScreen({
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
    .array(z.string())
    .safeParse(
      puzzle === undefined
        ? []
        : restorePuzzleAnswer(puzzle, session?.puzzleStates[puzzleId]?.answer),
    );
  const [selected, setSelected] = useState<string[]>(restored.success ? restored.data : []);
  const [filter, setFilter] = useState<LevelFilter>('all');
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'solved'>('idle');

  if (puzzle?.type !== 'log_analyzer')
    return (
      <ErrorState
        message="Log puzzle tanımı bulunamadı."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Puzzle açılamadı"
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label="Log kayıtları yükleniyor" />;
  const logPuzzle = puzzle;
  const visibleRows =
    filter === 'all' ? puzzle.rows : puzzle.rows.filter((row) => row.level === filter);

  function submit(): void {
    const solved = evaluatePuzzle(logPuzzle, selected);
    saveAnswer(logPuzzle.id, selected, solved);
    setFeedback(solved ? 'solved' : 'wrong');
    playFeedback(solved ? 'success' : 'warning');
  }

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(puzzle.titleKey, language)}
      </Text>
      <Text style={styles.instructions}>{translateCase(puzzle.instructionsKey, language)}</Text>
      <View style={styles.filters}>
        {(['all', 'info', 'warning', 'error'] as const).map((level) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: filter === level }}
            key={level}
            onPress={() => setFilter(level)}
            style={[styles.filter, filter === level && styles.selected]}
          >
            <Text style={styles.filterText}>{level.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.rows}>
        {visibleRows.map((row) => {
          const isSelected = selected.includes(row.id);
          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
              key={row.id}
              onPress={() =>
                setSelected((current) =>
                  current.includes(row.id)
                    ? current.filter((id) => id !== row.id)
                    : [...current, row.id],
                )
              }
              style={[styles.logRow, isSelected && styles.selected]}
            >
              <Text style={styles.logMeta}>
                {row.time} · {row.level.toUpperCase()} · {row.source} · {row.device}
              </Text>
              <Text selectable style={styles.logMessage}>
                {translateCase(row.messageKey, language)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <PrimaryButton
        label="İpucu"
        onPress={() =>
          router.push({ pathname: '/cases/[caseId]/hint', params: { caseId, puzzleId } })
        }
      />
      <PrimaryButton label="Seçimi kontrol et" onPress={submit} />
      {feedback === 'wrong' ? (
        <Text style={styles.error}>Seçimde eksik veya gereksiz satırlar var.</Text>
      ) : null}
      {feedback === 'solved' ? (
        <Text style={styles.success}>✓ Anormal kayıtlar doğrulandı.</Text>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  instructions: { ...typography.body, color: colors.text.secondary },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  filter: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    backgroundColor: colors.surface.card,
  },
  filterText: { ...typography.caption, color: colors.text.primary },
  selected: { borderColor: colors.accent.primary, backgroundColor: colors.evidence.selected },
  rows: { gap: spacing.sm },
  logRow: {
    minHeight: layout.minTouchTarget,
    gap: spacing.xs,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.glass,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.secondary,
  },
  logMeta: { ...typography.log, color: colors.accent.primary },
  logMessage: { ...typography.body, color: colors.text.primary },
  error: { ...typography.body, color: colors.status.danger },
  success: { ...typography.body, color: colors.status.success },
});
