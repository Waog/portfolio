import {
  APIRequestContext,
  expect,
  Locator,
  type Page,
} from '@playwright/test';

export class WebMetadataPage {
  public readonly canonicalLink: Locator;
  public readonly descriptionMeta: Locator;
  public readonly faviconIcoLink: Locator;
  public readonly faviconSvgLink: Locator;
  public readonly favicon32Link: Locator;
  public readonly appleTouchIconLink: Locator;

  constructor(
    private readonly page: Page,
    private readonly request: APIRequestContext
  ) {
    this.canonicalLink = this.page.locator('head link[rel="canonical"]');
    this.descriptionMeta = this.page.locator('head meta[name="description"]');
    this.faviconIcoLink = page.locator(
      `head link[rel="icon"][type="image/x-icon"][href="/favicon.ico"]`
    );
    this.faviconSvgLink = page.locator(
      `head link[rel="icon"][type="image/svg+xml"]`
    );
    this.favicon32Link = page.locator(
      `head link[rel="icon"][type="image/png"][sizes="32x32"]`
    );
    this.appleTouchIconLink = page.locator(
      `head link[rel="apple-touch-icon"][sizes="180x180"]`
    );
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  metadataElement(key: string): Locator {
    return this.page
      .locator(`head meta[property="${key}"], head meta[name="${key}"]`)
      .first();
  }

  linkElementToUrl(targetUrl: string): Locator {
    return this.page.locator(`a[href="${targetUrl}"]`).first();
  }

  currentOrigin(): string {
    return new URL(this.page.url()).origin;
  }

  async expectIsServed(expectedPath: string): Promise<void> {
    const origin = new URL(this.page.url()).origin;
    const assetUrl = `${origin}${expectedPath}`;

    const response = await this.request.get(assetUrl);
    expect(response.ok()).toBe(true);
    expect(await response.body()).not.toHaveLength(0);
  }
}
