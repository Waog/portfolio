import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/test';

import { ColorChipComponent } from './color-chip.component';
import {
  ColorChipDimensionsService,
  ColorChipInputs,
} from './color-chip-dimensions.service';

const TOLERANCE = 2;

const meta: Meta<ColorChipComponent> = {
  title: 'UI/Color Chip/Dimensions Service Tests',
  component: ColorChipComponent,
  tags: ['autodocs'],
  args: {
    text: 'Sample chip',
  },
};

export default meta;
type Story = StoryObj<ColorChipComponent>;

// TODO: include storybook tests in CI/CD
export const Default: Story = {
  args: {
    text: 'Test Width',
  },
  play: async ({ canvasElement, args }) => {
    await expectCalculatedWithEqRenderedWidth(canvasElement, args);
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a much longer text to test width calculation accuracy',
  },
  play: async ({ canvasElement, args }) => {
    await expectCalculatedWithEqRenderedWidth(canvasElement, args);
  },
};

export const Icon: Story = {
  args: {
    text: 'Test With Icon',
    icon: 'star',
  },
  play: async ({ canvasElement, args }) => {
    await expectCalculatedWithEqRenderedWidth(canvasElement, args);
  },
};

export const CloseButton: Story = {
  args: {
    text: 'Test With Close Button',
    showCloseButton: true,
  },
  play: async ({ canvasElement, args }) => {
    await expectCalculatedWithEqRenderedWidth(canvasElement, args);
  },
};

export const SmallSpacing: Story = {
  args: {
    text: 'Test With Icon',
    spacing: 'small',
  },
  play: async ({ canvasElement, args }) => {
    await expectCalculatedWithEqRenderedWidth(canvasElement, args);
  },
};

export const MediumSpacing: Story = {
  args: {
    text: 'Test With Icon',
    spacing: 'medium',
  },
  play: async ({ canvasElement, args }) => {
    await expectCalculatedWithEqRenderedWidth(canvasElement, args);
  },
};

export const LargeSpacing: Story = {
  args: {
    text: 'Test With Icon',
    spacing: 'large',
  },
  play: async ({ canvasElement, args }) => {
    await expectCalculatedWithEqRenderedWidth(canvasElement, args);
  },
};

async function expectCalculatedWithEqRenderedWidth(
  canvasElement: HTMLElement,
  colorChipInputs: ColorChipInputs
) {
  const service = new ColorChipDimensionsService();
  const calculatedWidth = service.getWidth(colorChipInputs);

  const chipElement = canvasElement.querySelector('.color-chip') as HTMLElement;
  const actualWidth = chipElement.offsetWidth;

  const difference = Math.abs(actualWidth - calculatedWidth);
  expect(actualWidth, 'Actual width > 0').toBeGreaterThan(0);
  expect(calculatedWidth, 'Calculated width > 0').toBeGreaterThan(0);
  expect(difference, 'width difference ≤ tolerance').toBeLessThanOrEqual(
    TOLERANCE
  );
}
