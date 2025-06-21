import type { Meta, StoryObj } from '@storybook/angular';

import { ColorChipComponent } from './color-chip.component';

const meta: Meta<ColorChipComponent> = {
  title: 'UI/ColorChip',
  component: ColorChipComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [undefined, 'green', 'yellow', 'red'],
    },
    text: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<ColorChipComponent>;

export const Default: Story = {
  args: {
    text: 'Default chip',
  },
};

export const Green: Story = {
  args: {
    text: '3 matching projects',
    color: 'green',
  },
};

export const Yellow: Story = {
  args: {
    text: '2 partially matching projects',
    color: 'yellow',
  },
};

export const Red: Story = {
  args: {
    text: 'no matching projects',
    color: 'red',
  },
};
