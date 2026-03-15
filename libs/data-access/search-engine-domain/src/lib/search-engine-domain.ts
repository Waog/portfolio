import {
  AnalyzableProject,
  getProjectsFactory,
  getSkillsWithoutProjectsFactory,
  MatchType,
  TechnologyMatcher,
} from '@portfolio/projects';
import { Tag } from '@portfolio/taxonomy';
import { Duration } from 'date-fns';

import {
  SearchEngineDomainChunkResult,
  SearchEngineDomainResult,
} from './search-engine-domain.types';
import {
  commercialContextWeights,
  durationWeights,
  engagementTypeWeights,
  maturityWeights,
  projectSpecificWeights,
  teamSizeWeights,
  usageScopeWeights,
} from './search-engine-order-weights';

type ProjectItems = { [projectId: string]: ProjectItem };

type ProjectItem = {
  fullMatches: Tag[];
  partialMatches: Tag[];
  nonMatches: Tag[];
  rankingScore: number;
  project: AnalyzableProject;
};

type SkillCategoryItems = {
  [category: string]: SkillCategoryItem;
};

type SkillCategoryItem = {
  fullMatches: Tag[];
  partialMatches: Tag[];
  nonMatches: Tag[];
  rankingScore: number;
};

type MatchesOverviewMap = {
  [searchTerm: string]: MatchesOverviewItem;
};

type MatchesOverviewItem = SearchEngineDomainResult['matchesOverview'][1];

export class SearchEngineDomain {
  private allProjects: AnalyzableProject[] = getProjectsFactory().getAll();
  private technologyMatcher = new TechnologyMatcher();

  private activeSearchTerms: string[] = [];
  private activeMatchesOverview: MatchesOverviewMap = {};
  private activeProjectItems: ProjectItems = {};
  private activeSkillCategoryItems: SkillCategoryItems = {};
  private activeProjectIndex = 0;
  private activeProcessInitialized = false;

  get(searchTerms: string[]): SearchEngineDomainResult {
    this.initialize(searchTerms);

    while (!this.processChunk().done) {
      // synchronous convenience API keeps previous behavior
    }

    return this.finalize();
  }

  initialize(searchTerms: string[]): void {
    this.activeSearchTerms = [...searchTerms];
    this.activeMatchesOverview = this.initMatchesOverview(searchTerms);
    this.activeProjectItems = {};
    this.activeSkillCategoryItems = {};
    this.activeProjectIndex = 0;
    this.activeProcessInitialized = true;
  }

  processChunk(): SearchEngineDomainChunkResult {
    this.ensureChunkInitialized();

    if (this.isAllChunksProcessed()) {
      return {
        done: true,
        progressPercent: 100,
      };
    }

    const project = this.allProjects[this.activeProjectIndex];
    this.processProject(
      this.activeProjectItems,
      this.activeSkillCategoryItems,
      this.activeMatchesOverview,
      project,
      this.activeSearchTerms
    );

    this.activeProjectIndex++;

    return {
      done: this.isAllChunksProcessed(),
      progressPercent: this.toProgressPercent(
        this.activeProjectIndex,
        this.allProjects.length
      ),
    };
  }

  finalize(): SearchEngineDomainResult {
    this.ensureChunkInitialized();
    this.ensureAllChunksProcessed();

    this.finalizeAddSkillsWithoutProjects(this.activeSkillCategoryItems);
    this.finalizeSkillCategoriesRankingScore(this.activeSkillCategoryItems);

    return {
      query: this.activeSearchTerms,
      matchesOverview: this.activeSearchTerms.map(
        word => this.activeMatchesOverview[word]
      ),
      projects: this.toSortedProjects(this.activeProjectItems),
      skills: this.toSortedSkills(this.activeSkillCategoryItems),
    };
  }

  private ensureChunkInitialized(): void {
    if (!this.activeProcessInitialized) {
      throw new Error(
        'SearchEngineDomain was not initialized. Call initialize(searchTerms) before processChunk()/finalize().'
      );
    }
  }

  private ensureAllChunksProcessed(): void {
    if (!this.isAllChunksProcessed()) {
      throw new Error(
        'Not all chunks have been processed. Call processChunk() until it returns done=true before finalize().'
      );
    }
  }

  private isAllChunksProcessed(): boolean {
    return this.activeProjectIndex >= this.allProjects.length;
  }

  private toProgressPercent(
    processedProjects: number,
    totalProjects: number
  ): number {
    if (totalProjects === 0) {
      return 100;
    }

    return Math.round((processedProjects / totalProjects) * 100);
  }

  private processProject(
    projectItems: ProjectItems,
    skillCategoryItems: SkillCategoryItems,
    matchesOverview: MatchesOverviewMap,
    project: AnalyzableProject,
    searchTerms: string[]
  ): void {
    this.initializeProjectItem(projectItems, project);
    for (const searchTerm of searchTerms) {
      let bestMatchType: MatchType = 'none';

      for (const technology of project.technologies) {
        const matchType = this.technologyMatcher.getMatchType({
          keywordTag: technology,
          searchTag: searchTerm,
        });
        bestMatchType = this.getBetterMatchType(bestMatchType, matchType);
        this.updateProjectItem(projectItems[project.id], technology, matchType);
        this.updateSkillCategoryItems(
          skillCategoryItems,
          technology,
          matchType
        );
      }

      this.updateMatchesOverview(matchesOverview[searchTerm], bestMatchType);
    }

    if (searchTerms.length === 0) {
      for (const technology of project.technologies) {
        this.updateSkillCategoryItems(skillCategoryItems, technology, 'none');
      }
    }

    this.finalizeProjectRankingScore(projectItems[project.id]);
  }

  private initMatchesOverview(searchTerms: string[]): MatchesOverviewMap {
    const matchesOverview: MatchesOverviewMap = {};
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
    project: AnalyzableProject
  ): void {
    projectItems[project.id] = {
      fullMatches: [],
      partialMatches: [],
      nonMatches: project.technologies,
      rankingScore: 0,
      project,
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
    matchesOverviewEntry: MatchesOverviewItem,
    bestMatchType: MatchType
  ) {
    if (bestMatchType === 'full') {
      matchesOverviewEntry.fullMatchesCount++;
    } else if (bestMatchType === 'indirect') {
      matchesOverviewEntry.partialMatchesCount++;
    }
  }

  private updateSkillCategoryItems(
    skillCategoryItems: SkillCategoryItems,
    technology: Tag,
    matchType: MatchType
  ): void {
    for (const category of technology.categories) {
      if (!skillCategoryItems[category]) {
        skillCategoryItems[category] = {
          fullMatches: [],
          partialMatches: [],
          nonMatches: [],
          rankingScore: 0,
        };
      }
      const categoryItem = skillCategoryItems[category];
      if (
        matchType === 'full' &&
        !categoryItem.fullMatches.includes(technology)
      ) {
        categoryItem.fullMatches.push(technology);
        categoryItem.partialMatches = categoryItem.partialMatches.filter(
          tag => tag !== technology
        );
        categoryItem.nonMatches = categoryItem.nonMatches.filter(
          tag => tag !== technology
        );
      } else if (
        matchType === 'indirect' &&
        !categoryItem.partialMatches.includes(technology) &&
        !categoryItem.fullMatches.includes(technology)
      ) {
        categoryItem.partialMatches.push(technology);
        categoryItem.nonMatches = categoryItem.nonMatches.filter(
          tag => tag !== technology
        );
      } else if (
        matchType === 'none' &&
        !categoryItem.nonMatches.includes(technology) &&
        !categoryItem.partialMatches.includes(technology) &&
        !categoryItem.fullMatches.includes(technology)
      ) {
        categoryItem.nonMatches.push(technology);
      }
    }
  }

  private finalizeProjectRankingScore(projectItem: ProjectItem): void {
    const nonWeightedRankingScore =
      projectItem.fullMatches.length * 1000 + projectItem.partialMatches.length;

    projectItem.rankingScore =
      nonWeightedRankingScore *
      this.getProjectRankingWeight(projectItem.project);
  }

  private getProjectRankingWeight(project: AnalyzableProject): number {
    const projectData = project.toDtoWithoutTechnologies();

    return (
      this.getTeamSizeWeight(projectData.teamSize) *
      engagementTypeWeights[projectData.engagementType] *
      commercialContextWeights[projectData.commercialContext] *
      usageScopeWeights[projectData.usageScope] *
      maturityWeights[projectData.maturity] *
      this.getDurationWeight(projectData.duration) *
      (projectSpecificWeights[projectData.id] ?? 1)
    );
  }

  private getTeamSizeWeight(teamSize: number): number {
    return teamSizeWeights[teamSize] ?? teamSizeWeights.Else;
  }

  private getDurationWeight(duration: Duration): number {
    if (duration.years ?? 0 >= 1) {
      return durationWeights['1+ year'];
    } else if (duration.months ?? 0 >= 6) {
      return durationWeights['6+ months'];
    } else if (duration.months ?? 0 >= 2) {
      return durationWeights['2+ months'];
    } else if (duration.months ?? 0 >= 1) {
      return durationWeights['1 month'];
    } else {
      return durationWeights['Else'];
    }
  }

  private finalizeAddSkillsWithoutProjects(
    skillCategoryItems: SkillCategoryItems
  ): void {
    const skillsWithoutProjects = getSkillsWithoutProjectsFactory().getAll();

    for (const skillTag of skillsWithoutProjects) {
      let bestMatchType: MatchType = 'none';
      for (const searchTerm of this.activeSearchTerms) {
        const matchType = this.technologyMatcher.getMatchType({
          keywordTag: skillTag,
          searchTag: searchTerm,
        });
        bestMatchType = this.getBetterMatchType(bestMatchType, matchType);
      }

      this.updateSkillCategoryItems(
        skillCategoryItems,
        skillTag,
        bestMatchType
      );
    }
  }

  private finalizeSkillCategoriesRankingScore(
    skillCategoryItems: SkillCategoryItems
  ): void {
    for (const skillCategoryItem of Object.values(skillCategoryItems)) {
      skillCategoryItem.rankingScore =
        skillCategoryItem.fullMatches.length * 1_000_000 +
        skillCategoryItem.partialMatches.length * 1_000 +
        skillCategoryItem.nonMatches.length;
    }
  }

  private toSortedProjects(
    projectItems: ProjectItems
  ): SearchEngineDomainResult['projects'] {
    return Object.entries(projectItems)
      .sort(([, itemA], [, itemB]) => itemB.rankingScore - itemA.rankingScore)
      .map(([projectId, item]) => ({
        ...item.project.toDtoWithoutTechnologies(),
        id: projectId,
        totalScore: item.rankingScore,
        technologies: {
          fullMatches: item.fullMatches.map(tag => tag.canonical),
          partialMatches: item.partialMatches.map(tag => tag.canonical),
          nonMatches: item.nonMatches.map(tag => tag.canonical),
        },
      }));
  }

  private toSortedSkills(
    skillCategoryItems: SkillCategoryItems
  ): SearchEngineDomainResult['skills'] {
    return Object.entries(skillCategoryItems)
      .map(([category, skillCategoryItem]) => ({
        category,
        tagLists: {
          fullMatches: skillCategoryItem.fullMatches.map(tag => tag.canonical),
          partialMatches: skillCategoryItem.partialMatches.map(
            tag => tag.canonical
          ),
          nonMatches: skillCategoryItem.nonMatches.map(tag => tag.canonical),
        },
        rankingScore: skillCategoryItem.rankingScore,
      }))
      .sort(
        (skillCategoryItemA, skillCategoryItemB) =>
          skillCategoryItemB.rankingScore - skillCategoryItemA.rankingScore
      );
  }
}
