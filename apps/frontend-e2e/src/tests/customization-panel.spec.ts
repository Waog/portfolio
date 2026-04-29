import { expect, test } from '../fixtures/app.fixture';

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
});
