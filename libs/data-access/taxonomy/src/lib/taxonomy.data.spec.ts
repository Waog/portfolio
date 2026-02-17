import 'jest-expect-message';

import { TagName, TAXONOMY, TaxonomyData } from './taxonomy.data';

describe('Taxonomy Data', () => {
  it('has no duplicate canonical values', () => {
    const canonicalNames = TAXONOMY.map(term => term.canonical);
    const uniqueCanonicalNames = new Set(canonicalNames);

    expect(canonicalNames).toEqual(Array.from(uniqueCanonicalNames));
  });

  it('`includes` elements exist as another TAXONOMY element', () => {
    throwIfBrokenReference('includes');
  });

  it('`related` elements exist as another TAXONOMY element', () => {
    throwIfBrokenReference('related');
  });

  it('`parents` elements exist as another TAXONOMY element', () => {
    throwIfBrokenReference('parents');
  });

  it('`children` elements exist as another TAXONOMY element', () => {
    throwIfBrokenReference('children');
  });

  it('`children` elements have a `parents` counterpart', () => {
    throwIfBrokenReference('children', 'parents');
  });

  it('`parents` elements have a `children` counterpart', () => {
    throwIfBrokenReference('parents', 'children');
  });

  it('categories include elements which are either `Misc` or others', () => {
    for (const data of TAXONOMY) {
      const categories = data.categories;
      expect(
        categories.length,
        `Taxonomy Element "${data.canonical}" has empty categories`
      ).toBeGreaterThan(0);
      if (categories.includes('Misc')) {
        expect(
          categories.length,
          `Taxonomy Element "${data.canonical}" has "Misc" despite additional categories`
        ).toBe(1);
      }
    }
  });

  function throwIfBrokenReference(
    sourcePropertyName: keyof TaxonomyData,
    targetPropertyName: keyof TaxonomyData | undefined = undefined
  ) {
    for (const sourceTerm of TAXONOMY) {
      const sourceValues: TagName[] = sourceTerm[
        sourcePropertyName
      ] as TagName[];

      if (!sourceValues) continue;

      for (const sourceValue of sourceValues) {
        const targetTerm = TAXONOMY.find(
          targetTerm => targetTerm.canonical === sourceValue
        );

        expect(
          targetTerm,
          `Taxonomy Element "${sourceTerm.canonical}" has property "${sourcePropertyName}" with element "${sourceValue}", but "${sourceValue}" is not defined as a canonical term in TAXONOMY`
        ).toBeDefined();

        if (!targetPropertyName) continue; // only check for canonical name if no target property is specified

        const targetValue = targetTerm?.[targetPropertyName];

        if (typeof targetValue === 'string') {
          const contextMsg = `Taxonomy Element "${sourceTerm.canonical}" has property "${sourcePropertyName}" with element "${sourceValue}", but Taxonomy Element "${targetTerm?.canonical}"'s property "${targetPropertyName}" !== "${sourceTerm.canonical}" (but is "${targetValue}")`;

          expect(targetValue, contextMsg).toBe(sourceTerm.canonical);
        } else if (Array.isArray(targetValue)) {
          const contextMsg = `Taxonomy Element "${sourceTerm.canonical}" has property "${sourcePropertyName}" with element "${sourceValue}", but Taxonomy Element "${targetTerm?.canonical}"'s property "${targetPropertyName}" does not include "${sourceTerm.canonical}"`;

          expect(targetValue, contextMsg).toContain(sourceTerm.canonical);
        } else {
          const contextMsg = `Taxonomy Element "${sourceTerm.canonical}" has property "${sourcePropertyName}" with element "${sourceValue}", but Taxonomy Element "${targetTerm?.canonical}"'s doesn't have a property "${targetPropertyName}" of type string or string[]`;

          expect(
            typeof targetValue === 'string' || Array.isArray(targetValue),
            contextMsg
          ).toBeTruthy();
        }
      }
    }
  }
});
