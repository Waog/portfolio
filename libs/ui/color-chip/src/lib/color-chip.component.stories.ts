import type { Meta, StoryObj } from '@storybook/angular';

import { ColorChipComponent } from './color-chip.component';

const meta: Meta<ColorChipComponent> = {
  title: 'UI/ColorChip',
  component: ColorChipComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [undefined, 'green', 'yellow', 'red'],
      mapping: {
        undefined: undefined,
        green: 'green',
        yellow: 'yellow',
        red: 'red',
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
      options: [
        undefined,
        'star',
        'check_circle',
        'warning',
        'error',
        'info',
        'label',
        'filter_list',
      ],
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

export const AllPermutations: Story = {
  render: args => {
    const variants = ['green', 'yellow', 'red'] as const;
    const spacings = ['small', 'medium', 'large'] as const;
    const icons = [undefined, 'star'] as const;
    const closeButtonStates = [false, true] as const;
    const permutations: Array<{
      color: (typeof variants)[number];
      spacing: (typeof spacings)[number];
      icon: (typeof icons)[number];
      showCloseButton: (typeof closeButtonStates)[number];
    }> = [];

    type Permutation = (typeof permutations)[number];

    variants.forEach(color =>
      spacings.forEach(spacing =>
        icons.forEach(icon =>
          closeButtonStates.forEach(showCloseButton => {
            permutations.push({ color, spacing, icon, showCloseButton });
          })
        )
      )
    );

    return {
      props: {
        ...args,
        permutations,
        closeClick: () => {
          console.log('Close clicked');
          return args.closeClick ? args.closeClick() : undefined;
        },
        getPermutationText: (perm: Permutation) =>
          `${perm.color}-${perm.spacing}${perm.icon ? '-' + perm.icon : ''}${
            perm.showCloseButton ? '-close' : ''
          }`,
        trackByPermutation: (index: number, perm: Permutation) =>
          `${perm.color}-${perm.spacing}-${perm.icon}-${perm.showCloseButton}`,
      },
      template: `
        <div style="display: grid; gap: 0.5rem; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); max-height: 80vh; overflow-y: auto;">
          <lib-color-chip
            *ngFor="let perm of permutations; trackBy: trackByPermutation"
            [text]="getPermutationText(perm)"
            [color]="perm.color"
            [spacing]="perm.spacing"
            [icon]="perm.icon"
            [showCloseButton]="perm.showCloseButton"
            (closeClick)="closeClick()">
          </lib-color-chip>
        </div>
      `,
      moduleMetadata: {
        imports: [ColorChipComponent],
      },
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          'All possible permutations of the color chip component properties displayed dynamically.',
      },
    },
  },
};
