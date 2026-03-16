import { Locator, type Page } from '@playwright/test';

import { AboutMe } from './about-me';
import { ContactMe } from './contact-me';
import { ProjectList } from './project-list';
import { Skills } from './skills';
import { TagInput } from './tag-input';

export class HomePage {
  readonly locator: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-home');
  }

  async goto() {
    await this.page.goto('/');
  }

  tagInput() {
    return new TagInput(this.page);
  }

  projectList() {
    return new ProjectList(this.page);
  }

  skills() {
    return new Skills(this.page);
  }

  aboutMe() {
    return new AboutMe(this.page);
  }

  contactMe() {
    return new ContactMe(this.page);
  }

  currentUrl(): URL {
    return new URL(this.page.url());
  }

  searchTerms(): string[] {
    const searchTags = this.currentUrl().searchParams.get('searchTags');
    return searchTags ? searchTags.split(',') : [];
  }
}
