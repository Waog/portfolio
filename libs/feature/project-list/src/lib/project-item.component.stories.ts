import {
  MatchType,
  Project,
  TechnologyMatchingService,
} from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BehaviorSubject } from 'rxjs';

import { ProjectItemComponent } from './project-item.component';

// Mock SearchTagService for Storybook
class MockSearchTagService {
  private tagsSubject = new BehaviorSubject<string[]>([]);
  public readonly tags$ = this.tagsSubject.asObservable();

  public get currentTags(): string[] {
    return this.tagsSubject.value;
  }

  public initializeWithTags(tags: string[]): void {
    this.tagsSubject.next(tags);
  }
}

class MockTechnologyMatchingService {
  private searchTagService: MockSearchTagService;

  constructor(searchTagService: MockSearchTagService) {
    this.searchTagService = searchTagService;
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

  getBestMatchType(technologyName: string, searchTags?: string[]): MatchType {
    if (!searchTags) {
      searchTags = this.searchTagService.currentTags;
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

const meta: Meta<ProjectItemComponent> = {
  title: 'Feature/ProjectItem',
  component: ProjectItemComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        { provide: SearchTagService, useClass: MockSearchTagService },
        {
          provide: TechnologyMatchingService,
          useFactory: (searchTagService: MockSearchTagService) => {
            return new MockTechnologyMatchingService(searchTagService);
          },
          deps: [SearchTagService],
        },
      ],
    }),
  ],
  argTypes: {
    project: {
      control: 'object',
      table: {
        type: { summary: 'Project' },
      },
    },
    isTopProject: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProjectItemComponent>;

const mockProject: Project = {
  id: 'angular-portfolio',
  title: 'Portfolio Website Development',
  projectType: 'Web Application',
  compactDescription:
    'Modern Angular portfolio showcasing professional experience and skills.',
  keyAchievements:
    'Built responsive design with TypeScript and implemented advanced filtering.',
  fullDescription:
    'Developed a comprehensive portfolio website using Angular 18 with a focus on modern web standards, accessibility, and performance. The project features a component-based architecture with reusable UI elements and implements advanced filtering capabilities for project browsing.',
  features: [
    'Responsive design with Angular Material',
    'TypeScript implementation',
    'Component-based architecture',
    'Advanced project filtering',
    'SEO optimization',
    'Performance monitoring',
  ],
  highlights: [
    'Achieved 95+ Lighthouse performance score',
    'Implemented accessibility standards (WCAG 2.1)',
    'Built reusable component library',
    'Integrated automated testing suite',
  ],
  technologies: [
    'Angular',
    'TypeScript',
    'Jest',
    'SCSS',
    'RxJS',
    'Nx',
    'Storybook',
    'ESLint',
    'Prettier',
    'Angular Material',
  ],
  role: 'Full-Stack Developer',
  team: 'Solo Project',
  fromTo: 'Jan 2024 - Present',
  duration: '6+ months',
  location: 'Berlin, Germany',
  workMode: 'Remote',
  company: 'Personal Project',
  industry: 'Technology',
};

export const Default: Story = {
  args: {
    project: mockProject,
    isTopProject: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default project item with no search tags selected. All technologies will show as gray (no match).',
      },
    },
  },
};

export const WithMatchingTags: Story = {
  args: {
    project: mockProject,
    isTopProject: false,
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags(['Angular', 'TypeScript']);
            return service;
          },
        },
        {
          provide: TechnologyMatchingService,
          useFactory: (searchTagService: MockSearchTagService) => {
            return new MockTechnologyMatchingService(searchTagService);
          },
          deps: [SearchTagService],
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Project item with matching search tags. Technologies that match the search tags will be highlighted in green (full matches) or yellow (partial matches).',
      },
    },
  },
};

export const WithPartialMatches: Story = {
  args: {
    project: mockProject,
    isTopProject: false,
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags(['Script', 'Material']);
            return service;
          },
        },
        {
          provide: TechnologyMatchingService,
          useFactory: (searchTagService: MockSearchTagService) => {
            return new MockTechnologyMatchingService(searchTagService);
          },
          deps: [SearchTagService],
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Project item showing partial matches. "Script" will partially match "TypeScript" and "Material" will partially match "Angular Material".',
      },
    },
  },
};

export const AsTopProject: Story = {
  args: {
    project: mockProject,
    isTopProject: true,
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags(['Angular', 'TypeScript']);
            return service;
          },
        },
        {
          provide: TechnologyMatchingService,
          useFactory: (searchTagService: MockSearchTagService) => {
            return new MockTechnologyMatchingService(searchTagService);
          },
          deps: [SearchTagService],
        },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Project item displayed as a top project with special styling and matching search tags.',
      },
    },
  },
};
