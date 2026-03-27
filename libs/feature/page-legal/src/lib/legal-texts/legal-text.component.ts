import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { Language } from '../language-switch/language.enum';
import { ImprintDeComponent } from './generated-wrapper-components/imprint.de.component';
import { ImprintEnComponent } from './generated-wrapper-components/imprint.en.component';
import { PrivacyPolicyDeComponent } from './generated-wrapper-components/privacy-policy.de.component';
import { PrivacyPolicyEnComponent } from './generated-wrapper-components/privacy-policy.en.component';

@Component({
  selector: 'legal-text',
  imports: [
    CommonModule,
    ImprintDeComponent,
    ImprintEnComponent,
    PrivacyPolicyDeComponent,
    PrivacyPolicyEnComponent,
  ],
  templateUrl: './legal-text.component.html',
  styleUrl: './legal-text.component.scss',
})
export class LegalTextComponent {
  readonly Language = Language;

  doc = input.required<'imprint' | 'privacy-policy'>();
  lang = input.required<Language>();
}
