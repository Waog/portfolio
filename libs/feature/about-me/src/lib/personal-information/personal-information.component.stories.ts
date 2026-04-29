import { signal } from '@angular/core';
import { CustomizationStateService } from '@portfolio/customization-state';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { PersonalInformationComponent } from './personal-information.component';

const meta: Meta<PersonalInformationComponent> = {
  component: PersonalInformationComponent,
  title: 'Feature/About Me/Personal Information',
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
          'Displays personal information including birth year, age, and languages spoken using color chips.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<PersonalInformationComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The personal information section with birth year, calculated age, and language skills displayed as color chips.',
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
