import { Project } from '@portfolio/projects';
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

const mockProjectData = {
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
  technologies: [],
};
const mockProject: Project = new Project(mockProjectData);

export const Default: Story = {
  args: {
    project: mockProject,
    compact: false,
  },
};

export const LongerTexts: Story = {
  args: {
    project: new Project({
      ...mockProjectData,
      role: 'Senior Frontend Web and App Developer',
      team: 'Cross-functional Team (5 members)',
      fromTo: 'Mar 2023 - Dec 2023',
      duration: '10 months',
      location: 'Multiple Cities',
      workMode: 'Hybrid',
      company: 'FinTech Startup in Accelerator Phase',
      industry: 'FinTech',
    }),
  },
};

export const CompactMode: Story = {
  args: {
    project: mockProject,
    compact: true,
  },
};
