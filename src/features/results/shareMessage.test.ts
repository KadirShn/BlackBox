import { buildShareMessage, STORE_URL } from '@/features/results/shareMessage';

describe('result share message', () => {
  it('shares a story case score without the solution', () => {
    expect(
      buildShareMessage(
        {
          title: 'Cold Chain',
          dailyDate: null,
          stars: 2,
          hintsUsed: 1,
          reportMistakes: 0,
          streak: null,
        },
        'en',
      ),
    ).toBe(
      [
        'Black Box · Cold Chain',
        '★★☆ · 1 hints · 0 rejected reports',
        'Can you crack it?',
        STORE_URL,
      ].join('\n'),
    );
  });

  it('adds the date and streak for the daily file', () => {
    const message = buildShareMessage(
      {
        title: 'ATLAS-3 Kesintisi',
        dailyDate: '2026-11-07',
        stars: 3,
        hintsUsed: 0,
        reportMistakes: 0,
        streak: 5,
      },
      'tr',
    );
    expect(message).toContain('Günlük Dosya 2026-11-07');
    expect(message).toContain('🔥 5 günlük seri');
    expect(message).not.toContain('ATLAS-3');
  });
});
