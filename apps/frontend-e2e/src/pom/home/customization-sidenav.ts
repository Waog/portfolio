import { expect, Locator, type Page } from '@playwright/test';

export class CustomizationSidenav {
  readonly locator: Locator;
  readonly sidenav: Locator;
  readonly heading: Locator;
  readonly hideButton: Locator;
  readonly printModeCheckbox: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-customization-sidenav');
    this.sidenav = this.locator.locator('mat-sidenav');
    this.heading = this.sidenav.getByRole('heading', { name: 'Customize' });
    this.hideButton = this.sidenav.getByRole('button', { name: 'Hide panel' });
    this.printModeCheckbox = this.sidenav.getByRole('checkbox', {
      name: 'Print mode',
    });
  }

  async expectOpen(): Promise<void> {
    await expect(this.sidenav).toBeVisible();
    await expect(this.heading).toBeVisible();
  }

  async expectClosed(): Promise<void> {
    await expect(this.sidenav).toBeHidden();
  }
}
