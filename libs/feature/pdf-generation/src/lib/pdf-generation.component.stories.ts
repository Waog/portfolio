import type { Meta, StoryObj } from '@storybook/angular';

import { PdfGenerationComponent } from './pdf-generation.component';

const meta: Meta<PdfGenerationComponent> = {
  component: PdfGenerationComponent,
  title: 'Feature/PDF Generation',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'dinA4' },
  },
};

export default meta;
type Story = StoryObj<PdfGenerationComponent>;

export const Default: Story = {};
