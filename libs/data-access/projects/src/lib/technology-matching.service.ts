import { inject, Injectable } from '@angular/core';
import { SearchTagService } from '@portfolio/search-tags';
import { Tag } from '@portfolio/taxonomy';

export type MatchType = 'full' | 'indirect' | 'none';

@Injectable({
  providedIn: 'root',
})
export class TechnologyMatchingService {
  private searchTagService = inject(SearchTagService);
  private readonly CACHE_MAX_SIZE = 5000;
  private matchTypeCache = new Map<string, MatchType>();

  /**
   * Determines the match type between a technology name and a search tag
   */
  getMatchType({
    technologyName,
    searchTag,
  }: {
    technologyName: string;
    searchTag: string;
  }): MatchType {
    const cacheKey = `${technologyName}::${searchTag}`;
    const cached = this.getCache(cacheKey);
    if (cached !== undefined) {
      return cached;
    }

    let result: MatchType;
    try {
      result = this.getMatchTypeWithTaxonomy(technologyName, searchTag);
      if (result === 'none') {
        result = this.getMatchTypeFallback(technologyName, searchTag);
      }
    } catch (error) {
      console.warn(
        `Failed to do taxonomy matching. Falling back to basic string matching.`,
        { technologyName, searchTag },
        error
      );
      result = this.getMatchTypeFallback(technologyName, searchTag);
    }

    this.setCache(cacheKey, result);
    return result;
  }

  /**
   * Finds the best match type for a technology against multiple search tags
   */
  getBestMatchTypeForTechnology({
    technologyName,
    searchTags,
  }: {
    technologyName: string;
    searchTags?: string[];
  }): MatchType {
    if (!searchTags) {
      searchTags = this.searchTagService.currentTags;
    }

    // First check for any full matches
    for (const searchTag of searchTags) {
      if (this.getMatchType({ technologyName, searchTag }) === 'full') {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const searchTag of searchTags) {
      if (this.getMatchType({ technologyName, searchTag }) === 'indirect') {
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
    technologyNames,
  }: {
    searchTag: string;
    technologyNames: string[];
  }): MatchType {
    // First check for any full matches
    for (const technologyName of technologyNames) {
      if (this.getMatchType({ technologyName, searchTag }) === 'full') {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const technologyName of technologyNames) {
      if (this.getMatchType({ technologyName, searchTag }) === 'indirect') {
        return 'indirect';
      }
    }

    return 'none';
  }

  /**
   * Rely on taxonomy Tag class for keyword matching.
   */
  private getMatchTypeWithTaxonomy(
    technologyName: string,
    searchTag: string
  ): MatchType {
    const techTag = new Tag(technologyName);

    if (techTag.is(searchTag) || techTag.isA(searchTag)) {
      return 'full';
    }

    const minDistanceToAncestor =
      techTag.getMinDistanceToLowestCommonAncestor(searchTag) ?? Infinity;
    if (minDistanceToAncestor <= 1) {
      return 'indirect';
    }

    return 'none';
  }

  /**
   * Basic String matching, without taxonomy and Tag class.
   */
  private getMatchTypeFallback(
    technologyName: string,
    searchTag: string
  ): MatchType {
    const techLower = technologyName.toLowerCase();
    const tagLower = searchTag.toLowerCase();

    // Check for full match (exact string match, case insensitive)
    if (techLower === tagLower) {
      return 'full';
    }

    // Check for indirect matches (substring match in either direction)
    if (techLower.includes(tagLower) || tagLower.includes(techLower)) {
      return 'indirect';
    }

    return 'none';
  }

  /**
   * Sets a value in the cache and evicts the least recently used item if over the size limit.
   */
  private setCache(key: string, value: MatchType): void {
    if (this.matchTypeCache.has(key)) {
      this.matchTypeCache.delete(key);
    }
    this.matchTypeCache.set(key, value);
    if (this.matchTypeCache.size > this.CACHE_MAX_SIZE) {
      const oldestKey = this.matchTypeCache.keys().next().value;
      if (oldestKey !== undefined) {
        this.matchTypeCache.delete(oldestKey);
      }
    }
  }

  /**
   * Gets a value from the cache and updates its usage order.
   */
  private getCache(key: string): MatchType | undefined {
    if (!this.matchTypeCache.has(key)) {
      return undefined;
    }
    const value = this.matchTypeCache.get(key);
    if (value === undefined) {
      return undefined;
    }
    // Move accessed key to the end to mark as recently used
    this.matchTypeCache.delete(key);
    this.matchTypeCache.set(key, value);
    return value;
  }
}
