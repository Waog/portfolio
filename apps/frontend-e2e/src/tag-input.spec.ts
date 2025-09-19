import { expect, test } from '@playwright/test';

test.describe('Tag Input Functionality', () => {
  test('should handle tag operations and URL synchronization', async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Step 1: Add "Spring Boot" as a search term
    const tagInput = page.locator('input[matInput]');
    await tagInput.fill('Spring Boot');

    // Click the Add button
    const addButton = page.locator('button:has-text("Add")');
    await addButton.click(); // Step 2: Check if "Spring Boot" occurs as a tag in the UI (only in search tags, not project chips)
    const searchTagsContainer = page.locator('lib-tag-input');
    const springBootTag = searchTagsContainer.getByText('Spring Boot').first();
    await expect(springBootTag).toBeVisible(); // Step 3: Check if "Spring Boot" occurs in the URL
    await expect(page).toHaveURL(/searchTags=Spring%20Boot/);

    // Step 4: Refresh the browser
    await page.reload({ waitUntil: 'domcontentloaded' });
    // Step 5: Check if "Spring Boot" still occurs as a tag after refresh
    const refreshedSpringBootTag = searchTagsContainer
      .getByText('Spring Boot')
      .first();
    await expect(refreshedSpringBootTag).toBeVisible();

    // Step 6: Remove the tag by clicking on its close button
    const springBootChip = searchTagsContainer
      .locator('lib-color-chip')
      .filter({ hasText: 'Spring Boot' });
    const closeButton = springBootChip.locator('button.chip-close-button');
    await closeButton.click(); // Step 7: Check if it's removed as a tag
    const springBootChipAfterRemoval = searchTagsContainer
      .locator('lib-color-chip')
      .filter({ hasText: 'Spring Boot' });
    await expect(springBootChipAfterRemoval).toBeHidden(); // Step 8: Check if it's removed from the URL    // URL should either not contain searchTags or have empty searchTags
    await expect(page).not.toHaveURL(/searchTags=Spring%20Boot/);
  });

  test('should handle multiple tags correctly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Add multiple tags
    const tagInput = page.locator('input[matInput]');
    const addButton = page.locator('button:has-text("Add")');
    const searchTagsContainer = page.locator('lib-tag-input');

    // Add first tag
    await tagInput.fill('Angular');
    await addButton.click();

    // Add second tag
    await tagInput.fill('TypeScript');
    await addButton.click();

    // Check both tags are visible in search tags only
    await expect(
      searchTagsContainer.getByText('Angular').first()
    ).toBeVisible();
    await expect(
      searchTagsContainer.getByText('TypeScript').first()
    ).toBeVisible(); // Check URL contains both tags    await expect(page).toHaveURL(/searchTags=Angular,TypeScript/);

    // Remove one tag
    const angularChip = searchTagsContainer
      .locator('lib-color-chip')
      .filter({ hasText: 'Angular' });
    const angularCloseButton = angularChip.locator('button.chip-close-button');
    await angularCloseButton.click(); // Check only TypeScript remains
    const angularChipAfterRemoval = searchTagsContainer
      .locator('lib-color-chip')
      .filter({ hasText: 'Angular' });
    await expect(angularChipAfterRemoval).toBeHidden();
    await expect(
      searchTagsContainer.getByText('TypeScript').first()
    ).toBeVisible();

    // Check URL only contains TypeScript
    await expect(page).toHaveURL(/searchTags=TypeScript/);
    await expect(page).not.toHaveURL(/searchTags=.*Angular/);
  });
  test('should not add duplicate tags', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const tagInput = page.locator('input[matInput]');
    const addButton = page.locator('button:has-text("Add")');
    const searchTagsContainer = page.locator('lib-tag-input');

    // Add a tag
    await tagInput.fill('React');
    await addButton.click();

    // Try to add the same tag again
    await tagInput.fill('React');
    await addButton.click();

    // Should only have one React tag in search tags
    const reactTags = searchTagsContainer.getByText('React');
    await expect(reactTags).toHaveCount(1);
  });

  test('should handle Enter key to add tags', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const tagInput = page.locator('input[matInput]');
    const searchTagsContainer = page.locator('lib-tag-input');

    // Add tag using Enter key
    await tagInput.fill('Vue');
    await tagInput.press('Enter');

    // Check tag is added in search tags
    await expect(searchTagsContainer.getByText('Vue').first()).toBeVisible();

    // Check URL is updated
    await expect(page).toHaveURL(/searchTags=Vue/);
  });

  test('should handle URL initialization with existing tags', async ({
    page,
  }) => {
    // Navigate directly to URL with search tags
    await page.goto('/?searchTags=Node.js,Express', {
      waitUntil: 'domcontentloaded',
    });

    const searchTagsContainer = page.locator('lib-tag-input');

    // Check that both tags are displayed in search tags
    await expect(
      searchTagsContainer.getByText('Node.js').first()
    ).toBeVisible();
    await expect(
      searchTagsContainer.getByText('Express').first()
    ).toBeVisible();

    // Add another tag to verify functionality works
    const tagInput = page.locator('input[matInput]');
    const addButton = page.locator('button:has-text("Add")');

    await tagInput.fill('MongoDB');
    await addButton.click();

    // Check all three tags are present in search tags
    await expect(
      searchTagsContainer.getByText('Node.js').first()
    ).toBeVisible();
    await expect(
      searchTagsContainer.getByText('Express').first()
    ).toBeVisible();
    await expect(
      searchTagsContainer.getByText('MongoDB').first()
    ).toBeVisible(); // Check URL contains all tags
    await expect(page).toHaveURL(/searchTags=Node\.js,Express,MongoDB/);
  });
});
