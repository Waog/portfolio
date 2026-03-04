import { MemoizeAllArgs } from '@portfolio/memoize';
import { Tag, TagName } from '@portfolio/taxonomy';

import { getProjectsFactory } from './projects-factory';

/**
 * Those are my skills which are not explicitly mentioned in any project.
 * E.g. because I just acquired them through tutorials or test projects, which are not listed in my project list.
 * Those shall appear in the "Skills" section of my portfolio, but not in the "Projects" section.
 */
const SKILLS_WITHOUT_PROJECT: TagName[] = [];

export class SkillsWithoutProjectsFactory {
  @MemoizeAllArgs
  public getAll(): Tag[] {
    const result = new Set<Tag>();

    for (const tagName of SKILLS_WITHOUT_PROJECT) {
      const tag = Tag.get(tagName);
      const isInProject = this.isInProject(tag);
      if (!isInProject) {
        result.add(tag);
      }
    }

    return Array.from(result);
  }

  @MemoizeAllArgs
  private isInProject(tag: Tag): boolean {
    let result = false;
    for (const project of getProjectsFactory().getAll()) {
      for (const projectTag of project.technologies) {
        if (projectTag === tag) {
          result = true;
          console.warn(
            `SKILLS_WITHOUT_PROJECT contains tag '${tag.canonical}' which is actually present in project '${project.id}': `,
            tag,
            project
          );
        }
      }
    }
    return result;
  }
}

const singleton = new SkillsWithoutProjectsFactory();

export function getSkillsWithoutProjectsFactory() {
  return singleton;
}
