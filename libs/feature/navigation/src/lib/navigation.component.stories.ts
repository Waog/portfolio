import { ActivatedRoute } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';

import { NavigationComponent } from './navigation.component';

const meta: Meta<NavigationComponent> = {
  component: NavigationComponent,
  title: 'Feature/Navigation',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            paramMap: of({}),
          },
        },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<NavigationComponent>;

export const Default: Story = {};
