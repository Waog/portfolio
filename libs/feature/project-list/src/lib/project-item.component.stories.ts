import { Project } from '@portfolio/projects';
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

const mockProject: Project = new Project({
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
    'Mono Repo',
    'Nx',
    'Jest',
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
});

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
