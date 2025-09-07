export type Category =
  | 'Backend'
  | 'Cloud & Infrastructure'
  | 'Concepts'
  | 'DevOps & Build & CI/CD'
  | 'Frontend'
  | 'Misc'
  | 'Testing and QA'
  | 'Tools & Libraries';

type InternalTagName =
  | 'Agile'
  | 'Angular'
  | 'AngularJS'
  | 'Angular Material'
  | 'API Gateway'
  | 'AppConfig'
  | 'Atlassian'
  | 'AWS'
  | 'AWS Organizations'
  | 'Backend Systems'
  | 'BitBucket'
  | 'Bootstrap'
  | 'Bower'
  | 'CDK'
  | 'Chai'
  | 'CloudFormation'
  | 'Cloud Platforms'
  | 'CloudWatch'
  | 'Confluence'
  | 'Cordova'
  | 'CSS'
  | 'Cypress'
  | 'Database Systems'
  | 'DataDog'
  | 'DevOps Tools'
  | 'Docker'
  | 'DynamoDB'
  | 'Eclipse'
  | 'Elastic Beanstalk'
  | 'Expo'
  | 'Express'
  | 'Fractal'
  | 'Framework'
  | 'Frontend Framework'
  | 'GitHub'
  | 'GitLab'
  | 'Google Analytics'
  | 'GraphQL'
  | 'Grunt'
  | 'GTM'
  | 'HTML'
  | 'HTML5'
  | 'IAM'
  | 'IAM Identity Center'
  | 'Ionic'
  | 'iOS'
  | 'Jasmine'
  | 'Java'
  | 'JavaScript'
  | 'Jenkins'
  | 'Jest'
  | 'Jira'
  | 'jQuery'
  | 'jQuery UI'
  | 'JSON'
  | 'Karma'
  | 'Kubernetes'
  | 'Lighthouse'
  | 'Lodash'
  | 'Maven'
  | 'Micro Frontends'
  | 'Microservices'
  | 'Mobile Development'
  | 'Mocha'
  | 'MongoDB'
  | 'Mono Repo'
  | 'NestJS'
  | 'Node.js'
  | 'npm'
  | 'Nx'
  | 'OAuth2'
  | 'OpenAI'
  | 'Polly'
  | 'Project Management'
  | 'Puppeteer'
  | 'QA'
  | 'RabbitMQ'
  | 'React'
  | 'React Native'
  | 'React Web'
  | 'Redash'
  | 'Redux'
  | 'REST'
  | 'RxJS'
  | 'S3'
  | 'SASS'
  | 'SCRUM'
  | 'SCSS'
  | 'Sentry'
  | 'Spacer'
  | 'Splunk'
  | 'Spring Boot'
  | 'SQL'
  | 'Stencil'
  | 'Swiper'
  | 'TFS'
  | 'Travis CI'
  | 'TypeScript'
  | 'Underscore'
  | 'Various Technologies'
  | 'Vue.js'
  | 'Web Components'
  | 'Web Development'
  | 'Webpack'
  | 'Web Vitals'
  | 'XCode'
  | 'yarn'
  | 'Yeoman'
  | 'Zeplin';

/**
 * Represents a single Keyword in the taxonomy.
 */
// @keep-sorted
export type TaxonomyData = {
  /** Canonical Name of the Keyword, e.g. "Node.js" */
  readonly canonical: InternalTagName;

  /** The Categories of this Keyword, e.g. "Cypress" has `categories: ["Testing and QA"]` */
  readonly categories: Category[];

  /**
   * Children Keywords that are more specific concepts that fall under this Keyword.
   * Represents an "is a" relationship.
   * E.g. `React Native` is a `React`, so `React` has `children: ['React Native', 'React Web']`.
   * Keep in sync with the `parents` property of the other Keyword.
   * Don't define if empty.
   */
  readonly children?: readonly InternalTagName[];

  /**
   * Implicitly included Keywords, which are *always* worked with in projects with the technology, but are not a parent/child relationship.
   * E.g. in Angular projects, you will always work with HTML, CSS, and TypeScript, even though they are not parent/child relationships.
   * Only list it in the topmost applicable ancestor (parent). E.g. list JavaScript/TypeScript in `React`, not in `React Web`.
   * Don't define if empty.
   */
  readonly includes?: readonly InternalTagName[];

  /**
   * Parent Keywords that are broader concepts that this Keyword falls under.
   * represents an "is a" relationship.
   * E.g. `Angular` is a `Frontend Framework`, so it has `parents: ['Frontend Framework']`.
   * Keep in sync with the `children` property of the other Keyword.
   * Don't define if empty.
   */
  readonly parents?: readonly InternalTagName[];

  /**
   * Related Keywords that are somehow related and worth mentioning in a related CV but not in a parent/child/cousin relationship, nor included.
   * E.g. RxJS is related to Angular, as often used together, but they can also exist independently.
   * Don't define if empty.
   */
  readonly related?: readonly InternalTagName[];

  /**
   * Matching alternatives:
   * Alternative names and identifying Regexes which mean the same Keyword, e.g. "node".
   * Regexes must match the search term as defined.
   * Strings must match the search term by exactly matching the string.
   * If not defined, matches to the lowercase alphanumeric-only version of the canonical name
   * against any substring of the lowercase alphanumeric-only version of the search term.
   * Example is synonyms is undefined:
   * canonical name: `Vue.js` -> becomes `vuejs`
   * search term: `Vue version 13` -> becomes `vueversion13`
   * As `vuejs` is not a substring of `vueversion13`, it does not match.
   * Only define if the default behavior is not sufficient to identify the term.
   * If substring matching is not desired, must be defined.
   */
  readonly synonyms?: readonly (RegExp | string)[];
};

// @keep-sorted { "keys": ["canonical"] }
const INTERNAL_TAXONOMY = [
  {
    canonical: 'Agile',
    categories: ['Concepts'],
  },
  {
    canonical: 'Angular Material',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Angular'],
  },
  {
    canonical: 'Angular',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['Angular Material'],
    includes: ['CSS', 'HTML', 'TypeScript'],
    parents: ['Frontend Framework'],
    related: ['Angular Material', 'AngularJS', 'RxJS', 'SASS', 'SCSS'],
    synonyms: [
      // Matches "Angular 13", "Angular v13", "Angular Version 13", etc., but not "Angular Material"
      // cSpell: disable-next-line
      /^angular\s*(v(?:ersion)?\s*)?\d+$/i,
      /^angular$/i,
    ],
  },
  {
    canonical: 'AngularJS',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML', 'TypeScript'],
    parents: ['Frontend Framework'],
    related: ['Angular'],
  },
  {
    canonical: 'API Gateway',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'AppConfig',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'Atlassian',
    categories: ['Tools & Libraries'],
    children: ['BitBucket', 'Confluence', 'Jira'],
  },
  {
    canonical: 'AWS Organizations',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'AWS',
    categories: ['Cloud & Infrastructure'],
    children: [
      'API Gateway',
      'AppConfig',
      'AWS Organizations',
      'CDK',
      'CloudFormation',
      'CloudWatch',
      'DynamoDB',
      'Elastic Beanstalk',
      'IAM',
      'IAM Identity Center',
      'Polly',
      'S3',
    ],
    synonyms: [/^aws$/i, /amazon web services/i],
  },
  {
    canonical: 'Backend Systems',
    categories: ['Misc'],
    synonyms: [/backend systems/i, /backend/i],
  },
  {
    canonical: 'BitBucket',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Atlassian'],
  },
  {
    canonical: 'Bootstrap',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML', 'JavaScript'],
    related: ['jQuery', 'SASS', 'SCSS'],
  },
  {
    canonical: 'Bower',
    categories: ['DevOps & Build & CI/CD'],
    related: ['npm', 'yarn'],
  },
  {
    canonical: 'CDK',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['AWS'],
  },
  {
    canonical: 'Chai',
    categories: ['Testing and QA'],
  },
  {
    canonical: 'Cloud Platforms',
    categories: ['Misc'],
    synonyms: [/^cloud$/i, /cloud platform/i],
  },
  {
    canonical: 'CloudFormation',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['AWS'],
  },
  {
    canonical: 'CloudWatch',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'Confluence',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
  },
  {
    canonical: 'Cordova',
    categories: ['DevOps & Build & CI/CD'],
  },
  {
    canonical: 'CSS',
    categories: ['Frontend'],
    related: ['SASS', 'SCSS'],
    synonyms: [/^css/i],
  },
  {
    canonical: 'Cypress',
    categories: ['Testing and QA'],
    related: ['JavaScript', 'TypeScript'],
  },
  {
    canonical: 'Database Systems',
    categories: ['Misc'],
    synonyms: [/database system/i, /databases/i],
  },
  {
    canonical: 'DataDog',
    categories: ['Cloud & Infrastructure', 'Tools & Libraries'],
    related: ['Docker', 'Kubernetes', 'Splunk'],
  },
  {
    canonical: 'DevOps Tools',
    categories: ['Misc'],
  },
  {
    canonical: 'Docker',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    related: ['Kubernetes'],
  },
  {
    canonical: 'DynamoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
    parents: ['AWS'],
    synonyms: [/dynamo/i],
  },
  {
    canonical: 'Eclipse',
    categories: ['Tools & Libraries'],
  },
  {
    canonical: 'Elastic Beanstalk',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'Expo',
    categories: ['Cloud & Infrastructure', 'Tools & Libraries'],
    includes: ['React Native'],
  },
  {
    canonical: 'Express',
    categories: ['Backend', 'Tools & Libraries'],
    children: ['NestJS'],
    parents: ['Node.js'],
  },
  {
    canonical: 'Fractal',
    categories: ['Frontend', 'Tools & Libraries'],
    related: ['Stencil', 'Web Components'],
  },
  {
    canonical: 'Framework',
    categories: ['Misc'],
    children: ['Frontend Framework'],
  },
  {
    canonical: 'Frontend Framework',
    categories: ['Frontend'],
    children: ['Angular', 'AngularJS', 'React', 'Vue.js'],
    parents: ['Framework'],
    synonyms: [/frontend framework/i, /javascript framework/i, /js framework/i],
  },
  {
    canonical: 'GitHub',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
  },
  {
    canonical: 'GitLab',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
  },
  {
    canonical: 'Google Analytics',
    categories: ['Tools & Libraries'],
    related: ['GTM'],
  },
  {
    canonical: 'GraphQL',
    categories: ['Backend', 'Concepts', 'Frontend', 'Tools & Libraries'],
  },
  {
    canonical: 'Grunt',
    categories: ['DevOps & Build & CI/CD'],
    related: ['npm', 'yarn'],
  },
  {
    canonical: 'GTM',
    categories: ['Tools & Libraries'],
    related: ['Google Analytics'],
    synonyms: [/google tag manager/i, /gtm/i],
  },
  {
    canonical: 'HTML',
    categories: ['Frontend'],
  },
  {
    canonical: 'HTML5',
    categories: ['Frontend'],
    includes: ['CSS', 'HTML', 'JavaScript'],
  },
  {
    canonical: 'IAM Identity Center',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS', 'IAM'],
  },
  {
    canonical: 'IAM',
    categories: ['Cloud & Infrastructure'],
    children: ['IAM Identity Center'],
    parents: ['AWS'],
    synonyms: [/^aws iam$/i, /^iam$/i],
  },
  {
    canonical: 'Ionic',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML', 'JavaScript'],
    related: ['Angular', 'React', 'Vue.js'],
  },
  {
    canonical: 'iOS',
    categories: ['DevOps & Build & CI/CD'],
  },
  {
    canonical: 'Jasmine',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
  },
  {
    canonical: 'Java',
    categories: ['Backend'],
    children: ['Spring Boot'],
    synonyms: [/^java$/i],
  },
  {
    canonical: 'JavaScript',
    categories: ['Backend', 'Frontend'],
    children: ['TypeScript'],
    synonyms: [/^js$/i, /javascript/i],
  },
  {
    canonical: 'Jenkins',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
  },
  {
    canonical: 'Jest',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
  },
  {
    canonical: 'Jira',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
  },
  {
    canonical: 'jQuery UI',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['JavaScript'],
    parents: ['jQuery'],
  },
  {
    canonical: 'jQuery',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['jQuery UI'],
    includes: ['JavaScript'],
  },
  {
    canonical: 'JSON',
    categories: ['Concepts'],
  },
  {
    canonical: 'Karma',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    related: ['Jasmine'],
  },
  {
    canonical: 'Kubernetes',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    related: ['Docker'],
    synonyms: [/^k8s$/i, /^kubernetes$/i],
  },
  {
    canonical: 'Lighthouse',
    categories: ['Testing and QA', 'Tools & Libraries'],
    related: ['Web Vitals'],
  },
  {
    canonical: 'Lodash',
    categories: ['Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Underscore'],
  },
  {
    canonical: 'Maven',
    categories: ['DevOps & Build & CI/CD'],
  },
  {
    canonical: 'Micro Frontends',
    categories: ['Concepts', 'Frontend'],
    related: ['Microservices'],
  },
  {
    canonical: 'Microservices',
    categories: ['Backend', 'Concepts'],
    related: ['Micro Frontends', 'Mono Repo'],
    synonyms: [/microservice/i],
  },
  {
    canonical: 'Mobile Development',
    categories: ['Misc'],
    synonyms: [/mobile dev/i],
  },
  {
    canonical: 'Mocha',
    categories: ['Testing and QA'],
  },
  {
    canonical: 'MongoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
  },
  {
    canonical: 'Mono Repo',
    categories: ['Concepts'],
    children: ['Nx'],
    related: ['Microservices'],
  },
  {
    canonical: 'NestJS',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Express'],
  },
  {
    canonical: 'Node.js',
    categories: ['Backend'],
    children: ['Express'],
    includes: ['JavaScript'],
    synonyms: [/node/i],
  },
  {
    canonical: 'npm',
    categories: ['DevOps & Build & CI/CD'],
  },
  {
    canonical: 'Nx',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['npm'],
    parents: ['Mono Repo'],
    related: ['JavaScript', 'TypeScript'],
    synonyms: [/^nrwl nx$/i, /^nx$/i],
  },
  {
    canonical: 'OAuth2',
    categories: ['Concepts'],
    synonyms: [/oauth 2/i, /oauth2/i],
  },
  {
    canonical: 'OpenAI',
    categories: ['Tools & Libraries'],
  },
  {
    canonical: 'Polly',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'Project Management',
    categories: ['Misc'],
    synonyms: [/^pm$/i, /project management/i],
  },
  {
    canonical: 'Puppeteer',
    categories: ['Testing and QA', 'Tools & Libraries'],
    related: ['JavaScript', 'TypeScript'],
  },
  {
    canonical: 'QA',
    categories: ['Misc'],
    synonyms: [/^qa$/i, /quality assurance/i],
  },
  {
    canonical: 'RabbitMQ',
    categories: ['Backend', 'Tools & Libraries'],
  },
  {
    canonical: 'React Native',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['React'],
  },
  {
    canonical: 'React Web',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['React'],
  },
  {
    canonical: 'React',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['React Native', 'React Web'],
    includes: ['CSS', 'HTML', 'TypeScript'],
    parents: ['Frontend Framework'],
    synonyms: [/^react$/i, /react\.js/i],
  },
  {
    canonical: 'Redash',
    categories: ['Tools & Libraries'],
    includes: ['SQL'],
  },
  {
    canonical: 'Redux',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['React'],
  },
  {
    canonical: 'REST',
    categories: ['Concepts'],
    synonyms: [/^rest$/i, /rest api/i, /restful/i],
  },
  {
    canonical: 'RxJS',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['TypeScript'],
    related: ['Angular'],
  },
  {
    canonical: 'S3',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'SASS',
    categories: ['Frontend'],
    includes: ['CSS'],
    related: ['SCSS'],
  },
  {
    canonical: 'SCRUM',
    categories: ['Concepts'],
  },
  {
    canonical: 'SCSS',
    categories: ['Frontend'],
    includes: ['CSS'],
    related: ['SASS'],
  },
  {
    canonical: 'Sentry',
    categories: ['Tools & Libraries'],
  },
  {
    // NOTE: this is not a real technology, but a placeholder for empty spaces in the UI
    canonical: 'Spacer',
    categories: ['Misc'],
    synonyms: [/^placeholder$/i, /^spacer$/i],
  },
  {
    canonical: 'Splunk',
    categories: ['Cloud & Infrastructure', 'Tools & Libraries'],
    related: ['DataDog'],
  },
  {
    canonical: 'Spring Boot',
    categories: ['Backend'],
    parents: ['Java'],
  },
  {
    canonical: 'SQL',
    categories: ['Backend'],
  },
  {
    canonical: 'Stencil',
    categories: ['Frontend', 'Tools & Libraries'],
    related: ['Fractal', 'TypeScript', 'Web Components'],
  },
  {
    canonical: 'Swiper',
    categories: ['Frontend', 'Tools & Libraries'],
  },
  {
    canonical: 'TFS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    synonyms: [/^tfs$/i, /team foundation server/i],
  },
  {
    canonical: 'Travis CI',
    categories: ['DevOps & Build & CI/CD'],
    related: ['GitHub', 'GitLab', 'Jenkins'],
    synonyms: [/travis/i],
  },
  {
    canonical: 'TypeScript',
    categories: ['Backend', 'Frontend'],
    parents: ['JavaScript'],
    synonyms: [/^ts$/i, /typescript/i],
  },
  {
    canonical: 'Underscore',
    categories: ['Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Lodash'],
  },
  {
    canonical: 'Various Technologies',
    categories: ['Misc'],
  },
  {
    canonical: 'Vue.js',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Frontend Framework'],
    synonyms: [/^vue/i],
  },
  {
    canonical: 'Web Components',
    categories: ['Concepts', 'Frontend'],
  },
  {
    canonical: 'Web Development',
    categories: ['Misc'],
    synonyms: [/web dev/i, /web development/i],
  },
  {
    canonical: 'Web Vitals',
    categories: ['Concepts'],
    related: ['Lighthouse'],
  },
  {
    canonical: 'Webpack',
    categories: ['DevOps & Build & CI/CD'],
  },
  {
    canonical: 'XCode',
    categories: ['DevOps & Build & CI/CD'],
    includes: ['iOS'],
  },
  {
    canonical: 'yarn',
    categories: ['DevOps & Build & CI/CD'],
    related: ['npm'],
  },
  {
    canonical: 'Yeoman',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['npm'],
  },
  {
    canonical: 'Zeplin',
    categories: ['Tools & Libraries'],
  },
] satisfies readonly TaxonomyData[];

export type TagName = (typeof INTERNAL_TAXONOMY)[number]['canonical'];
export const TAXONOMY = INTERNAL_TAXONOMY as readonly TaxonomyData[];

// NOTE: check if any non defined tags are used, by checking this type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type nonDefinedTags = Exclude<InternalTagName, TagName>;
