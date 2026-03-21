import { Locator, type Page } from '@playwright/test';

export class WebMetadataPage {
  constructor(private readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  canonicalLinkElement(): Locator {
    return this.page.locator('head link[rel="canonical"]');
  }

  metadataElement(key: string): Locator {
    return this.page
      .locator(`head meta[property="${key}"], head meta[name="${key}"]`)
      .first();
  }

  linkElementToUrl(targetUrl: string): Locator {
    return this.page.locator(`a[href="${targetUrl}"]`).first();
  }

  descriptionElement(): Locator {
    return this.page.locator('head meta[name="description"]');
  }

  currentOrigin(): string {
    return new URL(this.page.url()).origin;
  }
}
