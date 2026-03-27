import { Locator, type Page } from '@playwright/test';

export class LegalPage {
  readonly locator: Locator;
  readonly langToggle: Locator;
  readonly langToggleEng: Locator;
  readonly langToggleGer: Locator;
  readonly content: Locator;
  readonly title: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('legal-page');
    this.langToggle = this.locator.locator('legal-language-switch');
    this.langToggleEng = this.langToggle.getByText('English');
    this.langToggleGer = this.langToggle.getByText('Deutsch');
    this.content = this.locator.locator('mat-card-content legal-text');
    this.title = this.content.getByRole('heading').first();
  }

  async goto(pageName: 'imprint' | 'privacy-policy') {
    await this.page.goto(`/legal/${pageName}`);
  }
}
