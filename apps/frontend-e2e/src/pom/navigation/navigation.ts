import { Locator, type Page } from '@playwright/test';

export class Navigation {
  readonly locator: Locator;
  readonly navItems: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-navigation mat-toolbar');
    this.navItems = this.locator.locator('a.nav-item');
  }

  getNavItem(name: string): Locator {
    return this.navItems.getByText(name);
  }
}
