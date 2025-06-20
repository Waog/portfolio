import { SHARED_VIEWPORT_CONFIG } from '@portfolio/shared-ui';
import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: SHARED_VIEWPORT_CONFIG,
  },
};

export default preview;
