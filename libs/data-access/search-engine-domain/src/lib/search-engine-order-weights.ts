import {
  CommercialContext,
  EngagementType,
  Maturity,
  UsageScope,
} from '@portfolio/projects';

/**
 * Search terms are weighted by their order of appearance.
 * First and last weight are defined, the rest is interpolated linearly.
 */
export const searchTermOrderWeights: Record<'first' | 'last', number> = {
  first: 1,
  last: 0.6,
};

export const teamSizeWeights: Record<number | 'Else', number> = {
  Else: 1,
  2: 0.95,
  1: 0.9,
};

export const engagementTypeWeights: Record<EngagementType, number> = {
  Client: 1,
  Employer: 1,
  Academic: 0.95,
  'Self-Initiated': 0.9,
};

export const commercialContextWeights: Record<CommercialContext, number> = {
  Paid: 1,
  Indirect: 0.95,
  'Non-Commercial': 0.9,
};

export const usageScopeWeights: Record<UsageScope, number> = {
  Public: 1,
  'Semi-Public': 0.95,
  Team: 0.9,
  Self: 0.8,
};

export const maturityWeights: Record<Maturity, number> = {
  Production: 1,
  MVP: 0.95,
  Prototype: 0.85,
  'Proof-Of-Concept': 0.8,
};

export const durationWeights: Record<string, number> = {
  '1+ year': 1,
  '6+ months': 0.95,
  '2+ months': 0.9,
  '1 month': 0.85,
  Else: 0.8,
};

export const projectSpecificWeights: Record<string, number> = {
  /**
   * The project `Freelancing IT Professional` isn't a real project, but a general summary of the whole IT career.
   * It should normally be displayed lower than the real projects, but if search terms match the general experience
   * better, it should still not be forced to the bottom of the search results.
   */
  'freelancing-it-professional': 0.7,
};
