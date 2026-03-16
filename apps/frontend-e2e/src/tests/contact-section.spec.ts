import { expect, test } from '../fixtures/app.fixture';

test.describe('Contact Section', () => {
  test('displays the contact section', async ({ homePage }) => {
    const contactMe = homePage.contactMe();
    await expect(contactMe.locator).toBeVisible();
    await expect(contactMe.title).toContainText('Contact Me');
    await expect(contactMe.email).toContainText('oliver.stadie+it@gmail.com');
    await expect(contactMe.phone).toContainText('+49 (1520) 28 25 986');
  });
});
