import { expect, Locator, type Page } from '@playwright/test';

import { dragAndDropByMouse } from '../shared/drag-and-drop';

export class TagInput {
  readonly locator: Locator;
  readonly inputField: Locator;
  readonly addButton: Locator;
  readonly tagList: Locator;
  readonly chips: Locator;
  readonly spinner: Locator;
  readonly chipTexts: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-section.tag-input');
    this.inputField = this.locator.getByRole('textbox', {
      name: 'Add search term, e.g. "Angular"',
    });
    this.addButton = this.locator.getByRole('button', {
      name: 'Add',
    });
    this.tagList = this.locator.locator('.tag-list');
    this.chips = this.tagList.locator('lib-color-chip');
    this.chipTexts = this.chips.locator('.chip-text');
    this.spinner = this.tagList.locator('.progress-indicator');
  }

  async addSearchTerm(
    term: string,
    options: {
      skipAssertions?: boolean;
      submitMethod?: 'EnterKey' | 'AddButton';
    } = {}
  ) {
    await this.inputField.fill(term);
    if (options?.submitMethod === 'EnterKey') {
      await this.inputField.press('Enter');
    } else {
      await this.addButton.click();
    }
    if (!options?.skipAssertions) {
      await expect(this.chipTexts.last()).toHaveText(term);
      await expect(this.spinner).toBeVisible();
      await expect(this.spinner).toBeHidden({ timeout: 20000 });
    }
  }

  async removeSearchTerm(term: string) {
    const chip = this.chips.filter({ hasText: term });
    await expect(chip).toHaveCount(1);
    const closeButton = chip.locator('button.chip-close-button');
    await closeButton.click();
    await expect(chip).toHaveCount(0);
  }

  async reorderSearchTerm(fromIndex: number, toIndex: number): Promise<void> {
    const fromChip = this.chips.nth(fromIndex);
    const toChip = this.chips.nth(toIndex);
    await dragAndDropByMouse(this.page, fromChip, toChip);
  }
}
