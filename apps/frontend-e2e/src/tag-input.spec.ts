import { expect, test } from '@playwright/test';

test.describe('Tag Input Functionality', () => {
  test('should handle tag operations and URL synchronization', async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Step 1: Add "Spring Boot" as a search term
    const tagInput = page.locator('input[matInput]');
    await tagInput.fill('Spring Boot');

    // Click the Add button
    const addButton = page.locator('button:has-text("Add")');
    await addButton.click();

    // Step 2: Check if "Spring Boot" occurs as a tag in the UI (only in search tags, not project chips)
    const searchTagsContainer = page.locator(
      'lib-tag-input mat-chip-set.tag-list'
    );
    const springBootTag = searchTagsContainer.locator(
      'mat-chip:has-text("Spring Boot")'
    );
    await expect(springBootTag).toBeVisible(); // Step 3: Check if "Spring Boot" occurs in the URL
    await expect(page).toHaveURL(/searchTags=Spring%20Boot/);

    // Step 4: Refresh the browser
    await page.reload();

    // Step 5: Check if "Spring Boot" still occurs as a tag after refresh
    await expect(springBootTag).toBeVisible(); // Step 6: Remove the tag by clicking the x button (cancel icon)
    const removeButton = springBootTag.locator('mat-icon[matChipRemove]');
    await removeButton.click();

    // Step 7: Check if it's removed as a tag
    await expect(springBootTag).toBeHidden(); // Step 8: Check if it's removed from the URL    // URL should either not contain searchTags or have empty searchTags
    await expect(page).not.toHaveURL(/searchTags=Spring%20Boot/);
  });

  test('should handle multiple tags correctly', async ({ page }) => {
    await page.goto('/');

    // Add multiple tags
    const tagInput = page.locator('input[matInput]');
    const addButton = page.locator('button:has-text("Add")');
    const searchTagsContainer = page.locator(
      'lib-tag-input mat-chip-set.tag-list'
    );

    // Add first tag
    await tagInput.fill('Angular');
    await addButton.click();

    // Add second tag
    await tagInput.fill('TypeScript');
    await addButton.click();

    // Check both tags are visible in search tags only
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("Angular")')
    ).toBeVisible();
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("TypeScript")')
    ).toBeVisible(); // Check URL contains both tags
    await expect(page).toHaveURL(/searchTags=Angular,TypeScript/);

    // Remove one tag
    const angularTag = searchTagsContainer.locator(
      'mat-chip:has-text("Angular")'
    );
    await angularTag.locator('mat-icon[matChipRemove]').click();

    // Check only TypeScript remains
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("Angular")')
    ).toBeHidden();
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("TypeScript")')
    ).toBeVisible();

    // Check URL only contains TypeScript
    await expect(page).toHaveURL(/searchTags=TypeScript/);
    await expect(page).not.toHaveURL(/searchTags=.*Angular/);
  });
  test('should not add duplicate tags', async ({ page }) => {
    await page.goto('/');

    const tagInput = page.locator('input[matInput]');
    const addButton = page.locator('button:has-text("Add")');
    const searchTagsContainer = page.locator(
      'lib-tag-input mat-chip-set.tag-list'
    );

    // Add a tag
    await tagInput.fill('React');
    await addButton.click();

    // Try to add the same tag again
    await tagInput.fill('React');
    await addButton.click();

    // Should only have one React tag in search tags
    const reactTags = searchTagsContainer.locator('mat-chip:has-text("React")');
    await expect(reactTags).toHaveCount(1);
  });

  test('should handle Enter key to add tags', async ({ page }) => {
    await page.goto('/');

    const tagInput = page.locator('input[matInput]');
    const searchTagsContainer = page.locator(
      'lib-tag-input mat-chip-set.tag-list'
    );

    // Add tag using Enter key
    await tagInput.fill('Vue');
    await tagInput.press('Enter');

    // Check tag is added in search tags
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("Vue")')
    ).toBeVisible();

    // Check URL is updated
    await expect(page).toHaveURL(/searchTags=Vue/);
  });

  test('should handle URL initialization with existing tags', async ({
    page,
  }) => {
    // Navigate directly to URL with search tags
    await page.goto('/?searchTags=Node.js,Express');

    const searchTagsContainer = page.locator(
      'lib-tag-input mat-chip-set.tag-list'
    );

    // Check that both tags are displayed in search tags
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("Node.js")')
    ).toBeVisible();
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("Express")')
    ).toBeVisible();

    // Add another tag to verify functionality works
    const tagInput = page.locator('input[matInput]');
    const addButton = page.locator('button:has-text("Add")');

    await tagInput.fill('MongoDB');
    await addButton.click();

    // Check all three tags are present in search tags
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("Node.js")')
    ).toBeVisible();
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("Express")')
    ).toBeVisible();
    await expect(
      searchTagsContainer.locator('mat-chip:has-text("MongoDB")')
    ).toBeVisible(); // Check URL contains all tags
    await expect(page).toHaveURL(/searchTags=Node\.js,Express,MongoDB/);
  });
});
