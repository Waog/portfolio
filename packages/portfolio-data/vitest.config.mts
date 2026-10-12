import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/portfolio-data',
  test: {
    passWithNoTests: true,
    name: '@portfolio/portfolio-data',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory:
        '../../dist/packages/portfolio-data/test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
