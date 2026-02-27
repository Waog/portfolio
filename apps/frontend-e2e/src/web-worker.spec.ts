import { expect, test } from '@playwright/test';

test.describe('Web Worker', () => {
  test('displays the result of the proof-of-concept web worker', async ({
    page,
  }) => {
    await page.goto('/');

    const result = page.locator('[data-testid="worker-result"]');

    // transform('hello') === { result: 'hello' }, displayed via json pipe
    await expect(result).toHaveText('{ "result": "hello" }');
  });

  test('memoize cache works inside web worker', async ({ page }) => {
    await page.goto('/');

    const status = page.locator('[data-testid="memoize-cache-status"]');
    await expect(status).toHaveText('Cache works');
    await expect(status).toHaveCSS('color', 'rgb(0, 128, 0)');
  });
});
