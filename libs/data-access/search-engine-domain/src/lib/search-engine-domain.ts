import {
  getProjectsFactory,
  MatchType,
  Project,
  TechnologyMatcher,
} from '@portfolio/projects';

import { SearchEngineDomainResult } from './search-engine-domain.types';

export class SearchEngineDomain {
  private initialized = false;
  private allProjects: Project[] = [];
  private technologyMatcher = new TechnologyMatcher();

  init(): void {
    if (!this.initialized) {
      this.allProjects = getProjectsFactory().getAll();
      this.initialized = true;
    }
  }

  get(searchTerms: string[]): SearchEngineDomainResult {
    this.init();

    const matchesOverview: {
      [searchTerm: string]: SearchEngineDomainResult['matchesOverview'][1];
    } = searchTerms.reduce<{
      [searchTerm: string]: SearchEngineDomainResult['matchesOverview'][1];
    }>((result, word) => {
      result[word] = {
        keyword: word,
        fullMatchesCount: 0,
        partialMatchesCount: 0,
      };
      return result;
    }, {});

    for (const project of this.allProjects) {
      for (const searchTerm of searchTerms) {
        let bestMatchType: MatchType = 'none';

        for (const technology of project.technologies) {
          const matchType = this.technologyMatcher.getMatchType({
            keywordTag: technology,
            searchTag: searchTerm,
          });
          bestMatchType = this.getBetterMatchType(bestMatchType, matchType);
        }

        this.updateMatchesOverview(matchesOverview[searchTerm], bestMatchType);
      }
    }

    return {
      query: searchTerms,
      modifiedQuery: searchTerms?.map(word => `${word}-modified`),
      domainRandom: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      matchesOverview: searchTerms.map(word => matchesOverview[word]),
    };
  }

  private getBetterMatchType(matchTypeA: MatchType, matchTypeB: MatchType) {
    if (matchTypeA === 'full' || matchTypeB === 'full') {
      return 'full';
    } else if (matchTypeA === 'indirect' || matchTypeB === 'indirect') {
      return 'indirect';
    }
    return 'none';
  }

  private updateMatchesOverview(
    matchesOverviewEntry: SearchEngineDomainResult['matchesOverview'][1],
    bestMatchType: MatchType
  ) {
    if (bestMatchType === 'full') {
      matchesOverviewEntry.fullMatchesCount++;
    } else if (bestMatchType === 'indirect') {
      matchesOverviewEntry.partialMatchesCount++;
    }
  }
}
