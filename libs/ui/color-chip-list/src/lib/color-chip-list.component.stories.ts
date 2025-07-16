import type { Meta, StoryObj } from '@storybook/angular';

import { ColorChipListComponent } from './color-chip-list.component';

const meta: Meta<ColorChipListComponent> = {
  title: 'UI/Color Chip/Color Chip List',
  component: ColorChipListComponent,
  tags: ['autodocs'],
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
  },
};

export default meta;
type Story = StoryObj<ColorChipListComponent>;

export const Default: Story = {
  args: {
    greenItems: ['React', 'Angular', 'TypeScript'],
    yellowItems: ['JavaScript', 'Node.js'],
    grayItems: ['CSS', 'HTML'],
  },
};

export const Small: Story = {
  args: {
    greenItems: ['React', 'Angular', 'TypeScript'],
    yellowItems: ['JavaScript', 'Node.js'],
    grayItems: ['CSS', 'HTML'],
    spacing: 'small',
  },
};

export const Medium: Story = {
  args: {
    greenItems: ['React', 'Angular', 'TypeScript'],
    yellowItems: ['JavaScript', 'Node.js'],
    grayItems: ['CSS', 'HTML'],
    spacing: 'medium',
  },
};

export const Large: Story = {
  args: {
    greenItems: ['React', 'Angular', 'TypeScript'],
    yellowItems: ['JavaScript', 'Node.js'],
    grayItems: ['CSS', 'HTML'],
    spacing: 'large',
  },
};

export const ManyItems: Story = {
  args: {
    greenItems: ['React', 'Angular', 'Vue', 'TypeScript'],
    yellowItems: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'GraphQL'],
    grayItems: [
      'CSS',
      'HTML',
      'SCSS',
      'Bootstrap',
      'Tailwind',
      'Webpack',
      'Vite',
      'Jest',
      'Cypress',
    ],
  },
};

export const OnlyGreenItems: Story = {
  args: {
    greenItems: ['React', 'Angular', 'TypeScript', 'JavaScript'],
    yellowItems: [],
    grayItems: [],
  },
};

export const EmptyLists: Story = {
  args: {
    greenItems: [],
    yellowItems: [],
    grayItems: [],
  },
};
