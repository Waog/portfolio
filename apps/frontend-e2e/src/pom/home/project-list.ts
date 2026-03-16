import { Locator, type Page } from '@playwright/test';

export class ProjectList {
  readonly locator: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-section.project-list');
  }
}
