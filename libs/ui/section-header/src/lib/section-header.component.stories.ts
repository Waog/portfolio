import type { Meta, StoryObj } from '@storybook/angular';

import { SectionHeaderComponent } from './section-header.component';

const meta: Meta<SectionHeaderComponent> = {
  title: 'UI/Section Header',
  component: SectionHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The header text to display',
    },
    highlight: {
      control: 'boolean',
      description: 'Whether to show a green star icon and highlight styling',
    },
  },
};

export default meta;
type Story = StoryObj<SectionHeaderComponent>;

export const Default: Story = {
  args: {
    text: 'Section Header',
  },
};

export const Highlighted: Story = {
  args: {
    text: 'Featured Section',
    highlight: true,
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a very long section header that demonstrates how the component handles longer text content',
    highlight: false,
  },
};

export const HighlightedLongText: Story = {
  args: {
    text: 'This is a very long highlighted section header with a star icon',
    highlight: true,
  },
};
