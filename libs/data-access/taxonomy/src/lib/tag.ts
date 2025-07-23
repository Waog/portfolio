import { Memoize } from 'typescript-memoize';

import { Category, TagName, TAXONOMY, TaxonomyData } from './taxonomy.data';

export { Category, TagName } from './taxonomy.data';

export class Tag {
  private static cache = new Map<string, Tag | null>();

  private readonly taxonomyData: TaxonomyData;

  // TODO taxonomy: possibly only allow TagName type instead of string, once taxonomy is complete
  // consider if we want tolerance in project definition data or not
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

    const cachedCanonical = Tag.cache.get(newTag.taxonomyData.canonical);
    if (cachedCanonical) {
      Tag.cache.set(originalString, cachedCanonical);
      return cachedCanonical;
    }

    Tag.cache.set(newTag.taxonomyData.canonical, newTag);
    Tag.cache.set(originalString, newTag);
    return newTag;
  }

  private constructor(public originalString: string) {
    const matchingTerm = TAXONOMY.find(term =>
      Tag.matches(originalString, term)
    );
    if (matchingTerm) {
      this.taxonomyData = matchingTerm;
    } else {
      // TODO taxonomy: reactivate this error once the taxonomy is complete
      // or decide to stick with the fallback + warnings and clean up code
      // @GitHub Copilot: mark this in review, as it shall not be merged into master
      // throw new Error(`Tag "${originalString}" not found in taxonomy.`);
      console.warn(`Tag "${originalString}" not found in taxonomy.`);
      this.taxonomyData = {
        canonical: originalString as TagName,
        categories: ['Misc'],
      };
    }
  }

  @Memoize()
  is(term: string): boolean {
    return Tag.matches(term, this.taxonomyData);
  }

  @Memoize()
  isA(term: string): boolean {
    for (const parentTerm of this.taxonomyData.parents || []) {
      const parentTag = Tag.get(parentTerm);
      if (parentTag.is(term) || parentTag.isA(term)) {
        return true;
      }
    }
    return false;
  }

  @Memoize()
  hasChild(term: string): boolean {
    for (const childTerm of this.taxonomyData.children || []) {
      const childTag = Tag.get(childTerm);
      if (childTag.is(term)) {
        return true;
      }
    }
    return false;
  }

  @Memoize()
  isSibling(term: string): boolean {
    for (const parentTerm of this.taxonomyData.parents || []) {
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

    if (!this.taxonomyData.parents || this.taxonomyData.parents.length === 0) {
      return null;
    }

    let shortestParentDistance: number | null = null;
    for (const parentTerm of this.taxonomyData.parents) {
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
    for (const parentTerm of this.taxonomyData.parents || []) {
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

    if (otherTag.isA(this.taxonomyData.canonical)) {
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
        commonAncestorTag.taxonomyData.canonical
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
        lowestCommonAncestorTag.taxonomyData.canonical
      ) as number,
      Tag.get(term).getDistanceToAncestor(
        lowestCommonAncestorTag.taxonomyData.canonical
      ) as number
    );
  }

  @Memoize()
  includes(term: string): boolean {
    if (this.is(term)) {
      return true;
    }

    for (const includesTerm of this.taxonomyData.includes || []) {
      const includesTag = Tag.get(includesTerm);
      if (includesTag.is(term) || includesTag.includes(term)) {
        return true;
      }
    }
    for (const parentTerm of this.taxonomyData.parents || []) {
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

    for (const relatedTerm of this.taxonomyData.related || []) {
      const relatedTag = Tag.get(relatedTerm);
      if (relatedTag.is(term)) {
        return true;
      }
    }
    return false;
  }

  @Memoize()
  getImplicitTags(): Set<Tag> {
    const result = new Set<Tag>();
    result.add(this);
    for (const includesTerm of this.taxonomyData.includes || []) {
      const includesTag = Tag.get(includesTerm);
      const includesImplicitTags = includesTag.getImplicitTags();
      includesImplicitTags.forEach(tag => result.add(tag));
    }
    for (const parentTerm of this.taxonomyData.parents || []) {
      const parentTag = Tag.get(parentTerm);
      const parentImplicitTags = parentTag.getImplicitTags();
      parentImplicitTags.forEach(tag => result.add(tag));
    }
    return result;
  }

  public get canonical(): TagName {
    return this.taxonomyData.canonical;
  }

  public get categories(): Category[] {
    return this.taxonomyData.categories;
  }

  public get synonyms(): readonly (RegExp | string)[] | undefined {
    return this.taxonomyData.synonyms;
  }

  @Memoize()
  public get includedTags(): Tag[] | undefined {
    return this.taxonomyData.includes?.map(tagName => Tag.get(tagName));
  }

  @Memoize()
  public get related(): Tag[] | undefined {
    return this.taxonomyData.related?.map(tagName => Tag.get(tagName));
  }

  @Memoize()
  public get parents(): Tag[] | undefined {
    return this.taxonomyData.parents?.map(tagName => Tag.get(tagName));
  }

  @Memoize()
  public get children(): Tag[] | undefined {
    return this.taxonomyData.children?.map(tagName => Tag.get(tagName));
  }

  private static matches(term: string, taxonomyData: TaxonomyData): boolean {
    return (
      taxonomyData.canonical === term || Tag.synonymMatch(term, taxonomyData)
    );
  }

  private static synonymMatch(
    term: string,
    taxonomyData: TaxonomyData
  ): boolean {
    const synonyms = taxonomyData.synonyms;
    if (!synonyms) {
      return (
        term.toLowerCase().replace(/[^a-z0-9]/g, '') ===
        taxonomyData.canonical.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
    }

    return synonyms.some(
      synonym =>
        (synonym instanceof RegExp && synonym.test(term)) ||
        (typeof synonym === 'string' &&
          synonym.toLowerCase().trim() === term.toLowerCase().trim())
    );
  }
}
