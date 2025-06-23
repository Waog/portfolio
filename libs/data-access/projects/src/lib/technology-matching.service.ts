import { inject, Injectable } from '@angular/core';
import { SearchTagService } from '@portfolio/search-tags';

export type MatchType = 'full' | 'indirect' | 'none';

@Injectable({
  providedIn: 'root',
})
export class TechnologyMatchingService {
  private searchTagService = inject(SearchTagService);

  /**
   * Determines the match type between a technology name and a search tag
   */
  getMatchType(technologyName: string, searchTag: string): MatchType {
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
   * Finds the best match type for a technology against multiple search tags
   */
  getBestMatchType(technologyName: string, searchTags?: string[]): MatchType {
    if (!searchTags) {
      searchTags = this.searchTagService.currentTags;
    }

    // First check for any full matches
    for (const tag of searchTags) {
      if (this.getMatchType(technologyName, tag) === 'full') {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const tag of searchTags) {
      if (this.getMatchType(technologyName, tag) === 'indirect') {
        return 'indirect';
      }
    }

    return 'none';
  }
}
