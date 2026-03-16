import { expect, test } from '../fixtures/app.fixture';

test.describe('Navigation', () => {
  test('is visible', async ({ navigation }) => {
    await expect(navigation.locator).toBeVisible();
  });

  test('navigates to Projects and updates URL', async ({
    homePage,
    navigation,
    urlHelper,
  }) => {
    await navigation.getNavItem('Projects').click();
    await expect(homePage.locator).toBeVisible();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasProjectsFragment()).toBe(true);
  });

  test('navigates to Skills and updates URL', async ({
    homePage,
    navigation,
    urlHelper,
  }) => {
    await navigation.getNavItem('Skills').click();
    await expect(homePage.locator).toBeVisible();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasSkillsFragment()).toBe(true);
  });

  test('navigates to About Me and updates URL', async ({
    homePage,
    navigation,
    urlHelper,
  }) => {
    await navigation.getNavItem('About me').click();
    await expect(homePage.locator).toBeVisible();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasAboutMeFragment()).toBe(true);
  });

  test('navigates to Contact and updates URL', async ({
    homePage,
    navigation,
    urlHelper,
  }) => {
    await navigation.getNavItem('Contact').click();
    await expect(homePage.locator).toBeVisible();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasContactFragment()).toBe(true);
  });
});

test.describe('Viewport Checks', () => {
  test('checks if Projects section is in the viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('Projects').click();
    await expect(homePage.projectList().locator).toBeInViewport();
  });

  test('checks if Skills section is in the viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('Skills').click();
    await expect(homePage.skills().locator).toBeInViewport();
  });

  test('checks if About Me section is in the viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('About me').click();
    await expect(homePage.aboutMe().locator).toBeInViewport();
  });

  test('checks if Contact section is in the viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('Contact').click();
    await expect(homePage.contactMe().locator).toBeInViewport();
  });
});
