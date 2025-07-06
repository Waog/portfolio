import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CommunityWritingComponent } from '../community-writing/community-writing.component';
import { EducationComponent } from '../education/education.component';
import { HeroContentComponent } from '../hero-content/hero-content.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ProfessionalFocusComponent } from '../professional-focus/professional-focus.component';

@Component({
  selector: 'lib-about-me',
  imports: [
    CommonModule,
    MatCardModule,
    HeroContentComponent,
    CommunityWritingComponent,
    EducationComponent,
    PersonalInformationComponent,
    ProfessionalFocusComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {}
