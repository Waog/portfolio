export type SearchEngineDomainResult = {
  query: string[];
  modifiedQuery: string[]; // TODO web-worker: remove debug field
  domainRandom: number; // TODO web-worker: remove debug field
  matchesOverview: Array<{
    keyword: string;
    fullMatchesCount: number;
    partialMatchesCount: number;
  }>;
};
