import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Language } from './language.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<Language>(Language.En);
  language$ = this.languageSubject.asObservable();

  constructor() {}

  setLanguage(language: Language): void {
    this.languageSubject.next(language);
  }

  getCurrentLanguage(): Language {
    return this.languageSubject.value;
  }
}
