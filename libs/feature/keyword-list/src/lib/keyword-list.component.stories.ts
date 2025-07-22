import { TechnologyMatchingService } from '@portfolio/projects';
import { Tag } from '@portfolio/taxonomy';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { KeywordListComponent } from './keyword-list.component';

const meta: Meta<KeywordListComponent> = {
  component: KeywordListComponent,
  title: 'Feature/Keyword List',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<KeywordListComponent>;

export const Default: Story = {
  args: {
    keywordTags: [
      Tag.get('Angular'),
      Tag.get('TypeScript'),
      Tag.get('Material Design'),
      Tag.get('RxJS'),
      Tag.get('Jest'),
    ],
  },
};

export const WithMatchingTags: Story = {
  args: {
    keywordTags: [
      Tag.get('Angular'),
      Tag.get('TypeScript'),
      Tag.get('Material Design'),
      Tag.get('RxJS'),
      Tag.get('Jest'),
    ],
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: TechnologyMatchingService,
          useValue: {
            getBestMatchTypeForKeywordTag: ({
              keywordTag,
            }: {
              keywordTag: Tag;
            }) =>
              keywordTag.is('Angular') || keywordTag.is('TypeScript')
                ? 'full'
                : 'none',
          },
        },
      ],
    }),
  ],
};

export const WithPartialMatches: Story = {
  args: {
    keywordTags: [
      Tag.get('Angular'),
      Tag.get('TypeScript'),
      Tag.get('Material Design'),
      Tag.get('RxJS'),
      Tag.get('Jest'),
    ],
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: TechnologyMatchingService,
          useValue: {
            getBestMatchTypeForKeywordTag: ({
              keywordTag,
            }: {
              keywordTag: Tag;
            }) =>
              keywordTag.is('Angular') || keywordTag.is('TypeScript')
                ? 'indirect'
                : 'none',
          },
        },
      ],
    }),
  ],
};
