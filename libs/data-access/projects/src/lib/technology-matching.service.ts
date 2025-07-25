import { inject, Injectable } from '@angular/core';
import { MemoizeAllArgs } from '@portfolio/memoize';
import { SearchTagService } from '@portfolio/search-tags';
import { Tag } from '@portfolio/taxonomy';

export type MatchType = 'full' | 'indirect' | 'none';

@Injectable({
  providedIn: 'root',
})
export class TechnologyMatchingService {
  private searchTagService = inject(SearchTagService);

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
    if (minDistanceToAncestor == 0 || keywordTag.isRelated(searchTag)) {
      return 'indirect';
    }

    return 'none';
  }

  /**
   * Finds the best match type for a technology against multiple search tags
   */
  @MemoizeAllArgs
  getBestMatchTypeForKeywordTag({
    keywordTag,
    searchTags,
  }: {
    keywordTag: Tag;
    searchTags: string[];
  }): MatchType {
    // First check for any full matches
    for (const searchTag of searchTags) {
      if (this.getMatchType({ keywordTag, searchTag }) === 'full') {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const searchTag of searchTags) {
      if (this.getMatchType({ keywordTag, searchTag }) === 'indirect') {
        return 'indirect';
      }
    }

    return 'none';
  }

  /**
   * Finds the best match type for a technology against multiple search tags
   */
  getBestMatchTypeForSearchTag({
    searchTag,
    keywordTags,
  }: {
    searchTag: string;
    keywordTags: Tag[];
  }): MatchType {
    // First check for any full matches
    for (const keywordTag of keywordTags) {
      if (this.getMatchType({ keywordTag, searchTag }) === 'full') {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const keywordTag of keywordTags) {
      if (this.getMatchType({ keywordTag, searchTag }) === 'indirect') {
        return 'indirect';
      }
    }

    return 'none';
  }

  getMatchCountForCurrentSearchTags({
    keywordTags,
  }: {
    keywordTags: Tag[];
  }): Record<MatchType, number> {
    const searchTags = this.searchTagService.currentTags;
    return this.getMatchCount({
      keywordTags,
      searchTags,
    });
  }

  @MemoizeAllArgs
  getMatchCount({
    keywordTags,
    searchTags,
  }: {
    keywordTags: Tag[];
    searchTags: string[];
  }): Record<MatchType, number> {
    const result: Record<MatchType, number> = { full: 0, indirect: 0, none: 0 };

    for (const keywordTag of keywordTags) {
      const matchType = this.getBestMatchTypeForKeywordTag({
        keywordTag,
        searchTags,
      });
      result[matchType]++;
    }

    return result;
  }
}
