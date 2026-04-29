import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AboutMeComponent } from '@portfolio/about-me';
import { ContactSectionComponent } from '@portfolio/contact-section';
import { MatchesOverviewComponent } from '@portfolio/matches-overview';
import { ProjectListComponent } from '@portfolio/project-list';
import { SearchEngineService } from '@portfolio/search-engine-angular';
import { SearchTagService } from '@portfolio/search-tags';
import { SectionComponent } from '@portfolio/section';
import { SkillSectionComponent } from '@portfolio/skill-section';
import { TagInputComponent } from '@portfolio/tag-input';

import { CustomizationSidenavComponent } from './customization-sidenav.component';

@Component({
  selector: 'lib-home',
  imports: [
    CommonModule,
    CustomizationSidenavComponent,
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
  protected readonly searchTagService = inject(SearchTagService);
  protected readonly searchResult$ = inject(SearchEngineService).searchResult$;
}
