export class SearchEngineDomain {
  get(input: string[]): SearchEngineDomainResult {
    return {
      query: input,
      random: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    };
  }
}
