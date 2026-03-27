import { expect, test } from '../fixtures/app.fixture';

interface LegalDocument {
  name: string;
  footerLinkText: string;
  subPath: 'imprint' | 'privacy-policy';
  englishTitle: string;
  germanTitle: string;
  englishContent: string[];
  germanContent: string[];
}

// cSpell:disable
const legalDocuments: LegalDocument[] = [
  {
    name: 'Imprint',
    footerLinkText: 'Imprint',
    subPath: 'imprint',
    englishTitle: 'Imprint',
    germanTitle: 'Impressum',
    englishContent: [
      'Oliver Stadie IT GmbH',
      'Managing Director',
      'HRB 236714 B',
    ],
    germanContent: ['Oliver Stadie IT GmbH', 'Geschäftsführer', 'HRB 236714 B'],
  },
  {
    name: 'Privacy Policy',
    footerLinkText: 'Privacy',
    subPath: 'privacy-policy',
    englishTitle: 'Privacy Policy',
    germanTitle: 'Datenschutzerklärung',
    englishContent: ['Controller', 'GitHub', 'Cloudflare'],
    germanContent: ['Verantwortlicher', 'GitHub', 'Cloudflare'],
  },
];
// cSpell:enable

test.describe('Legal Documents E2E Tests', () => {
  test.describe('Footer Links Navigation', () => {
    for (const doc of legalDocuments) {
      test(`should navigate to ${doc.name} from footer link`, async ({
        footer,
        legalPage,
      }) => {
        const footerLink = footer.getLink(doc.footerLinkText);
        await expect(footerLink).toBeVisible();
        await footerLink.click();
        await expect(legalPage.title).toHaveText(doc.englishTitle);
      });
    }
  });

  test.describe('Document Content and Language Switching', () => {
    for (const doc of legalDocuments) {
      test.describe(`${doc.name} Document`, () => {
        test('should have language toggle buttons visible', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await expect(legalPage.langToggleEng).toBeVisible();
          await expect(legalPage.langToggleGer).toBeVisible();
        });

        test('should display English content by default', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await expect(legalPage.title).toHaveText(doc.englishTitle);
          for (const content of doc.englishContent) {
            await expect(legalPage.content).toContainText(content);
          }
        });

        test('should switch to German content when German language is selected', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await legalPage.langToggleGer.click();
          await expect(legalPage.title).toHaveText(doc.germanTitle);
          for (const content of doc.germanContent) {
            await expect(legalPage.content).toContainText(content);
          }
        });

        test('should switch back to English content when English language is selected', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await legalPage.langToggleGer.click();
          await expect(legalPage.title).toHaveText(doc.germanTitle);
          await legalPage.langToggleEng.click();
          await expect(legalPage.title).toHaveText(doc.englishTitle);
          for (const content of doc.englishContent) {
            await expect(legalPage.content).toContainText(content);
          }
        });

        test('should have substantial content in both languages', async ({
          legalPage,
        }) => {
          const min500CharactersRegex = /.{500,}/;
          await legalPage.goto(doc.subPath);
          await expect(legalPage.content).toHaveText(min500CharactersRegex);
          await legalPage.langToggleGer.click();
          await expect(legalPage.content).toHaveText(min500CharactersRegex);
        });
      });
    }
  });

  test.describe('Footer Legal Links Integration', () => {
    test('should have all legal document links in footer', async ({
      footer,
    }) => {
      for (const doc of legalDocuments) {
        const link = footer.getLink(doc.footerLinkText);
        await expect(link).toBeVisible();
      }
    });

    test('should navigate between legal documents using footer links', async ({
      footer,
      legalPage,
    }) => {
      for (const doc of legalDocuments) {
        const footerLink = footer.getLink(doc.footerLinkText);
        await footerLink.click();
        await expect(legalPage.title).toHaveText(doc.englishTitle);
        await legalPage.langToggleGer.click();
        await expect(legalPage.title).toHaveText(doc.germanTitle);
        await legalPage.langToggleEng.click();
        await expect(legalPage.title).toHaveText(doc.englishTitle);
      }
    });
  });
});
