import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChipColor, ColorChipComponent } from '@portfolio/color-chip';

import { Project } from '../models/project';
import { ProjectItemTechnologyMatchingService } from './project-item-technology-matching.service';
import { TechnologyWithMatch } from './technology-matching.types';

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
    ColorChipComponent,
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

  showAllTechnologies = false;
  showExpandedContent = false;

  get technologies(): TechnologyWithMatch[] {
    return this.technologyMatchingService.addMatchTypes(
      this.project().technologies
    );
  }

  get visibleTechnologies() {
    if (this.showAllTechnologies) {
      return this.technologies;
    }

    // Smart folding logic
    const fullMatches = this.technologies.filter(
      tech => tech.matchType === 'full'
    );
    const indirectMatches = this.technologies.filter(
      tech => tech.matchType === 'indirect'
    );
    const nonMatches = this.technologies.filter(
      tech => tech.matchType === 'none'
    );

    const result = [...fullMatches]; // Always show ALL full matches

    // Add indirect matches until we reach max 10 total
    const remainingSlots = Math.max(0, 10 - result.length);
    result.push(...indirectMatches.slice(0, remainingSlots));

    // If we're below minimum of 6, add non-matches to reach minimum
    if (result.length < 6) {
      const neededToReachMin = 6 - result.length;
      result.push(...nonMatches.slice(0, neededToReachMin));
    }

    return result;
  }

  get hiddenTechnologiesCount() {
    return this.technologies.length - this.visibleTechnologies.length;
  }

  toggleTechnologies() {
    this.showAllTechnologies = !this.showAllTechnologies;
  }
  toggleContent() {
    this.showExpandedContent = !this.showExpandedContent;
  }

  getChipColor(matchType: string): ChipColor {
    switch (matchType) {
      case 'full':
        return 'green';
      case 'indirect':
        return 'yellow';
      case 'none':
        return 'gray';
      default:
        return 'gray';
    }
  }

  getChipIcon(matchType: string): string | undefined {
    switch (matchType) {
      case 'full':
        return 'star';
      case 'indirect':
        return 'star_border';
      default:
        return undefined;
    }
  }
}
