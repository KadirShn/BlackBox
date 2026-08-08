import { caseCatalog } from '@/content/cases/catalog';
import { hasCaseTranslation } from '@/content/locales/caseTranslations';
import { validateCaseContent } from '@/content/validation/validateCaseContent';

describe('all case content', () => {
  it.each(caseCatalog.map((definition) => [definition.id, definition] as const))(
    '%s is internally valid and fully translated',
    (_, definition) => {
      expect(validateCaseContent(definition, hasCaseTranslation)).toEqual([]);
    },
  );
});
