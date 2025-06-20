// Shared Storybook configuration for all libraries
import type { Preview } from '@storybook/angular';

export const sharedPreviewConfig: Preview = {
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
      },
      defaultViewport: 'desktop',
    },
  },
};
