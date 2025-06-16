import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ALL_PROJECTS } from '../data/projects.data';
import { Project } from '../models/project';
import { ProjectItemComponent } from '../project-item/project-item.component';

@Component({
  selector: 'lib-projects',
  imports: [CommonModule, ProjectItemComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects = ALL_PROJECTS;

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }
}
