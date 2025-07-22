import { inject, Injectable } from '@angular/core';
import { ProjectService, TechnologyMatchingService } from '@portfolio/projects';
import { SearchTagService } from '@portfolio/search-tags';
import { Category, Tag } from '@portfolio/taxonomy';
import { Memoize } from 'typescript-memoize';

// TODO: temporary until taxonomy is complete
export interface AdditionalKeywordCategories {
  title: Category;
  keywords: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SkillSectionService {
  private projectService = inject(ProjectService);
  private searchTagService = inject(SearchTagService);
  private technologyMatchingService = inject(TechnologyMatchingService);

  // TODO: move to taxonomy data
  // NOTE: leave the option to add non-project skills
  private readonly ADDITIONAL_SKILL_CATEGORIES: AdditionalKeywordCategories[] =
    [
      {
        title: 'Concepts',
        keywords: [
          'Microservices',
          'Micro Frontends',
          'REST',
          'GraphQL',
          'Scrum',
          'Agile',
          'JSON',
        ],
      },
      {
        title: 'Frontend',
        keywords: [
          'Angular',
          'AngularJS',
          'React Native',
          'TypeScript',
          'JavaScript',
          'HTML5',
          'CSS',
          'SCSS',
          'SASS',
          'RxJS',
          'Redux',
          'Ionic',
          'jQuery',
          'Lodash',
          'Swiper',
          'Stencil',
          'Fractal',
        ],
      },
      {
        title: 'Backend',
        keywords: [
          'Node.js',
          'Express',
          'NestJS',
          'Java',
          'Spring Boot',
          'MongoDB',
          'DynamoDB',
          'SQL',
          'RabbitMQ',
        ],
      },
      {
        title: 'Testing and QA',
        keywords: ['Jest', 'Mocha', 'Chai', 'Jasmine', 'Karma', 'Cypress'],
      },
      {
        title: 'Cloud & Infrastructure',
        keywords: [
          'AWS',
          'S3',
          'DynamoDB',
          'CDK',
          'CloudFormation',
          'CloudWatch',
          'AppConfig',
          'Elastic Beanstalk',
          'API Gateway',
          'IAM',
          'IAM Identity Center',
          'AWS Organizations',
          'Polly',
          'Docker',
          'Kubernetes',
        ],
      },
      {
        title: 'DevOps & Build & CI/CD',
        keywords: [
          'Jenkins',
          'GitHub',
          'GitLab',
          'BitBucket',
          'TFS',
          'nx',
          'npm',
          'yarn',
          'Maven',
          'Mono Repo',
          'Webpack',
          'Grunt',
          'Bower',
        ],
      },
      {
        title: 'Tools & Libraries',
        keywords: [
          'Sentry',
          'Lighthouse',
          'Web Vitals',
          'Puppeteer',
          'Redash',
          'DataDog',
          'Splunk',
          'GTM',
          'Jira',
          'Confluence',
          'Zeplin',
          'OpenAI',
        ],
      },
      {
        title: 'Misc',
        keywords: ['Cordova', 'Expo', 'XCode', 'iOS'],
      },
    ];

  getSkillCategories(): Map<Category, Tag[]> {
    const unsortedCategories = this.getUnsortedSkillCategories();
    const searchTags = this.searchTagService.currentTags;
    return this.sortCategoriesByMatchCount({ unsortedCategories, searchTags });
  }

  @Memoize()
  private getUnsortedSkillCategories(): Map<Category, Tag[]> {
    const result: Map<Category, Tag[]> = new Map();

    for (const project of this.projectService.getAll()) {
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

    for (const additionalCategory of this.ADDITIONAL_SKILL_CATEGORIES) {
      if (!result.has(additionalCategory.title)) {
        result.set(additionalCategory.title, []);
      }
      for (const keyword of additionalCategory.keywords) {
        const tag = Tag.get(keyword);
        if (!result.get(additionalCategory.title)?.includes(tag)) {
          result.get(additionalCategory.title)?.push(tag);
        }
      }
    }

    return result;
  }

  /**
   * NOTE: only public for unit tests, don't call it directly
   */
  @Memoize()
  public sortCategoriesByMatchCount({
    unsortedCategories,
    searchTags,
  }: {
    unsortedCategories: Map<Category, Tag[]>;
    searchTags: string[];
  }): Map<Category, Tag[]> {
    // Convert Map to array of entries for sorting
    const categoryEntries = Array.from(unsortedCategories.entries());

    // Sort by match count (most full matches first, then most indirect matches)
    categoryEntries.sort(([, tagsA], [, tagsB]) => {
      const matchCountA = this.technologyMatchingService.getMatchCount({
        keywordTags: tagsA,
        searchTags,
      });
      const matchCountB = this.technologyMatchingService.getMatchCount({
        keywordTags: tagsB,
        searchTags,
      });

      // Primary sort: by full matches (descending)
      if (matchCountA.full !== matchCountB.full) {
        return matchCountB.full - matchCountA.full;
      }

      // Secondary sort: by indirect matches (descending) - tiebreaker
      return matchCountB.indirect - matchCountA.indirect;
    });

    // Convert back to Map
    return new Map(categoryEntries);
  }
}
