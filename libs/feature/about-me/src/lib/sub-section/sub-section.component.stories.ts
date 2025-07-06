import { MatIconModule } from '@angular/material/icon';
import type { Meta, StoryObj } from '@storybook/angular';

import { SubSectionComponent } from './sub-section.component';

const meta: Meta<SubSectionComponent> = {
  component: SubSectionComponent,
  title: 'Feature/About Me/Sub Section',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A reusable sub-section component that wraps content in a Material card with header and content projection slots.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SubSectionComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-sub-section>
        <mat-icon slot="icon">person</mat-icon>
        <span slot="title">Personal Information</span>
        <div slot="content">
          <p>This is example content projected into the sub-section component.</p>
        </div>
      </lib-sub-section>
    `,
    moduleMetadata: {
      imports: [MatIconModule],
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Basic sub-section with icon, title, and content projected through content slots.',
      },
    },
  },
};

export const WithComplexContent: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-sub-section>
        <mat-icon slot="icon">school</mat-icon>
        <span slot="title">Education</span>
        <div slot="content">
          <div style="margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem 0;">Master's Degree</h4>
            <p style="margin: 0; color: #666;">University Name</p>
            <p style="margin: 0; color: #888; font-size: 0.875rem;">2020 - 2022</p>
          </div>
          <div style="padding: 0.75rem; background-color: #f8f9fa; border-radius: 6px; border-left: 3px solid #28a745;">
            <strong style="color: #28a745;">Grade: Excellent</strong>
          </div>
        </div>
      </lib-sub-section>
    `,
    moduleMetadata: {
      imports: [MatIconModule],
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Sub-section with more complex content structure demonstrating flexibility.',
      },
    },
  },
};
