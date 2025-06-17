import { inject, Injectable } from '@angular/core';
import { SearchTagService } from '@portfolio/tag-input';

import { MatchType, TechnologyWithMatch } from './technology-matching.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectItemTechnologyMatchingService {
  private searchTagService = inject(SearchTagService);

  getMatchType(technologyName: string): MatchType {
    const searchTags = this.searchTagService.currentTags;
    const techLower = technologyName.toLowerCase();

    // Check for full matches (exact string match, case insensitive)
    for (const tag of searchTags) {
      const tagLower = tag.toLowerCase();

      if (techLower === tagLower) {
        return 'full';
      }
    }

    // Check for indirect matches (substring match in either direction)
    for (const tag of searchTags) {
      const tagLower = tag.toLowerCase();

      // Check if search term is contained in tech name OR tech name is contained in search term
      if (techLower.includes(tagLower) || tagLower.includes(techLower)) {
        return 'indirect';
      }
    }

    return 'none';
  }

  addMatchType(technologyName: string): TechnologyWithMatch {
    return {
      name: technologyName,
      matchType: this.getMatchType(technologyName),
    };
  }

  addMatchTypes(technologies: string[]): TechnologyWithMatch[] {
    return technologies.map(tech => this.addMatchType(tech));
  }
}
