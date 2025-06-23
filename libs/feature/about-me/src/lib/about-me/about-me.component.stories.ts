import type { Meta, StoryObj } from '@storybook/angular';

import { AboutMeComponent } from './about-me.component';

const meta: Meta<AboutMeComponent> = {
  component: AboutMeComponent,
  title: 'Feature/About Me',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive about me component displaying personal information, skills, education, and experience in a professional card layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AboutMeComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The complete about me profile card with all personal information, skills, and professional details.',
      },
    },
  },
};
