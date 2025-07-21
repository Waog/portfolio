import { Memoize } from 'typescript-memoize';

import { TAXONOMY, TaxonomyTerm } from './taxonomy.data';

export class Tag {
  private static cache = new Map<string, Tag | null>();

  private readonly taxonomyTerm: TaxonomyTerm;

  public static get(originalString: string): Tag {
    const cached = Tag.cache.get(originalString);
    if (cached === null) {
      throw new Error(`Tag "${originalString}" not found in taxonomy.`);
    }
    if (cached) {
      return cached;
    }

    let newTag: Tag;
    try {
      newTag = new Tag(originalString);
    } catch (error) {
      Tag.cache.set(originalString, null);
      throw error;
    }

    const cachedCanonical = Tag.cache.get(newTag.taxonomyTerm.canonical);
    if (cachedCanonical) {
      Tag.cache.set(originalString, cachedCanonical);
      return cachedCanonical;
    }

    Tag.cache.set(newTag.taxonomyTerm.canonical, newTag);
    Tag.cache.set(originalString, newTag);
    return newTag;
  }

  private constructor(public originalString: string) {
    const matchingTerm = TAXONOMY.find(term =>
      this.matches(originalString, term)
    );
    if (matchingTerm) {
      this.taxonomyTerm = matchingTerm;
    } else {
      throw new Error(`Tag "${originalString}" not found in taxonomy.`);
    }
  }

  @Memoize()
  is(term: string): boolean {
    return this.matches(term, this.taxonomyTerm);
  }

  @Memoize()
  isA(term: string): boolean {
    for (const parentTerm of this.taxonomyTerm.parents || []) {
      const parentTag = Tag.get(parentTerm);
      if (parentTag.is(term) || parentTag.isA(term)) {
        return true;
      }
    }
    return false;
  }

  @Memoize()
  hasChild(term: string): boolean {
    for (const childTerm of this.taxonomyTerm.children || []) {
      const childTag = Tag.get(childTerm);
      if (childTag.is(term)) {
        return true;
      }
    }
    return false;
  }

  @Memoize()
  isSibling(term: string): boolean {
    for (const parentTerm of this.taxonomyTerm.parents || []) {
      const parentTag = Tag.get(parentTerm);
      if (parentTag.hasChild(term)) {
        return true;
      }
    }
    return false;
  }

  @Memoize()
  getDistanceToAncestor(ancestorTerm: string): number | null {
    if (this.is(ancestorTerm)) {
      return 0;
    }

    if (!this.taxonomyTerm.parents || this.taxonomyTerm.parents.length === 0) {
      return null;
    }

    let shortestParentDistance: number | null = null;
    for (const parentTerm of this.taxonomyTerm.parents) {
      const parentTag = Tag.get(parentTerm);
      const distance = parentTag.getDistanceToAncestor(ancestorTerm);
      if (distance !== null) {
        if (
          shortestParentDistance === null ||
          distance < shortestParentDistance
        ) {
          shortestParentDistance = distance;
        }
      }
    }
    return shortestParentDistance !== null ? shortestParentDistance + 1 : null;
  }

  @Memoize()
  getAllAncestors(): Set<Tag> {
    const result = new Set<Tag>();
    for (const parentTerm of this.taxonomyTerm.parents || []) {
      const parentTag = Tag.get(parentTerm);
      result.add(parentTag);
      parentTag
        .getAllAncestors()
        .forEach(ancestorTag => result.add(ancestorTag));
    }
    return result;
  }

  @Memoize()
  getAllCommonAncestors(term: string): Set<Tag> {
    const thisAncestorTags = this.getAllAncestors();
    const otherAncestorTags = Tag.get(term).getAllAncestors();
    const result = new Set<Tag>();
    // NOTE: not using Set.intersection() as it is too new (ES2024)
    thisAncestorTags.forEach(thisAncestorTag => {
      if (otherAncestorTags.has(thisAncestorTag)) {
        result.add(thisAncestorTag);
      }
    });
    return result;
  }

  @Memoize()
  getLowestCommonAncestor(term: string): Tag | null {
    if (this.is(term)) {
      return this;
    }

    const otherTag = Tag.get(term);

    if (this.isA(term)) {
      return otherTag;
    }

    if (otherTag.isA(this.taxonomyTerm.canonical)) {
      return this;
    }

    const commonAncestorTags = this.getAllCommonAncestors(term);
    if (commonAncestorTags.size === 0) {
      return null;
    }
    let shortestDistanceToThis = Infinity;
    let shortestDistanceAncestorTag: Tag | null = null;
    for (const commonAncestorTag of commonAncestorTags) {
      const distanceToThis = this.getDistanceToAncestor(
        commonAncestorTag.taxonomyTerm.canonical
      ) as number;
      if (distanceToThis < shortestDistanceToThis) {
        shortestDistanceToThis = distanceToThis;
        shortestDistanceAncestorTag = commonAncestorTag;
      }
    }

    return shortestDistanceAncestorTag;
  }

  @Memoize()
  getMinDistanceToLowestCommonAncestor(term: string): number | null {
    const lowestCommonAncestorTag = this.getLowestCommonAncestor(term);
    if (lowestCommonAncestorTag === null) {
      return null;
    }
    return Math.min(
      this.getDistanceToAncestor(
        lowestCommonAncestorTag.taxonomyTerm.canonical
      ) as number,
      Tag.get(term).getDistanceToAncestor(
        lowestCommonAncestorTag.taxonomyTerm.canonical
      ) as number
    );
  }

  @Memoize()
  includes(term: string): boolean {
    if (this.is(term)) {
      return true;
    }

    for (const includesTerm of this.taxonomyTerm.includes || []) {
      const includesTag = Tag.get(includesTerm);
      if (includesTag.is(term) || includesTag.includes(term)) {
        return true;
      }
    }
    for (const parentTerm of this.taxonomyTerm.parents || []) {
      const parentTag = Tag.get(parentTerm);
      if (parentTag.includes(term)) {
        return true;
      }
    }
    return false;
  }

  @Memoize()
  isRelated(term: string): boolean {
    if (this.is(term)) {
      return true;
    }

    for (const relatedTerm of this.taxonomyTerm.related || []) {
      const relatedTag = Tag.get(relatedTerm);
      if (relatedTag.is(term)) {
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
