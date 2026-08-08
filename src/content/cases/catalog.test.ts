import { caseCatalog, getNextCaseId } from '@/content/cases/catalog';

describe('case progression catalog', () => {
  it('unlocks Case 1 after the tutorial', () => {
    expect(getNextCaseId('tutorial-missing-eleven')).toBe('case-night-route');
  });

  it('does not unlock from an unknown case', () => {
    expect(getNextCaseId('unknown')).toBeNull();
  });

  it('contains the tutorial and four main cases in story order', () => {
    expect(caseCatalog.map((item) => item.id)).toEqual([
      'tutorial-missing-eleven',
      'case-night-route',
      'case-silent-station',
      'case-wrong-guest',
      'case-black-box',
    ]);
    expect(getNextCaseId('case-black-box')).toBeNull();
  });
});
