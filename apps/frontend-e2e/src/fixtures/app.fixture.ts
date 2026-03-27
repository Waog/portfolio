import { test as base } from '@playwright/test';

import { Footer } from '../pom/footer/footer';
import { HomePage } from '../pom/home/home-page';
import { LegalPage } from '../pom/legal/legal-page';
import { Navigation } from '../pom/navigation/navigation';
import { UrlHelper } from '../pom/url-helper/url-helper';
import { WebMetadataPage } from '../pom/web-metadata/web-metadata-page';

type MyFixtures = {
  homePage: HomePage;
  navigation: Navigation;
  footer: Footer;
  urlHelper: UrlHelper;
  webMetadataPage: WebMetadataPage;
  legalPage: LegalPage;
};

type MyOptions = {
  initialUrl: string | null;
};

type MyInternalFixtures = MyFixtures & {
  _initialLoad: void;
};

export const test = base.extend<MyInternalFixtures & MyOptions>({
  initialUrl: ['/', { option: true }],
  // Shared initial navigation that runs once, before any fixture uses the page
  _initialLoad: async ({ page, initialUrl }, use) => {
    if (initialUrl !== null) {
      await page.goto(initialUrl);
    }
    await use();
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  homePage: async ({ _initialLoad, page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation: async ({ _initialLoad, page }, use) => {
    const navigation = new Navigation(page);
    await use(navigation);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  footer: async ({ _initialLoad, page }, use) => {
    const footer = new Footer(page);
    await use(footer);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webMetadataPage: async ({ _initialLoad, page, request }, use) => {
    const webMetadataPage = new WebMetadataPage(page, request);
    await use(webMetadataPage);
  },
  urlHelper: async ({ page, homePage }, use) => {
    const urlHelper = new UrlHelper(page, homePage);
    await use(urlHelper);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  legalPage: async ({ _initialLoad, page }, use) => {
    const legalPage = new LegalPage(page);
    await use(legalPage);
  },
});

export { expect } from '@playwright/test';
