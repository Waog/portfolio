import { expect, test } from '@playwright/test';

test.describe('Project List Page', () => {
  test('displays all projects by default (when no search tags)', async ({
    page,
  }) => {
    await page.goto('/'); // Should show all projects when no search filters are active
    await expect(page.locator('lib-project-item')).toHaveCount(8); // 8 total projects

    // Should not show "Top Matching Projects" section
    await expect(
      page.getByRole('heading', { name: 'Top Matching Projects' })
    ).toBeHidden();
  });

  test('displays project titles', async ({ page }) => {
    await page.goto('/');

    await expect(
      page
        .locator('mat-card-title')
        .filter({ hasText: /AI-Powered Language Learning App/ })
    ).toBeVisible();

    await expect(
      page
        .locator('mat-card-title')
        .filter({ hasText: /Enterprise Lottery Platform/ })
    ).toBeVisible();
  });
  test('displays company information', async ({ page }) => {
    await page.goto('/');

    // Target company information specifically within project cards
    await expect(
      page
        .locator('lib-project-item .primary-text')
        .filter({ hasText: /Oliver Stadie IT GmbH/i })
    ).toBeVisible();
  });

  test('displays technology chips', async ({ page }) => {
    await page.goto('/');

    expect(
      await page
        .locator('mat-chip')
        .filter({ hasText: /TypeScript/ })
        .count()
    ).toBeGreaterThan(0);

    expect(
      await page
        .locator('mat-chip')
        .filter({ hasText: /Angular/ })
        .count()
    ).toBeGreaterThan(0);
  });

  test('shows top matching projects when search tags are active', async ({
    page,
  }) => {
    // Navigate with a search tag that should match some projects
    await page.goto('/?searchTags=TypeScript');

    // Should show "Top Matching Projects" section
    await expect(
      page.getByRole('heading', { name: 'Top Matching Projects' })
    ).toBeVisible();

    // Should show toggle button for all projects
    await expect(
      page.getByRole('button', { name: /Show All Projects/ })
    ).toBeVisible(); // Top projects should have green border (check CSS class)
    await expect(page.locator('mat-card.top-project')).toHaveCount(3); // Top 3 matching projects
  });

  test('toggle functionality works correctly', async ({ page }) => {
    // Navigate with search tags to trigger top projects
    await page.goto('/?searchTags=TypeScript'); // Initially, "All Projects" section should be hidden
    await expect(
      page.getByRole('heading', { name: 'All Projects' })
    ).toBeHidden();

    // Click toggle button to show all projects
    await page.getByRole('button', { name: /Show All Projects/ }).click();

    // Now "All Projects" section should be visible
    await expect(
      page.getByRole('heading', { name: 'All Projects' })
    ).toBeVisible();

    // Button text should change
    await expect(
      page.getByRole('button', { name: /Hide All Projects/ })
    ).toBeVisible();

    // Click again to hide
    await page.getByRole('button', { name: /Hide All Projects/ }).click(); // "All Projects" section should be hidden again
    await expect(
      page.getByRole('heading', { name: 'All Projects' })
    ).toBeHidden();
  });

  test('projects with matching technologies have green border', async ({
    page,
  }) => {
    await page.goto('/?searchTags=TypeScript'); // Check that top matching projects have the green border class
    const topProjectCards = page.locator('mat-card.top-project');
    await expect(topProjectCards).toHaveCount(3); // Top 3 matching projects

    // Verify the green border is applied via CSS
    const firstTopProject = topProjectCards.first();
    await expect(firstTopProject).toHaveCSS(
      'border-left-color',
      'rgb(40, 167, 69)'
    ); // #28a745
  });
});
