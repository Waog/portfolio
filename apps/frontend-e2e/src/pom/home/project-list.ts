import { expect, Locator, type Page } from '@playwright/test';

export class ProjectList {
  readonly locator: Locator;

  readonly topProjectsSection: Locator;
  readonly topProjectsSectionTitle: Locator;

  readonly toggleOtherProjectsButton: Locator;

  readonly otherProjectsSection: Locator;
  readonly otherProjectsSectionTitle: Locator;

  constructor(private page: Page) {
    this.locator = this.page.locator('lib-section.project-list');

    this.topProjectsSection = this.locator.locator(
      'section.top-projects-section'
    );
    this.topProjectsSectionTitle = this.topProjectsSection.getByRole(
      'heading',
      { name: 'Top Matching Projects' }
    );

    this.otherProjectsSection = this.locator.locator(
      'section.other-projects-section'
    );
    this.otherProjectsSectionTitle = this.otherProjectsSection.getByRole(
      'heading',
      { name: 'Other Projects' }
    );
    this.toggleOtherProjectsButton = this.locator.getByRole('button', {
      name: /(Hide|Show) All Projects/,
    });
  }

  private allItemsLocator(): Locator {
    return this.locator.locator('lib-project-item');
  }

  private topItemsLocator(): Locator {
    return this.topProjectsSection.locator('lib-project-item');
  }

  async projectItems(): Promise<ProjectItem[]> {
    return this.toProjectItems(this.allItemsLocator());
  }

  async topProjectItems(): Promise<ProjectItem[]> {
    return this.toProjectItems(this.topItemsLocator());
  }

  private async toProjectItems(locator: Locator): Promise<ProjectItem[]> {
    await expect.poll(async () => locator.count()).toBeGreaterThan(0);
    return locator
      .all()
      .then(itemLocators =>
        itemLocators.map(locator => new ProjectItem(locator))
      );
  }

  async projectItemByTitle(title: string | RegExp): Promise<ProjectItem> {
    const items = await this.projectItems();
    for (const item of items) {
      if ((await item.title.getByText(title).count()) > 0) {
        return item;
      }
    }
    throw new Error(
      `Project with title "${title}" not found in ${items.length} items}`
    );
  }
}

export class ProjectItem {
  readonly title: Locator;
  readonly team: Locator;
  readonly duration: Locator;
  readonly location: Locator;
  readonly industry: Locator;
  readonly chips: Locator;
  readonly greenChips: Locator;
  readonly greenChipTexts: Locator;
  readonly decreaseCustomOrderButton: Locator;
  readonly increaseCustomOrderButton: Locator;

  public static toTitleLocator(itemLocator: Locator): Locator {
    return itemLocator.locator('.header-content').getByRole('heading');
  }

  constructor(public locator: Locator) {
    this.title = ProjectItem.toTitleLocator(this.locator);
    this.team = this.locator.locator(this.getMetaTextSelector(1));
    this.duration = this.locator.locator(this.getMetaTextSelector(2));
    this.location = this.locator.locator(this.getMetaTextSelector(3));
    this.industry = this.locator.locator(this.getMetaTextSelector(4));
    this.chips = this.locator.locator('lib-color-chip.chip-item');
    this.greenChips = this.chips.locator('.color-chip-green');
    this.greenChipTexts = this.greenChips.locator('.chip-text');
    this.decreaseCustomOrderButton = this.locator.locator(
      'button.move-down-btn'
    );
    this.increaseCustomOrderButton = this.locator.locator('button.move-up-btn');
  }

  private getMetaTextSelector(index: number): string {
    return `lib-project-item-meta-tiles .meta-tile:nth-child(${index}) .tile-content .secondary-text`;
  }

  chip(text: string | RegExp): Locator {
    return this.chips.getByText(text);
  }

  async hasGreenBorder(): Promise<boolean> {
    const color: string = await this.locator
      .locator('.project-card')
      .evaluate(
        (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
        'border-left-color'
      );
    const match = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (!match) throw new Error(`Invalid color format: ${color}`);
    const [, r, g, b] = match.map(Number);
    return g > r && g > b;
  }

  async decreaseCustomOrder() {
    await this.decreaseCustomOrderButton.click();
  }

  async increaseCustomOrder() {
    await this.increaseCustomOrderButton.click();
  }
}
