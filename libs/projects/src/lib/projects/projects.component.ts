import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProjectItemComponent } from '../project-item/project-item.component';

@Component({
  selector: 'lib-projects',
  imports: [CommonModule, ProjectItemComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {}
