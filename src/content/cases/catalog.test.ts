import { caseCatalog, getNextCaseId, parseCaseCatalog } from '@/content/cases/catalog';

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

  it('isolates invalid external content instead of throwing during import', () => {
    const result = parseCaseCatalog([caseCatalog[0], { id: 'broken-case' }]);

    expect(result.cases).toHaveLength(1);
    expect(result.issues).toEqual([{ index: 1 }]);
  });
});
