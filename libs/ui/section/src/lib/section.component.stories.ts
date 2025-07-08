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
    noVerticalPadding: {
      control: 'boolean',
      description: 'Remove top and bottom padding (set to 0)',
    },
  },
};

export default meta;
type Story = StoryObj<SectionComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: `
      <lib-section [background]="background" [fullWidth]="fullWidth" [noVerticalPadding]="noVerticalPadding">
        <h2 style="background-color: lightblue;">Section Content</h2>
        <p style="background-color: lightgreen;">This is content projected into the section component. The section provides consistent padding and optional styling.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </lib-section>
    `,
  }),
  args: {
    background: false,
    fullWidth: false,
    noVerticalPadding: false,
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

export const NoVerticalPadding: Story = {
  render: args => ({
    props: args,
    template: `
      <div style="background-color: #f0f0f0; padding: 20px;">
        <p>Parent container (gray background) <code>hr</code> elements around section</p>
        <hr style="margin: 0;" />
        <lib-section [noVerticalPadding]="noVerticalPadding">
        <span style="background-color: white;">This section has no top or bottom padding, allowing content to be flush with the section edges vertically.</span>
        </lib-section>
        <hr style="margin: 0;" />
        <p>More content after the section</p>
      </div>
    `,
  }),
  args: {
    noVerticalPadding: true,
  },
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
