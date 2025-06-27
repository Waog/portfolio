import type { Meta, StoryObj } from '@storybook/angular';

import { PdfContentComponent } from './pdf-content.component';

const meta: Meta<PdfContentComponent> = {
  component: PdfContentComponent,
  title: 'Feature/PDF Content',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'dinA4' },
  },
};

export default meta;
type Story = StoryObj<PdfContentComponent>;

export const Default: Story = {};
