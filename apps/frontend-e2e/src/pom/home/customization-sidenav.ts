import { expect, Locator, type Page } from '@playwright/test';

export class CustomizationSidenav {
  readonly locator: Locator;
  readonly sidenav: Locator;
  readonly heading: Locator;
  readonly hideButton: Locator;
  readonly printModeCheckbox: Locator;
  readonly customizeProjectOrderButton: Locator;
  readonly projectReorderDialog: Locator;
  readonly projectReorderDialogHeading: Locator;
  readonly projectReorderDialogCloseButton: Locator;
  readonly projectReorderDialogBackdrop: Locator;
  readonly projectReorderDialogRows: Locator;
  readonly projectReorderDialogRowTitles: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-customization-sidenav');
    this.sidenav = this.locator.locator('mat-sidenav');
    this.heading = this.sidenav.getByRole('heading', { name: 'Customize' });
    this.hideButton = this.sidenav.getByRole('button', { name: 'Hide panel' });
    this.printModeCheckbox = this.sidenav.getByRole('checkbox', {
      name: 'Print mode',
    });
    this.customizeProjectOrderButton = this.sidenav.getByRole('button', {
      name: 'Customize Project Order',
    });

    this.projectReorderDialog = page
      .locator('mat-dialog-container')
      .filter({ hasText: 'Customize Project Order' });
    this.projectReorderDialogHeading = this.projectReorderDialog.getByRole(
      'heading',
      { name: 'Customize Project Order' }
    );
    this.projectReorderDialogCloseButton = this.projectReorderDialog.getByRole(
      'button',
      { name: 'Close dialog' }
    );
    this.projectReorderDialogBackdrop = page.locator('.cdk-overlay-backdrop');
    this.projectReorderDialogRows =
      this.projectReorderDialog.locator('.project-row');
    this.projectReorderDialogRowTitles = this.projectReorderDialog.locator(
      '.project-row .project-title'
    );
  }

  async expectOpen(): Promise<void> {
    await expect(this.sidenav).toBeVisible();
    await expect(this.heading).toBeVisible();
  }

  async expectClosed(): Promise<void> {
    await expect(this.sidenav).toBeHidden();
  }

  /**
   * This method is necessary because the Angular CDK drag & drop implementation doesn't work well with Playwright's built-in drag & drop support (`dragTo`).
   */
  async dragProjectReorderRow(
    fromIndex: number,
    toIndex: number
  ): Promise<void> {
    const fromRow = this.projectReorderDialogRows.nth(fromIndex);
    const toRow = this.projectReorderDialogRows.nth(toIndex);

    await fromRow.scrollIntoViewIfNeeded();
    await toRow.scrollIntoViewIfNeeded();

    await expect(fromRow).toBeVisible();
    await expect(toRow).toBeVisible();

    const fromBox = await fromRow.boundingBox();
    const toBox = await toRow.boundingBox();

    if (!fromBox) {
      throw new Error('Could not determine drag & drop start position.');
    }
    if (!toBox) {
      throw new Error('Could not determine drag & drop end position.');
    }

    const startX = fromBox.x + fromBox.width / 2;
    const startY = fromBox.y + fromBox.height / 2;
    const endX = toBox.x + toBox.width / 2;
    const endY = toBox.y + toBox.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(endX, endY, { steps: 2 });
    await this.page.mouse.up();
  }
}
