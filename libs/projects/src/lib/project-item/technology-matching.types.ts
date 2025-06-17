export type MatchType = 'full' | 'indirect' | 'none';

export interface TechnologyWithMatch {
  name: string;
  matchType: MatchType;
}
