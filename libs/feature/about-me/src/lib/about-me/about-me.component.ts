import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { HeroContentComponent } from '../hero-content/hero-content.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { SubSectionComponent } from '../sub-section/sub-section.component';

@Component({
  selector: 'lib-about-me',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    HeroContentComponent,
    PersonalInformationComponent,
    SubSectionComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {}
