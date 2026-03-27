import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Language } from './language-switch/language.enum';
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
    MatDividerModule,
  ],
  templateUrl: './legal-page.component.html',
  styleUrls: ['./legal-page.component.scss'],
})
export class LegalPageComponent {
  readonly Language = Language;
  readonly currentLanguage$: Observable<Language>;
  readonly routeDataDoc$: Observable<'imprint' | 'privacy-policy'>;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.routeDataDoc$ = this.route.data.pipe(
      map(data => data['legalTexts']?.doc as 'imprint' | 'privacy-policy')
    );

    this.currentLanguage$ = this.route.fragment.pipe(
      map(fragment => this.fragmentToLanguage(fragment))
    );

    afterNextRender(() => this.subscribeFragmentScroll());
  }

  onLanguageChange(language: Language): void {
    const doc = this.route.snapshot.data['legalTexts']?.doc;
    if (doc) {
      this.router.navigate([`/legal/${doc}`], { fragment: language });
    }
  }

  private subscribeFragmentScroll(): void {
    this.route.fragment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(fragment => {
        const language = this.fragmentToLanguage(fragment);
        if (fragment !== language) {
          this.onLanguageChange(language);
        } else {
          this.scrollToFragment(language);
        }
      });
  }

  private scrollToFragment(fragment: string): void {
    const target = document.getElementById(fragment);
    const container = this.scrollContainer?.nativeElement;
    if (!target || !container) {
      return;
    }
    const scrollTop =
      target.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop;
    container.scrollTo({ top: scrollTop, behavior: 'auto' });
  }

  private fragmentToLanguage(fragment: string | null): Language {
    if (fragment && Object.values(Language).includes(fragment as Language)) {
      return fragment as Language;
    }
    return Language.En;
  }
}
