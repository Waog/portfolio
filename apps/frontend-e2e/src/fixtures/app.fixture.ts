import { test as base } from '@playwright/test';

import { HomePage } from '../pom/home/home-page';
import { Navigation } from '../pom/navigation/navigation';
import { UrlHelper } from '../pom/url-helper/url-helper';

type MyFixtures = {
  homePage: HomePage;
  navigation: Navigation;
  urlHelper: UrlHelper;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  navigation: async ({ page }, use) => {
    const navigation = new Navigation(page);
    await page.goto('/');
    await use(navigation);
  },
  urlHelper: async ({ page }, use) => {
    const urlHelper = new UrlHelper(page);
    await use(urlHelper);
  },
});

export { expect } from '@playwright/test';
