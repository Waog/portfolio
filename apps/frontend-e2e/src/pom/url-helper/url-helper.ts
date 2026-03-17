import { type Page } from '@playwright/test';

export class UrlHelper {
  private static readonly HOME = '/';

  constructor(private page: Page) {}

  async gotoHomePage(options?: {
    searchTags?: string[];
    order?: string[];
    fragment?: string;
  }): Promise<void> {
    const { searchTags = [], order = [], fragment = '' } = options ?? {};
    const url = new URL(UrlHelper.HOME, new URL(this.page.url()).origin);

    if (searchTags.length > 0) {
      url.searchParams.set('searchTags', searchTags.join(','));
    }
    if (order.length > 0) {
      url.searchParams.set(
        'order',
        order.map((id, index) => `${id}:${index}`).join(',')
      );
    }
    if (fragment) {
      url.hash = fragment;
    }
    const relativeUrl = url.pathname + url.search + url.hash;
    await this.page.goto(relativeUrl);
  }

  isHomePage(): boolean {
    return this.url().pathname === '/';
  }

  hasProjectsFragment(): boolean {
    return this.url().hash === '#projects';
  }

  hasSkillsFragment(): boolean {
    return this.url().hash === '#skills';
  }

  hasAboutMeFragment(): boolean {
    return this.url().hash === '#about-me';
  }

  hasContactFragment(): boolean {
    return this.url().hash === '#contact';
  }

  private url(): URL {
    return new URL(this.page.url());
  }
}
