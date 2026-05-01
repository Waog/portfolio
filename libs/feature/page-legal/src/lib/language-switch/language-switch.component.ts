import { Component, input, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { Language } from './language.enum';

@Component({
  selector: 'legal-language-switch',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  currentLanguage = input(Language.En);
  languageChange = output<Language>();

  readonly language = Language;

  onLanguageChange(language: Language): void {
    this.languageChange.emit(language);
  }
}
