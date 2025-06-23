import { inject, Injectable } from '@angular/core';

import { Project } from './project';
import { ALL_PROJECTS } from './projects.data';
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

  getAll(): Project[] {
    return ALL_PROJECTS;
  }

  getBy(filterConfig: ProjectFilterConfig): Project[] {
    const { isFullMatchFor, isPartialFor } = filterConfig;

    if (isFullMatchFor) {
      return ALL_PROJECTS.filter(
        project =>
          this.technologyMatchingService.getBestMatchType(
            isFullMatchFor,
            project.technologies
          ) === 'full'
      );
    } else if (isPartialFor) {
      return ALL_PROJECTS.filter(
        project =>
          this.technologyMatchingService.getBestMatchType(
            isPartialFor,
            project.technologies
          ) === 'indirect'
      );
    } else {
      throw new Error(
        'ProjectService.getBy invalid filterConfig: ' +
          JSON.stringify(filterConfig)
      );
    }
  }
}
