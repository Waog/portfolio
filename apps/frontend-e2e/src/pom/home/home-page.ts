import { type Page } from '@playwright/test';

import { AboutMe } from './about-me';
import { TagInput } from './tag-input';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  tagInput() {
    return new TagInput(this.page);
  }

  aboutMe() {
    return new AboutMe(this.page);
  }

  currentUrl(): URL {
    return new URL(this.page.url());
  }

  searchTerms(): string[] {
    const searchTags = this.currentUrl().searchParams.get('searchTags');
    return searchTags ? searchTags.split(',') : [];
  }
}
