import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { Project, TechnologyWithMatch } from '@portfolio/projects';

import { ProjectItemTechnologyMatchingService } from './project-item-technology-matching.service';

@Component({
  selector: 'lib-project-item',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ColorChipListComponent,
  ],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  private technologyMatchingService = inject(
    ProjectItemTechnologyMatchingService
  );

  project = input.required<Project>();
  isTopProject = input<boolean>(false);

  showExpandedContent = false;

  get technologies(): TechnologyWithMatch[] {
    return this.technologyMatchingService.addMatchTypes(
      this.project().technologies
    );
  }

  get greenTechnologies(): string[] {
    return this.technologies
      .filter(tech => tech.matchType === 'full')
      .map(tech => tech.name);
  }

  get yellowTechnologies(): string[] {
    return this.technologies
      .filter(tech => tech.matchType === 'indirect')
      .map(tech => tech.name);
  }

  get grayTechnologies(): string[] {
    return this.technologies
      .filter(tech => tech.matchType === 'none')
      .map(tech => tech.name);
  }

  toggleContent() {
    this.showExpandedContent = !this.showExpandedContent;
  }
}
