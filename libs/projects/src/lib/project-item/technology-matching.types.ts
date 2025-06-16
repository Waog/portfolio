import { Technology } from '../models/project';

export type MatchType = 'full' | 'indirect' | 'none';

export interface TechnologyWithMatch extends Technology {
  matchType: MatchType;
}

export interface TechnologyMatchingCriteria {
  fullMatches: string[];
  indirectMatches: string[];
}
