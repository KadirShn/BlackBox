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
import type { Connection, ConnectionType } from '@/domain/case/caseSchema';
import { evaluatePuzzle, restorePuzzleAnswer } from '@/engine/puzzle-runtime/puzzleRegistry';
import { useActiveSession } from '@/features/session/useActiveSession';
import { useFeedback } from '@/features/feedback/useFeedback';
import { useSessionStore } from '@/stores/useSessionStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

const connectionLabels: Record<ConnectionType, string> = {
  supports: 'destekler',
  contradicts: 'çelişir',
  causes: 'neden olur',
};

export function ConnectionBoardPuzzleScreen({
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
  const definition = getCaseById(caseId);
  const puzzle = definition?.puzzles.find((item) => item.id === puzzleId);
  const [source, setSource] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [type, setType] = useState<ConnectionType | null>(null);
  const restored = z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
        type: z.enum(['supports', 'contradicts', 'causes']),
      }),
    )
    .safeParse(
      puzzle === undefined
        ? []
        : restorePuzzleAnswer(puzzle, session?.puzzleStates[puzzleId]?.answer),
    );
  const [connections, setConnections] = useState<Connection[]>(
    restored.success ? restored.data : [],
  );
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'solved'>('idle');

  if (definition === null || puzzle?.type !== 'connection_board')
    return (
      <ErrorState
        message="Bağlantı panosu tanımı bulunamadı."
        onRetry={() => router.back()}
        retryLabel="Geri dön"
        title="Puzzle açılamadı"
      />
    );
  if (status === 'loading' || session?.caseId !== caseId)
    return <LoadingState label="Bağlantı panosu yükleniyor" />;
  const boardPuzzle = puzzle;
  const nodeLabel = (nodeId: string) => {
    const evidence = definition.evidence.find((item) => item.id === nodeId);
    return evidence === undefined ? nodeId : translateCase(evidence.titleKey, language);
  };

  function addConnection(): void {
    if (source === null || target === null || type === null || source === target) return;
    const candidate = { from: source, to: target, type };
    setConnections((current) =>
      current.some(
        (item) =>
          item.from === candidate.from && item.to === candidate.to && item.type === candidate.type,
      )
        ? current
        : [...current, candidate],
    );
    setSource(null);
    setTarget(null);
    setType(null);
    setFeedback('idle');
  }

  function submit(): void {
    const solved = evaluatePuzzle(boardPuzzle, connections);
    saveAnswer(boardPuzzle.id, connections, solved);
    setFeedback(solved ? 'solved' : 'wrong');
    playFeedback(solved ? 'success' : 'warning');
  }

  return (
    <ScreenFrame>
      <Text accessibilityRole="header" style={styles.title}>
        {translateCase(puzzle.titleKey, language)}
      </Text>
      <Text style={styles.instructions}>{translateCase(puzzle.instructionsKey, language)}</Text>
      <Text style={styles.section}>1 · Kaynak düğüm</Text>
      <View style={styles.options}>
        {puzzle.nodeIds.map((id) => (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: source === id }}
            key={`s-${id}`}
            onPress={() => setSource(id)}
            style={[styles.option, source === id && styles.selected]}
          >
            <Text style={styles.optionText}>{nodeLabel(id)}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.section}>2 · Hedef düğüm</Text>
      <View style={styles.options}>
        {puzzle.nodeIds.map((id) => (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: target === id }}
            key={`t-${id}`}
            onPress={() => setTarget(id)}
            style={[styles.option, target === id && styles.selected]}
          >
            <Text style={styles.optionText}>{nodeLabel(id)}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.section}>3 · İlişki tipi</Text>
      <View style={styles.options}>
        {puzzle.allowedConnectionTypes.map((item) => (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: type === item }}
            key={item}
            onPress={() => setType(item)}
            style={[styles.option, type === item && styles.selected]}
          >
            <Text style={styles.optionText}>{connectionLabels[item]}</Text>
          </Pressable>
        ))}
      </View>
      <PrimaryButton
        disabled={source === null || target === null || type === null || source === target}
        label="Bağlantıyı ekle"
        onPress={addConnection}
      />
      <View style={styles.connectionList}>
        {connections.map((item) => (
          <Pressable
            accessibilityHint="Bağlantıyı kaldır"
            accessibilityRole="button"
            key={`${item.from}-${item.to}-${item.type}`}
            onPress={() =>
              setConnections((current) => current.filter((candidate) => candidate !== item))
            }
            style={styles.connection}
          >
            <Text style={styles.connectionText}>
              {nodeLabel(item.from)} → {connectionLabels[item.type]} → {nodeLabel(item.to)} ×
            </Text>
          </Pressable>
        ))}
      </View>
      <PrimaryButton
        label="İpucu"
        onPress={() =>
          router.push({ pathname: '/cases/[caseId]/hint', params: { caseId, puzzleId } })
        }
      />
      <PrimaryButton label="Panoyu kontrol et" onPress={submit} />
      {feedback === 'wrong' ? (
        <Text style={styles.error}>Bağlantılardan biri eksik veya yönü yanlış.</Text>
      ) : null}
      {feedback === 'solved' ? (
        <Text style={styles.success}>✓ Bağlantı panosu doğrulandı.</Text>
      ) : null}
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.screenTitle, color: colors.text.primary },
  instructions: { ...typography.body, color: colors.text.secondary },
  section: { ...typography.sectionTitle, color: colors.text.primary },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  option: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radii.sm,
    backgroundColor: colors.surface.glass,
  },
  selected: { borderColor: colors.accent.primary, backgroundColor: colors.evidence.selected },
  optionText: { ...typography.caption, color: colors.text.primary },
  connectionList: { gap: spacing.sm },
  connection: {
    minHeight: layout.minTouchTarget,
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radii.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.secondary,
    backgroundColor: colors.surface.glass,
  },
  connectionText: { ...typography.body, color: colors.text.primary },
  error: { ...typography.body, color: colors.status.danger },
  success: { ...typography.body, color: colors.status.success },
});
