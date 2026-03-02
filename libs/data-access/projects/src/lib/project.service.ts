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
}
