import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
  ],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  showAllTechnologies = false;
  showExpandedContent = false; // New toggle for main content

  technologies = [
    // Full matches (first 3)
    { name: 'Angular', matchType: 'full' },
    { name: 'TypeScript', matchType: 'full' },
    { name: 'SCSS', matchType: 'full' },

    // Indirect matches (next 4)
    { name: 'RxJS', matchType: 'indirect' },
    { name: 'Angular Material', matchType: 'indirect' },
    { name: 'Jest', matchType: 'indirect' },
    { name: 'Cypress', matchType: 'indirect' },

    // Non-matched (rest)
    { name: 'PWA', matchType: 'none' },
    { name: 'Azure DevOps', matchType: 'none' },
    { name: 'Docker', matchType: 'none' },
    { name: 'Node.js', matchType: 'none' },
    { name: 'Express.js', matchType: 'none' },
    { name: 'PostgreSQL', matchType: 'none' },
    { name: 'REST API', matchType: 'none' },
    { name: 'GraphQL', matchType: 'none' },
    { name: 'Webpack', matchType: 'none' },
    { name: 'ESLint', matchType: 'none' },
    { name: 'Prettier', matchType: 'none' },
    { name: 'Git', matchType: 'none' },
    { name: 'GitHub Actions', matchType: 'none' },
    { name: 'Jira', matchType: 'none' },
    { name: 'Figma', matchType: 'none' },
    { name: 'VS Code', matchType: 'none' },
    { name: 'Chrome DevTools', matchType: 'none' },
    { name: 'Postman', matchType: 'none' },
    { name: 'Lighthouse', matchType: 'none' },
    { name: 'Accessibility', matchType: 'none' },
    { name: 'Performance', matchType: 'none' },
    { name: 'SEO', matchType: 'none' },
  ];

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
}
