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
  },
};

export default meta;
type Story = StoryObj<ProjectItemMetaTilesComponent>;

const mockProject: Project = {
  ...({} as Project),
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
  },
};

export const RemoteWork: Story = {
  args: {
    project: {
      ...mockProject,
      role: 'Senior Frontend Developer',
      team: 'Cross-functional Team (5 members)',
      fromTo: 'Mar 2023 - Dec 2023',
      duration: '10 months',
      location: 'Multiple Cities',
      workMode: 'Hybrid',
      company: 'Tech Startup',
      industry: 'FinTech',
    },
  },
};

export const ConsultingProject: Story = {
  args: {
    project: {
      ...mockProject,
      role: 'Technical Consultant',
      team: 'Client Team + External Consultants',
      fromTo: 'Jun 2022 - Feb 2023',
      duration: '9 months',
      location: 'Frankfurt, Germany',
      workMode: 'On-site',
      company: 'Large Enterprise Client',
      industry: 'Banking & Finance',
    },
  },
};
