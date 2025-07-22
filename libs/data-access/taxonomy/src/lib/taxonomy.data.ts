export type Category =
  | 'Backend'
  | 'Cloud & Infrastructure'
  | 'Concepts'
  | 'DevOps & Build & CI/CD'
  | 'Frontend'
  | 'Misc'
  | 'Testing and QA'
  | 'Tools & Libraries';

export type TagName =
  | 'Agile'
  | 'Angular'
  | 'Angular Material'
  | 'AngularJS'
  | 'API Gateway'
  | 'AppConfig'
  | 'Atlassian'
  | 'AWS'
  | 'Backend Systems'
  | 'BitBucket'
  | 'Bower'
  | 'CDK'
  | 'Chai'
  | 'Cloud Platforms'
  | 'CloudFormation'
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
  | 'TypeScript'
  | 'Various Technologies'
  | 'Vue.js'
  | 'Web Components'
  | 'Web Development'
  | 'Web Vitals'
  | 'Webpack'
  | 'XCode'
  | 'yarn'
  | 'Zeplin';

/**
 * Represents a single Keyword in the taxonomy.
 */
export type TaxonomyData = {
  /** Canonical Name of the Keyword, e.g. "Node.js" */
  readonly canonical: TagName;

  /** The Categories of this Keyword, e.g. "Cypress" has `categories: ["Testing and QA"]` */
  readonly categories: Category[];

  // TODO: default matching is a little inconsistent
  // decide for either whole-word matching or partial overlap
  // and consistently apply it to all entries `synonyms` fields
  // add a test which tries to match each keyword against all other keywords,
  // to ensure mutual exclusion. e.g. Tag.get('React Web').is('React') must be false
  /**
   * Matching alternatives:
   * Alternative names and identifying Regexes which mean the same Keyword, e.g. "node".
   * If not defined, defaults to the lowercase alphanumeric-only version of the canonical name.
   * Example: "Vue.js" would implicitly have `synonyms: [/^vuejs$/i]`.
   * Only define if the canonical name is not sufficient to identify the term.
   */
  readonly synonyms?: readonly (RegExp | string)[];

  /**
   * Implicitly included Keywords, which are *always* worked with in projects with the technology, but are not a parent/child relationship.
   * E.g. in Angular projects, you will always work with HTML, CSS, and TypeScript, even though they are not parent/child relationships.
   * Only list it in the topmost applicable ancestor (parent). E.g. list JavaScript/TypeScript in `React`, not in `React Web`.
   * Don't define if empty.
   */
  readonly includes?: readonly TagName[];

  /**
   * Related Keywords that are somehow related and worth mentioning in a related CV but not in a parent/child/cousin relationship, nor included.
   * E.g. RxJS is related to Angular, as often used together, but they can also exist independently.
   * Don't define if empty.
   */
  readonly related?: readonly TagName[];

  /**
   * Parent Keywords that are broader concepts that this Keyword falls under.
   * represents an "is a" relationship.
   * E.g. `Angular` is a `Frontend Framework`, so it has `parents: ['Frontend Framework']`.
   * Keep in sync with the `children` property of the other Keyword.
   * Don't define if empty.
   */
  readonly parents?: readonly TagName[];

  /**
   * Children Keywords that are more specific concepts that fall under this Keyword.
   * Represents an "is a" relationship.
   * E.g. `React Native` is a `React`, so `React` has `children: ['React Native', 'React Web']`.
   * Keep in sync with the `parents` property of the other Keyword.
   * Don't define if empty.
   */
  readonly children?: readonly TagName[];
};

export const TAXONOMY: readonly TaxonomyData[] = [
  {
    canonical: 'Agile',
    categories: ['Concepts'],
  },
  {
    canonical: 'Angular',
    categories: ['Frontend', 'Tools & Libraries'],
    synonyms: [
      // Matches "Angular 13", "Angular v13", "Angular Version 13", etc., but not "Angular Material"
      // cSpell: disable-next-line
      /^angular\s*(v(?:ersion)?\s*)?\d+$/i,
      /^angular$/i,
    ],
    includes: ['CSS', 'HTML', 'TypeScript'],
    related: ['Angular Material', 'AngularJS', 'RxJS', 'SASS', 'SCSS'],
    parents: ['Frontend Framework'],
    children: ['Angular Material'],
  },
  {
    canonical: 'Angular Material',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Angular'],
  },
  {
    canonical: 'AngularJS',
    categories: ['Frontend', 'Tools & Libraries'],
    synonyms: [/angular\.js/i, /angularjs/i],
    parents: ['Frontend Framework'],
    includes: ['CSS', 'HTML', 'TypeScript'],
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
    canonical: 'AWS',
    categories: ['Cloud & Infrastructure'],
    children: [
      'API Gateway',
      'AppConfig',
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
    synonyms: [/amazon web services/i, /aws/i],
  },
  {
    canonical: 'Backend Systems',
    categories: ['Misc'],
    synonyms: [/backend/i, /backend systems/i],
  },
  {
    canonical: 'BitBucket',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Atlassian'],
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
    synonyms: [/cloud/i, /cloud platforms/i],
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
    synonyms: [/^css$/i],
    related: ['SASS', 'SCSS'],
  },
  {
    canonical: 'Cypress',
    categories: ['Testing and QA'],
    related: ['JavaScript', 'TypeScript'],
  },
  {
    canonical: 'Database Systems',
    categories: ['Misc'],
    synonyms: [/database systems/i, /databases/i],
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
    synonyms: [/^express\.js$/i, /^express$/i, /^expressjs$/i],
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
    synonyms: [/frontend framework/i, /javascript framework/i, /js framework/i],
    parents: ['Framework'],
    children: ['Angular', 'AngularJS', 'React', 'Vue.js'],
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
    canonical: 'IAM',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
    children: ['IAM Identity Center'],
    synonyms: [/^aws iam$/i, /^iam$/i],
  },
  {
    canonical: 'IAM Identity Center',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS', 'IAM'],
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
    synonyms: [/^java$/i],
    children: ['Spring Boot'],
  },
  {
    canonical: 'JavaScript',
    categories: ['Backend', 'Frontend'],
    synonyms: [/^js$/i, /javascript/i],
    children: ['TypeScript'],
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
    canonical: 'jQuery',
    categories: ['Frontend', 'Tools & Libraries'],
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
    synonyms: [/mobile dev/i, /mobile development/i],
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
    synonyms: [/^node\.js$/i, /^node$/i, /^nodejs$/i],
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
    canonical: 'React',
    categories: ['Frontend', 'Tools & Libraries'],
    synonyms: [/^react$/i, /react\.js/i],
    parents: ['Frontend Framework'],
    children: ['React Native', 'React Web'],
    includes: ['CSS', 'HTML', 'TypeScript'],
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
    synonyms: [/^placeholder$/i, /^spacer$/i],
    categories: ['Misc'],
  },
  {
    canonical: 'Splunk',
    categories: ['Cloud & Infrastructure', 'Tools & Libraries'],
    related: ['DataDog'],
  },
  {
    canonical: 'Spring Boot',
    categories: ['Backend'],
    // cSpell: disable-next-line
    synonyms: [/^springboot$/i, /spring boot/i],
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
    synonyms: [/stencil/i],
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
    canonical: 'TypeScript',
    categories: ['Backend', 'Frontend'],
    synonyms: [/^ts$/i, /typescript/i],
    parents: ['JavaScript'],
  },
  {
    canonical: 'Various Technologies',
    categories: ['Misc'],
  },
  {
    canonical: 'Vue.js',
    categories: ['Frontend', 'Tools & Libraries'],
    synonyms: [/vue/i, /vue\.js/i, /vuejs/i],
    parents: ['Frontend Framework'],
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
    canonical: 'Zeplin',
    categories: ['Tools & Libraries'],
  },
] as const;
