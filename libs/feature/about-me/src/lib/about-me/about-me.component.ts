import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ColorChipComponent } from '@portfolio/color-chip';

import { HeroContentComponent } from '../hero-content/hero-content.component';
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
    ColorChipComponent,
    HeroContentComponent,
    SubSectionComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  get currentAge(): number {
    const today = new Date();
    const birthDate = new Date(1984, 10, 14); // Month is 0-indexed, so 10 = November
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
