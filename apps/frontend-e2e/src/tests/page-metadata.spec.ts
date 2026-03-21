import { type Page } from '@playwright/test';

import { expect, test } from '../fixtures/app.fixture';
import { type WebMetadataPage } from '../pom/web-metadata/web-metadata-page';

type ExpectedContent = {
  defaults: {
    description: string;
    imageAlt: string;
    imageHeight: string;
    imagePath: string;
    imageWidth: string;
    siteName: string;
    siteOrigin: string;
    title: string;
    type: string;
  };
  pages: {
    [key: string]: ExpectedPageContent;
  };
};

type ExpectedPageContent = {
  description: string;
  title: string;
  path: string;
};

export const EXPECTED_CONTENT: ExpectedContent = {
  defaults: {
    description:
      'Portfolio of Oliver Stadie, full-stack web and app developer.',
    imageAlt: `Portrait of Oliver Stadie with the text 'Oliver Stadie - Full Stack Developer'`,
    imageHeight: '630',
    imagePath: '/assets/og-image.png',
    imageWidth: '1200',
    siteName: 'Oliver Stadie',
    siteOrigin: 'https://oliverstadie.com',
    title: 'Oliver Stadie – Full-Stack Web & App Developer',
    type: 'website',
  },
  pages: {
    home: {
      description:
        'Explore the portfolio of Oliver Stadie, a full-stack web and app developer.',
      title: 'Oliver Stadie – Full-Stack Web & App Developer',
      path: '/',
    },
    cookiePolicy: {
      description:
        'Cookie policy and tracking information for the Oliver Stadie portfolio website.',
      title: 'Cookies | Oliver Stadie',
      path: '/legal/cookie-policy',
    },
    imprint: {
      description:
        'Imprint and legal publisher details for the Oliver Stadie portfolio website.',
      title: 'Imprint | Oliver Stadie',
      path: '/legal/imprint',
    },
    privacyPolicy: {
      description:
        'Privacy policy for the Oliver Stadie portfolio website and related services.',
      title: 'Privacy | Oliver Stadie',
      path: '/legal/privacy-policy',
    },
  },
} as const;

test.describe('Page Metadata', () => {
  for (const [pageKey, currentPage] of Object.entries(EXPECTED_CONTENT.pages)) {
    test(`sets metadata correctly for ${pageKey} on direct load`, async ({
      page,
      webMetadataPage,
    }: {
      page: Page;
      webMetadataPage: WebMetadataPage;
    }) => {
      await webMetadataPage.goto(currentPage.path);

      await expect(page).toHaveURL(new RegExp(`${currentPage.path}$`));
      await expect(page).toHaveTitle(currentPage.title);
      await expectOpenGraphMetadata(webMetadataPage, currentPage);
      await expectMetaDescription(webMetadataPage, currentPage.description);
    });

    test(`updates metadata when SPA navigating from home to ${pageKey}`, async ({
      page,
      webMetadataPage,
    }: {
      page: Page;
      webMetadataPage: WebMetadataPage;
    }) => {
      const homepage = EXPECTED_CONTENT.pages['home'];

      await webMetadataPage.goto(homepage.path);
      await expect(page).toHaveURL(new RegExp(`${homepage.path}$`));

      const nextPage = EXPECTED_CONTENT.pages[pageKey];
      await webMetadataPage.linkElementToUrl(nextPage.path).click();

      await expect(page).toHaveURL(new RegExp(`${nextPage.path}$`));
      await expect(page).toHaveTitle(nextPage.title);
      await expectOpenGraphMetadata(webMetadataPage, nextPage);
      await expectMetaDescription(webMetadataPage, nextPage.description);
    });
  }
});

async function expectOpenGraphMetadata(
  metadataPage: WebMetadataPage,
  { path, title, description }: ExpectedPageContent
): Promise<void> {
  const pom = metadataPage;
  const origin = pom.currentOrigin();
  const expectedUrl = `${origin}${path}`;
  const expectedDefaults = EXPECTED_CONTENT.defaults;

  await expectMetadataElementToHaveContent(pom, 'og:title', title);
  await expectMetadataElementToHaveContent(pom, 'og:description', description);
  await expectMetadataElementToHaveContent(
    pom,
    'og:type',
    expectedDefaults.type
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:site_name',
    expectedDefaults.siteName
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image',
    `${origin}${expectedDefaults.imagePath}`
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image:alt',
    expectedDefaults.imageAlt
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image:height',
    expectedDefaults.imageHeight
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image:width',
    expectedDefaults.imageWidth
  );
  await expectMetadataElementToHaveContent(pom, 'og:url', expectedUrl);
  await expect(pom.canonicalLinkElement()).toHaveAttribute('href', expectedUrl);
}

async function expectMetaDescription(
  metadataPage: WebMetadataPage,
  expectedDescription: string
): Promise<void> {
  await expect(metadataPage.descriptionElement()).toHaveAttribute(
    'content',
    expectedDescription
  );
}

async function expectMetadataElementToHaveContent(
  metadataPage: WebMetadataPage,
  metadataKey: string,
  expectedString: string
): Promise<void> {
  await expect(metadataPage.metadataElement(metadataKey)).toHaveAttribute(
    'content',
    expectedString
  );
}
