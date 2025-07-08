import { Injectable } from '@angular/core';
import { TechnologyMatchingService } from '@portfolio/projects';

export interface SkillCategory {
  title: string;
  keywords: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SkillSectionService {
  constructor(private technologyMatchingService: TechnologyMatchingService) {}

  private readonly skillCategories: SkillCategory[] = [
    {
      title: 'General',
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
        'Angular 13',
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
      title: 'Tools and Libraries',
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

  getSkillCategories(): SkillCategory[] {
    return this.skillCategories.sort(
      (catA, catB) => this.getMatchCount(catB) - this.getMatchCount(catA)
    );
  }

  private getMatchCount(category: SkillCategory): number {
    return category.keywords.reduce((score, keyword) => {
      const matchType =
        this.technologyMatchingService.getBestMatchType(keyword);
      if (matchType === 'full') {
        return score + 1;
      } else if (matchType === 'indirect') {
        return score + 0.1;
      }
      return score;
    }, 0);
  }
}
