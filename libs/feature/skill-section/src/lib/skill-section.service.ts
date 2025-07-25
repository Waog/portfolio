import { inject, Injectable } from '@angular/core';
import { MemoizeAllArgs } from '@portfolio/memoize';
import { ProjectService, TechnologyMatchingService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { Category, Tag, TagName } from '@portfolio/taxonomy';

@Injectable({
  providedIn: 'root',
})
export class SkillSectionService {
  private projectService = inject(ProjectService);
  private searchTagService = inject(SearchTagService);
  private technologyMatchingService = inject(TechnologyMatchingService);

  private static readonly SKILLS_WITHOUT_PROJECT: TagName[] = [
    'REST',
    'SCRUM',
    'Agile',
  ];

  getSkillCategories(): Map<Category, Tag[]> {
    const unsortedCategories = this.getUnsortedSkillCategories();
    const searchTags = this.searchTagService.currentTags;
    return this.sortCategoriesByMatchCount({ unsortedCategories, searchTags });
  }

  @MemoizeAllArgs
  private getUnsortedSkillCategories(): Map<Category, Tag[]> {
    const result: Map<Category, Tag[]> = new Map();

    for (const project of this.projectService.getAll()) {
      for (const tag of project.technologies) {
        for (const category of tag.categories) {
          if (!result.has(category)) {
            result.set(category, []);
          }
          if (!result.get(category)?.includes(tag)) {
            result.get(category)?.push(tag);
          }
        }
      }
    }

    for (const tagName of SkillSectionService.SKILLS_WITHOUT_PROJECT) {
      const tag = Tag.get(tagName);
      for (const category of tag.categories) {
        if (!result.has(category)) {
          result.set(category, []);
        }
        if (!result.get(category)?.includes(tag)) {
          result.get(category)?.push(tag);
        } else {
          console.warn(
            'SkillSectionService.SKILLS_WITHOUT_PROJECT contains a tag which is already present in the project tags:',
            tagName
          );
        }
      }
    }

    return result;
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
