import type { Meta, StoryObj } from '@storybook/angular';

import { ContactSectionComponent } from './contact-section.component';

const meta: Meta<ContactSectionComponent> = {
  component: ContactSectionComponent,
  title: 'Feature/Contact Section',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ContactSectionComponent>;

export const Default: Story = {};
