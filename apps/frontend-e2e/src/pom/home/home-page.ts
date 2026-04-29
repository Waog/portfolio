import { Locator, type Page } from '@playwright/test';

import { AboutMe } from './about-me';
import { ContactMe } from './contact-me';
import { ProjectList } from './project-list';
import { Skills } from './skills';
import { TagInput } from './tag-input';

export class HomePage {
  readonly locator: Locator;
  readonly pagesList: Locator;
  readonly pageSheet: Locator;
  readonly pageSheet1: Locator;
  readonly pageSheet2: Locator;
  readonly pageSheet3: Locator;
  readonly sheet1AboutMeSection: Locator;
  readonly sheet1MatchesOverviewSection: Locator;
  readonly sheet1SkillSection: Locator;
  readonly sheet1OrderedSections: Locator;
  readonly sheet2ProjectListSection: Locator;
  readonly sheet3ProjectListSection: Locator;
  readonly nonPrintTopLevelSections: Locator;

  constructor(private page: Page) {
    this.locator = page.locator('lib-home');

    this.pagesList = this.locator.locator('.pages-list');
    this.pageSheet = this.pagesList.locator('.page-sheet');
    this.pageSheet1 = this.pagesList.locator('.page-sheet--1');
    this.pageSheet2 = this.pagesList.locator('.page-sheet--2');
    this.pageSheet3 = this.pagesList.locator('.page-sheet--3');

    this.sheet1AboutMeSection = this.pageSheet1.locator('.about-me');
    this.sheet1MatchesOverviewSection =
      this.pageSheet1.locator('.matches-overview');
    this.sheet1SkillSection = this.pageSheet1.locator('.skill-section');

    this.sheet1OrderedSections = this.pageSheet1.locator(
      '.about-me + .matches-overview + .skill-section'
    );

    this.sheet2ProjectListSection = this.pageSheet2.locator('.project-list');
    this.sheet3ProjectListSection = this.pageSheet3.locator('.project-list');

    this.nonPrintTopLevelSections = this.locator.locator(
      '.home-container > lib-section'
    );
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

  async printSheetDimensions(index: number): Promise<{
    width: number;
    height: number;
  }> {
    return this.pageSheet.nth(index).evaluate(element => {
      const styles = getComputedStyle(element);
      return {
        width: Number.parseFloat(styles.width),
        height: Number.parseFloat(styles.height),
      };
    });
  }

  async nonPrintSectionClassOrder(): Promise<string[]> {
    return this.nonPrintTopLevelSections.evaluateAll((elements): string[] =>
      elements
        .map(element => element.getAttribute('class') ?? '')
        .filter(className =>
          [
            'matches-overview',
            'project-list',
            'skill-section',
            'about-me',
            'contact-section',
          ].some(token => className.includes(token))
        )
    );
  }
}
