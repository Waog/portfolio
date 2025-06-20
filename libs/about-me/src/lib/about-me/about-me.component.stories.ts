import type { Meta, StoryObj } from '@storybook/angular';
import { AboutMeComponent } from './about-me.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AboutMeComponent> = {
  component: AboutMeComponent,
  title: 'AboutMeComponent',
};
export default meta;
type Story = StoryObj<AboutMeComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/about-me works!/gi)).toBeTruthy();
  },
};
