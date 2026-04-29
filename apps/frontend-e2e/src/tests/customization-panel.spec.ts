import { expect, test } from '../fixtures/app.fixture';
import { HomePage } from '../pom/home/home-page';

const searchTagsForMatches = 'Angular';

test.describe('Customization Panel', () => {
  test('show panel button opens the panel and sets URL state', async ({
    footer,
    customizationSidenav,
    page,
  }) => {
    await customizationSidenav.expectClosed();

    await footer.showPanelButton.click();

    await customizationSidenav.expectOpen();
    await expect(page).toHaveURL(/customizationPanelShown=true/);
  });

  test('hide button closes the panel and clears URL state', async ({
    footer,
    customizationSidenav,
    page,
  }) => {
    await footer.showPanelButton.click();
    await customizationSidenav.expectOpen();
    await expect(page).toHaveURL(/customizationPanelShown=true/);

    await customizationSidenav.hideButton.click();

    await customizationSidenav.expectClosed();
    await expect(page).not.toHaveURL(/customizationPanelShown=/);
  });

  test('panelShown URL query opens panel on initial load', async ({
    page,
    customizationSidenav,
  }) => {
    await page.goto('/?customizationPanelShown=true');
    await expect(page).toHaveURL(/customizationPanelShown=true/);

    await customizationSidenav.expectOpen();
  });

  test('print mode checkbox persists state in the URL', async ({
    footer,
    customizationSidenav,
    page,
  }) => {
    const printModeCheckbox = page.getByRole('checkbox', {
      name: 'Print mode',
    });

    await footer.showPanelButton.click();
    await customizationSidenav.expectOpen();
    await expect(printModeCheckbox).not.toBeChecked();

    await printModeCheckbox.click();

    await expect(printModeCheckbox).toBeChecked();
    await expect(page).toHaveURL(/printMode=true/);

    await printModeCheckbox.click();

    await expect(printModeCheckbox).not.toBeChecked();
    await expect(page).not.toHaveURL(/printMode=true/);
  });

  test('print mode organizes the content into 3 sheets', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);
    await page.goto(`/?printMode=true&searchTags=${searchTagsForMatches}`);

    await expect(homePage.pagesList).toBeVisible();
    await expect(homePage.pageSheet).toHaveCount(3);
    await expect(homePage.pageSheet.nth(0)).toBeVisible();
    await expect(homePage.pageSheet.nth(1)).toBeVisible();
    await expect(homePage.pageSheet.nth(2)).toBeVisible();
  });

  test('print mode places sections in the correct order', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);
    await page.goto(`/?printMode=true&searchTags=${searchTagsForMatches}`);

    await expect(homePage.sheet1AboutMeSection).toBeVisible();
    await expect(homePage.sheet1MatchesOverviewSection).toBeVisible();
    await expect(homePage.sheet1SkillSection).toBeVisible();

    await expect(homePage.sheet2ProjectListSection).toBeVisible();

    await expect(homePage.sheet3ProjectListSection).toBeVisible();
  });

  test('print mode sheets use DIN A4 dimensions', async ({ page }) => {
    const homePage: HomePage = new HomePage(page);
    await page.goto('/?printMode=true');

    await expect(homePage.pageSheet).toHaveCount(3);

    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const MILLIMETERS_PER_INCH = 25.4;
    const CSS_PIXELS_PER_INCH = 96;

    const a4WidthPx =
      (A4_WIDTH_MM / MILLIMETERS_PER_INCH) * CSS_PIXELS_PER_INCH;
    const a4HeightPx =
      (A4_HEIGHT_MM / MILLIMETERS_PER_INCH) * CSS_PIXELS_PER_INCH;

    for (let i = 0; i < 3; i += 1) {
      const dimensions = await homePage.printSheetDimensions(i);

      expect(dimensions.width).toBeCloseTo(a4WidthPx, 0);
      expect(dimensions.height).toBeCloseTo(a4HeightPx, 0);
    }
  });

  test('non-print mode keeps sections in the correct order', async ({
    page,
  }) => {
    const homePage: HomePage = new HomePage(page);
    await page.goto(`/?searchTags=${searchTagsForMatches}`);

    await expect(homePage.pagesList).toHaveCount(0);

    const sectionClassOrder = await homePage.nonPrintSectionClassOrder();

    expect(sectionClassOrder).toHaveLength(5);
    expect(sectionClassOrder[0]).toContain('matches-overview');
    expect(sectionClassOrder[1]).toContain('project-list');
    expect(sectionClassOrder[2]).toContain('skill-section');
    expect(sectionClassOrder[3]).toContain('about-me');
    expect(sectionClassOrder[4]).toContain('contact-section');
  });
});
