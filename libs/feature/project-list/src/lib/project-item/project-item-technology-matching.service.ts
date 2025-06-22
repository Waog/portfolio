import { inject, Injectable } from '@angular/core';
import {
  MatchType,
  TechnologyMatchingService,
  TechnologyWithMatch,
} from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';

@Injectable({
  providedIn: 'root',
})
export class ProjectItemTechnologyMatchingService {
  private searchTagService = inject(SearchTagService);
  private technologyMatchingService = inject(TechnologyMatchingService);

  getMatchType(technologyName: string): MatchType {
    const searchTags = this.searchTagService.currentTags;
    return this.technologyMatchingService.getBestMatchType(
      technologyName,
      searchTags
    );
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
