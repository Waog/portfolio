import { expect, type Locator, type Page, test } from '@playwright/test';

test.describe('Skills Section', () => {
  test('displays the skills section', async ({ page }) => {
    await page.goto('/');

    const skillsSection = await getSkillsSection(page);
    await expect(
      skillsSection.getByText('Frontend', { exact: true })
    ).toBeVisible();
    await expect(
      skillsSection.getByText('Backend', { exact: true })
    ).toBeVisible();
    await expect(
      skillsSection.getByText('Testing and QA', { exact: true })
    ).toBeVisible();
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
  const skillsSection = page.getByText(/Skills.*General.*Frontend.*Backend/s);
  await expect(skillsSection).toBeVisible();
  return skillsSection;
}
