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
        await expect(legalPage.enTitle).toHaveText(doc.englishTitle);
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

        test('should display English content below German content', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await expect(legalPage.enTitle).toHaveText(doc.englishTitle);
          for (const content of doc.englishContent) {
            await expect(legalPage.content).toContainText(content, {
              ignoreCase: true,
            });
          }
        });

        test('should display German content below English content', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await expect(legalPage.deTitle).toHaveText(doc.germanTitle);
          for (const content of doc.germanContent) {
            await expect(legalPage.content).toContainText(content);
          }
        });

        test('should scroll to German section when German language is selected', async ({
          legalPage,
          page,
        }) => {
          await legalPage.goto(doc.subPath);
          await legalPage.langToggleEng.click();
          await legalPage.langToggleGer.click();
          await expect(page).toHaveURL(new RegExp(`#de$`));
          await expect(legalPage.deTitle).toHaveText(doc.germanTitle);
          await expect(legalPage.deTitle).toBeInViewport();
        });

        test('should scroll to English section when English language is selected', async ({
          legalPage,
          page,
        }) => {
          await legalPage.goto(doc.subPath);
          await legalPage.langToggleEng.click();
          await expect(page).toHaveURL(new RegExp(`#en$`));
          await expect(legalPage.enTitle).toHaveText(doc.englishTitle);
          await expect(legalPage.enTitle).toBeInViewport();
        });

        test('should have substantial content in both languages', async ({
          legalPage,
        }) => {
          const min400CharactersRegex = /.{400,}/;
          await legalPage.goto(doc.subPath);
          await expect(legalPage.enContent).toHaveText(min400CharactersRegex);
          await expect(legalPage.deContent).toHaveText(min400CharactersRegex);
        });

        test('should navigate to language-specific URL when language toggle is clicked', async ({
          legalPage,
          page,
        }) => {
          await legalPage.goto(doc.subPath);
          await legalPage.langToggleEng.click();
          await expect(page).toHaveURL(new RegExp(`#en$`));
          await legalPage.langToggleGer.click();
          await expect(page).toHaveURL(new RegExp(`#de$`));
        });

        test('should display correct content when navigating directly to language URL', async ({
          legalPage,
        }) => {
          await legalPage.gotoWithLang(doc.subPath, 'de');
          await expect(legalPage.deTitle).toHaveText(doc.germanTitle);
          for (const content of doc.germanContent) {
            await expect(legalPage.content).toContainText(content);
          }

          await legalPage.gotoWithLang(doc.subPath, 'en');
          await expect(legalPage.enTitle).toHaveText(doc.englishTitle);
          for (const content of doc.englishContent) {
            await expect(legalPage.content).toContainText(content, {
              ignoreCase: true,
            });
          }
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
        await expect(legalPage.enTitle).toHaveText(doc.englishTitle);
        await expect(legalPage.deTitle).toHaveText(doc.germanTitle);
      }
    });
  });

  test.describe('Viewport Checks', () => {
    for (const doc of legalDocuments) {
      test.describe(`${doc.name} Document`, () => {
        test('clicking German toggle scrolls German section into viewport', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await legalPage.langToggleEng.click();
          await expect(legalPage.deTitle).not.toBeInViewport();
          await legalPage.langToggleGer.click();
          await expect(legalPage.deTitle).toBeInViewport();
        });

        test('clicking English toggle scrolls English section into viewport', async ({
          legalPage,
        }) => {
          await legalPage.goto(doc.subPath);
          await legalPage.langToggleGer.click();
          await expect(legalPage.enTitle).not.toBeInViewport();
          await legalPage.langToggleEng.click();
          await expect(legalPage.enTitle).toBeInViewport();
        });

        test.describe('initial fragment loads', () => {
          test.use({ initialUrl: null });

          test('loading page with #en fragment shows English section in viewport', async ({
            legalPage,
          }) => {
            await legalPage.gotoWithLang(doc.subPath, 'en');
            await expect(legalPage.enTitle).toBeInViewport();
          });

          test('loading page with #de fragment scrolls German section into viewport', async ({
            legalPage,
          }) => {
            await legalPage.gotoWithLang(doc.subPath, 'de');
            await expect(legalPage.deTitle).toBeInViewport();
          });
        });
      });
    }
  });
});
