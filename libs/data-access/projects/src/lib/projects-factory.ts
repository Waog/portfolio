import { MemoizeAllArgs } from '@portfolio/memoize';

import { AnalyzableProject } from './analyzable-project';
import { ALL_PROJECT_DATA } from './project.data';

class ProjectsFactory {
  @MemoizeAllArgs
  getAll(): AnalyzableProject[] {
    return ALL_PROJECT_DATA.map(data => new AnalyzableProject(data));
  }
}

const singleton = new ProjectsFactory();

export function getProjectsFactory() {
  return singleton;
}
