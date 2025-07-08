import { expect, type Locator, type Page, test } from '@playwright/test';

test.describe('Skills Section', () => {
  test('displays some categories', async ({ page }) => {
    await page.goto('/');

    const skillsSection = await getSkillsSection(page);
    await expect(skillsSection.getByText(/^Frontend:$/)).toBeVisible();
    await expect(skillsSection.getByText(/^Backend:$/)).toBeVisible();
    await expect(skillsSection.getByText(/^Misc:$/)).toBeVisible();
  });

  test('displays frontend technologies', async ({ page }) => {
    await page.goto('/?searchTags=Angular,React');

    const skillsSection = await getSkillsSection(page);

    await expect(
      skillsSection.getByText('Angular', { exact: true })
    ).toBeVisible();
    await expect(
      skillsSection.getByText('React Native', { exact: true })
    ).toBeVisible();
  });

  test('displays backend technologies', async ({ page }) => {
    await page.goto('/?searchTags=Node,Java');

    const skillsSection = await getSkillsSection(page);

    await expect(
      skillsSection.getByText('Node.js', { exact: true })
    ).toBeVisible();
    await expect(
      skillsSection.getByText('Java', { exact: true })
    ).toBeVisible();
  });
});

async function getSkillsSection(page: Page): Promise<Locator> {
  const skillsSection = page.getByText(/Skills.*Backend.*more/s);
  await expect(skillsSection).toBeVisible();
  return skillsSection;
}
