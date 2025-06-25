import { expect, type Locator, type Page, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates to Projects and checks URL', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('Projects').click();
    expect(page.url()).toContain('#projects');
  });

  test('navigates to Skills and checks URL', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('Skills').click();
    expect(page.url()).toContain('#skills');
  });

  test('navigates to About Me and checks URL', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('About me').click();
    expect(page.url()).toContain('#about-me');
  });

  test('navigates to Contact and checks URL', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('Contact').click();
    expect(page.url()).toContain('#contact');
  });
});

test.describe('Viewport Checks', () => {
  test('checks if Projects section is in the viewport', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('Projects').click();
    const isInViewport = await isElementInViewport(page, '#projects');
    expect(isInViewport).toBeTruthy();
  });

  test('checks if Skills section is in the viewport', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('Skills').click();
    const isInViewport = await isElementInViewport(page, '#skills');
    expect(isInViewport).toBeTruthy();
  });

  test('checks if About Me section is in the viewport', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('About me').click();
    const isInViewport = await isElementInViewport(page, '#about-me');
    expect(isInViewport).toBeTruthy();
  });

  test('checks if Contact section is in the viewport', async ({ page }) => {
    await page.goto('/');
    const navigation = await getNavigation(page);
    await navigation.getByText('Contact').click();
    const isInViewport = await isElementInViewport(page, '#contact');
    expect(isInViewport).toBeTruthy();
  });
});

async function getNavigation(page: Page): Promise<Locator> {
  const navigation = page.getByText(
    /Oliver Stadie.*Portfolio.*Projects.*Skills.*About me.*Contact/s
  );
  await expect(navigation).toBeVisible();
  return navigation;
}

async function isElementInViewport(
  page: Page,
  selector: string
): Promise<boolean> {
  await expect(page.locator(selector)).toBeVisible();

  const isInViewportHandle = await page.waitForFunction(
    selector => {
      const el = document.querySelector(selector);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    selector,
    { timeout: 1000 } // Wait for smooth scrolling to complete
  );

  return await isInViewportHandle.jsonValue();
}
