import { Injectable } from '@angular/core';

import { Project } from './project';
import { ALL_PROJECTS } from './projects.data';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getAll(): Project[] {
    return ALL_PROJECTS;
  }
}
