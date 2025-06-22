import type { Meta, StoryObj } from '@storybook/angular';

import { ColorChipListComponent } from './color-chip-list.component';

const meta: Meta<ColorChipListComponent> = {
  title: 'UI/ColorChipList',
  component: ColorChipListComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ColorChipListComponent>;

export const Default: Story = {};
