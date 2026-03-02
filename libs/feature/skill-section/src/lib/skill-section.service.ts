import { inject, Injectable } from '@angular/core';
import { MemoizeAllArgs } from '@portfolio/memoize';
import {
  getSkillCategoriesFactory,
  TechnologyMatchingService,
} from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { Category, Tag } from '@portfolio/taxonomy';

@Injectable({
  providedIn: 'root',
})
export class SkillSectionService {
  private searchTagService = inject(SearchTagService);
  private technologyMatchingService = inject(TechnologyMatchingService);

  getSkillCategories(): Map<Category, Tag[]> {
    const unsortedCategories = getSkillCategoriesFactory().getAll();
    const searchTags = this.searchTagService.currentTags;
    return this.sortCategoriesByMatchCount({ unsortedCategories, searchTags });
  }

  /**
   * NOTE: only public for unit tests, don't call it directly
   */
  @MemoizeAllArgs
  public sortCategoriesByMatchCount({
    unsortedCategories,
    searchTags,
  }: {
    unsortedCategories: Map<Category, Tag[]>;
    searchTags: string[];
  }): Map<Category, Tag[]> {
    // Convert Map to array of entries for sorting
    const categoryEntries = Array.from(unsortedCategories.entries());

    // Sort by match count (most full matches first, then most indirect matches)
    categoryEntries.sort(([, tagsA], [, tagsB]) => {
      const matchCountA = this.technologyMatchingService.getMatchCount({
        keywordTags: tagsA,
        searchTags,
      });
      const matchCountB = this.technologyMatchingService.getMatchCount({
        keywordTags: tagsB,
        searchTags,
      });

      // Primary sort: by full matches (descending)
      if (matchCountA.full !== matchCountB.full) {
        return matchCountB.full - matchCountA.full;
      }

      // Secondary sort: by indirect matches (descending) - tiebreaker
      return matchCountB.indirect - matchCountA.indirect;
    });

    // Convert back to Map
    return new Map(categoryEntries);
  }
}
