import { inject, Injectable } from '@angular/core';
import { MemoizeAllArgs } from '@portfolio/memoize';

import { Project } from './project';
import { getProjectsFactory } from './projects-factory';
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
  private allProjectsFactory = getProjectsFactory();

  @MemoizeAllArgs
  getAll(): Project[] {
    return this.allProjectsFactory.getAll();
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
            keywordTags: project.technologies,
          }) === 'full'
      );
    } else if (partialMatchSearchTag) {
      return this.getAll().filter(
        project =>
          this.technologyMatchingService.getBestMatchTypeForSearchTag({
            searchTag: partialMatchSearchTag,
            keywordTags: project.technologies,
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
