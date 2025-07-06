import type { Meta, StoryObj } from '@storybook/angular';

import { EducationComponent } from './education.component';

const meta: Meta<EducationComponent> = {
  component: EducationComponent,
  title: 'Feature/About Me/Education',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays educational background including degree, university, duration, grade, and subsidiary field with external link to certificate.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<EducationComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The education section showcasing academic credentials with highlighted grade achievement and external certificate link.',
      },
    },
  },
};
