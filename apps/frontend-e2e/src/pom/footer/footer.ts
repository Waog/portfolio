import { Locator, type Page } from '@playwright/test';

export class Footer {
  readonly locator: Locator;
  readonly links: Locator;
  readonly showPanelButton: Locator;
  readonly hidePanelButton: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-footer');
    this.links = this.locator.locator('a.footer-link');
    this.showPanelButton = this.locator.getByRole('button', {
      name: 'show customization',
    });
    this.hidePanelButton = this.locator.getByRole('button', {
      name: 'hide customization',
    });
  }

  getLink(name: string): Locator {
    return this.links.filter({ hasText: name });
  }
}
