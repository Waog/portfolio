import { MemoizeAllArgs } from './memoize-all-args';
import { Category, TagName, TAXONOMY, TaxonomyData } from './taxonomy.data';

export { Category, TagName } from './taxonomy.data';

export class Tag {
  private readonly taxonomyData: TaxonomyData;

  @MemoizeAllArgs
  public static get(tagName: TagName): Tag {
    return new Tag(tagName);
  }

  @MemoizeAllArgs
  private static find(searchTerm: string): Tag | undefined {
    const matchByCanonical = TAXONOMY.find(
      data => searchTerm === data.canonical
    );
    if (matchByCanonical) {
      return Tag.get(matchByCanonical.canonical);
    }

    const matchingData = TAXONOMY.find(data => Tag.matches(searchTerm, data));
    return matchingData ? Tag.get(matchingData.canonical) : undefined;
  }

  private constructor(public tagName: TagName) {
    // NOTE: since we match against a TagName and TagName is derived from TAXONOMY,
    // we can safely assume that the tagName exists in TAXONOMY.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.taxonomyData = TAXONOMY.find(data => tagName === data.canonical)!;
  }

  @MemoizeAllArgs
  is(term: string): boolean {
    return Tag.matches(term, this.taxonomyData);
  }

  @MemoizeAllArgs
  isA(term: string): boolean {
    for (const parentTerm of this.taxonomyData.parents || []) {
      const parentTag = Tag.get(parentTerm);
      if (parentTag.is(term) || parentTag.isA(term)) {
        return true;
      }
    }
    return false;
  }

  @MemoizeAllArgs
  hasChild(term: string): boolean {
    for (const childTerm of this.taxonomyData.children || []) {
      const childTag = Tag.get(childTerm);
      if (childTag.is(term)) {
        return true;
      }
    }
    return false;
  }

  @MemoizeAllArgs
  isSibling(term: string): boolean {
    for (const parentTerm of this.taxonomyData.parents || []) {
      const parentTag = Tag.get(parentTerm);
      if (parentTag.hasChild(term)) {
        return true;
      }
    }
    return false;
  }

  @MemoizeAllArgs
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

  @MemoizeAllArgs
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

  @MemoizeAllArgs
  getAllCommonAncestors(term: string): Set<Tag> {
    const thisAncestorTags = this.getAllAncestors();
    const otherAncestorTags =
      Tag.find(term)?.getAllAncestors() || new Set<Tag>();
    const result = new Set<Tag>();
    // NOTE: not using Set.intersection() as it is too new (ES2024)
    thisAncestorTags.forEach(thisAncestorTag => {
      if (otherAncestorTags.has(thisAncestorTag)) {
        result.add(thisAncestorTag);
      }
    });
    return result;
  }

  @MemoizeAllArgs
  getLowestCommonAncestor(term: string): Tag | null {
    if (this.is(term)) {
      return this;
    }

    const otherTag = Tag.find(term);

    if (!otherTag) {
      return null;
    }

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

  @MemoizeAllArgs
  getMinDistanceToLowestCommonAncestor(term: string): number | null {
    const otherTag = Tag.find(term);
    if (!otherTag) {
      return null;
    }
    const lowestCommonAncestorTag = this.getLowestCommonAncestor(term);
    if (lowestCommonAncestorTag === null) {
      return null;
    }
    return Math.min(
      this.getDistanceToAncestor(
        lowestCommonAncestorTag.taxonomyData.canonical
      ) as number,
      otherTag.getDistanceToAncestor(
        lowestCommonAncestorTag.taxonomyData.canonical
      ) as number
    );
  }

  @MemoizeAllArgs
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

  @MemoizeAllArgs
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

  @MemoizeAllArgs
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

  @MemoizeAllArgs
  public get includedTags(): Tag[] | undefined {
    return this.taxonomyData.includes?.map(tagName => Tag.get(tagName));
  }

  @MemoizeAllArgs
  public get related(): Tag[] | undefined {
    return this.taxonomyData.related?.map(tagName => Tag.get(tagName));
  }

  @MemoizeAllArgs
  public get parents(): Tag[] | undefined {
    return this.taxonomyData.parents?.map(tagName => Tag.get(tagName));
  }

  @MemoizeAllArgs
  public get children(): Tag[] | undefined {
    return this.taxonomyData.children?.map(tagName => Tag.get(tagName));
  }

  @MemoizeAllArgs
  private static matches(term: string, taxonomyData: TaxonomyData): boolean {
    return (
      taxonomyData.canonical === term || Tag.synonymMatch(term, taxonomyData)
    );
  }

  @MemoizeAllArgs
  private static synonymMatch(
    term: string,
    taxonomyData: TaxonomyData
  ): boolean {
    const synonyms = taxonomyData.synonyms;
    if (!synonyms) {
      return Tag.normalize(term).includes(
        Tag.normalize(taxonomyData.canonical)
      );
    }

    return synonyms.some(
      synonym =>
        (synonym instanceof RegExp && synonym.test(term)) ||
        (typeof synonym === 'string' &&
          synonym.toLowerCase().trim() === term.toLowerCase().trim())
    );
  }

  private static normalize(term: string): string {
    return term.toLowerCase().replace(/[^a-z0-9]/g, '');
  }
}
