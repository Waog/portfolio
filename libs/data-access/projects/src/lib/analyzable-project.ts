import { MemoizeAllArgs } from '@portfolio/memoize';
import { Tag } from '@portfolio/taxonomy';
import { Duration, formatDistance, intervalToDuration, sub } from 'date-fns';

import type { ProjectData } from './project.types';

export type ProjectDTOWithoutTechnologies = Omit<ProjectData, 'technologies'> &
  TimeFrame;

type TimeFrame = {
  fromText: string;
  toText: string;
  duration: Duration;
  durationText: string;
};

export class AnalyzableProject {
  private readonly data: ProjectData;

  private timeFrame: TimeFrame = {} as TimeFrame;

  constructor(data: ProjectData) {
    this.data = data;
    this.initTimeFrame(data);
  }

  private initTimeFrame(data: ProjectData) {
    this.timeFrame.fromText = this.toDateText(data.from);
    // NOTE: the project `to` date is exclusive. subtract one second to simulate the last inclusive point in time.
    // since we want to display the last month working in the project inclusive.
    const toInclusive: Date | undefined = data.to
      ? sub(data.to, { seconds: 1 })
      : undefined;
    this.timeFrame.toText = toInclusive
      ? this.toDateText(toInclusive)
      : 'Present';
    this.timeFrame.duration = intervalToDuration({
      start: data.from,
      end: data.to || new Date(),
    });
    this.timeFrame.durationText = formatDistance(
      data.to || new Date(),
      data.from
    )
      .replace('about ', '~')
      .replace('almost ', '~')
      .replace(/over (\d+)/, '$1+');
  }

  private toDateText(date: Date): string {
    return `${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getUTCFullYear()}`;
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
  get from() {
    return this.data.from;
  }
  get to() {
    return this.data.to;
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

  @MemoizeAllArgs
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

  public toDtoWithoutTechnologies(): ProjectDTOWithoutTechnologies {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { technologies, ...rest } = this.data;

    return {
      ...rest,
      ...this.timeFrame,
    };
  }
}
