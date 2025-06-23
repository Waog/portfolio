import { ProjectService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BehaviorSubject } from 'rxjs';

import { MatchesOverviewComponent } from './matches-overview.component';

// Mock SearchTagService for Storybook
class MockSearchTagService {
  private tagsSubject = new BehaviorSubject<string[]>([]);
  public readonly tags$ = this.tagsSubject.asObservable();

  public initializeWithTags(tags: string[]): void {
    this.tagsSubject.next(tags);
  }
}

// Mock ProjectService for Storybook
class MockProjectService {
  private mockProjects = [
    {
      id: '1',
      title: 'Angular Project 1',
      technologies: ['Angular', 'TypeScript'],
    },
    { id: '2', title: 'Angular Project 2', technologies: ['Angular', 'RxJS'] },
    { id: '3', title: 'React Project', technologies: ['React', 'JavaScript'] },
    { id: '4', title: 'Vue Project', technologies: ['Vue', 'TypeScript'] },
    { id: '5', title: 'Node.js API', technologies: ['Node.js', 'Express'] },
    {
      id: '6',
      title: 'Full Stack App',
      technologies: ['Angular', 'Node.js', 'MongoDB'],
    },
  ];

  getBy(filterConfig: {
    isFullMatchFor?: string;
    isPartialFor?: string;
  }): { id: string; title: string; technologies: string[] }[] {
    const { isFullMatchFor, isPartialFor } = filterConfig;

    if (isFullMatchFor) {
      // Return projects that directly contain the technology
      return this.mockProjects.filter(project =>
        project.technologies.includes(isFullMatchFor)
      );
    } else if (isPartialFor) {
      // Return projects that have related technologies (simplified logic for demo)
      const partialMatches: Record<string, string[]> = {
        Angular: ['RxJS', 'TypeScript'],
        React: ['JavaScript'],
        TypeScript: ['Angular', 'Vue'],
        JavaScript: ['React'],
        'Node.js': ['Express'],
      };

      const relatedTechs = partialMatches[isPartialFor] || [];
      return this.mockProjects.filter(project =>
        relatedTechs.some(tech => project.technologies.includes(tech))
      );
    }

    return [];
  }
}

const meta: Meta<MatchesOverviewComponent> = {
  component: MatchesOverviewComponent,
  title: 'Feature/Matches Overview',
  decorators: [
    moduleMetadata({
      providers: [
        { provide: SearchTagService, useClass: MockSearchTagService },
        { provide: ProjectService, useClass: MockProjectService },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A component that displays an overview of project matches for selected search tags. Shows both full matches (projects that directly use the technology) and partial matches (projects with related technologies).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<MatchesOverviewComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The default state with no tags selected, showing an empty matches overview.',
      },
    },
  },
};

export const WithSingleTag: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags(['Angular']);
            return service;
          },
        },
        { provide: ProjectService, useClass: MockProjectService },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows matches for a single technology tag (Angular). Displays both full matches (projects using Angular directly) and partial matches (projects with related technologies like TypeScript and RxJS).',
      },
    },
  },
};

export const WithManyTags: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags([
              'Angular',
              'Python',
              'TypeScript',
              'React',
              'Rust',
              'JavaScript',
              'Node.js',
              'Express',
              'Go',
            ]);
            return service;
          },
        },
        { provide: ProjectService, useClass: MockProjectService },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the component handles a large number of tags, including both tags with matches and tags with no matches. Demonstrates the responsive layout and comprehensive match overview with mixed results.',
      },
    },
  },
};

export const WithNoMatches: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchTagService,
          useFactory: () => {
            const service = new MockSearchTagService();
            service.initializeWithTags(['Rust', 'Go', 'Kotlin']);
            return service;
          },
        },
        { provide: ProjectService, useClass: MockProjectService },
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the component displays when tags have no matching projects. All match counts will be zero.',
      },
    },
  },
};
