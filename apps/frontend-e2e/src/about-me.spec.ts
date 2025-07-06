import { expect, test } from '@playwright/test';

test.describe('About Me Section', () => {
  test('displays the about me section', async ({ page }) => {
    await page.goto('/');
    const aboutMeSection = await getAboutMeSection(page);
    await expect(aboutMeSection.getByText('Oliver Stadie')).toBeVisible();
  });

  test('displays profile image', async ({ page }) => {
    await page.goto('/');
    const aboutMeSection = await getAboutMeSection(page);

    await expect(
      aboutMeSection.locator('img[alt*="profile photo" i]')
    ).toBeVisible();
  });

  test('displays hero content', async ({ page }) => {
    await page.goto('/');
    const hero = await getSubSection(page, /Oliver Stadie.*Well-organized/);

    await expect(hero.getByText('Oliver Stadie')).toBeVisible();
    await expect(
      hero.getByText('Full-Stack Web and App Developer')
    ).toBeVisible();
    await expect(hero.getByText('Berlin')).toBeVisible();
    await expect(hero.getByText('Germany')).toBeVisible();
    await expect(
      hero.getByText(/Well-organized.*professional.*business/s)
    ).toBeVisible();
  });

  test('displays Personal Information', async ({ page }) => {
    await page.goto('/');
    const personalInfo = await getSubSection(
      page,
      /Personal Information.*1984.*German/
    );

    await expect(personalInfo.getByText('Personal Information')).toBeVisible();
    await expect(personalInfo.getByText('1984')).toBeVisible();
    await expect(personalInfo.getByText(/^German$/)).toBeVisible();
    await expect(personalInfo.getByText('English')).toBeVisible();
    await expect(personalInfo.getByText('Chinese')).toBeVisible();
  });

  test('displays Education', async ({ page }) => {
    await page.goto('/');
    const education = await getSubSection(page, /Education.*Very Good/);

    await expect(education.getByText('Education')).toBeVisible();
    // cSpell: disable-next-line
    await expect(education.getByText('Diplom Degree')).toBeVisible();
    await expect(education.getByText('Computer Science')).toBeVisible();
    await expect(education.getByText('Humboldt')).toBeVisible();
    await expect(education.getByText('Berlin')).toBeVisible();
    await expect(education.getByText('Very Good')).toBeVisible();
    await expect(education.getByText('Engineering Science')).toBeVisible();
  });

  test('displays Community & Writing', async ({ page }) => {
    await page.goto('/');
    const comAndWriting = await getSubSection(page, /Community.*Meetup.*Blog/);

    await expect(comAndWriting.getByText('Community & Writing')).toBeVisible();
    await expect(comAndWriting.getByText('Meetup')).toBeVisible();
    await expect(comAndWriting.getByText('Founder & Organizer')).toBeVisible();
    await expect(comAndWriting.getByText('Founder')).toBeVisible();
    await expect(comAndWriting.getByText('Blogger')).toBeVisible();
  });

  test('displays Professional Focus', async ({ page }) => {
    await page.goto('/');
    const profFocus = await getSubSection(
      page,
      /Professional Focus.*planning.*testing/
    );

    await expect(profFocus.getByText('Professional Focus')).toBeVisible();
    await expect(profFocus.getByText('experience')).toBeVisible();
    await expect(profFocus.getByText('planning')).toBeVisible();
    await expect(profFocus.getByText('design')).toBeVisible();
    await expect(profFocus.getByText('implement')).toBeVisible();
    await expect(profFocus.getByText('test')).toBeVisible();
    await expect(profFocus.getByText('deploy')).toBeVisible();
    await expect(profFocus.getByText('maintain')).toBeVisible();
  });
});

async function getAboutMeSection(page: Page): Promise<Locator> {
  const contactSection = page
    // NOTE: there are two about-me sections in the DOM, one for screen and one for print
    .locator('.screen-only')
    .getByText(/Oliver Stadie.*Personal Information.*Community & Writing/s);
  await expect(contactSection).toBeVisible();
  return contactSection;
}

async function getSubSection(
  page: Page,
  content: string | RegExp
): Promise<Locator> {
  const aboutMeSection = await getAboutMeSection(page);
  const subSection = aboutMeSection.getByText(content);
  await expect(subSection).toBeVisible();
  return subSection;
}
