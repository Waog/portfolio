import {
  CommercialContext,
  EngagementType,
  Maturity,
  UsageScope,
} from '@portfolio/projects';

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
