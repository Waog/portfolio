import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Language } from '../language-switch/language.enum';
import { LanguageService } from '../language-switch/language.service';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

@Component({
  selector: 'legal-terms-of-service',
  standalone: true,
  imports: [CommonModule, MatCardModule, LanguageSwitchComponent],
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent {
  readonly Language = Language;

  constructor(readonly languageService: LanguageService) {}
}
