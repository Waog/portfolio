import type { Meta, StoryObj } from '@storybook/angular';

import { ColorChipComponent } from './color-chip.component';
import { createPermutationStory } from './permutation-utils.stories';

const meta: Meta<ColorChipComponent> = {
  title: 'UI/Color Chip/Color Chip',
  component: ColorChipComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [undefined, 'green', 'yellow', 'red', 'gray'],
      mapping: {
        undefined: undefined,
        green: 'green',
        yellow: 'yellow',
        red: 'red',
        gray: 'gray',
      },
      table: {
        type: { summary: 'ChipColor' },
        defaultValue: { summary: 'green' },
      },
    },
    text: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    icon: {
      control: 'select',
      options: [undefined, 'star', 'check_circle'],
      mapping: {
        undefined: undefined,
        star: 'star',
        check_circle: 'check_circle',
        warning: 'warning',
        error: 'error',
        info: 'info',
        label: 'label',
        filter_list: 'filter_list',
      },
      description: 'material icon id',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
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
      table: {
        type: { summary: 'ChipSpacing' },
        defaultValue: { summary: 'medium' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    closeClick: {
      action: 'closeClick',
      description: 'EventEmitter<void>',
      table: {
        category: 'Events',
        type: {
          summary: 'EventEmitter<void>',
        },
      },
    },
  },
  args: {
    text: 'Sample chip',
  },
};

export default meta;
type Story = StoryObj<ColorChipComponent>;

export const Default: Story = {};

export const AllPermutations: Story = createPermutationStory({
  meta,
  splitProperty: 'color',
  excludeUndefined: ['color', 'showCloseButton', 'spacing'],
  // includeUndefined: ['showCloseButton'],
  columnOrder: ['icon', 'showCloseButton', 'spacing'],
  displayConfig: { alignment: 'center-left' },
  textGenerators: {
    text: {
      mode: 'constant',
      constantText: 'Hello World',
    },
  },
});
