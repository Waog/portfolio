export interface Technology {
  name: string;
}

export interface ProjectMetadata {
  role: {
    primary: string;
    secondary: string;
  };
  duration: {
    primary: string;
    secondary: string;
  };
  location: {
    primary: string;
    secondary: string;
  };
  company: {
    primary: string;
    secondary: string;
  };
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
  metadata: ProjectMetadata;
}
