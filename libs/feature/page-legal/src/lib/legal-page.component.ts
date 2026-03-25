import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Language } from './language-switch/language.enum';
import { LanguageService } from './language-switch/language.service';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { LegalTextComponent } from './legal-texts/legal-text.component';

@Component({
  selector: 'legal-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LanguageSwitchComponent,
    LegalTextComponent,
  ],
  templateUrl: './legal-page.component.html',
  styleUrls: ['./legal-page.component.scss'],
})
export class LegalPageComponent {
  readonly Language = Language;
  readonly languageString$: Observable<'en' | 'de'>;
  readonly routeDataDoc$: Observable<'imprint' | 'privacy-policy'>;

  constructor(
    readonly languageService: LanguageService,
    private readonly route: ActivatedRoute
  ) {
    this.languageString$ = this.languageService.language$.pipe(
      map(language => language.toString() as 'en' | 'de')
    );
    this.routeDataDoc$ = this.route.data.pipe(
      map(data => data['legalTexts']?.doc as 'imprint' | 'privacy-policy')
    );
  }
}
