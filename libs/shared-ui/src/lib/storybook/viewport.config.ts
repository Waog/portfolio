// Shared Storybook viewport configuration
export const SHARED_VIEWPORT_CONFIG = {
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
} as const;
