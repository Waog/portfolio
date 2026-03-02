import { inject, Injectable } from '@angular/core';
import { MemoizeAllArgs } from '@portfolio/memoize';
import { SearchTagService } from '@portfolio/search-tags';
import { Tag } from '@portfolio/taxonomy';

import { MatchType, TechnologyMatcher } from './technology-matcher';

@Injectable({
  providedIn: 'root',
})
export class TechnologyMatchingService {
  private searchTagService = inject(SearchTagService);
  private technologyMatcher = new TechnologyMatcher();

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
      if (
        this.technologyMatcher.getMatchType({ keywordTag, searchTag }) ===
        'full'
      ) {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const searchTag of searchTags) {
      if (
        this.technologyMatcher.getMatchType({ keywordTag, searchTag }) ===
        'indirect'
      ) {
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
      if (
        this.technologyMatcher.getMatchType({ keywordTag, searchTag }) ===
        'full'
      ) {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const keywordTag of keywordTags) {
      if (
        this.technologyMatcher.getMatchType({ keywordTag, searchTag }) ===
        'indirect'
      ) {
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
