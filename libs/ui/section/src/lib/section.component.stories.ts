import type { Meta, StoryObj } from '@storybook/angular';

import { SectionComponent } from './section.component';

const meta: Meta<SectionComponent> = {
  title: 'UI/Section',
  component: SectionComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SectionComponent>;

export const Default: Story = {};
