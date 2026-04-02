import { Locator, type Page } from '@playwright/test';

export class Navigation {
  readonly locator: Locator;
  readonly brandLink: Locator;
  readonly navItems: Locator;
  readonly progressBar: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-navigation mat-toolbar');
    this.brandLink = this.locator.locator('a.brand-link');
    this.navItems = this.locator.locator('a.nav-item');
    this.progressBar = this.locator.locator(
      'mat-progress-bar.top-loading-progress-bar'
    );
  }

  getNavItem(name: string): Locator {
    return this.navItems.getByText(name);
  }

  getProgressBarBetween(min: number, max: number): Locator {
    return this.locator.locator(
      `xpath=.//mat-progress-bar[contains(@class, 'top-loading-progress-bar') and number(@aria-valuenow) >= ${min} and number(@aria-valuenow) <= ${max}]`
    );
  }
}
