import { MemoizeAllArgs } from '@portfolio/memoize';

import { Project } from './project';
import { ALL_PROJECT_DATA } from './project.data';

class ProjectsFactory {
  @MemoizeAllArgs
  getAll(): Project[] {
    return ALL_PROJECT_DATA.map(data => new Project(data));
  }
}

const singleton = new ProjectsFactory();

export function getProjectsFactory() {
  return singleton;
}
