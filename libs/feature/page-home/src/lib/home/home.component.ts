import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutMeComponent } from '@portfolio/about-me';
import { ContactSectionComponent } from '@portfolio/contact-section';
import { MatchesOverviewComponent } from '@portfolio/matches-overview';
import { ProjectListComponent } from '@portfolio/project-list';
import { SkillSectionComponent } from '@portfolio/skill-section';
import { TagInputComponent } from '@portfolio/tag-input';

@Component({
  selector: 'lib-home',
  imports: [
    CommonModule,
    ProjectListComponent,
    TagInputComponent,
    MatchesOverviewComponent,
    AboutMeComponent,
    SkillSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
