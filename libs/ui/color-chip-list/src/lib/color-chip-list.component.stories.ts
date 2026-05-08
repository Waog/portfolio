import type { Meta, StoryObj } from '@storybook/angular';

import { ColorChipListComponent } from './color-chip-list.component';

const meta: Meta<ColorChipListComponent> = {
  title: 'UI/Color Chip/Color Chip List',
  component: ColorChipListComponent,
  tags: ['autodocs'],
  args: {
    printMode: false,
    rows: 1,
  },
  argTypes: {
    greenItems: {
      control: 'object',
      description: 'Array of items to display with green color and star icon',
    },
    yellowItems: {
      control: 'object',
      description:
        'Array of items to display with yellow color and star_border icon',
    },
    grayItems: {
      control: 'object',
      description: 'Array of items to display with gray color and no icon',
    },
    rows: {
      control: { type: 'number', min: 1 },
      description: 'Maximum number of rows shown in collapsed mode',
    },
    spacing: {
      control: 'select',
      options: [undefined, 'small', 'medium', 'large'],
      mapping: {
        undefined: undefined,
        small: 'small',
        medium: 'medium',
        large: 'large',
      },
      table: {
        type: { summary: 'ChipSpacing' },
        defaultValue: { summary: 'large' },
      },
    },
    printMode: {
      control: 'boolean',
      description: 'Apply the TS-driven print layout state',
    },
  },
};

export default meta;
type Story = StoryObj<ColorChipListComponent>;

const TECH_TERMS = [
  'React',
  'Angular',
  'Vue',
  'Svelte',
  'SolidJS',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Deno',
  'Bun',
  'Express',
  'Fastify',
  'NestJS',
  'Hono',
  'GraphQL',
  'Apollo',
  'tRPC',
  'REST API',
  'gRPC',
  'WebSockets',
  'PostgreSQL',
  'MySQL',
  'MariaDB',
  'MongoDB',
  'Redis',
  'Elasticsearch',
  'OpenSearch',
  'SQLite',
  'Prisma',
  'TypeORM',
  'Drizzle',
  'Sequelize',
  'Docker',
  'Kubernetes',
  'Helm',
  'Terraform',
  'Pulumi',
  'GitHub Actions',
  'GitLab CI',
  'Azure DevOps',
  'AWS',
  'Azure',
  'GCP',
  'Cloudflare',
  'Vite',
  'Webpack',
  'Rollup',
  'esbuild',
  'SWC',
  'Vitest',
  'Jest',
  'Playwright',
  'Cypress',
  'Storybook',
  'Tailwind CSS',
  'SCSS',
  'CSS Modules',
  'Motion One',
  'RxJS',
  'Zod',
  'OpenAPI',
  'OAuth 2.1',
  'OIDC',
  'Sentry',
  'Datadog',
  'Prometheus',
  'Grafana',
  'Feature Flags',
  'Edge Functions',
  'Serverless',
  'Microfrontends',
  'Monorepo',
  'Nx',
  'PWA',
  'SSR',
  'Streaming SSR',
  'Web Components',
  'Design Tokens',
  'A11y',
  'i18n',
  'SEO',
  'Jamstack',
  'CQRS',
  'Event Sourcing',
  'Hexagonal Architecture',
  'Clean Architecture',
];

const buildItems = (itemCount: number) => {
  const selected = TECH_TERMS.slice(0, itemCount);

  return {
    greenItems: selected.filter((_, index) => index % 3 === 0),
    yellowItems: selected.filter((_, index) => index % 3 === 1),
    grayItems: selected.filter((_, index) => index % 3 === 2),
  };
};

const buildStoryArgs = (
  itemCount: number,
  rows: number,
  options?: {
    spacing?: 'small' | 'medium' | 'large';
    printMode?: boolean;
  }
) => ({
  ...buildItems(itemCount),
  rows,
  ...(options?.spacing ? { spacing: options.spacing } : {}),
  ...(options?.printMode ? { printMode: true } : {}),
});

export const OneRowWithFewerItems: Story = {
  name: '1 row with fewer items',
  args: buildStoryArgs(4, 1),
};

export const OneRowWithMoreItems: Story = {
  name: '1 row with more items',
  args: buildStoryArgs(20, 1),
};

export const TwoRowsWithFewerItems: Story = {
  name: '2 rows with fewer items',
  args: buildStoryArgs(8, 2),
};

export const TwoRowsWithMoreItems: Story = {
  name: '2 rows with more items',
  args: buildStoryArgs(28, 2),
};

export const ThreeRowsWithFewerItems: Story = {
  name: '3 rows with fewer items',
  args: buildStoryArgs(12, 3),
};

export const ThreeRowsWithMoreItems: Story = {
  name: '3 rows with more items',
  args: buildStoryArgs(36, 3),
};

export const OneRowSmallSpacingWithFewerItems: Story = {
  name: '1 row with fewer items (small spacing)',
  args: buildStoryArgs(4, 1, { spacing: 'small' }),
};

export const OneRowSmallSpacingWithMoreItems: Story = {
  name: '1 row with more items (small spacing)',
  args: buildStoryArgs(24, 1, { spacing: 'small' }),
};

export const TwoRowsMediumSpacingWithFewerItems: Story = {
  name: '2 rows with fewer items (medium spacing)',
  args: buildStoryArgs(8, 2, { spacing: 'medium' }),
};

export const TwoRowsMediumSpacingWithMoreItems: Story = {
  name: '2 rows with more items (medium spacing)',
  args: buildStoryArgs(30, 2, { spacing: 'medium' }),
};

export const TwoRowsLargeSpacingWithFewerItems: Story = {
  name: '2 rows with fewer items (large spacing)',
  args: buildStoryArgs(8, 2, { spacing: 'large' }),
};

export const TwoRowsLargeSpacingWithMoreItems: Story = {
  name: '2 rows with more items (large spacing)',
  args: buildStoryArgs(30, 2, { spacing: 'large' }),
};

export const ThreeRowsSmallSpacingWithFewerItems: Story = {
  name: '3 rows with fewer items (small spacing)',
  args: buildStoryArgs(12, 3, { spacing: 'small' }),
};

export const ThreeRowsSmallSpacingWithMoreItems: Story = {
  name: '3 rows with more items (small spacing)',
  args: buildStoryArgs(40, 3, { spacing: 'small' }),
};

export const OneRowWithMoreItemsPrintMode: Story = {
  name: '1 row with more items (print mode)',
  args: buildStoryArgs(24, 1, { printMode: true }),
};

export const TwoRowsWithMoreItemsPrintMode: Story = {
  name: '2 rows with more items (print mode)',
  args: buildStoryArgs(32, 2, { printMode: true }),
};
