import { type Page } from '@playwright/test';

export class UrlHelper {
  constructor(private page: Page) {}

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
