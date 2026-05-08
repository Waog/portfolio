import { expect, test } from '../fixtures/app.fixture';

test.describe('Project List Section', () => {
  test('displays the top 3 projects by default (when no search tags)', async ({
    homePage,
  }) => {
    const projectList = homePage.projectList();
    await expect(projectList.locator).toBeVisible();

    expect((await projectList.projectItems()).length).toBe(3);
    await expect(projectList.topProjectsSection).toBeVisible();
    await expect(projectList.topProjectsSectionTitle).toBeVisible();
    await expect(projectList.otherProjectsSection).toBeHidden();
  });

  test('displays project titles', async ({ homePage }) => {
    const projectList = homePage.projectList();
    const aiProject = await projectList.projectItemByTitle(
      /AI-Powered Language Learning App/
    );
    const lotteryProject = await projectList.projectItemByTitle(
      /Enterprise Lottery Platform/
    );
    await expect(aiProject.title).toBeVisible();
    await expect(lotteryProject.title).toBeVisible();
  });

  test('displays team information', async ({ homePage }) => {
    const aiProject = await homePage
      .projectList()
      .projectItemByTitle(/AI-Powered Language Learning App/);
    await expect(aiProject.team).toHaveText(/Solo/);
  });

  test('displays duration information', async ({ homePage }) => {
    const lotteryProject = await homePage
      .projectList()
      .projectItemByTitle(/Enterprise Lottery Platform/);
    await expect(lotteryProject.duration).toHaveText(/11 months/);
  });

  test('displays location information', async ({ homePage }) => {
    const aiProject = await homePage
      .projectList()
      .projectItemByTitle(/AI-Powered Language Learning App/);
    await expect(aiProject.location).toHaveText(/Remote/);
  });

  test('displays industry information', async ({ homePage }) => {
    const aiProject = await homePage
      .projectList()
      .projectItemByTitle(/AI-Powered Language Learning App/);
    await expect(aiProject.industry).toHaveText(/Education Technology/);
  });

  test('displays technology chips', async ({ homePage }) => {
    const aiProject = await homePage
      .projectList()
      .projectItemByTitle(/AI-Powered Language Learning App/);
    await expect(aiProject.chip('Spring Boot')).toBeVisible();
    await expect(aiProject.chip('React Native')).toBeVisible();
  });

  test('sorts projects according to search tags in URL on load', async ({
    homePage,
    urlHelper,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Ionic', 'iOS'],
    });

    const projectItems = await homePage.projectList().projectItems();

    await expect(projectItems[0].title).toHaveText(/Self-Driving Car/);
    await expect(projectItems[0].greenChipTexts).toHaveText(['Ionic', 'iOS']);

    await expect(projectItems[1].title).toHaveText(/Towel Defence/);
    await expect(projectItems[1].greenChipTexts).toHaveText(['iOS']);
  });

  test('sorts projects according to custom project order in URL on load', async ({
    homePage,
    urlHelper,
  }) => {
    await urlHelper.gotoHomePage({
      order: ['minecraft-clone', 'stomap'],
    });

    const projectItems = await homePage.projectList().projectItems();

    await expect(projectItems[0].title).toHaveText(/Minecraft/);
    await expect(projectItems[1].title).toHaveText(/Stomap/);
  });

  test('sorts projects according to searchTags and order in URL on load', async ({
    homePage,
    urlHelper,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Ionic', 'iOS'],
    });

    const projectItems = await homePage.projectList().projectItems();

    await expect(projectItems[0].title).toHaveText(/Self-Driving Car/);
    await expect(projectItems[1].title).toHaveText(/Towel Defence/);
    const thirdTitle: string | null = await projectItems[2].title.textContent();

    // NOTE: switch the top 2 and expect the third to not change
    await urlHelper.gotoHomePage({
      searchTags: ['Ionic', 'iOS'],
      order: ['towel-defence', 'self-driving-car-demo'],
    });
    const newProjectItems = await homePage.projectList().projectItems();

    await expect(newProjectItems[0].title).toHaveText(/Towel Defence/);
    await expect(newProjectItems[1].title).toHaveText(/Self-Driving Car/);
    await expect(newProjectItems[2].title).toHaveText(
      thirdTitle || 'ERROR: no third title found'
    );
  });

  test('toggle functionality shows/hides all projects', async ({
    homePage,
  }) => {
    const projectList = homePage.projectList();

    await expect(projectList.topProjectsSection).toBeVisible();
    await expect(projectList.otherProjectsSection).toBeHidden();
    await expect(projectList.toggleOtherProjectsButton).toHaveText(
      /Show All Projects/
    );

    await projectList.toggleOtherProjectsButton.click();

    await expect(projectList.topProjectsSection).toBeVisible();
    await expect(projectList.otherProjectsSection).toBeVisible();
    await expect(projectList.toggleOtherProjectsButton).toHaveText(
      /Hide All Projects/
    );

    await projectList.toggleOtherProjectsButton.click();

    await expect(projectList.topProjectsSection).toBeVisible();
    await expect(projectList.otherProjectsSection).toBeHidden();
    await expect(projectList.toggleOtherProjectsButton).toHaveText(
      /Show All Projects/
    );
  });

  test('top matching projects have green border', async ({ homePage }) => {
    const topProjectItems = await homePage.projectList().topProjectItems();
    expect(topProjectItems.length).toBe(3);
    for (const item of topProjectItems) {
      expect(await item.hasGreenBorder()).toBe(true);
    }
  });
});
