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

  test.describe('initial fragment loads', () => {
    test.use({ initialUrl: null });

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
});

test.describe('Navigation: interactions', () => {
  test('selecting Projects NavItem after loading preserves searchTags and custom order', async ({
    homePage,
    urlHelper,
    navigation,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['ionic', 'iOS'],
      order: [
        { id: 'unicorn-ecommerce', index: 1 },
        { id: 'towel-defence', index: 2 },
      ],
    });

    const projects = await homePage.projectList().topProjectItems();
    await expect(projects[0].title).toContainText('Self-Driving Car');
    await expect(projects[1].title).toContainText('Custom E-Commerce');
    await expect(projects[2].title).toContainText('Towel Defence');

    const tagInput = homePage.tagInput();
    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(/order=unicorn-ecommerce:1,towel-defence:2/);
    await expect(page).not.toHaveURL(/#/);

    await navigation.getNavItem('Projects').click();

    const newProjects = await homePage.projectList().topProjectItems();
    await expect(newProjects[0].title).toContainText('Self-Driving Car');
    await expect(newProjects[1].title).toContainText('Custom E-Commerce');
    await expect(newProjects[2].title).toContainText('Towel Defence');

    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(/order=unicorn-ecommerce:1,towel-defence:2/);
    await expect(page).toHaveURL(/#projects/);
  });

  test('selecting Projects NavItem after SPA changes preserves searchTags and custom order', async ({
    homePage,
    navigation,
    page,
  }) => {
    const tagInput = homePage.tagInput();
    await tagInput.addSearchTerm('ionic');
    await tagInput.addSearchTerm('iOS');

    const projects = await homePage.projectList().topProjectItems();
    await projects[1].decreaseCustomOrder();

    await expect(projects[0].title).toContainText('Self-Driving Car');
    await expect(projects[1].title).toContainText('Custom E-Commerce');
    await expect(projects[2].title).toContainText('Towel Defence');

    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(/order=unicorn-ecommerce:1,towel-defence:2/);
    await expect(page).not.toHaveURL(/#/);

    await navigation.getNavItem('Projects').click();

    const newProjects = await homePage.projectList().topProjectItems();
    await expect(newProjects[0].title).toContainText('Self-Driving Car');
    await expect(newProjects[1].title).toContainText('Custom E-Commerce');
    await expect(newProjects[2].title).toContainText('Towel Defence');

    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(/order=unicorn-ecommerce:1,towel-defence:2/);
    await expect(page).toHaveURL(/#projects/);
  });

  test('selecting Brand Logo Link after loading resets searchTags and custom order', async ({
    homePage,
    urlHelper,
    navigation,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['ionic', 'iOS'],
      order: [
        { id: 'unicorn-ecommerce', index: 1 },
        { id: 'towel-defence', index: 2 },
      ],
    });

    const projects = await homePage.projectList().topProjectItems();
    await expect(projects[0].title).toContainText('Self-Driving Car');
    await expect(projects[1].title).toContainText('Custom E-Commerce');
    await expect(projects[2].title).toContainText('Towel Defence');

    const tagInput = homePage.tagInput();
    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(/order=unicorn-ecommerce:1,towel-defence:2/);
    await expect(page).not.toHaveURL(/#/);

    await navigation.brandLink.click();

    const newProjects = await homePage.projectList().topProjectItems();
    await expect(newProjects[0].title).toContainText('My Developer Portfolio');
    await expect(newProjects[1].title).toContainText('AI-Powered Language');
    await expect(newProjects[2].title).toContainText('Lottery Platform');

    await expect(tagInput.chipTexts).toHaveCount(0);

    await expect(page).not.toHaveURL(/searchTags/);
    await expect(page).not.toHaveURL(/order/);
    await expect(page).not.toHaveURL(/#/);
  });

  test('selecting Brand Logo Link after SPA changes resets searchTags and custom order', async ({
    homePage,
    navigation,
    page,
  }) => {
    const tagInput = homePage.tagInput();
    await tagInput.addSearchTerm('ionic');
    await tagInput.addSearchTerm('iOS');

    const projects = await homePage.projectList().topProjectItems();
    await projects[1].decreaseCustomOrder();

    await expect(projects[0].title).toContainText('Self-Driving Car');
    await expect(projects[1].title).toContainText('Custom E-Commerce');
    await expect(projects[2].title).toContainText('Towel Defence');

    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(/order=unicorn-ecommerce:1,towel-defence:2/);
    await expect(page).not.toHaveURL(/#/);

    await navigation.brandLink.click();

    const newProjects = await homePage.projectList().topProjectItems();
    await expect(newProjects[0].title).toContainText('My Developer Portfolio');
    await expect(newProjects[1].title).toContainText('AI-Powered Language');
    await expect(newProjects[2].title).toContainText('Lottery Platform');

    await expect(tagInput.chipTexts).toHaveCount(0);

    await expect(page).not.toHaveURL(/searchTags/);
    await expect(page).not.toHaveURL(/order/);
    await expect(page).not.toHaveURL(/#/);
  });
});

test.describe('Navigation: Progress Bar', () => {
  test('shows loading progress bar with intermediate progress while searching', async ({
    navigation,
    urlHelper,
  }) => {
    await expect(navigation.progressBar).toBeHidden();

    await urlHelper.gotoHomePage({
      searchTags: ['Angular', 'TypeScript', 'Spring Boot'],
      skipWaitingForSpinner: true,
    });

    await expect(navigation.getProgressBarBetween(1, 99)).toBeVisible();
    await expect(navigation.progressBar).toBeHidden({ timeout: 20000 });
  });
});
