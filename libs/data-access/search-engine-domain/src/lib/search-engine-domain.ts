import { SearchEngineDomainResult } from './search-engine-domain.types';

export class SearchEngineDomain {
  get(input: string[]): SearchEngineDomainResult {
    return {
      query: input,
      modifiedQuery: input?.map(word => `${word}-modified`),
      random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    };
  }
}
