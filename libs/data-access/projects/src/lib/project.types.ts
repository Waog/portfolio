import { TagName } from '@portfolio/taxonomy';

export interface ProjectData {
  id: string;
  title: string;
  projectType: string;
  compactDescription: string;
  keyAchievements: string;
  fullDescription: string;
  features: string[];
  highlights: string[];
  /**
   * Technologies, methodologies, tools, skills etc. used in this project.
   * This may contain all keywords relevant for the CV, recruiters, and potential customers.
   * NOTE: the property name `technologies` is kept for backwards compatibility, even though it is not fully accurate.
   */
  technologies: TagName[];
  role: string;
  team: string;
  teamSize: number;
  fromTo: string;
  duration: string;
  location: string;
  workMode: string;
  company: string;
  industry: string; // TODO taxonomy: consider adding industries to the taxonomy to match/highlight them
  engagementType: EngagementType;
  commercialContext: CommercialContext;
  usageScope: UsageScope;
  maturity: Maturity;
}

export type EngagementType =
  | 'Client'
  | 'Employer'
  | 'Academic'
  | 'Self-Initiated';
export type CommercialContext = 'Paid' | 'Indirect' | 'Non-Commercial';
/**
 * Team = people working on this project directly.
 * Semi-Public = people outside the team but within a limited scope,
 * e.g. Friends, or Company-internal, closed beta
 */
export type UsageScope = 'Self' | 'Team' | 'Semi-Public' | 'Public';
export type Maturity = 'Proof-Of-Concept' | 'Prototype' | 'MVP' | 'Production';
