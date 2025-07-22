import { inject, Injectable } from '@angular/core';
import { Memoize } from 'typescript-memoize';

import { Project } from './project';
import { ALL_PROJECT_DATA } from './project.data';
import { TechnologyMatchingService } from './technology-matching.service';

export interface ProjectFilterConfig {
  isFullMatchFor?: string;
  isPartialFor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private technologyMatchingService = inject(TechnologyMatchingService);

  @Memoize()
  getAll(): Project[] {
    return ALL_PROJECT_DATA.map(data => new Project(data));
  }

  getBy(filterConfig: ProjectFilterConfig): Project[] {
    const {
      isFullMatchFor: fullMatchSearchTag,
      isPartialFor: partialMatchSearchTag,
    } = filterConfig;

    if (fullMatchSearchTag) {
      return this.getAll().filter(
        project =>
          this.technologyMatchingService.getBestMatchTypeForSearchTag({
            searchTag: fullMatchSearchTag,
            technologyNames: project.technologies,
          }) === 'full'
      );
    } else if (partialMatchSearchTag) {
      return this.getAll().filter(
        project =>
          this.technologyMatchingService.getBestMatchTypeForSearchTag({
            searchTag: partialMatchSearchTag,
            technologyNames: project.technologies,
          }) === 'indirect'
      );
    } else {
      throw new Error(
        'ProjectService.getBy invalid filterConfig: ' +
          JSON.stringify(filterConfig)
      );
    }
  }
}
