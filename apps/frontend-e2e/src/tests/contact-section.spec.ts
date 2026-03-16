import { expect, type Locator, type Page, test } from '@playwright/test';

test.describe('Contact Section', () => {
  test('displays the contact section', async ({ page }) => {
    await page.goto('/');

    const contactSection = await getContactSection(page);
    await expect(contactSection.getByText('Contact Me')).toBeVisible();
    await expect(
      contactSection.getByText('oliver.stadie+it@gmail.com', { exact: true })
    ).toBeVisible();
    await expect(
      contactSection.getByText('+49 (1520) 28 25 986', { exact: true })
    ).toBeVisible();
  });
});

async function getContactSection(page: Page): Promise<Locator> {
  const contactSection = page.getByText(/Contact Me.*email.*phone/s);
  await expect(contactSection).toBeVisible();
  return contactSection;
}
