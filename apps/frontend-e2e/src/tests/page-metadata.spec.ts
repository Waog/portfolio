import { type Page } from '@playwright/test';

import { expect, test } from '../fixtures/app.fixture';
import { type WebMetadataPage } from '../pom/web-metadata/web-metadata-page';

const OPTIONAL_URL_FRAGMENT_REGEX = `(#.*)?`;

type ExpectedContent = {
  defaults: {
    faviconIcoPath: string;
    faviconSvgPath: string;
    favicon32Path: string;
    appleTouchIconPath: string;
    description: string;
    imageAlt: string;
    imageHeight: string;
    imagePath: string;
    imageType: string;
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
    faviconIcoPath: '/favicon.ico',
    faviconSvgPath: '/assets/favicon.svg',
    favicon32Path: '/assets/favicon-32.png',
    appleTouchIconPath: '/assets/apple-touch-icon.png',
    description:
      'Portfolio of Oliver Stadie, full-stack web and app developer.',
    imageAlt: `Portrait of Oliver Stadie with the text 'Oliver Stadie - Full Stack Developer'`,
    imageHeight: '630',
    imagePath: '/assets/og-image.jpg',
    imageType: 'image/jpeg',
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
      await expect(page).toHaveURL(
        new RegExp(`${currentPage.path}${OPTIONAL_URL_FRAGMENT_REGEX}$`)
      );

      await expectCompleteHtmlHeadElement({
        page,
        expectedPageContent: currentPage,
        pom: webMetadataPage,
      });
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

      await webMetadataPage.linkElementToUrl(currentPage.path).click();
      await expect(page).toHaveURL(
        new RegExp(`${currentPage.path}${OPTIONAL_URL_FRAGMENT_REGEX}$`)
      );

      await expectCompleteHtmlHeadElement({
        page,
        expectedPageContent: currentPage,
        pom: webMetadataPage,
      });
    });
  }
});

async function expectCompleteHtmlHeadElement({
  page,
  expectedPageContent,
  pom,
}: {
  page: Page;
  expectedPageContent: ExpectedPageContent;
  pom: WebMetadataPage;
}) {
  await expect(page).toHaveTitle(expectedPageContent.title);
  await expectFaviconLinksWork(pom);

  await expectOpenGraphMetadataWorks(pom, expectedPageContent);
  await expectMetaDescription(pom, expectedPageContent);
  await expect(pom.canonicalLink).toHaveAttribute(
    'href',
    `${pom.currentOrigin()}${expectedPageContent.path}`
  );
}

async function expectFaviconLinksWork(pom: WebMetadataPage): Promise<void> {
  const expected = EXPECTED_CONTENT.defaults;

  await expect(pom.faviconIcoLink).toHaveAttribute(
    'href',
    expected.faviconIcoPath
  );
  await pom.expectIsServed(expected.faviconIcoPath);

  await expect(pom.faviconSvgLink).toHaveAttribute(
    'href',
    expected.faviconSvgPath
  );
  await pom.expectIsServed(expected.faviconSvgPath);

  await expect(pom.favicon32Link).toHaveAttribute(
    'href',
    expected.favicon32Path
  );
  await pom.expectIsServed(expected.favicon32Path);

  await expect(pom.appleTouchIconLink).toHaveAttribute(
    'href',
    expected.appleTouchIconPath
  );
  await pom.expectIsServed(expected.appleTouchIconPath);
}

async function expectOpenGraphMetadataWorks(
  pom: WebMetadataPage,
  { path, title, description }: ExpectedPageContent
): Promise<void> {
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
  await expectMetadataElementToHaveContent(pom, 'og:url', expectedUrl);

  await expectOpenGraphImageToWork(pom);
}

async function expectMetadataElementToHaveContent(
  pom: WebMetadataPage,
  metadataKey: string,
  expectedString: string
): Promise<void> {
  await expect(pom.metadataElement(metadataKey)).toHaveAttribute(
    'content',
    expectedString
  );
}

async function expectOpenGraphImageToWork(pom: WebMetadataPage): Promise<void> {
  const expected = EXPECTED_CONTENT.defaults;
  await expectMetadataElementToHaveContent(
    pom,
    'og:image',
    `${pom.currentOrigin()}${expected.imagePath}`
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image:alt',
    expected.imageAlt
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image:height',
    expected.imageHeight
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image:type',
    expected.imageType
  );
  await expectMetadataElementToHaveContent(
    pom,
    'og:image:width',
    expected.imageWidth
  );

  const image = pom.metadataElement('og:image');
  await expect(image).toHaveAttribute(
    'content',
    `${pom.currentOrigin()}${expected.imagePath}`
  );
  await pom.expectIsServed(expected.imagePath);
}

async function expectMetaDescription(
  pom: WebMetadataPage,
  expected: ExpectedPageContent
): Promise<void> {
  await expect(pom.descriptionMeta).toHaveAttribute(
    'content',
    expected.description
  );
}
