import { signal, type WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';
import type { ChipSpacing } from '@portfolio/color-chip';
import { CustomizationStateService } from '@portfolio/customization-state';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  applicationConfig,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

import { CustomizableColorChipListComponent } from './customizable-color-chip-list.component';
import { CustomizableColorChipListUrlService } from './customizable-color-chip-list-url.service';

const customSpacingByKey: WritableSignal<Record<string, ChipSpacing | null>> =
  signal({});
const customRowsByKey: WritableSignal<Record<string, number | null>> = signal(
  {}
);

const mockCustomizableColorChipListUrlService = {
  getSpacing: (urlPersistenceKey: string) =>
    customSpacingByKey()[urlPersistenceKey] ?? null,
  getRows: (urlPersistenceKey: string) =>
    customRowsByKey()[urlPersistenceKey] ?? null,
  setSpacing: (urlPersistenceKey: string, spacing: ChipSpacing | null) => {
    customSpacingByKey.update(state => ({
      ...state,
      [urlPersistenceKey]: spacing,
    }));
  },
  setRows: (urlPersistenceKey: string, rows: number | null) => {
    customRowsByKey.update(state => ({
      ...state,
      [urlPersistenceKey]: rows,
    }));
  },
};

const meta: Meta<CustomizableColorChipListComponent> = {
  title: 'Feature/Customizable Color Chip List',
  component: CustomizableColorChipListComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
    moduleMetadata({
      providers: [
        {
          provide: CustomizationStateService,
          useValue: {
            isPanelShown: signal(true),
          },
        },
        {
          provide: CustomizableColorChipListUrlService,
          useValue: mockCustomizableColorChipListUrlService,
        },
      ],
    }),
    componentWrapperDecorator(
      story =>
        `<div style="background-color: #EEE; padding: 1.5rem; max-width: 22rem;">
          <div style="background-color: white">
            ${story}
          </div>
        </div>`
    ),
  ],
  args: {
    printMode: false,
    rows: 1,
    urlPersistenceKey: 'storybook-chip-list-default',
    greenItems: ['Angular', 'Nx', 'SSR', 'RxJS', 'Signals'],
    yellowItems: ['TypeScript', 'Storybook', 'Playwright'],
    grayItems: ['Legacy API', 'Monolith', 'SOAP'],
  },
  argTypes: {
    greenItems: { control: 'object' },
    yellowItems: { control: 'object' },
    grayItems: { control: 'object' },
    rows: {
      control: { type: 'number', min: 1 },
    },
    spacing: {
      control: 'select',
      options: [undefined, 'small', 'medium', 'large'],
      mapping: {
        undefined: undefined,
        small: 'small',
        medium: 'medium',
        large: 'large',
      },
    },
    printMode: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CustomizableColorChipListComponent>;

export const Default: Story = {};

export const TwoRows: Story = {
  args: {
    urlPersistenceKey: 'storybook-chip-list-two-rows',
    rows: 2,
  },
};

export const PrintMode: Story = {
  args: {
    urlPersistenceKey: 'storybook-chip-list-print-mode',
    printMode: true,
    rows: 2,
    greenItems: ['Angular', 'Nx', 'SSR', 'RxJS', 'Signals'],
    yellowItems: ['TypeScript', 'Storybook', 'Playwright'],
    grayItems: ['Legacy API', 'Monolith', 'SOAP'],
  },
};
