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
    await expect(aiProject.chip('Java')).toBeVisible();
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

  test('changing custom order of projects is encoded in URL', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Ionic', 'iOS'],
    });

    const projectItems = await homePage.projectList().topProjectItems();
    await expect(projectItems[0].title).toHaveText(/Self-Driving Car/);
    await expect(projectItems[1].title).toHaveText(/Towel Defence/);

    await expect(page).not.toHaveURL(/order=/);

    await projectItems[0].decreaseCustomOrder();

    await expect(page).toHaveURL(
      /order=towel-defence:0,self-driving-car-demo:1/
    );
  });

  test('undoing the custom order of projects removes them from the URL', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Ionic', 'iOS'],
      order: ['towel-defence', 'self-driving-car-demo'],
    });

    const projectItems = await homePage.projectList().topProjectItems();
    await expect(projectItems[0].title).toHaveText(/Towel Defence/);
    await expect(projectItems[1].title).toHaveText(/Self-Driving Car/);

    await expect(page).toHaveURL(
      /order=towel-defence:0,self-driving-car-demo:1/
    );

    await projectItems[0].decreaseCustomOrder();

    await expect(page).not.toHaveURL(/order=/);
  });

  test('changing custom order of projects changes displayed project order, preserves viewport', async ({
    homePage,
    urlHelper,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Angular'],
    });

    const projectItems = await homePage.projectList().topProjectItems();

    const title0: string | null = await projectItems[0].title.textContent();
    const title1: string | null = await projectItems[1].title.textContent();
    const title2: string | null = await projectItems[2].title.textContent();

    await expect(projectItems[2].locator).not.toBeInViewport();
    await projectItems[2].locator.scrollIntoViewIfNeeded();
    await expect(projectItems[2].locator).toBeInViewport();

    await projectItems[1].increaseCustomOrder();

    const newItems = await homePage.projectList().topProjectItems();

    await expect(newItems[0].title).toHaveText(title1 || 'ERROR: no title1');
    await expect(newItems[1].title).toHaveText(title0 || 'ERROR: no title0');
    await expect(newItems[2].title).toHaveText(title2 || 'ERROR: no title2');

    await expect(newItems[2].locator).toBeInViewport();
  });

  test('changing custom order of projects preserves searchTags in URL, chips, original order', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Ionic', 'iOS'],
    });
    const tagInput = homePage.tagInput();
    await expect(tagInput.chipTexts).toHaveText(['Ionic', 'iOS']);
    await expect(page).toHaveURL(/searchTags=Ionic,iOS/);
    await expect(page).not.toHaveURL(/order=/);

    const projectItems = await homePage.projectList().topProjectItems();
    await expect(projectItems[0].title).toHaveText(/Self-Driving Car/);
    await expect(projectItems[1].title).toHaveText(/Towel Defence/);
    const title2: string | null = await projectItems[2].title.textContent();

    await projectItems[0].decreaseCustomOrder();

    await expect(tagInput.chipTexts).toHaveText(['Ionic', 'iOS']);
    await expect(page).toHaveURL(/searchTags=Ionic,iOS/);
    await expect(page).toHaveURL(
      /order=towel-defence:0,self-driving-car-demo:1/
    );

    const newItems = await homePage.projectList().topProjectItems();

    await expect(projectItems[0].title).toHaveText(/Towel Defence/);
    await expect(projectItems[1].title).toHaveText(/Self-Driving Car/);
    await expect(newItems[2].title).toHaveText(title2 || 'ERROR: no title2');
  });

  test('changing custom order of projects preserves fragment', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      fragment: 'skills',
    });
    await expect(page).toHaveURL(/#skills/);
    await expect(page).not.toHaveURL(/order=/);

    const projectItems = await homePage.projectList().topProjectItems();

    const title0: string | null = await projectItems[0].title.textContent();
    const title1: string | null = await projectItems[1].title.textContent();
    const title2: string | null = await projectItems[2].title.textContent();

    await projectItems[0].decreaseCustomOrder();

    const newItems = await homePage.projectList().topProjectItems();

    await expect(newItems[0].title).toHaveText(title1 || 'ERROR: no title1');
    await expect(newItems[1].title).toHaveText(title0 || 'ERROR: no title0');
    await expect(newItems[2].title).toHaveText(title2 || 'ERROR: no title2');

    await expect(page).toHaveURL(/#skills/);
    await expect(page).toHaveURL(/order=/);
  });
});
