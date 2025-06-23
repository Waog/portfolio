import type { Meta, StoryObj } from '@storybook/angular';

import { KeywordListComponent } from './keyword-list.component';

const meta: Meta<KeywordListComponent> = {
  component: KeywordListComponent,
  title: 'Feature/Keyword List',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<KeywordListComponent>;

export const Default: Story = {};
