import { Pressable, StyleSheet, View } from 'react-native';

import { AppText as Text } from '@/components/AppText';
import type { Language } from '@/content/locales/translations';
import { translate } from '@/content/locales/translations';
import { colors, layout, radii, spacing, typography } from '@/theme/tokens';

type DailyFileCardProps = {
  language: Language;
  title: string;
  summary: string;
  dateLabel: string;
  estimatedMinutes: number;
  completedStars: 1 | 2 | 3 | null;
  streak: number;
  bestStreak: number;
  onPress: () => void;
};

export function DailyFileCard({
  language,
  title,
  summary,
  dateLabel,
  estimatedMinutes,
  completedStars,
  streak,
  bestStreak,
  onPress,
}: DailyFileCardProps) {
  const completed = completedStars !== null;
  return (
    <Pressable
      accessibilityHint={summary}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        completed && styles.completed,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>
          {translate('daily.home.eyebrow', language)} · {dateLabel.toUpperCase()}
        </Text>
        <Text style={styles.streak}>
          {streak > 0
            ? translate('daily.home.streak', language).replace('{count}', String(streak))
            : translate('daily.home.noStreak', language)}
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>
      <View style={styles.footer}>
        <Text style={completed ? styles.done : styles.status}>
          {completed
            ? `${translate('daily.home.done', language)} ${'★'.repeat(completedStars)}${'☆'.repeat(3 - completedStars)}`
            : translate('daily.home.new', language).replace('{minutes}', String(estimatedMinutes))}
        </Text>
        {bestStreak > 0 ? (
          <Text style={styles.best}>
            {translate('daily.home.best', language).replace('{count}', String(bestStreak))}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: layout.minTouchTarget,
    gap: spacing.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent.secondary,
    borderRadius: radii.md,
    backgroundColor: colors.surface.card,
  },
  completed: { borderColor: colors.status.success },
  pressed: { opacity: 0.82 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  eyebrow: {
    ...typography.caption,
    flexShrink: 1,
    color: colors.accent.secondary,
    letterSpacing: 1.2,
  },
  streak: { ...typography.caption, color: colors.status.warning },
  title: { ...typography.sectionTitle, color: colors.text.primary },
  summary: { ...typography.body, color: colors.text.secondary },
  footer: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  status: { ...typography.caption, color: colors.accent.primary },
  done: { ...typography.caption, color: colors.status.success },
  best: { ...typography.caption, color: colors.text.secondary },
});
