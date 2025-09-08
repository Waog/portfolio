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
  | 'Ant'
  | 'API Gateway'
  | 'AppConfig'
  | 'Atlassian'
  | 'AWS'
  | 'AWS Organizations'
  | 'Backend Systems'
  | 'BitBucket'
  | 'Bootstrap'
  | 'Bower'
  | 'C++'
  | 'CDK'
  | 'chai'
  | 'CloudFormation'
  | 'Cloud Platforms'
  | 'CloudWatch'
  | 'Computer Vision'
  | 'Confluence'
  | 'Cordova'
  | 'CSS'
  | 'Custom Game Engine'
  | 'Custom Scripts'
  | 'Custom Test Framework'
  | 'Cypress'
  | 'Database Systems'
  | 'DataDog'
  | 'DevOps Tools'
  | 'Docker'
  | 'DOORS'
  | 'DynamoDB'
  | 'Eclipse'
  | 'Eclipse EMF'
  | 'Eclipse GMF'
  | 'Eclipse PDE'
  | 'Eclipse RCP'
  | 'Elastic Beanstalk'
  | 'Expo'
  | 'Express'
  | 'Facebook'
  | 'Facebook API'
  | 'Fractal'
  | 'Framework'
  | 'Frontend Framework'
  | 'GitHub'
  | 'GitHub API'
  | 'GitLab'
  | 'Google Analytics'
  | 'Google App Engine'
  | 'Gradle'
  | 'GraphQL'
  | 'Grunt'
  | 'GTM'
  | 'HTML'
  | 'HTML5'
  | 'IAM'
  | 'IAM Identity Center'
  | 'Image Processing'
  | 'IntelliJ IDEA'
  | 'Ionic'
  | 'iOS'
  | 'Jasmine'
  | 'Java'
  | 'JavaScript'
  | 'Java Servlets'
  | 'Jenkins'
  | 'Jest'
  | 'Jira'
  | 'jQuery.qrcode'
  | 'jQuery'
  | 'jQuery UI'
  | 'JSON'
  | 'JUnit'
  | 'Karma'
  | 'Kubernetes'
  | 'Lighthouse'
  | 'Lodash'
  | 'Maven'
  | 'Micro Frontends'
  | 'Microservices'
  | 'Mobile Development'
  | 'mocha'
  | 'mockito'
  | 'MongoDB'
  | 'Mono Repo'
  | 'NestJS'
  | 'Netbeans'
  | 'Node.js'
  | 'npm'
  | 'Nx'
  | 'OAuth2'
  | 'OpenAI'
  | 'OSGI'
  | 'Pattern Recognition'
  | 'PayPal API'
  | 'Polly'
  | 'Project Management'
  | 'Puppeteer'
  | 'Python'
  | 'QA'
  | 'QF-Test'
  | 'QR Codes'
  | 'RabbitMQ'
  | 'Raspberry Pi'
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
  | 'Software Architecture'
  | 'Software Design'
  | 'Spacer'
  | 'Splunk'
  | 'Spring Boot'
  | 'SQL'
  | 'Stencil'
  | 'SVN'
  | 'Swiper'
  | 'TeddyMocks'
  | 'Testing'
  | 'TFS'
  | 'TortoiseSVN'
  | 'Travis CI'
  | 'tsd'
  | 'Twitter'
  | 'Twitter API'
  | 'TypeScript'
  | 'UI Testing'
  | 'UML'
  | 'UML state machine'
  | 'Underscore'
  | 'USB Monitor'
  | 'Various Technologies'
  | 'Vue.js'
  | 'Web Components'
  | 'Web Development'
  | 'Webpack'
  | 'Web Vitals'
  | 'XCode'
  | 'XML'
  | 'XSD'
  | 'yarn'
  | 'Yeoman'
  | 'yo'
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
   * Example if synonyms is undefined:
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
    canonical: 'Ant',
    categories: ['DevOps & Build & CI/CD'],
    related: ['Gradle', 'Maven'],
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
    canonical: 'C++',
    categories: ['Backend'],
    synonyms: [/^c\+\+$/i, /^cpp$/i],
  },
  {
    canonical: 'CDK',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['AWS'],
  },
  {
    canonical: 'chai',
    categories: ['Testing and QA'],
    parents: ['Testing'],
  },
  {
    canonical: 'Cloud Platforms',
    categories: ['Misc'],
    children: ['Google App Engine'],
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
    canonical: 'Computer Vision',
    categories: ['Concepts'],
    related: ['Image Processing', 'Pattern Recognition'],
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
    canonical: 'Custom Game Engine',
    categories: ['Misc'],
    related: ['Framework'],
  },
  {
    canonical: 'Custom Scripts',
    categories: ['DevOps & Build & CI/CD'],
  },
  {
    canonical: 'Custom Test Framework',
    categories: ['Testing and QA'],
    parents: ['Testing'],
  },
  {
    canonical: 'Cypress',
    categories: ['Testing and QA'],
    parents: ['UI Testing'],
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
    canonical: 'DOORS',
    categories: ['Testing and QA'],
  },
  {
    canonical: 'DynamoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
    parents: ['AWS'],
    synonyms: [/dynamo/i],
  },
  {
    canonical: 'Eclipse EMF',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    parents: ['Eclipse'],
    related: ['Eclipse GMF', 'Eclipse RCP'],
    synonyms: [/eclipse emf/i, /eclipse modeling framework/i, /emf/i],
  },
  {
    canonical: 'Eclipse GMF',
    categories: ['Tools & Libraries'],
    includes: ['Java', 'OSGI'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF', 'Eclipse PDE', 'Eclipse RCP'],
    synonyms: [/eclipse gmf/i, /gmf/i, /graphical modeling framework/i],
  },
  {
    canonical: 'Eclipse PDE',
    categories: ['Tools & Libraries'],
    includes: ['Java', 'OSGI'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF', 'Eclipse GMF', 'Eclipse RCP'],
    synonyms: [/eclipse pde/i, /pde/i, /plugin development environment/i],
  },
  {
    canonical: 'Eclipse RCP',
    categories: ['Frontend'],
    includes: ['Java', 'OSGI'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF'],
    synonyms: [/eclipse rcp/i, /rcp/i, /rich client platform/i],
  },
  {
    canonical: 'Eclipse',
    categories: ['Tools & Libraries'],
    children: ['Eclipse EMF', 'Eclipse GMF', 'Eclipse PDE', 'Eclipse RCP'],
    related: ['IntelliJ IDEA', 'Netbeans'],
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
    canonical: 'Facebook API',
    categories: ['Tools & Libraries'],
    parents: ['Facebook'],
    related: ['OAuth2', 'REST'],
  },
  {
    canonical: 'Facebook',
    categories: ['Tools & Libraries'],
    children: ['Facebook API'],
    related: ['OAuth2'],
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
    canonical: 'GitHub API',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    parents: ['GitHub'],
    related: ['OAuth2', 'REST'],
  },
  {
    canonical: 'GitHub',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    children: ['GitHub API'],
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
    canonical: 'Google App Engine',
    categories: ['Cloud & Infrastructure'],
    parents: ['Cloud Platforms'],
    synonyms: [/^google app engine/i, /gae/i],
  },
  {
    canonical: 'Gradle',
    categories: ['DevOps & Build & CI/CD'],
    related: ['Ant', 'Maven'],
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
    canonical: 'Image Processing',
    categories: ['Concepts'],
    related: ['Computer Vision', 'Pattern Recognition'],
  },
  {
    canonical: 'IntelliJ IDEA',
    categories: ['Tools & Libraries'],
    related: ['Eclipse', 'Gradle', 'Java', 'Maven', 'Netbeans'],
    synonyms: [/^intellij$/i, /intellij\s*idea/i],
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
    parents: ['Testing'],
  },
  {
    canonical: 'Java Servlets',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Java'],
    related: ['Spring Boot'],
    synonyms: [/java servlets?/i, /servlets?/i],
  },
  {
    canonical: 'Java',
    categories: ['Backend'],
    children: ['Java Servlets', 'Spring Boot'],
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
    parents: ['Testing'],
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
    canonical: 'jQuery.qrcode',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['JavaScript'],
    parents: ['jQuery'],
    related: ['QR Codes'],
    synonyms: [/jquery.*qrcode/i],
  },
  {
    canonical: 'jQuery',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['jQuery UI', 'jQuery.qrcode'],
    includes: ['JavaScript'],
  },
  {
    canonical: 'JSON',
    categories: ['Concepts'],
  },
  {
    canonical: 'JUnit',
    categories: ['Testing and QA'],
    includes: ['Java'],
    parents: ['Testing'],
  },
  {
    canonical: 'Karma',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    parents: ['Testing'],
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
    related: ['Ant', 'Gradle'],
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
    canonical: 'mocha',
    categories: ['Testing and QA'],
    parents: ['Testing'],
  },
  {
    canonical: 'mockito',
    categories: ['Testing and QA'],
    includes: ['Java'],
    parents: ['Testing'],
    related: ['JUnit'],
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
    canonical: 'Netbeans',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    related: ['Eclipse', 'IntelliJ IDEA', 'Maven'],
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
    canonical: 'OSGI',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    related: ['Eclipse EMF', 'Eclipse PDE', 'Eclipse RCP'],
  },
  {
    canonical: 'Pattern Recognition',
    categories: ['Concepts'],
    related: ['Computer Vision', 'Image Processing'],
  },
  {
    canonical: 'PayPal API',
    categories: ['Tools & Libraries'],
    includes: ['OAuth2', 'REST'],
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
    related: ['JavaScript', 'TypeScript', 'UI Testing'],
  },
  {
    canonical: 'Python',
    categories: ['Backend'],
    synonyms: [/^py$/i, /^python$/i],
  },
  {
    canonical: 'QA',
    categories: ['Misc'],
    synonyms: [/^qa$/i, /quality assurance/i],
  },
  {
    canonical: 'QF-Test',
    categories: ['Testing and QA'],
    parents: ['UI Testing'],
    related: ['JUnit'],
  },
  {
    canonical: 'QR Codes',
    categories: ['Concepts'],
    related: ['jQuery.qrcode'],
    synonyms: [/^qr\s*codes?$/i],
  },
  {
    canonical: 'RabbitMQ',
    categories: ['Backend', 'Tools & Libraries'],
  },
  {
    canonical: 'Raspberry Pi',
    categories: ['Misc'],
    related: ['USB Monitor'],
    synonyms: [/^raspberry\s*pi$/i, /^rpi$/i],
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
    canonical: 'Software Architecture',
    categories: ['Concepts'],
    related: ['Microservices', 'Software Design', 'UML'],
  },
  {
    canonical: 'Software Design',
    categories: ['Concepts'],
    related: ['Software Architecture', 'UML'],
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
    canonical: 'SVN',
    categories: ['DevOps & Build & CI/CD'],
    children: ['TortoiseSVN'],
    related: ['GitHub'],
    synonyms: [/subversion/i, /svn/i],
  },
  {
    canonical: 'Swiper',
    categories: ['Frontend', 'Tools & Libraries'],
  },
  {
    canonical: 'TeddyMocks',
    categories: ['Testing and QA'],
    parents: ['Testing'],
    related: ['chai', 'Jest', 'mocha'],
  },
  {
    canonical: 'Testing',
    categories: ['Concepts'],
    children: [
      'chai',
      'Custom Test Framework',
      'Jasmine',
      'Jest',
      'JUnit',
      'Karma',
      'mocha',
      'mockito',
      'TeddyMocks',
      'UI Testing',
    ],
  },
  {
    canonical: 'TFS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    synonyms: [/^tfs$/i, /team foundation server/i],
  },
  {
    canonical: 'TortoiseSVN',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['SVN'],
  },
  {
    canonical: 'Travis CI',
    categories: ['DevOps & Build & CI/CD'],
    related: ['GitHub', 'GitLab', 'Jenkins'],
    synonyms: [/travis/i],
  },
  {
    canonical: 'tsd',
    categories: ['DevOps & Build & CI/CD'],
    related: ['npm', 'TypeScript'],
    synonyms: [/^tsd$/i],
  },
  {
    canonical: 'Twitter API',
    categories: ['Tools & Libraries'],
    parents: ['Twitter'],
    related: ['OAuth2', 'REST'],
  },
  {
    canonical: 'Twitter',
    categories: ['Tools & Libraries'],
    children: ['Twitter API'],
    related: ['OAuth2'],
  },
  {
    canonical: 'TypeScript',
    categories: ['Backend', 'Frontend'],
    parents: ['JavaScript'],
    synonyms: [/^ts$/i, /typescript/i],
  },
  {
    canonical: 'UI Testing',
    categories: ['Concepts', 'Testing and QA'],
    children: ['Cypress', 'QF-Test'],
    parents: ['Testing'],
    related: ['Puppeteer'],
  },
  {
    canonical: 'UML state machine',
    categories: ['Concepts'],
    parents: ['UML'],
    related: ['DOORS'],
  },
  {
    canonical: 'UML',
    categories: ['Concepts'],
    children: ['UML state machine'],
    related: ['Software Architecture', 'Software Design'],
  },
  {
    canonical: 'Underscore',
    categories: ['Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Lodash'],
  },
  {
    canonical: 'USB Monitor',
    categories: ['Tools & Libraries'],
    related: ['Raspberry Pi'],
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
    canonical: 'XML',
    categories: ['Concepts'],
    related: ['JSON', 'XSD'],
  },
  {
    canonical: 'XSD',
    categories: ['Concepts'],
    includes: ['XML'],
    related: ['XML'],
  },
  {
    canonical: 'yarn',
    categories: ['DevOps & Build & CI/CD'],
    related: ['npm'],
  },
  {
    canonical: 'Yeoman',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    children: ['yo'],
    related: ['npm'],
  },
  {
    canonical: 'yo',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Yeoman'],
    synonyms: [/^yo$/i],
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
