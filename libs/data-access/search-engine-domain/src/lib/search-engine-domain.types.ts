import { ProjectDTOWithoutTechnologies } from '@portfolio/projects';

export type SearchEngineDomainResult = {
  query: string[];
  matchesOverview: Array<{
    keyword: string;
    fullMatchesCount: number;
    partialMatchesCount: number;
  }>;
  projects: Array<ProjectDTO>;
  skills: Array<{
    category: string;
    tagLists: TagLists;
    rankingScore: number;
  }>;
};

export type SearchEngineDomainChunkResult = {
  done: boolean;
  progressPercent: number;
};

export type TagLists = {
  fullMatches: string[];
  partialMatches: string[];
  nonMatches: string[];
};

type ProjectDTO = ProjectDTOWithoutTechnologies & {
  technologies: TagLists;
};

export type { ProjectDTO as Project };
