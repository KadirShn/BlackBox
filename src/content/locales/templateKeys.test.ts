import { translateCase } from '@/content/locales/caseTranslations';
import {
  fillTemplate,
  missingPlaceholders,
  splitTemplateKey,
  withParams,
} from '@/content/locales/templateKeys';

describe('template translation keys', () => {
  it('round-trips values with separators and typographic characters', () => {
    const params = { value: '−312', at: '01:42’de', odd: 'a&b=c?d' };
    expect(splitTemplateKey(withParams('daily.key', params))).toEqual({
      base: 'daily.key',
      params,
    });
  });

  it('leaves plain keys untouched', () => {
    expect(withParams('cases.night.title', {})).toBe('cases.night.title');
    expect(splitTemplateKey('cases.night.title')).toEqual({
      base: 'cases.night.title',
      params: {},
    });
  });

  it('fills known placeholders and reports missing ones', () => {
    expect(fillTemplate('{a} and {b}', { a: '1' })).toBe('1 and {b}');
    expect(missingPlaceholders('{a} and {b}', { a: '1' })).toEqual(['b']);
  });

  it('translates templated case keys', () => {
    expect(translateCase(withParams('daily.server.title', { system: 'ATLAS-3' }), 'en')).toBe(
      'ATLAS-3 Outage',
    );
  });
});
