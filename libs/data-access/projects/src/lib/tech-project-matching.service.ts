import { inject, Injectable } from '@angular/core';
import { SearchTagService } from '@portfolio/search-tags';

import { Project } from './project';
import { ALL_PROJECTS } from './projects.data';
import { TechnologyMatchingService } from './technology-matching.service';

export interface ProjectMatches {
  fullMatches: number;
  partialMatches: number;
  totalProjects: number;
}

@Injectable({
  providedIn: 'root',
})
export class TechProjectMatchingService {
  private searchTagService = inject(SearchTagService);
  private technologyMatchingService = inject(TechnologyMatchingService);

  getProjectMatchesForTag(searchTag: string): ProjectMatches {
    let fullMatches = 0;
    let partialMatches = 0;

    for (const project of ALL_PROJECTS) {
      const matchType = this.getMatchTypeForProject(searchTag, project);

      if (matchType === 'full') {
        fullMatches++;
      } else if (matchType === 'indirect') {
        partialMatches++;
      }
    }

    return {
      fullMatches,
      partialMatches,
      totalProjects: ALL_PROJECTS.length,
    };
  }
  private getMatchTypeForProject(
    searchTag: string,
    project: Project
  ): 'full' | 'indirect' | 'none' {
    // Check each technology in the project against the search tag
    for (const technology of project.technologies) {
      const matchType = this.technologyMatchingService.getMatchType(
        technology,
        searchTag
      );

      // Return the first full match found
      if (matchType === 'full') {
        return 'full';
      }
    }

    // If no full matches, check for indirect matches
    for (const technology of project.technologies) {
      const matchType = this.technologyMatchingService.getMatchType(
        technology,
        searchTag
      );

      if (matchType === 'indirect') {
        return 'indirect';
      }
    }

    return 'none';
  }
}
