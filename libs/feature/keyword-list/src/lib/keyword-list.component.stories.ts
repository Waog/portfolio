import { MatchType, TechnologyMatchingService } from '@portfolio/projects';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { KeywordListComponent } from './keyword-list.component';

// Mock TechnologyMatchingService for Storybook
class MockTechnologyMatchingService {
  private currentTags: string[] = [];

  setCurrentTags(tags: string[]) {
    this.currentTags = tags;
  }

  getMatchType(technologyName: string, searchTag: string): MatchType {
    const techLower = technologyName.toLowerCase();
    const tagLower = searchTag.toLowerCase();

    // Check for full match (exact string match, case insensitive)
    if (techLower === tagLower) {
      return 'full';
    }

    // Check for indirect matches (substring match in either direction)
    if (techLower.includes(tagLower) || tagLower.includes(techLower)) {
      return 'indirect';
    }

    return 'none';
  }

  getBestMatchTypeForTechnology({
    technologyName,
    searchTags,
  }: {
    technologyName: string;
    searchTags?: string[];
  }): MatchType {
    if (!searchTags) {
      searchTags = this.currentTags;
    }

    // First check for any full matches
    for (const tag of searchTags) {
      if (this.getMatchType(technologyName, tag) === 'full') {
        return 'full';
      }
    }

    // Then check for any indirect matches
    for (const tag of searchTags) {
      if (this.getMatchType(technologyName, tag) === 'indirect') {
        return 'indirect';
      }
    }

    return 'none';
  }
}

const meta: Meta<KeywordListComponent> = {
  component: KeywordListComponent,
  title: 'Feature/Keyword List',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<KeywordListComponent>;

export const Default: Story = {
  args: {
    keywords: ['Angular', 'TypeScript', 'Material Design', 'RxJS', 'Jest'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default keyword list with no search tags selected. All keywords will show as gray (no match).',
      },
    },
  },
};

export const WithMatchingTags: Story = {
  args: {
    keywords: ['Angular', 'TypeScript', 'Material Design', 'RxJS', 'Jest'],
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: TechnologyMatchingService,
          useFactory: () => {
            const service = new MockTechnologyMatchingService();
            service.setCurrentTags(['Angular', 'TypeScript']);
            return service;
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Keyword list with matching search tags. Keywords that match the search tags will be highlighted in green (full matches) or yellow (partial matches).',
      },
    },
  },
};

export const WithPartialMatches: Story = {
  args: {
    keywords: ['Angular', 'TypeScript', 'Material Design', 'RxJS', 'Jest'],
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: TechnologyMatchingService,
          useFactory: () => {
            const service = new MockTechnologyMatchingService();
            service.setCurrentTags(['Script', 'Material']);
            return service;
          },
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Keyword list showing partial matches. "Script" will partially match "TypeScript" and "Material" will partially match "Material Design".',
      },
    },
  },
};
