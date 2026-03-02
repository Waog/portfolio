import {
  getProjectsFactory,
  MatchType,
  Project,
  TechnologyMatcher,
} from '@portfolio/projects';

import { SearchEngineDomainResult } from './search-engine-domain.types';

// TODO web-worker: DRY: define reusable types/interfaces instead of defining them inline repeatedly

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

    // TODO web-worker: extract to method
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

    const rankingScores: {
      [projectId: string]: {
        fullMatchesCount: number;
        partialMatchesCount: number;
        totalScore: number;
      };
    } = {};

    for (const project of this.allProjects) {
      this.initializeProjectRankingScoreFor(rankingScores, project);
      for (const searchTerm of searchTerms) {
        let bestMatchType: MatchType = 'none';

        for (const technology of project.technologies) {
          const matchType = this.technologyMatcher.getMatchType({
            keywordTag: technology,
            searchTag: searchTerm,
          });
          bestMatchType = this.getBetterMatchType(bestMatchType, matchType);
          this.updateRankingScore(rankingScores[project.id], matchType);
        }

        this.updateMatchesOverview(matchesOverview[searchTerm], bestMatchType);
      }
      this.finalizeProjectRankingScore(rankingScores[project.id]);
    }

    const sortedProjects = this.toSortedProjects(rankingScores);

    return {
      query: searchTerms,
      modifiedQuery: searchTerms?.map(word => `${word}-modified`),
      domainRandom: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      matchesOverview: searchTerms.map(word => matchesOverview[word]),
      projects: sortedProjects,
    };
  }

  private initializeProjectRankingScoreFor(
    rankingScores: {
      [projectId: string]: {
        fullMatchesCount: number;
        partialMatchesCount: number;
        totalScore: number;
      };
    },
    project: Project
  ) {
    rankingScores[project.id] = {
      fullMatchesCount: 0,
      partialMatchesCount: 0,
      totalScore: 0,
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

  private updateRankingScore(
    currentRankingScores: {
      fullMatchesCount: number;
      partialMatchesCount: number;
    },
    matchType: MatchType
  ) {
    if (matchType === 'full') {
      currentRankingScores.fullMatchesCount++;
    } else if (matchType === 'indirect') {
      currentRankingScores.partialMatchesCount++;
    }
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

  private finalizeProjectRankingScore(currentRankingScores: {
    fullMatchesCount: number;
    partialMatchesCount: number;
    totalScore: number;
  }) {
    currentRankingScores.totalScore =
      currentRankingScores.fullMatchesCount * 1000 +
      currentRankingScores.partialMatchesCount;
  }

  private toSortedProjects(rankingScores: {
    [projectId: string]: {
      fullMatchesCount: number;
      partialMatchesCount: number;
      totalScore: number;
    };
  }) {
    return Object.entries(rankingScores)
      .sort(([, scoreA], [, scoreB]) => scoreB.totalScore - scoreA.totalScore)
      .map(([projectId, scores]) => ({
        id: projectId,
        totalScore: scores.totalScore,
      }));
  }
}
