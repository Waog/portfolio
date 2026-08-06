import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CustomizationStateService } from '@portfolio/customization-state';
import { Project } from '@portfolio/search-engine-domain';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  applicationConfig,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';

import { CustomizableProjectItemComponent } from './customizable-project-item.component';

const meta: Meta<CustomizableProjectItemComponent> = {
  title: 'Feature/Customizable Project Item',
  component: CustomizableProjectItemComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
    moduleMetadata({
      providers: [
        {
          provide: CustomizationStateService,
          useValue: {
            isPanelShown: signal(true),
          },
        },
      ],
    }),
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
    isTopProject: { control: 'boolean' },
    compact: { control: 'boolean' },
    printMode: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CustomizableProjectItemComponent>;

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
    printMode: false,
  },
};

export const AsTopProject: Story = {
  args: {
    project: mockProject,
    isTopProject: true,
    printMode: false,
  },
};

export const Compact: Story = {
  args: {
    project: mockProject,
    isTopProject: false,
    compact: true,
    printMode: false,
  },
};
