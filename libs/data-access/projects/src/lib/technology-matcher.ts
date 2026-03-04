import { MemoizeAllArgs } from '@portfolio/memoize';
import { Tag } from '@portfolio/taxonomy';

export type MatchType = 'full' | 'indirect' | 'none';

export class TechnologyMatcher {
  /**
   * Determines the match type between a technology name and a search tag
   */
  @MemoizeAllArgs
  getMatchType({
    keywordTag,
    searchTag,
  }: {
    keywordTag: Tag;
    searchTag: string;
  }): MatchType {
    if (keywordTag.is(searchTag)) {
      return 'full';
    }

    const minDistanceToAncestor =
      keywordTag.getMinDistanceToLowestCommonAncestor(searchTag) ?? Infinity;
    if (minDistanceToAncestor === 0 || keywordTag.isRelated(searchTag)) {
      return 'indirect';
    }

    return 'none';
  }
}
