import { expect, test } from '@playwright/test';

// Test data for the three legal documents
// cSpell:disable
const legalDocuments = [
  {
    name: 'Imprint',
    footerLinkText: 'Imprint',
    englishTitle: 'Company Information',
    germanTitle: 'Firmeninformationen',
    englishContent: [
      'HRB 236714 B',
      'Professional Supervisory Authority',
      'Chamber of Commerce and Industry Berlin',
    ],
    germanContent: [
      'HRB 236714 B',
      'Aufsichtsbehörde',
      'Industrie- und Handelskammer Berlin',
    ],
  },
  {
    name: 'Privacy Policy',
    footerLinkText: 'Privacy',
    englishTitle: 'Data Protection at a Glance',
    germanTitle: 'Datenschutz auf einen Blick',
    englishContent: [
      'simple overview of what happens to your personal data',
      'GitHub Pages automatically collects',
      'technically error-free presentation',
    ],
    germanContent: [
      'einfachen Überblick darüber, was mit Ihren personenbezogenen Daten',
      'GitHub Pages erfasst automatisch',
      'technisch fehlerfreien Darstellung',
    ],
  },
  {
    name: 'Cookie Policy',
    footerLinkText: 'Cookies',
    englishTitle: 'What are Cookies?',
    germanTitle: 'Was sind Cookies?',
    englishContent: [
      'small text files that are stored on your computer',
      'Potential future uses of cookies',
      'www.aboutcookies.org',
    ],
    germanContent: [
      'kleine Textdateien, die von Ihrem Webbrowser',
      'Mögliche zukünftige Verwendungszwecke',
      'www.aboutcookies.org',
    ],
  },
];
// cSpell:enable

test.describe('Legal Documents E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test.describe('Footer Links Navigation', () => {
    for (const doc of legalDocuments) {
      test(`should navigate to ${doc.name} from footer link`, async ({
        page,
      }) => {
        const footerLink = page
          .locator('footer')
          .getByRole('link', { name: doc.footerLinkText });
        await expect(footerLink).toBeVisible();
        // Ensure footer is in view and click without waiting for navigation (SPA route)
        await page.locator('footer').scrollIntoViewIfNeeded();
        await footerLink.click({ noWaitAfter: true });
        await expect(
          page.getByRole('heading', { name: doc.englishTitle }).first()
        ).toBeVisible();
      });
    }
  });

  test.describe('Document Content and Language Switching', () => {
    for (const doc of legalDocuments) {
      test.describe(`${doc.name} Document`, () => {
        test.beforeEach(async ({ page }) => {
          const footerLink = page
            .locator('footer')
            .getByRole('link', { name: doc.footerLinkText });
          await page.locator('footer').scrollIntoViewIfNeeded();
          await footerLink.click({ noWaitAfter: true });
          await expect(
            page.getByRole('heading', { name: doc.englishTitle }).first()
          ).toBeVisible();
        });
        test('should display English content by default', async ({ page }) => {
          await expect(
            page.getByRole('heading', { name: doc.englishTitle }).first()
          ).toBeVisible();
          for (const content of doc.englishContent) {
            await expect(page.getByText(content)).toBeVisible();
          }
        });
        test('should switch to German content when German language is selected', async ({
          page,
        }) => {
          const germanRadio = page.getByRole('radio', { name: 'Deutsch' });
          await expect(germanRadio).toBeVisible();
          await germanRadio.click();
          await expect(
            page.getByRole('heading', { name: doc.germanTitle }).first()
          ).toBeVisible();
          for (const content of doc.germanContent) {
            await expect(page.getByText(content)).toBeVisible();
          }
        });
        test('should switch back to English content when English language is selected', async ({
          page,
        }) => {
          await page.getByRole('radio', { name: 'Deutsch' }).click();
          await expect(
            page.getByRole('heading', { name: doc.germanTitle }).first()
          ).toBeVisible();
          const englishRadio = page.getByRole('radio', { name: 'English' });
          await expect(englishRadio).toBeVisible();
          await englishRadio.click();
          await expect(
            page.getByRole('heading', { name: doc.englishTitle }).first()
          ).toBeVisible();
          for (const content of doc.englishContent) {
            await expect(page.getByText(content)).toBeVisible();
          }
        });
        test('should have substantial content in both languages', async ({
          page,
        }) => {
          // Check English content length
          const englishContent = await page.locator('body').textContent();
          expect(englishContent?.length).toBeGreaterThan(500);
          await page.getByRole('radio', { name: 'Deutsch' }).click();
          await expect(
            page.getByRole('heading', { name: doc.germanTitle }).first()
          ).toBeVisible();
          const germanContent = await page.locator('body').textContent();
          expect(germanContent?.length).toBeGreaterThan(500);
        });
        test('should have language toggle buttons visible', async ({
          page,
        }) => {
          await expect(
            page.getByRole('radio', { name: 'English' })
          ).toBeVisible();
          await expect(
            page.getByRole('radio', { name: 'Deutsch' })
          ).toBeVisible();
        });
      });
    }
  });

  test.describe('Footer Legal Links Integration', () => {
    test('should have all three legal document links in footer', async ({
      page,
    }) => {
      for (const doc of legalDocuments) {
        const link = page
          .locator('footer')
          .getByRole('link', { name: doc.footerLinkText });
        await expect(link).toBeVisible();
      }
    });
    test('should navigate between legal documents using footer links', async ({
      page,
    }) => {
      for (const doc of legalDocuments) {
        const footerLink = page
          .locator('footer')
          .getByRole('link', { name: doc.footerLinkText });
        await page.locator('footer').scrollIntoViewIfNeeded();
        await footerLink.click({ noWaitAfter: true });
        await expect(
          page.getByRole('heading', { name: doc.englishTitle })
        ).toBeVisible();
        await page.getByRole('radio', { name: 'Deutsch' }).click();
        await expect(
          page.getByRole('heading', { name: doc.germanTitle }).first()
        ).toBeVisible();
        await page.getByRole('radio', { name: 'English' }).click();
        await expect(
          page.getByRole('heading', { name: doc.englishTitle }).first()
        ).toBeVisible();
      }
    });
  });

  test.describe('Accessibility and User Experience', () => {
    for (const doc of legalDocuments) {
      test(`${doc.name} should be accessible and well-structured`, async ({
        page,
      }) => {
        const footerLink = page
          .locator('footer')
          .getByRole('link', { name: doc.footerLinkText });
        await page.locator('footer').scrollIntoViewIfNeeded();
        await footerLink.click({ noWaitAfter: true });
        const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
        expect(headings).toBeGreaterThan(0);
        await expect(
          page.getByRole('radio', { name: 'English' })
        ).toBeVisible();
        await expect(
          page.getByRole('radio', { name: 'Deutsch' })
        ).toBeVisible();
        await expect(
          page.getByRole('heading', { name: doc.englishTitle }).first()
        ).toBeVisible();
        const content = await page.locator('body').textContent();
        expect(content?.trim().length).toBeGreaterThan(100);
        const mainContent = await page.getByRole('main').textContent();
        expect(mainContent?.includes(doc.englishContent[0])).toBeTruthy();
      });
    }
  });
});
