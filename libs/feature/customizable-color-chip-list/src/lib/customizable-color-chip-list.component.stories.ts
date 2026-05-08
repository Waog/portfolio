import type { Meta, StoryObj } from '@storybook/angular';

import { CustomizableColorChipListComponent } from './customizable-color-chip-list.component';

const meta: Meta<CustomizableColorChipListComponent> = {
  title: 'Feature/Customizable Color Chip List',
  component: CustomizableColorChipListComponent,
  tags: ['autodocs'],
  args: {
    printMode: false,
    rows: 1,
    greenItems: ['Angular', 'Nx', 'SSR'],
    yellowItems: ['TypeScript', 'Storybook'],
    grayItems: ['Legacy API', 'Monolith'],
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
    rows: 2,
  },
};

export const PrintMode: Story = {
  args: {
    printMode: true,
    rows: 2,
    greenItems: ['Angular', 'Nx', 'SSR', 'RxJS', 'Signals'],
    yellowItems: ['TypeScript', 'Storybook', 'Playwright'],
    grayItems: ['Legacy API', 'Monolith', 'SOAP'],
  },
};
