import { expect, Locator, type Page } from '@playwright/test';

export async function dragAndDropByMouse(
  page: Page,
  fromLocator: Locator,
  toLocator: Locator
): Promise<void> {
  await fromLocator.scrollIntoViewIfNeeded();
  await toLocator.scrollIntoViewIfNeeded();

  await expect(fromLocator).toBeVisible();
  await expect(toLocator).toBeVisible();

  const fromBox = await fromLocator.boundingBox();
  const toBox = await toLocator.boundingBox();

  if (!fromBox) {
    throw new Error('Could not determine drag & drop start position.');
  }
  if (!toBox) {
    throw new Error('Could not determine drag & drop end position.');
  }

  const startX = fromBox.x + fromBox.width / 2;
  const startY = fromBox.y + fromBox.height / 2;
  const endX = toBox.x + toBox.width / 2;
  const endY = toBox.y + toBox.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(endX, endY, { steps: 2 });
  await page.mouse.up();
}
