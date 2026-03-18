import { expect, Locator, type Page } from '@playwright/test';

export class Skills {
  readonly locator: Locator;
  readonly skillCategories: Locator;
  readonly tags: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-section.skill-section');
    this.skillCategories = this.locator.locator('.skill-category');
    this.tags = this.locator.locator('lib-color-chip');
  }

  public async skillCategory(name: string | RegExp): Promise<Locator> {
    const category = this.skillCategories.getByText(name);
    await expect(category).toBeVisible();
    return category;
  }

  public tagsBy(name: string | RegExp): Locator {
    return this.tags.getByText(name);
  }
}
