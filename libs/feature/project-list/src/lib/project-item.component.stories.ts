import { Project } from '@portfolio/search-engine-domain';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';

import { ProjectItemComponent } from './project-item.component';

const meta: Meta<ProjectItemComponent> = {
  title: 'Feature/Project Item',
  component: ProjectItemComponent,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator(
      story =>
        `<div style="background-color: #EEE; padding: 1.5rem">
          <div style="background-color: white">
            ${story}
          </div>
        </div>`
    ),
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
    compact: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProjectItemComponent>;

const mockProject: Project = {
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
  technologies: {
    fullMatches: ['Angular', 'TypeScript'],
    partialMatches: ['Jest', 'SCSS', 'RxJS'],
    nonMatches: ['Nx', 'Mono Repo', 'Angular Material'],
  },
  role: 'Full-Stack Developer',
  team: 'Solo Project',
  fromText: '01/2024',
  toText: 'Present',
  durationText: '2+ years',
  location: 'Berlin, Germany',
  workMode: 'Remote',
  company: 'Personal Project',
  industry: 'Technology',
} as Partial<Project> as Project;

export const Default: Story = {
  args: {
    project: mockProject,
    isTopProject: false,
    compact: false,
  },
};

export const AsTopProject: Story = {
  args: {
    project: mockProject,
    isTopProject: true,
  },
};

export const Compact: Story = {
  args: {
    project: mockProject,
    isTopProject: false,
    compact: true,
  },
};
