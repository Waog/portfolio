import { expect, test } from '../fixtures/app.fixture';

test.describe('About Me Section', () => {
  test('displays the about me section', async ({ homePage }) => {
    const aboutMe = homePage.aboutMe();
    await expect(aboutMe.locator).toBeVisible();
    await expect(aboutMe.locator).toContainText('Oliver Stadie');
  });

  test('displays profile image', async ({ homePage }) => {
    const aboutMe = homePage.aboutMe();
    await expect(aboutMe.heroProfileImage).toBeVisible();
  });

  test('displays hero content', async ({ homePage }) => {
    const aboutMe = homePage.aboutMe();
    await expect(aboutMe.hero).toBeVisible();
    await expect(aboutMe.heroName).toHaveText('Oliver Stadie');
    await expect(aboutMe.heroRole).toHaveText(
      'Full-Stack Web and App Developer'
    );
    await expect(aboutMe.heroLocation).toHaveText('Berlin (Germany)');
    await expect(aboutMe.heroSummary).toHaveText(
      /Well-organized.*professional.*business/s
    );
  });

  test('displays Personal Information', async ({ homePage }) => {
    const aboutMe = homePage.aboutMe();
    await expect(aboutMe.personalInfo).toBeVisible();
    await expect(aboutMe.personalInfoTitle).toHaveText('Personal Information');
    await expect(aboutMe.personalInfoBirthYear).toContainText('1984');
    await expect(aboutMe.personalInfoLanguageChips).toHaveCount(3);
    await expect(aboutMe.personalInfoLanguageChip('German')).toBeVisible();
    await expect(aboutMe.personalInfoLanguageChip('English')).toBeVisible();
    await expect(aboutMe.personalInfoLanguageChip('Chinese')).toBeVisible();
  });

  test('displays Education', async ({ homePage }) => {
    const aboutMe = homePage.aboutMe();
    const education = aboutMe.education;

    await expect(education).toBeVisible();
    await expect(aboutMe.educationTitle).toHaveText('Education');
    // cSpell: disable-next-line
    await expect(education.getByText('Diplom Degree')).toBeVisible();
    await expect(education.getByText('Computer Science')).toBeVisible();
    await expect(education.getByText('Humboldt')).toBeVisible();
    await expect(education.getByText('Berlin')).toBeVisible();
    await expect(education.getByText('Very Good')).toBeVisible();
    await expect(education.getByText('Engineering Science')).toBeVisible();
  });

  test('displays Community & Writing', async ({ homePage }) => {
    const aboutMe = homePage.aboutMe();
    const comAndWriting = aboutMe.communityAndWriting;

    await expect(comAndWriting).toBeVisible();
    await expect(aboutMe.communityAndWritingTitle).toHaveText(
      'Community & Writing'
    );

    await expect(comAndWriting.getByText('Meetup')).toBeVisible();
    await expect(comAndWriting.getByText('Founder & Organizer')).toBeVisible();
    await expect(comAndWriting.getByText('Blogger')).toBeVisible();
  });

  test('displays Professional Focus', async ({ homePage }) => {
    const aboutMe = homePage.aboutMe();
    const profFocus = aboutMe.professionalFocus;

    await expect(profFocus).toBeVisible();
    await expect(aboutMe.professionalFocusTitle).toHaveText(
      'Professional Focus'
    );

    await expect(profFocus.getByText('experience')).toBeVisible();
    await expect(profFocus.getByText('planning')).toBeVisible();
    await expect(profFocus.getByText('design')).toBeVisible();
    await expect(profFocus.getByText('implement')).toBeVisible();
    await expect(profFocus.getByText('test')).toBeVisible();
    await expect(profFocus.getByText('deploy')).toBeVisible();
    await expect(profFocus.getByText('maintain')).toBeVisible();
  });
});
