import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ColorChipListComponent } from '@portfolio/color-chip-list';
import { MatchType, TechnologyMatchingService } from '@portfolio/projects';

interface TechnologyWithMatch {
  name: string;
  matchType: MatchType;
}

@Component({
  selector: 'lib-keyword-list',
  imports: [CommonModule, ColorChipListComponent],
  templateUrl: './keyword-list.component.html',
  styleUrl: './keyword-list.component.scss',
})
export class KeywordListComponent {
  private technologyMatchingService = inject(TechnologyMatchingService);

  keywords = input.required<string[]>();

  get technologies(): TechnologyWithMatch[] {
    return this.keywords().map(keyword => ({
      name: keyword,
      matchType: this.technologyMatchingService.getBestMatchTypeForTechnology({
        technologyName: keyword,
      }),
    }));
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
}
