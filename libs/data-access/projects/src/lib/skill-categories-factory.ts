import { MemoizeAllArgs } from '@portfolio/memoize';
import { Category, Tag, TagName } from '@portfolio/taxonomy';

import { getProjectsFactory } from './projects-factory';

export class SkillCategoriesFactory {
  private static readonly SKILLS_WITHOUT_PROJECT: TagName[] = [
    'SCRUM',
    'Agile',
  ];

  @MemoizeAllArgs
  public getAll(): Map<Category, Tag[]> {
    const result: Map<Category, Tag[]> = new Map();

    for (const project of getProjectsFactory().getAll()) {
      for (const tag of project.technologies) {
        for (const category of tag.categories) {
          if (!result.has(category)) {
            result.set(category, []);
          }
          if (!result.get(category)?.includes(tag)) {
            result.get(category)?.push(tag);
          }
        }
      }
    }

    for (const tagName of SkillCategoriesFactory.SKILLS_WITHOUT_PROJECT) {
      const tag = Tag.get(tagName);
      for (const category of tag.categories) {
        if (!result.has(category)) {
          result.set(category, []);
        }
        if (!result.get(category)?.includes(tag)) {
          result.get(category)?.push(tag);
        } else {
          console.warn(
            'SkillCategoriesFactory.SKILLS_WITHOUT_PROJECT contains a tag which is already present in the project tags:',
            tagName
          );
        }
      }
    }

    return result;
  }
}

const singleton = new SkillCategoriesFactory();

export function getSkillCategoriesFactory() {
  return singleton;
}
