import {
  getProjectsFactory,
  MatchType,
  Project,
  TechnologyMatcher,
} from '@portfolio/projects';
import { Tag } from '@portfolio/taxonomy';

import { SearchEngineDomainResult } from './search-engine-domain.types';

// TODO web-worker: DRY: define reusable types/interfaces instead of defining them inline repeatedly

type ProjectItems = { [projectId: string]: ProjectItem };

type ProjectItem = {
  fullMatches: Tag[];
  partialMatches: Tag[];
  nonMatches: Tag[];
  rankingScore: number;
};

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

    const termTagMap: { [term: string]: Tag | null } =
      this.initTermTagMap(searchTerms);

    const matchesOverview: {
      [searchTerm: string]: SearchEngineDomainResult['matchesOverview'][1];
    } = this.initMatchesOverview(searchTerms);

    const projectItems: ProjectItems = {};

    for (const project of this.allProjects) {
      this.initializeProjectItem(projectItems, project);
      for (const searchTerm of searchTerms) {
        let bestMatchType: MatchType = 'none';

        for (const technology of project.technologies) {
          const matchType = this.technologyMatcher.getMatchType({
            keywordTag: technology,
            searchTag: searchTerm,
          });
          bestMatchType = this.getBetterMatchType(bestMatchType, matchType);
          this.updateProjectItem(
            projectItems[project.id],
            technology,
            matchType
          );
        }

        this.updateMatchesOverview(matchesOverview[searchTerm], bestMatchType);
      }
      this.finalizeProjectRankingScore(projectItems[project.id]);
    }

    const sortedProjects = this.toSortedProjects(projectItems);

    return {
      query: searchTerms,
      modifiedQuery: searchTerms?.map(word => `${word}-modified`),
      domainRandom: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      matchesOverview: searchTerms.map(word => matchesOverview[word]),
      projects: sortedProjects,
    };
  }

  private initTermTagMap(searchTerms: string[]): {
    [term: string]: Tag | null;
  } {
    const searchTermTagMap: { [term: string]: Tag | null } = {};
    for (const searchTerm of searchTerms) {
      searchTermTagMap[searchTerm] = Tag.find(searchTerm) ?? null;
    }
    return searchTermTagMap;
  }

  private initMatchesOverview(searchTerms: string[]): {
    [searchTerm: string]: SearchEngineDomainResult['matchesOverview'][1];
  } {
    const matchesOverview: {
      [searchTerm: string]: SearchEngineDomainResult['matchesOverview'][1];
    } = {};
    for (const searchTerm of searchTerms) {
      matchesOverview[searchTerm] = {
        keyword: searchTerm,
        fullMatchesCount: 0,
        partialMatchesCount: 0,
      };
    }
    return matchesOverview;
  }

  private initializeProjectItem(
    projectItems: ProjectItems,
    project: Project
  ): void {
    projectItems[project.id] = {
      fullMatches: [],
      partialMatches: [],
      nonMatches: project.technologies,
      rankingScore: 0,
    };
  }

  private getBetterMatchType(
    matchTypeA: MatchType,
    matchTypeB: MatchType
  ): MatchType {
    if (matchTypeA === 'full' || matchTypeB === 'full') {
      return 'full';
    } else if (matchTypeA === 'indirect' || matchTypeB === 'indirect') {
      return 'indirect';
    }
    return 'none';
  }

  private updateProjectItem(
    projectItem: ProjectItem,
    tag: Tag | null,
    matchType: MatchType
  ): void {
    if (!tag) {
      return;
    }
    if (matchType === 'full' && !projectItem.fullMatches.includes(tag)) {
      projectItem.fullMatches.push(tag);
      projectItem.partialMatches = projectItem.partialMatches.filter(
        t => t.canonical !== tag.canonical
      );
      projectItem.nonMatches = projectItem.nonMatches.filter(
        t => t.canonical !== tag.canonical
      );
    } else if (
      matchType === 'indirect' &&
      !projectItem.partialMatches.includes(tag) &&
      !projectItem.fullMatches.includes(tag)
    ) {
      projectItem.partialMatches.push(tag);
      projectItem.nonMatches = projectItem.nonMatches.filter(
        t => t.canonical !== tag.canonical
      );
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

  private finalizeProjectRankingScore(projectItem: ProjectItem): void {
    projectItem.rankingScore =
      projectItem.fullMatches.length * 1000 + projectItem.partialMatches.length;
  }

  private toSortedProjects(
    projectItems: ProjectItems
  ): SearchEngineDomainResult['projects'] {
    return Object.entries(projectItems)
      .sort(([, itemA], [, itemB]) => itemB.rankingScore - itemA.rankingScore)
      .map(([projectId, item]) => ({
        id: projectId,
        totalScore: item.rankingScore,
        technologies: {
          fullMatches: item.fullMatches.map(tag => tag.canonical),
          partialMatches: item.partialMatches.map(tag => tag.canonical),
          nonMatches: item.nonMatches.map(tag => tag.canonical),
        },
      }));
  }
}
