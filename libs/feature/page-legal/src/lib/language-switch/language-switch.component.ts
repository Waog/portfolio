import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { Language } from './language.enum';
import { LanguageService } from './language.service';

@Component({
  selector: 'legal-language-switch',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  currentLanguage: Language;
  language = Language;

  constructor(private languageService: LanguageService) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  onLanguageChange(language: Language): void {
    this.languageService.setLanguage(language);
    this.currentLanguage = language;
  }
}
