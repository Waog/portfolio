import { MatchType, TechnologyMatchingService } from '@portfolio/projects';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { SkillSectionComponent } from './skill-section.component';

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

const meta: Meta<SkillSectionComponent> = {
  component: SkillSectionComponent,
  title: 'Feature/Skill Section',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SkillSectionComponent>;

export const Default: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: TechnologyMatchingService,
          useFactory: () => {
            const service = new MockTechnologyMatchingService();
            service.setCurrentTags([
              'Angular',
              'React',
              'Vue.js',
              'TypeScript',
              'JavaScript',
              'CSS',
              'Node.js',
              'Express',
              'Python',
              'Java',
              'C#',
              'Go',
              'AWS',
              'Docker',
              'Kubernetes',
              'PostgreSQL',
              'MongoDB',
              'Jest',
              'Cypress',
              'Git',
              'Jenkins',
              'Linux',
            ]);
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
          'Skill section showing mixed matches with extensive search tags. Demonstrates full matches (green), partial matches (yellow), and no matches (gray) across all skill categories.',
      },
    },
  },
};
