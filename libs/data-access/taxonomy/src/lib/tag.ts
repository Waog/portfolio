import { TAXONOMY, TaxonomyTerm } from './taxonomy.data';

export class Tag {
  private readonly taxonomyTerm: TaxonomyTerm;

  constructor(public originalString: string) {
    const matchingTerm = TAXONOMY.find(term =>
      this.matches(originalString, term)
    );
    if (matchingTerm) {
      this.taxonomyTerm = matchingTerm;
    } else {
      throw new Error(`Tag "${originalString}" not found in taxonomy.`);
    }
  }

  is(term: string): boolean {
    return this.matches(term, this.taxonomyTerm);
  }

  isA(term: string): boolean {
    for (const parentTerm of this.taxonomyTerm.parents || []) {
      const parentTag = new Tag(parentTerm);
      if (parentTag.is(term) || parentTag.isA(term)) {
        return true;
      }
    }
    return false;
  }

  hasChild(term: string): boolean {
    for (const childTerm of this.taxonomyTerm.children || []) {
      const childTag = new Tag(childTerm);
      if (childTag.is(term)) {
        return true;
      }
    }
    return false;
  }

  isSibling(term: string): boolean {
    for (const parentTerm of this.taxonomyTerm.parents || []) {
      const parentTag = new Tag(parentTerm);
      if (parentTag.hasChild(term)) {
        return true;
      }
    }
    return false;
  }

  private matches(term: string, taxonomyTerm: TaxonomyTerm): boolean {
    return (
      taxonomyTerm.canonical === term ||
      this.synonymMatch(term, taxonomyTerm.synonyms)
    );
  }

  private synonymMatch(
    term: string,
    synonyms: TaxonomyTerm['synonyms']
  ): boolean {
    if (!synonyms) return false;

    return synonyms.some(
      synonym =>
        (synonym instanceof RegExp && synonym.test(term)) ||
        (typeof synonym === 'string' &&
          synonym.toLowerCase().trim() === term.toLowerCase().trim())
    );
  }
}
