import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AboutMeComponent } from '@portfolio/about-me';
import { ContactSectionComponent } from '@portfolio/contact-section';
import { MatchesOverviewComponent } from '@portfolio/matches-overview';
import { ProjectListComponent } from '@portfolio/project-list';
import { SearchTagService } from '@portfolio/search-tags';
import { SectionComponent } from '@portfolio/section';
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
    SectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected searchTagService = inject(SearchTagService);
}
