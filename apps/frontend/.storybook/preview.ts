import type { Preview } from '@storybook/angular';

const preview: Preview = {
  initialGlobals: {
    viewport: { value: 'desktop', isRotated: false },
  },
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      options: {
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
    },
  },
};

export default preview;
