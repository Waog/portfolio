import { expect, test } from '../fixtures/app.fixture';

test.describe('Navigation', () => {
  test('is visible', async ({ navigation }) => {
    await expect(navigation.locator).toBeVisible();
  });

  test('Projects Item updates URL', async ({ navigation, urlHelper }) => {
    await navigation.getNavItem('Projects').click();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasProjectsFragment()).toBe(true);
  });

  test('Skills Item updates URL', async ({ navigation, urlHelper }) => {
    await navigation.getNavItem('Skills').click();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasSkillsFragment()).toBe(true);
  });

  test('About Me Item updates URL', async ({ navigation, urlHelper }) => {
    await navigation.getNavItem('About me').click();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasAboutMeFragment()).toBe(true);
  });

  test('Contact Item updates URL', async ({ navigation, urlHelper }) => {
    await navigation.getNavItem('Contact').click();
    expect(urlHelper.isHomePage()).toBe(true);
    expect(urlHelper.hasContactFragment()).toBe(true);
  });
});

test.describe('Navigation: Viewport Checks', () => {
  test('selecting Projects item scrolls projects section into viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('Projects').click();
    await expect(homePage.projectList().locator).toBeInViewport();
  });

  test('selecting Skills item scrolls skills section into viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('Skills').click();
    await expect(homePage.skills().locator).toBeInViewport();
  });

  test('selecting About Me item scrolls About Me section into viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('About me').click();
    await expect(homePage.aboutMe().locator).toBeInViewport();
  });

  test('selecting Contact item scrolls Contact section into viewport', async ({
    homePage,
    navigation,
  }) => {
    await navigation.getNavItem('Contact').click();
    await expect(homePage.contactMe().locator).toBeInViewport();
  });

  test('loading page with #projects fragment scrolls projects section into viewport', async ({
    urlHelper,
    homePage,
  }) => {
    await urlHelper.gotoHomePage({ fragment: 'projects' });
    await expect(homePage.projectList().locator).toBeInViewport();
  });

  test('loading page with #skills fragment scrolls skills section into viewport', async ({
    urlHelper,
    homePage,
  }) => {
    await urlHelper.gotoHomePage({ fragment: 'skills' });
    await expect(homePage.skills().locator).toBeInViewport();
  });

  test('loading page with #about-me fragment scrolls About Me section into viewport', async ({
    urlHelper,
    homePage,
  }) => {
    await urlHelper.gotoHomePage({ fragment: 'about-me' });
    await expect(homePage.aboutMe().locator).toBeInViewport();
  });

  test('loading page with #contact fragment scrolls Contact section into viewport', async ({
    urlHelper,
    homePage,
  }) => {
    await urlHelper.gotoHomePage({ fragment: 'contact' });
    await expect(homePage.contactMe().locator).toBeInViewport();
  });
});
