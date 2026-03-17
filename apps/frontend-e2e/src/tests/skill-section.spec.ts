import { expect, test } from '../fixtures/app.fixture';

test.describe('Skills Section', () => {
  test('is visible', async ({ homePage }) => {
    const skills = homePage.skills();
    await expect(skills.locator).toBeVisible();
  });

  test('displays some categories', async ({ homePage }) => {
    const skills = homePage.skills();

    await expect(await skills.skillCategory(/^Frontend:$/)).toBeVisible();
    await expect(await skills.skillCategory(/^Backend:$/)).toBeVisible();
    await expect(await skills.skillCategory(/^Misc:$/)).toBeVisible();
  });

  test('categories are sorted by search terms', async ({
    homePage,
    urlHelper,
  }) => {
    await urlHelper.gotoHomePage({
      searchTags: ['GitHub Actions', 'Travis CI', 'Spring Boot'],
    });
    const skills = homePage.skills();

    await expect(skills.skillCategories.nth(0)).toContainText(/DevOps/);
    await expect(skills.skillCategories.nth(1)).toContainText(/Backend/);
  });

  test('displays frontend technologies', async ({ homePage, urlHelper }) => {
    // NOTE: use search tags, to ensure the skill tags are displayed and not in collapsed list.
    await urlHelper.gotoHomePage({ searchTags: ['Angular', 'React Native'] });

    const skills = homePage.skills();

    await expect(skills.tagsBy(/Angular/).first()).toBeVisible();
    await expect(skills.tagsBy(/React Native/).first()).toBeVisible();
  });

  test('displays backend technologies', async ({ homePage, urlHelper }) => {
    // NOTE: use search tags, to ensure the skill tags are displayed and not in collapsed list.
    await urlHelper.gotoHomePage({ searchTags: ['Java', 'Node.js'] });

    const skills = homePage.skills();

    await expect(skills.tagsBy(/Java/).first()).toBeVisible();
    await expect(skills.tagsBy(/Node.js/).first()).toBeVisible();
  });
});
