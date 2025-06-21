import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { AboutMeComponent } from './about-me.component';

const meta: Meta<AboutMeComponent> = {
  component: AboutMeComponent,
  title: 'About Me/AboutMeComponent',
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

export const InteractiveTest: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that key elements are present
    expect(canvas.getByText('Oliver Stadie')).toBeTruthy();
    expect(canvas.getByText('Berlin • Germany')).toBeTruthy();
    expect(canvas.getByText('Full-Stack Web and App Developer')).toBeTruthy();
    expect(canvas.getByText('Personal Information')).toBeTruthy();
    expect(canvas.getByText('Technical Skills')).toBeTruthy();
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive test story that verifies key content elements are rendered correctly.',
      },
    },
  },
};
