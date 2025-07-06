import type { Meta, StoryObj } from '@storybook/angular';

import { CommunityWritingComponent } from './community-writing.component';

const meta: Meta<CommunityWritingComponent> = {
  component: CommunityWritingComponent,
  title: 'Feature/About Me/Community Writing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays community involvement and writing activities including meetup organization and tech blogging with external links.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<CommunityWritingComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The community and writing section showcasing meetup organization and tech blogging activities with external links.',
      },
    },
  },
};
