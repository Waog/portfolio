import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { LanguageSwitchService } from './language-switch.service';
import { Language } from './language.enum';

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

  constructor(private languageService: LanguageSwitchService) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  onLanguageChange(language: Language): void {
    this.languageService.setLanguage(language);
    this.currentLanguage = language;
  }
}
