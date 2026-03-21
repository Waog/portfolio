import { expect, test } from '@playwright/test';

const homepageTitle = 'Oliver Stadie – Full-Stack Web & App Developer';

const legalPages = [
  {
    footerLinkText: 'Imprint',
    path: '/legal/imprint',
    title: 'Imprint | Oliver Stadie',
  },
  {
    footerLinkText: 'Privacy',
    path: '/legal/privacy-policy',
    title: 'Privacy | Oliver Stadie',
  },
  {
    footerLinkText: 'Cookies',
    path: '/legal/cookie-policy',
    title: 'Cookies | Oliver Stadie',
  },
] as const;

test.describe('Page Metadata', () => {
  test('sets the homepage title on initial load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveTitle(homepageTitle);
  });

  for (const legalPage of legalPages) {
    test(`sets the correct title for ${legalPage.footerLinkText} on direct load`, async ({
      page,
    }) => {
      await page.goto(legalPage.path);
      await page.waitForLoadState('domcontentloaded');

      await expect(page).toHaveURL(new RegExp(`${legalPage.path}$`));
      await expect(page).toHaveTitle(legalPage.title);
    });
  }

  test('updates the title when navigating between routes in the SPA', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveTitle(homepageTitle);

    for (const legalPage of legalPages) {
      const footerLink = page
        .locator('footer')
        .getByRole('link', { name: legalPage.footerLinkText });

      await footerLink.click();

      await expect(page).toHaveURL(new RegExp(`${legalPage.path}$`));
      await expect(page).toHaveTitle(legalPage.title);
    }
  });
});
