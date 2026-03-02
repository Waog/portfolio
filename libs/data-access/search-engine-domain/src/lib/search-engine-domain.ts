import { SearchEngineDomainResult } from './search-engine-domain.types';

export class SearchEngineDomain {
  get(input: string[]): SearchEngineDomainResult {
    return {
      query: input,
      modifiedQuery: input?.map(word => `${word}-modified`),
      domainRandom: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      matchesOverview: input?.map(word => ({
        keyword: word,
        fullMatchesCount: word.length % 10, // TODO: implement actual matching logic
        partialMatchesCount: word.length % 6, // TODO: implement actual matching logic
      })),
    };
  }
}
