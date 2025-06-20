import { expect, test } from '@playwright/test';

test.describe('About Me Section', () => {
  test('displays the about me section', async ({ page }) => {
    await page.goto('/');

    // Check that the about-me component is present
    await expect(page.locator('lib-about-me')).toBeVisible();

    // Check that the main card is visible
    await expect(
      page.locator('lib-about-me mat-card.about-me-card')
    ).toBeVisible();
  });

  test('displays personal information', async ({ page }) => {
    await page.goto('/');

    // Check name is displayed
    await expect(
      page.locator('mat-card-title').filter({ hasText: /Oliver Stadie/ })
    ).toBeVisible();

    // Check location is displayed
    await expect(
      page.locator('mat-card-subtitle').filter({ hasText: /Berlin • Germany/ })
    ).toBeVisible();

    // Check role chip is displayed
    await expect(
      page
        .locator('mat-chip')
        .filter({ hasText: /Full-Stack Web and App Developer/ })
    ).toBeVisible();
  });

  test('displays profile image', async ({ page }) => {
    await page.goto('/');

    // Check that profile image is present
    await expect(
      page.locator('lib-about-me img[alt="Oliver Stadie Profile Photo"]')
    ).toBeVisible();
  });

  test('displays personal details', async ({ page }) => {
    await page.goto('/');

    // Check birth year information
    await expect(
      page.locator('.info-label').filter({ hasText: /Born/ })
    ).toBeVisible();

    await expect(
      page.locator('.info-value').filter({ hasText: /1984/ })
    ).toBeVisible();

    // Check languages section
    await expect(
      page.locator('.info-label').filter({ hasText: /Languages/ })
    ).toBeVisible();

    await expect(
      page.locator('.language-item').filter({ hasText: /German/ })
    ).toBeVisible();

    await expect(
      page.locator('.language-item').filter({ hasText: /English/ })
    ).toBeVisible();
  });

  test('displays education information', async ({ page }) => {
    await page.goto('/');

    // Check education section title
    await expect(
      page.locator('.section-title').filter({ hasText: /Education/ })
    ).toBeVisible();

    // Check degree title
    await expect(
      page
        .locator('.degree-title')
        .filter({ hasText: /Diplom Degree in Computer Science/ })
    ).toBeVisible();

    // Check university
    await expect(
      page
        .locator('.university')
        .filter({ hasText: /Humboldt Universität zu Berlin/ })
    ).toBeVisible();

    // Check grade information
    await expect(
      page.locator('.grade-text').filter({ hasText: /Very Good/ })
    ).toBeVisible();
  });

  test('displays community activities', async ({ page }) => {
    await page.goto('/');

    // Check community section title
    await expect(
      page.locator('.section-title').filter({ hasText: /Community & Writing/ })
    ).toBeVisible();

    // Check meetup organizer information
    await expect(
      page.locator('.info-label').filter({ hasText: /Meetup Organizer/ })
    ).toBeVisible();

    await expect(
      page
        .locator('.info-value')
        .filter({ hasText: /Software Architecture and Design Berlin/ })
    ).toBeVisible();

    // Check tech blogger information
    await expect(
      page.locator('.info-label').filter({ hasText: /Tech Blogger/ })
    ).toBeVisible();

    await expect(
      page
        .locator('.info-value')
        .filter({ hasText: /Blogging about Software Architecture/ })
    ).toBeVisible();
  });

  test('displays working external links', async ({ page }) => {
    await page.goto('/');

    // Check that external links are present (but don't click them in E2E tests)
    await expect(page.locator('a[href*="meetup.com"]')).toBeVisible();

    await expect(page.locator('a[href*="waog.wordpress.com"]')).toBeVisible();

    await expect(
      page.locator('a[href*="oliver-stadie-diplom-certificate.pdf"]')
    ).toBeVisible();
  });

  test('displays hero summary', async ({ page }) => {
    await page.goto('/');

    // Check that the professional summary is displayed
    await expect(
      page.locator('.hero-summary').filter({
        hasText:
          /Well-organized, broad-minded, passionate and responsible IT professional/,
      })
    ).toBeVisible();
  });
  test('displays section icons', async ({ page }) => {
    await page.goto('/');

    // Check that various section icons are present within the about-me section
    await expect(
      page.locator('lib-about-me mat-icon').filter({ hasText: /person/ })
    ).toBeVisible();

    await expect(
      page.locator('lib-about-me mat-icon').filter({ hasText: /school/ })
    ).toBeVisible();

    await expect(
      page
        .locator('lib-about-me mat-icon')
        .filter({ hasText: /volunteer_activism/ })
    ).toBeVisible();
  });
});
