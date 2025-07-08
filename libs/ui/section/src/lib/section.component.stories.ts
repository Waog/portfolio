import type { Meta, StoryObj } from '@storybook/angular';

import { SectionComponent } from './section.component';

const meta: Meta<SectionComponent> = {
  title: 'UI/Section',
  component: SectionComponent,
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'boolean',
      description: 'Apply medium gray background with 80% transparency',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Remove horizontal padding (set to 0)',
    },
  },
};

export default meta;
type Story = StoryObj<SectionComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-section [background]="background" [fullWidth]="fullWidth">
        <h2 style="background-color: lightblue;">Section Content</h2>
        <p style="background-color: lightgreen;">This is content projected into the section component. The section provides consistent padding and optional styling.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </lib-section>
    `,
  }),
  args: {
    background: false,
    fullWidth: false,
  },
};

export const WithBackground: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-section background>
        <h2>Section with Background</h2>
        <p>This section has a medium gray background with 80% transparency.</p>
        <p>The background makes the content stand out from the surrounding elements.</p>
      </lib-section>
    `,
  }),
};

export const FullWidth: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-section fullWidth>
        <h2>Full Width Section</h2>
        <p>This section has no horizontal padding, allowing content to span the full width.</p>
        <div style="background-color: lightblue; padding: 8px;">
          This blue box demonstrates that content can extend to the edges when fullWidth is true.
        </div>
      </lib-section>
    `,
  }),
};

export const BackgroundAndFullWidth: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-section background fullWidth>
        <h2>Background + Full Width</h2>
        <p>This section combines both background and full-width options.</p>
        <div style="background-color: lightcoral; padding: 8px;">
          The background spans full width while content can extend to edges.
        </div>
      </lib-section>
    `,
  }),
};
