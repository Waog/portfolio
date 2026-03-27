import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { Language } from './language-switch/language.enum';
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
  readonly language$: Observable<Language>;
  readonly routeDataDoc$: Observable<'imprint' | 'privacy-policy'>;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.routeDataDoc$ = this.route.data.pipe(
      map(data => data['legalTexts']?.doc as 'imprint' | 'privacy-policy')
    );

    this.language$ = this.route.params.pipe(
      map(params => params['lang'] as Language)
    );

    this.redirectOnInvalidLang();
  }

  onLanguageChange(language: Language): void {
    const doc = this.route.snapshot.data['legalTexts']?.doc;
    if (doc) {
      this.router.navigate([`/legal/${doc}/${language}`]);
    }
  }

  private redirectOnInvalidLang(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const lang = params['lang'] as Language;
        if (lang && !Object.values(Language).includes(lang)) {
          const doc = this.route.snapshot.data['legalTexts']?.doc;
          if (doc) {
            this.router.navigate([`/legal/${doc}/${Language.En}`]);
          }
        }
      });
  }
}
