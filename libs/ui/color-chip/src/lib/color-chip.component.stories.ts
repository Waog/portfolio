import type { Meta, StoryObj } from '@storybook/angular';

import { ColorChipComponent } from './color-chip.component';

const meta: Meta<ColorChipComponent> = {
  title: 'UI/ColorChip',
  component: ColorChipComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ColorChipComponent>;

export const Default: Story = {};
