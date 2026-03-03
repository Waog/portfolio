import { Project as ProjectObject } from '@portfolio/projects';

export type SearchEngineDomainResult = {
  query: string[];
  matchesOverview: Array<{
    keyword: string;
    fullMatchesCount: number;
    partialMatchesCount: number;
  }>;
  projects: Array<ProjectMsgDTO>;
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

type ProjectMsgDTO = {
  id: string;
  technologies: TagLists;
} & Omit<ReturnType<ProjectObject['toDTO']>, 'technologies'>;

export type { ProjectMsgDTO as Project };
