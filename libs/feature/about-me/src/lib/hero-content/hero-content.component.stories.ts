import type { Meta, StoryObj } from '@storybook/angular';

import { HeroContentComponent } from './hero-content.component';

const meta: Meta<HeroContentComponent> = {
  component: HeroContentComponent,
  title: 'Feature/About Me/Hero Content',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A hero section component displaying personal information, profile photo, and key details in a prominent card layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<HeroContentComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The hero section with profile photo, name, role, location, and summary.',
      },
    },
  },
};
