export const WEB_METADATA = {
  defaults: {
    description:
      'Portfolio of Oliver Stadie, full-stack web and app developer.',
    imageAlt:
      "Portrait of Oliver Stadie with the text 'Oliver Stadie - Full Stack Developer'",
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
    },
    legal: {
      cookiePolicy: {
        description:
          'Cookie policy and tracking information for the Oliver Stadie portfolio website.',
        title: 'Cookies | Oliver Stadie',
      },
      imprint: {
        description:
          'Imprint and legal publisher details for the Oliver Stadie portfolio website.',
        title: 'Imprint | Oliver Stadie',
      },
      privacyPolicy: {
        description:
          'Privacy policy for the Oliver Stadie portfolio website and related services.',
        title: 'Privacy | Oliver Stadie',
      },
    },
  },
} as const;
