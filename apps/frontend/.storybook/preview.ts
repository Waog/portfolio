import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '100%',
            height: '100%',
          },
        },
        dinA4: {
          name: 'DIN A4',
          styles: {
            width: '210mm',
            height: '297mm',
          },
        },
      },
      defaultViewport: 'desktop',
    },
  },
};

export default preview;
