import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { Project } from '../models/project';
import { ProjectItemComponent } from './project-item.component';
import { ProjectItemTechnologyMatchingService } from './project-item-technology-matching.service';
import { MatchType, TechnologyWithMatch } from './technology-matching.types';

class MockProjectItemTechnologyMatchingService {
  addMatchTypes(technologies: string[]): TechnologyWithMatch[] {
    return technologies.map(tech => this.addMatchType(tech));
  }

  addMatchType(technologyName: string): TechnologyWithMatch {
    return {
      name: technologyName,
      matchType: this.getMatchType(technologyName),
    };
  }

  getMatchType(technologyName: string): MatchType {
    if (['Angular', 'TypeScript'].includes(technologyName)) {
      return 'full';
    }
    if (['SCSS', 'Angular Material'].includes(technologyName)) {
      return 'indirect';
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
        {
          provide: ProjectItemTechnologyMatchingService,
          useClass: MockProjectItemTechnologyMatchingService,
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
};
