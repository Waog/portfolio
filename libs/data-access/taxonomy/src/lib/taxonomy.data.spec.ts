import 'jest-expect-message';

import { TagName, TAXONOMY, TaxonomyTerm } from './taxonomy.data';

describe('Taxonomy Data', () => {
  it('has ordered elements (by canonical name)', () => {
    const canonicalNames = TAXONOMY.map(term => term.canonical);

    expect(canonicalNames).toEqual([...canonicalNames].sort());
  });

  it('has no duplicate canonical values', () => {
    const canonicalNames = TAXONOMY.map(term => term.canonical);
    const uniqueCanonicalNames = new Set(canonicalNames);

    expect(canonicalNames.length).toBe(uniqueCanonicalNames.size);
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

  it('array properties are ordered alphabetically', () => {
    const arrayProperties: (keyof TaxonomyTerm)[] = [
      'synonyms',
      'includes',
      'related',
      'parents',
      'children',
    ];

    for (const term of TAXONOMY) {
      for (const propName of arrayProperties) {
        const propValue = term[propName];

        if (!propValue || !Array.isArray(propValue)) continue;

        expect(
          propValue,
          `Taxonomy Element "${term.canonical}" has property "${propName}" that is not ordered alphabetically`
        ).toEqual([...propValue].sort(customSort));
      }
    }
  });

  function customSort(
    a: RegExp | string | TagName,
    b: RegExp | string | TagName
  ): number {
    const aString = a instanceof RegExp ? a.source : String(a);
    const bString = b instanceof RegExp ? b.source : String(b);
    return aString.localeCompare(bString);
  }

  function throwIfBrokenReference(
    sourcePropertyName: keyof TaxonomyTerm,
    targetPropertyName: keyof TaxonomyTerm | undefined = undefined
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

        const targetValue = targetTerm![targetPropertyName];

        if (typeof targetValue === 'string') {
          const contextMsg = `Taxonomy Element "${
            sourceTerm.canonical
          }" has property "${sourcePropertyName}" with element "${sourceValue}", but Taxonomy Element "${
            targetTerm!.canonical
          }"'s property "${targetPropertyName}" !== "${
            sourceTerm.canonical
          }" (but is "${targetValue}")`;

          expect(targetValue, contextMsg).toBe(sourceTerm.canonical);
        } else if (Array.isArray(targetValue)) {
          const contextMsg = `Taxonomy Element "${
            sourceTerm.canonical
          }" has property "${sourcePropertyName}" with element "${sourceValue}", but Taxonomy Element "${
            targetTerm!.canonical
          }"'s property "${targetPropertyName}" does not include "${
            sourceTerm.canonical
          }"`;

          expect(targetValue, contextMsg).toContain(sourceTerm.canonical);
        } else {
          const contextMsg = `Taxonomy Element "${
            sourceTerm.canonical
          }" has property "${sourcePropertyName}" with element "${sourceValue}", but Taxonomy Element "${
            targetTerm!.canonical
          }"'s doesn't have a property "${targetPropertyName}" of type string or string[]`;

          expect(
            typeof targetValue === 'string' || Array.isArray(targetValue),
            contextMsg
          ).toBeTruthy();
        }
      }
    }
  }
});
