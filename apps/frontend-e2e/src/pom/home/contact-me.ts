import { Locator, type Page } from '@playwright/test';

export class ContactMe {
  readonly locator: Locator;

  readonly title: Locator;
  readonly contactItems: Locator;
  readonly email: Locator;
  readonly phone: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-section.contact-section');

    this.title = this.locator.locator('mat-card-header mat-card-title');
    this.contactItems = this.locator.locator('mat-card-content .contact-item');

    this.email = this.contactItems.getByText('@gmail.com');
    this.phone = this.contactItems.getByText('+49 (1520) 28 25 986');
  }
}
