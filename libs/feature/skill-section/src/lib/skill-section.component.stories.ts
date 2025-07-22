import type { Meta, StoryObj } from '@storybook/angular';

import { SkillSectionComponent } from './skill-section.component';

const meta: Meta<SkillSectionComponent> = {
  component: SkillSectionComponent,
  title: 'Feature/Skill Section',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SkillSectionComponent>;

export const Default: Story = {};
