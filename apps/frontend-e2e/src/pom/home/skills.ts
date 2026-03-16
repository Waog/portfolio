import { Locator, type Page } from '@playwright/test';

export class Skills {
  readonly locator: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-section.skill-section');
  }
}
