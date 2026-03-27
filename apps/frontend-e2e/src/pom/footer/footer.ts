import { Locator, type Page } from '@playwright/test';

export class Footer {
  readonly locator: Locator;
  readonly links: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-footer');
    this.links = this.locator.locator('a.footer-link');
  }

  getLink(name: string): Locator {
    return this.links.filter({ hasText: name });
  }
}
