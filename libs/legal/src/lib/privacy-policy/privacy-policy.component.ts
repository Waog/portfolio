import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Language } from '../language-switch/language.enum';
import { LanguageService } from '../language-switch/language.service';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

@Component({
  selector: 'legal-privacy-policy',
  standalone: true,
  imports: [CommonModule, MatCardModule, LanguageSwitchComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  readonly Language = Language;

  constructor(readonly languageService: LanguageService) {}
}
