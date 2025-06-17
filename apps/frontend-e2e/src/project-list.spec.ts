import { expect, test } from '@playwright/test';

test.describe('Project List Page', () => {
  test('displays main heading with projects title', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'My Projects' })
    ).toBeVisible();
  });

  test('displays one project title', async ({ page }) => {
    await page.goto('/');

    await expect(
      page
        .locator('mat-card-title')
        .filter({ hasText: /Language Learning App/ })
    ).toBeVisible();
  });

  test('displays one company', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/edenspiekerman/i)).toBeVisible();
  });

  test('displays one tech', async ({ page }) => {
    await page.goto('/');

    expect(
      await page
        .locator('mat-chip')
        .filter({ hasText: /Angular/ })
        .count()
    ).toBeGreaterThan(0);
  });
});
