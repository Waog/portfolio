import type { Meta, StoryObj } from '@storybook/angular';

import { SectionHeaderComponent } from './section-header.component';

const meta: Meta<SectionHeaderComponent> = {
  title: 'UI/Section Header',
  component: SectionHeaderComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SectionHeaderComponent>;

export const Default: Story = {};
