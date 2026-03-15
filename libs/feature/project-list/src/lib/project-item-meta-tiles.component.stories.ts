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
  role: 'Developer',
  team: 'Development Team',
  fromText: '01/2024',
  toText: '12/2024',
  durationText: '1 year',
  location: 'Remote',
  workMode: 'Remote',
  company: 'Oliver Stadie IT GmbH',
  industry: 'Education Technology',
} as Partial<Project> as Project;

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
