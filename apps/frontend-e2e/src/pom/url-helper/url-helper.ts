import { expect, type Page } from '@playwright/test';

import { HomePage } from '../home/home-page';

export class UrlHelper {
  private static readonly HOME = '/';

  constructor(private page: Page, private homePage: HomePage) {}

  async gotoHomePage(options?: {
    searchTags?: string[];
    order?: string[] | { id: string; index: number }[];
    fragment?: string;
    skipWaitingForSpinner?: boolean;
  }): Promise<void> {
    const {
      searchTags = [],
      order = [],
      fragment = '',
      skipWaitingForSpinner = false,
    } = options ?? {};
    const searchParams = new URLSearchParams();

    if (searchTags.length > 0) {
      searchParams.set('searchTags', searchTags.join(','));
    }
    if (order.length > 0) {
      searchParams.set(
        'order',
        order
          .map((item, index) =>
            typeof item === 'string'
              ? `${item}:${index}`
              : `${item.id}:${item.index}`
          )
          .join(',')
      );
    }

    const query = searchParams.toString();
    const relativeUrl =
      UrlHelper.HOME +
      (query ? `?${query}` : '') +
      (fragment ? `#${fragment}` : '');

    await this.page.goto(relativeUrl);
    if (!skipWaitingForSpinner && searchTags.length > 0) {
      await expect(this.homePage.tagInput().spinner).toBeVisible();
      await expect(this.homePage.tagInput().spinner).toBeHidden({
        timeout: 20000,
      });
    }
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
