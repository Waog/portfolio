import { Injectable } from '@angular/core';

import { Technology } from '../models/project';
import {
  MatchType,
  TechnologyMatchingCriteria,
  TechnologyWithMatch,
} from './technology-matching.types';

@Injectable({
  providedIn: 'root',
})
export class ProjectItemTechnologyMatchingService {
  // Hard-coded matching criteria for now - this could be made configurable later
  private readonly matchingCriteria: TechnologyMatchingCriteria = {
    fullMatches: ['Angular', 'TypeScript', 'SCSS'],
    indirectMatches: ['RxJS', 'Angular Material', 'Jest', 'Cypress'],
  };

  getMatchType(technologyName: string): MatchType {
    if (this.matchingCriteria.fullMatches.includes(technologyName)) {
      return 'full';
    }

    if (this.matchingCriteria.indirectMatches.includes(technologyName)) {
      return 'indirect';
    }

    return 'none';
  }

  addMatchType(technology: Technology): TechnologyWithMatch {
    return {
      ...technology,
      matchType: this.getMatchType(technology.name),
    };
  }

  addMatchTypes(technologies: Technology[]): TechnologyWithMatch[] {
    return technologies.map(tech => this.addMatchType(tech));
  }
}
