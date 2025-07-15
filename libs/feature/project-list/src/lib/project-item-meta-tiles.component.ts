import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '@portfolio/projects';

@Component({
  selector: 'lib-project-item-meta-tiles',
  imports: [CommonModule, MatIconModule],
  templateUrl: './project-item-meta-tiles.component.html',
  styleUrl: './project-item-meta-tiles.component.scss',
})
export class ProjectItemMetaTilesComponent {
  project = input.required<Project>();
}
