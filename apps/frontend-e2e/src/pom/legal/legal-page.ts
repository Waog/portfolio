import { Locator, type Page } from '@playwright/test';

export class LegalPage {
  readonly locator: Locator;
  readonly langToggle: Locator;
  readonly langToggleEng: Locator;
  readonly langToggleGer: Locator;
  readonly content: Locator;
  readonly enContent: Locator;
  readonly deContent: Locator;
  readonly enTitle: Locator;
  readonly deTitle: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('legal-page');
    this.langToggle = this.locator.locator('legal-language-switch');
    this.langToggleEng = this.langToggle.getByText('English');
    this.langToggleGer = this.langToggle.getByText('Deutsch');
    this.content = this.locator.locator('mat-card-content');
    this.enContent = this.locator.locator('legal-text#en');
    this.deContent = this.locator.locator('legal-text#de');
    this.enTitle = this.enContent.getByRole('heading').first();
    this.deTitle = this.deContent.getByRole('heading').first();
  }

  async goto(pageName: 'imprint' | 'privacy-policy') {
    await this.page.goto(`/legal/${pageName}`);
  }

  async gotoWithLang(
    pageName: 'imprint' | 'privacy-policy',
    lang: 'en' | 'de'
  ) {
    await this.page.goto(`/legal/${pageName}#${lang}`);
  }

  url(): string {
    return this.page.url();
  }
}
