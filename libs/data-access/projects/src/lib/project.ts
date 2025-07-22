import { Tag } from '@portfolio/taxonomy';
import { Memoize } from 'typescript-memoize';

import type { ProjectData } from './project.data';

export class Project {
  private readonly data: ProjectData;

  constructor(data: ProjectData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }
  get title() {
    return this.data.title;
  }
  get projectType() {
    return this.data.projectType;
  }
  get compactDescription() {
    return this.data.compactDescription;
  }
  get keyAchievements() {
    return this.data.keyAchievements;
  }
  get fullDescription() {
    return this.data.fullDescription;
  }
  get features() {
    return this.data.features;
  }
  get highlights() {
    return this.data.highlights;
  }
  get role() {
    return this.data.role;
  }
  get team() {
    return this.data.team;
  }
  get fromTo() {
    return this.data.fromTo;
  }
  get duration() {
    return this.data.duration;
  }
  get location() {
    return this.data.location;
  }
  get workMode() {
    return this.data.workMode;
  }
  get company() {
    return this.data.company;
  }
  get industry() {
    return this.data.industry;
  }

  @Memoize()
  get technologies(): Tag[] {
    const originalDataTags: Tag[] = this.data.technologies.map(tech => {
      return Tag.get(tech);
    });

    const resultSet = new Set<Tag>(originalDataTags);

    for (const tag of originalDataTags) {
      tag.getImplicitTags().forEach(implicitTag => {
        resultSet.add(implicitTag);
      });
    }

    return Array.from(resultSet);
  }
}
