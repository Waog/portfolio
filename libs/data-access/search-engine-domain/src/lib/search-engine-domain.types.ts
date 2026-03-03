import { Project as ProjectObject } from '@portfolio/projects';

export type SearchEngineDomainResult = {
  query: string[];
  modifiedQuery: string[]; // TODO web-worker: remove debug field
  domainRandom: number; // TODO web-worker: remove debug field
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
