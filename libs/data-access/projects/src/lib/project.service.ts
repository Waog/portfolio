import { inject, Injectable } from '@angular/core';

import { Project } from './project';
import { ALL_PROJECTS } from './projects.data';
import { TechnologyMatchingService } from './technology-matching.service';
import { TopProjectsService } from './top-projects.service';

export interface ProjectFilterConfig {
  isFullMatchFor?: string;
  isPartialFor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private technologyMatchingService = inject(TechnologyMatchingService);
  private topProjectsService = inject(TopProjectsService);

  getAll(): Project[] {
    return ALL_PROJECTS;
  }

  getBy(filterConfig: ProjectFilterConfig): Project[] {
    const {
      isFullMatchFor: fullMatchSearchTag,
      isPartialFor: partialMatchSearchTag,
    } = filterConfig;

    if (fullMatchSearchTag) {
      return ALL_PROJECTS.filter(
        project =>
          this.technologyMatchingService.getBestMatchTypeForSearchTag({
            searchTag: fullMatchSearchTag,
            technologyNames: project.technologies,
          }) === 'full'
      );
    } else if (partialMatchSearchTag) {
      return ALL_PROJECTS.filter(
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

  getTopProjects(): Project[] {
    return this.topProjectsService.getTopProjects();
  }

  getNonTopProjects(): Project[] {
    return this.getAll().filter(
      project => !this.topProjectsService.getTopProjects().includes(project)
    );
  }
}
