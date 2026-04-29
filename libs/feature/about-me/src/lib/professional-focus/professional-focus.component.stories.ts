import { signal } from '@angular/core';
import { CustomizationStateService } from '@portfolio/customization-state';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { ProfessionalFocusComponent } from './professional-focus.component';

const meta: Meta<ProfessionalFocusComponent> = {
  component: ProfessionalFocusComponent,
  title: 'Feature/About Me/Professional Focus',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: CustomizationStateService,
          useValue: { isPrintMode: signal(false) },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Displays professional focus and expertise summary highlighting experience in web application development and technology stacks.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProfessionalFocusComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The professional focus section providing a concise overview of technical expertise and referring to the portfolio for detailed project information.',
      },
    },
  },
};

export const PrintMode: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: CustomizationStateService,
          useValue: { isPrintMode: signal(true) },
        },
      ],
    }),
  ],
};
