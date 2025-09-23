import { expect, Locator, Page, test } from '@playwright/test';

test.describe('Project List Section', () => {
  test('displays all projects by default (when no search tags)', async ({
    page,
  }) => {
    await page.goto('/');

    const projectList = await getProjectListSection(page);

    await expect(projectList.locator('lib-project-item')).toHaveCount(25);

    await expect(
      page.getByRole('heading', { name: 'Top Matching Projects' })
    ).toBeHidden();
  });

  test('displays project titles', async ({ page }) => {
    await page.goto('/');

    const projectList = await getProjectListSection(page);

    await expect(
      projectList.getByText(/AI-Powered Language Learning App/)
    ).toBeVisible();

    await expect(
      projectList.getByText(/Enterprise Lottery Platform/)
    ).toBeVisible();
  });

  test('displays team information', async ({ page }) => {
    await page.goto('/');

    const llsProject = await getLlsProjectItem(page);

    await expect(llsProject.getByText(/Solo development/)).toBeVisible();
  });

  test('displays duration information', async ({ page }) => {
    await page.goto('/');

    const lotteryProject = await getLotteryProjectItem(page);

    await expect(lotteryProject.getByText(/11 months/)).toBeVisible();
  });

  test('displays location information', async ({ page }) => {
    await page.goto('/');

    const llsProject = await getLlsProjectItem(page);

    await expect(llsProject.getByText(/Remote.*Remote/)).toBeVisible();
  });

  test('displays industry information', async ({ page }) => {
    await page.goto('/');

    const llsProject = await getLlsProjectItem(page);

    await expect(llsProject.getByText(/Education Technology/)).toBeVisible();
  });

  test('displays technology chips', async ({ page }) => {
    await page.goto('/');

    const llsProject = await getLlsProjectItem(page);

    await expect(llsProject.getByText('Java').first()).toBeVisible();
    await expect(llsProject.getByText('React').first()).toBeVisible();
  });

  test('shows up to 3 top matching projects when search tags are active', async ({
    page,
  }) => {
    await page.goto('/?searchTags=TypeScript');

    const topMatchingProjects = await getTopMatchingProjectsList(page);

    await expect(
      topMatchingProjects.getByRole('heading', {
        name: 'Top Matching Projects',
      })
    ).toBeVisible();

    await expect(topMatchingProjects.locator('lib-project-item')).toHaveCount(
      3
    );
  });

  test('allows showing more projects when search tags are active', async ({
    page,
  }) => {
    await page.goto('/?searchTags=TypeScript');

    const projectList = await getProjectListSection(page);

    await expect(
      projectList.getByRole('button', { name: /Show All Projects/ })
    ).toBeVisible();
  });

  test('toggle functionality shows/hides all projects', async ({ page }) => {
    await page.goto('/?searchTags=TypeScript');

    await expect(
      page.getByRole('heading', { name: 'All Projects' })
    ).toBeHidden();

    await page.getByRole('button', { name: /Show All Projects/ }).click();

    await expect(
      page.getByRole('heading', { name: 'Other Projects' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: /Hide All Projects/ })
    ).toBeVisible();

    await page.getByRole('button', { name: /Hide All Projects/ }).click();

    await expect(
      page.getByRole('heading', { name: 'Other Projects' })
    ).toBeHidden();
  });

  test('projects with matching technologies have green border', async ({
    page,
  }) => {
    await page.goto('/?searchTags=TypeScript');

    const topMatchingProjects = await getTopMatchingProjectsList(page);

    const topProjectItems = topMatchingProjects.locator('lib-project-item');

    await expect(topProjectItems).toHaveCount(3);

    const firstTopProject = topProjectItems.first();
    const borderedChildElement = firstTopProject.locator('.top-project');
    expect(await isGreen(borderedChildElement, 'border-left-color')).toBe(true);
  });
});

async function getProjectListSection(page: Page): Promise<Locator> {
  const projectListSection = page.getByText(
    /(My Projects.*Java.*Remote)|(Top Matching Projects.*All Projects)/s
  );
  await expect(projectListSection).toBeVisible();
  return projectListSection;
}

async function getTopMatchingProjectsList(page: Page): Promise<Locator> {
  const projectList = await getProjectListSection(page);
  const topMatchingProjectsList = projectList.getByText(
    /Top Matching Projects.*Show Details/
  );
  await expect(topMatchingProjectsList).toBeVisible();
  return topMatchingProjectsList;
}

async function getLlsProjectItem(page: Page): Promise<Locator> {
  const projectList = await getProjectListSection(page);
  const llsProject = projectList.getByText(
    /AI-Powered Language Learning App.*Solo.*Remote.*Education/
  );
  await expect(llsProject).toBeVisible();
  return llsProject;
}

async function getLotteryProjectItem(page: Page): Promise<Locator> {
  const projectList = await getProjectListSection(page);
  const lotteryProject = projectList.getByText(
    /Enterprise Lottery Platform.*Large Scrum Team.*Remote.*eCommerce/
  );
  await expect(lotteryProject).toBeVisible();
  return lotteryProject;
}

async function isGreen(
  element: Locator,
  cssProperty: string
): Promise<boolean> {
  const color: string = await element.evaluate(
    (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
    cssProperty
  );
  const match = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
  if (!match) throw new Error(`Invalid color format: ${color}`);
  const [, r, g, b] = match.map(Number);
  return g > r && g > b;
}
