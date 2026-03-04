import { Project } from '@portfolio/search-engine-domain';
import type { Meta, StoryObj } from '@storybook/angular';

import { ProjectItemMetaTilesComponent } from './project-item-meta-tiles.component';

const meta: Meta<ProjectItemMetaTilesComponent> = {
  title: 'Feature/Project Item/Meta Tiles',
  component: ProjectItemMetaTilesComponent,
  tags: ['autodocs'],
  argTypes: {
    project: {
      control: 'object',
      table: {
        type: { summary: 'Project' },
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
type Story = StoryObj<ProjectItemMetaTilesComponent>;

const mockProjectData: Project = {
  role: 'Project Manager & Full-Stack Developer',
  team: 'Solo development',
  fromTo: '08/2023 – Present',
  duration: '1 year 10 months',
  location: 'Remote',
  workMode: 'Remote',
  company: 'Oliver Stadie IT GmbH',
  industry: 'Education Technology',
  id: '',
  title: '',
  projectType: '',
  compactDescription: '',
  keyAchievements: '',
  fullDescription: '',
  features: [],
  highlights: [],
  technologies: {
    fullMatches: [],
    partialMatches: [],
    nonMatches: [],
  },
};

export const Default: Story = {
  args: {
    project: mockProjectData,
    compact: false,
  },
};

export const LongerTexts: Story = {
  args: {
    project: {
      ...mockProjectData,
      role: 'Senior Frontend Web and App Developer',
      team: 'Cross-functional Team (5 members)',
      fromTo: 'Mar 2023 - Dec 2023',
      duration: '10 months',
      location: 'Multiple Cities',
      workMode: 'Hybrid',
      company: 'FinTech Startup in Accelerator Phase',
      industry: 'FinTech',
    },
  },
};

export const CompactMode: Story = {
  args: {
    project: mockProjectData,
    compact: true,
  },
};
