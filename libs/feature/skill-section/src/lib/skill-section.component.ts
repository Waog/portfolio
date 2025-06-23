import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KeywordListComponent } from '@portfolio/keyword-list';

import {
  type SkillCategory,
  SkillSectionService,
} from './skill-section.service';

@Component({
  selector: 'lib-skill-section',
  imports: [CommonModule, MatCardModule, MatIconModule, KeywordListComponent],
  templateUrl: './skill-section.component.html',
  styleUrl: './skill-section.component.scss',
})
export class SkillSectionComponent {
  private skillSectionService = inject(SkillSectionService);

  skillCategories: SkillCategory[] =
    this.skillSectionService.getSkillCategories();
}
