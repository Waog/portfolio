import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';

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

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    readonly languageService: LanguageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.languageString$ = this.languageService.language$.pipe(
      map(language => language.toString() as 'en' | 'de')
    );
    this.routeDataDoc$ = this.route.data.pipe(
      map(data => data['legalTexts']?.doc as 'imprint' | 'privacy-policy')
    );

    this.syncLangParamToService();
    this.syncServiceLangToUrl();
  }

  private syncLangParamToService(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const lang = params['lang'] as Language;
        if (lang && Object.values(Language).includes(lang)) {
          this.languageService.setLanguage(lang);
        } else if (lang) {
          const doc = this.route.snapshot.data['legalTexts']?.doc;
          if (doc) {
            this.router.navigate([`/legal/${doc}/${Language.En}`]);
          }
        }
      });
  }

  private syncServiceLangToUrl(): void {
    combineLatest([
      this.languageService.language$.pipe(distinctUntilChanged()),
      this.routeDataDoc$,
      this.route.params,
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([lang, doc, params]) => {
        const langString = lang.toString();
        const urlLang = params['lang'];
        if (langString !== urlLang && doc) {
          this.router.navigate([`/legal/${doc}/${langString}`]);
        }
      });
  }
}
