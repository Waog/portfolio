export interface Technology {
  name: string;
}

export interface Project {
  id: string;
  title: string;
  projectType: string;
  compactDescription: string;
  keyAchievements: string;
  fullDescription: string;
  features: string[];
  highlights: string[];
  technologies: Technology[];
  role: string;
  team: string;
  fromTo: string;
  duration: string;
  location: string;
  workMode: string;
  company: string;
  industry: string;
}
