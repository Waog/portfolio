import {
  getProjectsFactory,
  MatchType,
  Project,
  TechnologyMatcher,
} from '@portfolio/projects';
import { Tag } from '@portfolio/taxonomy';

import { SearchEngineDomainResult } from './search-engine-domain.types';

type ProjectItems = { [projectId: string]: ProjectItem };

type ProjectItem = {
  fullMatches: Tag[];
  partialMatches: Tag[];
  nonMatches: Tag[];
  rankingScore: number;
  project: Project;
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

type SearchTermTagMap = {
  [term: string]: Tag | null;
};

type MatchesOverviewMap = {
  [searchTerm: string]: MatchesOverviewItem;
};

type MatchesOverviewItem = SearchEngineDomainResult['matchesOverview'][1];

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

    // TODO web-worker: this is unused. delete or use it.
    // consider: do we want to display canonical tags in the skill-matrix, or search terms?
    const termTagMap: SearchTermTagMap = this.initTermTagMap(searchTerms);

    const matchesOverview: MatchesOverviewMap =
      this.initMatchesOverview(searchTerms);

    const projectItems: ProjectItems = {};

    const skillCategoryItems: SkillCategoryItems = {};

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
    const sortedProjects = this.toSortedProjects(projectItems);

    this.finalizeSkillCategoriesRankingScore(skillCategoryItems);
    const sortedSkills = this.toSortedSkills(skillCategoryItems);

    return {
      query: searchTerms,
      matchesOverview: searchTerms.map(word => matchesOverview[word]),
      projects: sortedProjects,
      skills: sortedSkills,
    };
  }

  private initTermTagMap(searchTerms: string[]): SearchTermTagMap {
    const searchTermTagMap: SearchTermTagMap = {};
    for (const searchTerm of searchTerms) {
      searchTermTagMap[searchTerm] = Tag.find(searchTerm) ?? null;
    }
    return searchTermTagMap;
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
    project: Project
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
    projectItem.rankingScore =
      projectItem.fullMatches.length * 1000 + projectItem.partialMatches.length;
  }

  // TODO web-worker: previously we had some consistency check to ensure no tag/category is forgotten or duplicated. re-establish it.
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
        ...item.project.toDTO(),
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
