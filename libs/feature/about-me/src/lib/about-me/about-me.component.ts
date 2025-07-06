import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CommunityWritingComponent } from '../community-writing/community-writing.component';
import { EducationComponent } from '../education/education.component';
import { HeroContentComponent } from '../hero-content/hero-content.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { SubSectionComponent } from '../sub-section/sub-section.component';

@Component({
  selector: 'lib-about-me',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    HeroContentComponent,
    CommunityWritingComponent,
    EducationComponent,
    PersonalInformationComponent,
    SubSectionComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {}
