import { translate, type Language } from '@/content/locales/translations';

export const STORE_URL = 'https://play.google.com/store/apps/details?id=com.kadirshn.blackbox';

export type ShareResult = {
  title: string;
  dailyDate: string | null;
  stars: 1 | 2 | 3;
  hintsUsed: number | null;
  reportMistakes: number | null;
  streak: number | null;
};

/** Spoiler-free summary: the case name and score, never the solution. */
export function buildShareMessage(result: ShareResult, language: Language): string {
  const heading =
    result.dailyDate === null
      ? translate('share.title', language).replace('{title}', result.title)
      : translate('share.daily', language).replace('{date}', result.dailyDate);
  const stars = `${'★'.repeat(result.stars)}${'☆'.repeat(3 - result.stars)}`;
  const score =
    result.hintsUsed === null || result.reportMistakes === null
      ? stars
      : translate('share.score', language)
          .replace('{stars}', stars)
          .replace('{hints}', String(result.hintsUsed))
          .replace('{mistakes}', String(result.reportMistakes));
  const lines = [heading, score];
  if (result.streak !== null && result.streak > 0) {
    lines.push(translate('share.streak', language).replace('{count}', String(result.streak)));
  }
  lines.push(translate('share.invite', language), STORE_URL);
  return lines.join('\n');
}
