import { expect, test } from '../fixtures/app.fixture';

test.describe('Tag Input Functionality', () => {
  test('adding a search term adds a chip and updates the URL', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage();

    const tagInput = homePage.tagInput();
    await tagInput.addSearchTerm('Spring Boot');
    await expect(tagInput.chips).toHaveCount(1);
    await expect(tagInput.chipTexts.last()).toHaveText('Spring Boot');
    await expect(page).toHaveURL(/searchTags=Spring%20Boot/);
  });

  test('loading a URL with 1 searchTag restores the chip', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Spring Boot'],
    });
    await expect(page).toHaveURL(/searchTags=Spring%20Boot/);

    const tagInput = homePage.tagInput();
    await expect(tagInput.chips).toHaveCount(1);
    await expect(tagInput.chipTexts.last()).toHaveText('Spring Boot');
  });

  test('removing a tag removes chip and URL param', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Spring Boot'],
    });
    await expect(page).toHaveURL(/searchTags=Spring%20Boot/);

    const tagInput = homePage.tagInput();
    await tagInput.removeSearchTerm('Spring Boot');
    await expect(tagInput.chips).toHaveCount(0);
    await expect(page).not.toHaveURL(/searchTags/);
    await expect(page).not.toHaveURL(/Spring%20Boot/);
  });

  test('adding 2 search terms adds 2 chips and updates the URL', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage();

    // Add multiple tags
    const tagInput = homePage.tagInput();
    await tagInput.addSearchTerm('Angular');
    await tagInput.addSearchTerm('TypeScript');
    await expect(tagInput.chips).toHaveCount(2);
    await expect(tagInput.chipTexts.nth(0)).toHaveText('Angular');
    await expect(tagInput.chipTexts.nth(1)).toHaveText('TypeScript');
    await expect(page).toHaveURL(/searchTags=Angular,TypeScript/);
  });

  test('loading a URL with 2 searchTags restores the chips', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Angular', 'TypeScript'],
    });
    await expect(page).toHaveURL(/searchTags=Angular,TypeScript/);

    const tagInput = homePage.tagInput();
    await expect(tagInput.chips).toHaveCount(2);
    await expect(tagInput.chipTexts.nth(0)).toHaveText('Angular');
    await expect(tagInput.chipTexts.nth(1)).toHaveText('TypeScript');
  });

  test('removing 1 of 2 tags removes 1 chip and 1 URL param', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['Angular', 'TypeScript'],
    });
    await expect(page).toHaveURL(/searchTags=Angular,TypeScript/);
    const tagInput = homePage.tagInput();
    await expect(tagInput.chips).toHaveCount(2);

    // Remove one tag
    await tagInput.removeSearchTerm('Angular');
    await expect(tagInput.chips).toHaveCount(1);
    await expect(tagInput.chipTexts.nth(0)).toHaveText('TypeScript');
    await expect(page).toHaveURL(/searchTags=TypeScript/);
    await expect(page).not.toHaveURL(/Angular/);
  });

  test('should not add duplicate tags', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage();
    const tagInput = homePage.tagInput();

    await tagInput.addSearchTerm('React');
    // Try to add the same tag again
    await tagInput.addSearchTerm('React', { skipAssertions: true });
    await expect(tagInput.chips).toHaveCount(1);
    await expect(tagInput.chipTexts.nth(0)).toHaveText('React');
    await expect(page).toHaveURL(/searchTags=React/);
    await expect(page).not.toHaveURL(/React,React/);
  });

  test('should handle Enter key to add tags', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage();
    const tagInput = homePage.tagInput();

    await tagInput.addSearchTerm('Vue', { submitMethod: 'EnterKey' });
    await expect(tagInput.chips).toHaveCount(1);
    await expect(tagInput.chipTexts.last()).toHaveText('Vue');
    await expect(page).toHaveURL(/searchTags=Vue/);
  });

  test('adding a search term resets the custom project ordering', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['ionic', 'iOS'],
      order: ['towel-defence', 'self-driving-car-demo'],
    });
    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(
      /order=towel-defence:0,self-driving-car-demo:1/
    );

    const tagInput = homePage.tagInput();
    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    const projects = await homePage.projectList().topProjectItems();
    await expect(projects[0].title).toContainText('Towel Defence');
    await expect(projects[1].title).toContainText('Self-Driving Car');

    await tagInput.addSearchTerm('TypeScript');

    await expect(page).toHaveURL(/searchTags=ionic,iOS,TypeScript/);
    await expect(page).not.toHaveURL(/order=/);
    const newProjects = await homePage.projectList().topProjectItems();
    await expect(newProjects[0].title).toContainText('Self-Driving Car');
    await expect(newProjects[1].title).toContainText('Custom E-Commerce');
    await expect(newProjects[2].title).toContainText('Towel Defence');
  });

  test('removing a search term resets the custom project ordering', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['ionic', 'iOS'],
      order: ['towel-defence', 'self-driving-car-demo'],
    });
    await expect(page).toHaveURL(/searchTags=ionic,iOS/);
    await expect(page).toHaveURL(
      /order=towel-defence:0,self-driving-car-demo:1/
    );

    const tagInput = homePage.tagInput();
    await expect(tagInput.chipTexts).toHaveText(['ionic', 'iOS']);

    const projects = await homePage.projectList().topProjectItems();
    await expect(projects[0].title).toContainText('Towel Defence');
    await expect(projects[1].title).toContainText('Self-Driving Car');

    await tagInput.removeSearchTerm('iOS');

    await expect(page).toHaveURL(/searchTags=ionic/);
    await expect(page).not.toHaveURL(/iOS/);
    await expect(page).not.toHaveURL(/order=/);
    const newProjects = await homePage.projectList().topProjectItems();
    await expect(newProjects[0].title).toContainText('Self-Driving Car');
    await expect(newProjects[1].title).toContainText('Towel Defence');
  });

  test('adding a search term preserves the fragment', async ({
    homePage,
    urlHelper,
    page,
  }) => {
    await urlHelper.gotoHomePage({
      fragment: 'skills',
    });
    await expect(page).not.toHaveURL(/searchTags=/);
    await expect(page).toHaveURL(/#skills/);

    const tagInput = homePage.tagInput();
    await expect(tagInput.chips).toHaveCount(0);

    await tagInput.addSearchTerm('Angular');

    await expect(page).toHaveURL(/searchTags=Angular/);
    await expect(page).toHaveURL(/#skills/);
  });
});
