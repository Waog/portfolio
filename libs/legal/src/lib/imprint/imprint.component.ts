import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Language } from '../language-switch/language.enum';
import { LanguageService } from '../language-switch/language.service';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

@Component({
  selector: 'legal-imprint',
  standalone: true,
  imports: [CommonModule, MatCardModule, LanguageSwitchComponent],
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent {
  readonly Language = Language;

  constructor(readonly languageService: LanguageService) {}
}
