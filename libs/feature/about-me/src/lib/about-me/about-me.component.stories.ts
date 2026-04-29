import { signal } from '@angular/core';
import { CustomizationStateService } from '@portfolio/customization-state';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { AboutMeComponent } from './about-me.component';
import { MediaWrapperComponent } from './media-wrapper.component.stories';

const meta: Meta<AboutMeComponent> = {
  component: AboutMeComponent,
  title: 'Feature/About Me',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MediaWrapperComponent],
      providers: [
        {
          provide: CustomizationStateService,
          useValue: { isPrintMode: signal(false) },
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<AboutMeComponent>;

export const Default: Story = {
  render: (args, { globals }) => ({
    template:
      globals['viewport'] === 'dinA4'
        ? `<lib-media-wrapper [media]="'print'"><lib-about-me /></lib-media-wrapper>`
        : `<lib-about-me />`,
  }),
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
  render: () => ({
    template: `<lib-about-me />`,
  }),
};
