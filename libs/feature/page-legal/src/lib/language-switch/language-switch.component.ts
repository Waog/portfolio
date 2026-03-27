import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { Language } from './language.enum';

@Component({
  selector: 'legal-language-switch',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  @Input() currentLanguage: Language = Language.En;
  @Output() languageChange = new EventEmitter<Language>();

  readonly language = Language;

  onLanguageChange(language: Language): void {
    this.languageChange.emit(language);
  }
}
