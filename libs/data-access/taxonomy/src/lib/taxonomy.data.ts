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
  | '2D'
  | '3D'
  | 'Accessibility'
  | 'ActionScript'
  | 'Agile'
  | 'AJAX'
  | 'Android'
  | 'Angular'
  | 'AngularJS'
  | 'Angular Material'
  | 'Ant'
  | 'API Gateway'
  | 'API Integration'
  | 'AppConfig'
  | 'ARIA'
  | 'Artemis-ODB'
  | 'Artificial Intelligence'
  | 'Atlassian'
  | 'AWS'
  | 'AWS Organizations'
  | 'Backend Systems'
  | 'BitBucket'
  | 'Blender'
  | 'Bootstrap'
  | 'Bower'
  | 'bubble.io'
  | 'Build Tools'
  | 'C#'
  | 'C++'
  | 'Capture-and-Replay'
  | 'CDK'
  | 'chai'
  | 'CI/CD'
  | 'Classification Tree Method'
  | 'Cloudflare'
  | 'CloudFormation'
  | 'Cloud Platforms'
  | 'CloudWatch'
  | 'Component Library'
  | 'Computer Graphics'
  | 'Computer Vision'
  | 'Confluence'
  | 'Construct 2'
  | 'Container'
  | 'Conventional Commits'
  | 'Cordova'
  | 'CSS'
  | 'CSS Framework'
  | 'Custom Elements'
  | 'Custom Game Engine'
  | 'Custom Scripts'
  | 'Custom Test Framework'
  | 'Cypress'
  | 'Database Systems'
  | 'DataDog'
  | 'Data Visualization'
  | 'Debugging'
  | 'Design Patterns'
  | 'DevOps Tools'
  | 'Diploma Thesis'
  | 'Docker'
  | 'DOORS'
  | 'DynamoDB'
  | 'E2E Testing'
  | 'Eclipse'
  | 'Eclipse EMF'
  | 'Eclipse GMF'
  | 'Eclipse Graphiti'
  | 'Eclipse PDE'
  | 'Eclipse RCP'
  | 'Elastic Beanstalk'
  | 'Entity Component System'
  | 'ESLint'
  | 'Expo'
  | 'Express'
  | 'Facebook'
  | 'Facebook API'
  | 'Facebook Games'
  | 'Figma'
  | 'First-person camera'
  | 'Flash'
  | 'Fractal'
  | 'Framework'
  | 'Frontend Framework'
  | 'FRUIT'
  | 'Game Development'
  | 'Git'
  | 'GitHub'
  | 'GitHub Actions'
  | 'GitHub API'
  | 'GitLab'
  | 'GitLab CI'
  | 'GLSL'
  | 'Google Analytics'
  | 'Google App Engine'
  | 'Google Code'
  | 'Google Maps API'
  | 'Gradle'
  | 'GraphQL'
  | 'Grunt'
  | 'GTM'
  | 'Gulp'
  | 'HTML'
  | 'HTML5'
  | 'HTML Canvas'
  | 'IAM'
  | 'IAM Identity Center'
  | 'Image Processing'
  | 'IntelliJ IDEA'
  | 'Intel XDK'
  | 'Ionic'
  | 'iOS'
  | 'J2EE'
  | 'Jasmine'
  | 'Java'
  | 'JavaScript'
  | 'Java Servlets'
  | 'Jenkins'
  | 'Jest'
  | 'Jira'
  | 'jMonkeyEngine'
  | 'JNativeHook'
  | 'jQuery.qrcode'
  | 'jQuery'
  | 'jQuery UI'
  | 'JSci'
  | 'JSON'
  | 'JUnit'
  | 'Kanban'
  | 'Karma'
  | 'Kubernetes'
  | 'LESS'
  | 'Lighthouse'
  | 'Lit'
  | 'Lodash'
  | 'Maven'
  | 'Micro Frontends'
  | 'Microservices'
  | 'Mobile Development'
  | 'Mobile First'
  | 'mocha'
  | 'mockito'
  | 'Model-based testing'
  | 'MongoDB'
  | 'Mongoose'
  | 'MonoDevelop'
  | 'Mono Repo'
  | 'MVC'
  | 'Nao'
  | 'NestJS'
  | 'Netbeans'
  | 'NgRx'
  | 'Nifty GUI'
  | 'Node.js'
  | 'Notepad++'
  | 'npm'
  | 'Nx'
  | 'OAuth2'
  | 'OOP'
  | 'OpenAI'
  | 'OpenAPI'
  | 'OpenGL'
  | 'OSGI'
  | 'Panda.js'
  | 'Pattern Recognition'
  | 'PayPal API'
  | 'Peer-to-Peer'
  | 'peerJS'
  | 'Performance Testing'
  | 'Phaser'
  | 'Playwright'
  | 'Polly'
  | 'Preprocessor'
  | 'Prettier'
  | 'Project Management'
  | 'Prototyping'
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
  | 'requireJS'
  | 'Responsive Design'
  | 'REST'
  | 'Robotics Control Systems'
  | 'RxJS'
  | 'S3'
  | 'SASS'
  | 'Scientific Paper'
  | 'SCRUM'
  | 'SCSS'
  | 'Selenium'
  | 'SemVer'
  | 'Sensor Fusion'
  | 'Sentry'
  | 'Shader programming'
  | 'Shadow DOM'
  | 'Software Architecture'
  | 'Software Design'
  | 'SPA'
  | 'Spacer'
  | 'Splunk'
  | 'Spring Boot'
  | 'SQL'
  | 'State Management'
  | 'Stencil'
  | 'Storybook'
  | 'Sublime Text'
  | 'SVN'
  | 'Swiper'
  | 'Systematic Test Generation'
  | 'Tailwind'
  | 'TeddyMocks'
  | 'Testing'
  | 'TESTONA'
  | 'TFS'
  | 'TortoiseSVN'
  | 'Travis CI'
  | 'Trello'
  | 'tsd'
  | 'Twitter'
  | 'Twitter API'
  | 'TypeScript'
  | 'UI/UX'
  | 'UI Testing'
  | 'UML'
  | 'UML state machine'
  | 'Underscore'
  | 'Unit Testing'
  | 'Unity'
  | 'USB Monitor'
  | 'Various Technologies'
  | 'Visual Studio'
  | 'Vite'
  | 'VSCode'
  | 'Vue.js'
  | 'WCAG'
  | 'Web Components'
  | 'Web Development'
  | 'WebGL'
  | 'Webpack'
  | 'WebRTC'
  | 'Web Vitals'
  | 'Widget Trees'
  | 'Wikipedia API'
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

const INTERNAL_TAXONOMY: Record<InternalTagName, TaxonomyData> = {
  '2D': {
    canonical: '2D',
    categories: ['Concepts', 'Frontend'],
    parents: ['Computer Graphics'],
    related: ['3D', 'HTML Canvas', 'Unity'],
    synonyms: [/^2d$/i, /two-?d/i],
  },
  '3D': {
    canonical: '3D',
    categories: ['Concepts', 'Frontend'],
    children: ['Blender', 'First-person camera'],
    parents: ['Computer Graphics'],
    related: ['2D', 'Unity', 'WebGL'],
    synonyms: [/^3d$/i, /three-?d/i],
  },
  Accessibility: {
    canonical: 'Accessibility',
    categories: ['Concepts', 'Frontend'],
    children: ['ARIA', 'WCAG'],
    related: ['UI/UX', 'Web Development'],
    synonyms: [/^a11y$/i, /accessibility/i],
  },
  ActionScript: {
    canonical: 'ActionScript',
    categories: ['Frontend'],
    related: ['JavaScript'],
    synonyms: [/^as3?$/i, /actionscript/i],
  },
  Agile: {
    canonical: 'Agile',
    categories: ['Concepts'],
    children: ['Kanban', 'SCRUM'],
  },
  AJAX: {
    canonical: 'AJAX',
    categories: ['Concepts', 'Frontend'],
    related: ['JavaScript', 'REST'],
    synonyms: [/^ajax$/i, /xmlhttprequest/i],
  },
  Android: {
    canonical: 'Android',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Mobile Development'],
    related: ['CI/CD', 'Java'],
  },
  Angular: {
    canonical: 'Angular',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['Angular Material'],
    includes: ['CSS', 'HTML', 'SPA', 'TypeScript'],
    parents: ['Frontend Framework'],
    related: ['Angular Material', 'AngularJS', 'NgRx', 'RxJS', 'SASS', 'SCSS'],
    synonyms: [
      // Matches "Angular 13", "Angular v13", "Angular Version 13", etc., but not "Angular Material"
      // cSpell: disable-next-line
      /^angular\s*(v(?:ersion)?\s*)?\d+$/i,
      /^angular$/i,
    ],
  },
  AngularJS: {
    canonical: 'AngularJS',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML', 'SPA', 'TypeScript'],
    parents: ['Frontend Framework'],
    related: ['Angular'],
  },
  'Angular Material': {
    canonical: 'Angular Material',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Angular', 'CSS Framework'],
    related: ['Bootstrap', 'Tailwind'],
  },
  Ant: {
    canonical: 'Ant',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Gradle', 'Maven'],
    synonyms: [/^ant$/i, /apache ant/i],
  },
  'API Gateway': {
    canonical: 'API Gateway',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  'API Integration': {
    canonical: 'API Integration',
    categories: ['Concepts', 'Frontend'],
    related: [
      'Facebook API',
      'GitHub API',
      'Google Maps API',
      'GraphQL',
      'OAuth2',
      'OpenAPI',
      'PayPal API',
      'REST',
      'Twitter API',
      'Wikipedia API',
    ],
  },
  AppConfig: {
    canonical: 'AppConfig',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  ARIA: {
    canonical: 'ARIA',
    categories: ['Concepts', 'Frontend'],
    parents: ['Accessibility'],
    related: [
      'Custom Elements',
      'HTML',
      'WCAG',
      'Web Components',
      'Web Development',
    ],
    synonyms: [
      /^aria$/i,
      /accessible rich internet applications/i,
      /wai-?aria/i,
    ],
  },
  'Artemis-ODB': {
    canonical: 'Artemis-ODB',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    parents: ['Entity Component System'],
    related: ['jMonkeyEngine'],
    synonyms: [/^artemis(-?odb)?$/i],
  },
  'Artificial Intelligence': {
    canonical: 'Artificial Intelligence',
    categories: ['Concepts'],
    children: [
      'Computer Vision',
      'OpenAI',
      'Pattern Recognition',
      'Robotics Control Systems',
      'Sensor Fusion',
    ],
    synonyms: [/^ai$/i, /artificial intelligence/i],
  },
  Atlassian: {
    canonical: 'Atlassian',
    categories: ['Tools & Libraries'],
    children: ['BitBucket', 'Confluence', 'Jira', 'Trello'],
  },
  AWS: {
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
    parents: ['Cloud Platforms'],
    related: ['Cloudflare'],
    synonyms: [/^aws$/i, /amazon web services/i],
  },
  'AWS Organizations': {
    canonical: 'AWS Organizations',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
    synonyms: [/aws[-_\s]*organizations?/i],
  },
  'Backend Systems': {
    canonical: 'Backend Systems',
    categories: ['Misc'],
    children: [
      'J2EE',
      'Java Servlets',
      'Microservices',
      'Node.js',
      'OpenAPI',
      'RabbitMQ',
      'Spring Boot',
    ],
    related: [
      'C#',
      'C++',
      'DynamoDB',
      'GraphQL',
      'Java',
      'JavaScript',
      'MongoDB',
      'Mongoose',
      'Python',
      'SQL',
      'TypeScript',
    ],
    synonyms: [/backend systems/i, /backend/i],
  },
  BitBucket: {
    canonical: 'BitBucket',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Atlassian', 'Git'],
    related: ['CI/CD'],
  },
  Blender: {
    canonical: 'Blender',
    categories: ['Tools & Libraries'],
    parents: ['3D'],
    related: ['Unity'],
  },
  Bootstrap: {
    canonical: 'Bootstrap',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML', 'JavaScript'],
    parents: ['CSS Framework'],
    related: [
      'Angular Material',
      'jQuery',
      'LESS',
      'Responsive Design',
      'SASS',
      'SCSS',
      'Tailwind',
    ],
  },
  Bower: {
    canonical: 'Bower',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD', 'npm', 'yarn'],
  },
  'bubble.io': {
    canonical: 'bubble.io',
    categories: ['Frontend', 'Tools & Libraries'],
    related: ['Prototyping', 'Web Development'],
    synonyms: [/^bubble$/i, /bubble\.io/i],
  },
  'Build Tools': {
    canonical: 'Build Tools',
    categories: ['DevOps & Build & CI/CD'],
    children: ['Ant', 'Gradle', 'Grunt', 'Gulp', 'Maven', 'Vite', 'Webpack'],
    related: ['CI/CD', 'npm', 'yarn'],
    synonyms: [/\bbuild[-_\s]*tools?\b/i],
  },
  'C#': {
    canonical: 'C#',
    categories: ['Backend', 'Frontend'],
    related: ['Backend Systems', 'OOP', 'Unity'],
    synonyms: [/^c[- ]sharp$/i, /^c#$/i],
  },
  'C++': {
    canonical: 'C++',
    categories: ['Backend'],
    related: ['Backend Systems', 'OOP'],
    synonyms: [/^c\+\+$/i, /^cpp$/i],
  },
  'Capture-and-Replay': {
    canonical: 'Capture-and-Replay',
    categories: ['Testing and QA'],
    parents: ['UI Testing'],
  },
  CDK: {
    canonical: 'CDK',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['AWS', 'CI/CD'],
  },
  chai: {
    canonical: 'chai',
    categories: ['Testing and QA'],
    parents: ['Unit Testing'],
  },
  'CI/CD': {
    canonical: 'CI/CD',
    categories: ['Concepts', 'DevOps & Build & CI/CD'],
    children: [
      'CDK',
      'Container',
      'GitHub Actions',
      'GitLab CI',
      'Jenkins',
      'Travis CI',
    ],
    related: [
      'Android',
      'Ant',
      'BitBucket',
      'Bower',
      'Build Tools',
      'CloudFormation',
      'Cordova',
      'Custom Scripts',
      'Docker',
      'Git',
      'GitHub',
      'GitHub API',
      'GitLab',
      'Google Code',
      'Gradle',
      'Grunt',
      'Gulp',
      'Intel XDK',
      'iOS',
      'Kubernetes',
      'Maven',
      'npm',
      'Nx',
      'SVN',
      'TFS',
      'tsd',
      'Vite',
      'Webpack',
      'XCode',
      'yarn',
      'Yeoman',
      'yo',
    ],
    synonyms: [/^ci\/cd$/i, /continuous delivery/i, /continuous integration/i],
  },
  'Classification Tree Method': {
    canonical: 'Classification Tree Method',
    categories: ['Concepts', 'Testing and QA'],
    parents: ['Model-based testing'],
    synonyms: [/^ctm$/i, /classification\s*tree/i],
  },
  Cloudflare: {
    canonical: 'Cloudflare',
    categories: ['Cloud & Infrastructure'],
    parents: ['Cloud Platforms'],
    related: ['AWS'],
  },
  CloudFormation: {
    canonical: 'CloudFormation',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['AWS'],
    related: ['CI/CD'],
  },
  'Cloud Platforms': {
    canonical: 'Cloud Platforms',
    categories: ['Misc'],
    children: ['AWS', 'Cloudflare', 'Google App Engine'],
    synonyms: [/^cloud$/i, /cloud platform/i],
  },
  CloudWatch: {
    canonical: 'CloudWatch',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  'Component Library': {
    canonical: 'Component Library',
    categories: ['Concepts', 'Frontend'],
    related: ['Fractal', 'Storybook', 'UI/UX', 'Web Components'],
    synonyms: [/component[-_\s]*librar(y|ies)/i],
  },
  'Computer Graphics': {
    canonical: 'Computer Graphics',
    categories: ['Concepts'],
    children: ['2D', '3D', 'HTML Canvas', 'OpenGL', 'Shader programming'],
  },
  'Computer Vision': {
    canonical: 'Computer Vision',
    categories: ['Concepts'],
    parents: ['Artificial Intelligence'],
    related: ['Image Processing'],
  },
  Confluence: {
    canonical: 'Confluence',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
  },
  'Construct 2': {
    canonical: 'Construct 2',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Game Development'],
    related: ['HTML5', 'Phaser', 'Unity'],
  },
  Container: {
    canonical: 'Container',
    categories: [
      'Cloud & Infrastructure',
      'Concepts',
      'DevOps & Build & CI/CD',
    ],
    children: ['Docker', 'Kubernetes'],
    parents: ['CI/CD'],
    related: ['Microservices'],
    synonyms: [/container/i],
  },
  'Conventional Commits': {
    canonical: 'Conventional Commits',
    categories: ['Concepts', 'DevOps & Build & CI/CD'],
    related: ['Git', 'SemVer'],
    synonyms: [/^conventional commits?$/i],
  },
  Cordova: {
    canonical: 'Cordova',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD', 'Intel XDK'],
  },
  CSS: {
    canonical: 'CSS',
    categories: ['Frontend'],
    related: ['LESS', 'Mobile First', 'Responsive Design', 'SASS', 'SCSS'],
    synonyms: [/^css/i],
  },
  'CSS Framework': {
    canonical: 'CSS Framework',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['Angular Material', 'Bootstrap', 'Tailwind'],
    parents: ['Frontend Framework'],
  },
  'Custom Elements': {
    canonical: 'Custom Elements',
    categories: ['Frontend'],
    parents: ['Web Components'],
    related: ['ARIA', 'Shadow DOM'],
    synonyms: [/custom[-_\s]*elements?/i],
  },
  'Custom Game Engine': {
    canonical: 'Custom Game Engine',
    categories: ['Misc'],
    parents: ['Game Development'],
    related: ['Entity Component System', 'Framework'],
  },
  'Custom Scripts': {
    canonical: 'Custom Scripts',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD'],
    synonyms: [/custom[-_\s]*scripts?/i],
  },
  'Custom Test Framework': {
    canonical: 'Custom Test Framework',
    categories: ['Testing and QA'],
    parents: ['Testing'],
  },
  Cypress: {
    canonical: 'Cypress',
    categories: ['Testing and QA'],
    parents: ['E2E Testing', 'UI Testing'],
    related: ['JavaScript', 'TypeScript'],
  },
  'Database Systems': {
    canonical: 'Database Systems',
    categories: ['Misc'],
    synonyms: [/database system/i, /databases/i],
  },
  DataDog: {
    canonical: 'DataDog',
    categories: ['Cloud & Infrastructure', 'Tools & Libraries'],
    related: ['Docker', 'Kubernetes', 'Splunk'],
  },
  'Data Visualization': {
    canonical: 'Data Visualization',
    categories: ['Concepts', 'Frontend'],
    synonyms: [/data visuali[sz]ation/i, /dataviz/i],
  },
  Debugging: {
    canonical: 'Debugging',
    categories: ['Concepts', 'Testing and QA'],
    related: ['DevOps Tools', 'QA', 'Sentry', 'Testing'],
  },
  'Design Patterns': {
    canonical: 'Design Patterns',
    categories: ['Concepts'],
    parents: ['Software Design'],
    related: ['MVC', 'OOP', 'Software Architecture'],
    synonyms: [/design patterns?/i],
  },
  'DevOps Tools': {
    canonical: 'DevOps Tools',
    categories: ['Misc'],
    related: ['Debugging'],
    synonyms: [/devops[-_\s]*tools?/i],
  },
  'Diploma Thesis': {
    canonical: 'Diploma Thesis',
    categories: ['Misc'],
    related: ['Scientific Paper'],
  },
  Docker: {
    canonical: 'Docker',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['Container'],
    related: ['CI/CD', 'Kubernetes'],
  },
  DOORS: {
    canonical: 'DOORS',
    categories: ['Testing and QA'],
  },
  DynamoDB: {
    canonical: 'DynamoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
    parents: ['AWS'],
    related: ['Backend Systems'],
    synonyms: [/dynamo/i],
  },
  'E2E Testing': {
    canonical: 'E2E Testing',
    categories: ['Concepts', 'Testing and QA'],
    children: ['Cypress', 'Playwright', 'Puppeteer', 'Selenium'],
    parents: ['Testing'],
    related: ['UI Testing'],
    synonyms: [/e2e[- ]test/i, /end-to-end[- ]test/i],
  },
  Eclipse: {
    canonical: 'Eclipse',
    categories: ['Tools & Libraries'],
    children: [
      'Eclipse EMF',
      'Eclipse GMF',
      'Eclipse Graphiti',
      'Eclipse PDE',
      'Eclipse RCP',
    ],
    related: ['IntelliJ IDEA', 'Netbeans'],
  },
  'Eclipse EMF': {
    canonical: 'Eclipse EMF',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    parents: ['Eclipse'],
    related: ['Eclipse GMF', 'Eclipse RCP'],
    synonyms: [/eclipse emf/i, /eclipse modeling framework/i, /emf/i],
  },
  'Eclipse GMF': {
    canonical: 'Eclipse GMF',
    categories: ['Tools & Libraries'],
    includes: ['Java', 'OSGI'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF', 'Eclipse PDE', 'Eclipse RCP'],
    synonyms: [/eclipse gmf/i, /gmf/i, /graphical modeling framework/i],
  },
  'Eclipse Graphiti': {
    canonical: 'Eclipse Graphiti',
    categories: ['Tools & Libraries'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF', 'Eclipse GMF'],
  },
  'Eclipse PDE': {
    canonical: 'Eclipse PDE',
    categories: ['Tools & Libraries'],
    includes: ['Java', 'OSGI'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF', 'Eclipse GMF', 'Eclipse RCP'],
    synonyms: [/eclipse pde/i, /pde/i, /plugin development environment/i],
  },
  'Eclipse RCP': {
    canonical: 'Eclipse RCP',
    categories: ['Frontend'],
    includes: ['Java', 'OSGI'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF'],
    synonyms: [/eclipse rcp/i, /rcp/i, /rich client platform/i],
  },
  'Elastic Beanstalk': {
    canonical: 'Elastic Beanstalk',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  'Entity Component System': {
    canonical: 'Entity Component System',
    categories: ['Concepts'],
    children: ['Artemis-ODB'],
    parents: ['Game Development', 'Software Architecture'],
    related: ['Custom Game Engine'],
    synonyms: [
      /^ecs$/i,
      /component[- ]based\s*game\s*engine/i,
      /entity\s*component\s*system/i,
      /entity\s*system\s*framework/i,
    ],
  },
  ESLint: {
    canonical: 'ESLint',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['JavaScript', 'Prettier', 'TypeScript'],
  },
  Expo: {
    canonical: 'Expo',
    categories: ['Cloud & Infrastructure', 'Tools & Libraries'],
    includes: ['React Native'],
  },
  Express: {
    canonical: 'Express',
    categories: ['Backend', 'Tools & Libraries'],
    children: ['NestJS'],
    parents: ['Node.js'],
    related: ['Backend Systems'],
  },
  Facebook: {
    canonical: 'Facebook',
    categories: ['Tools & Libraries'],
    children: ['Facebook API', 'Facebook Games'],
    related: ['OAuth2'],
  },
  'Facebook API': {
    canonical: 'Facebook API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration'],
    parents: ['Facebook'],
    related: ['OAuth2', 'REST'],
  },
  'Facebook Games': {
    canonical: 'Facebook Games',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Facebook', 'Game Development'],
    related: ['Flash', 'Unity'],
    synonyms: [/facebook games?/i],
  },
  Figma: {
    canonical: 'Figma',
    categories: ['Tools & Libraries'],
    related: ['Prototyping', 'UI/UX', 'Zeplin'],
  },
  'First-person camera': {
    canonical: 'First-person camera',
    categories: ['Frontend'],
    parents: ['3D'],
    related: ['Computer Graphics'],
    synonyms: [/first-?person camera/i, /fps camera/i],
  },
  Flash: {
    canonical: 'Flash',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['ActionScript'],
    parents: ['Game Development'],
    synonyms: [/^flash$/i, /adobe flash/i],
  },
  Fractal: {
    canonical: 'Fractal',
    categories: ['Frontend', 'Tools & Libraries'],
    related: ['Stencil', 'Web Components'],
  },
  Framework: {
    canonical: 'Framework',
    categories: ['Misc'],
    children: ['Frontend Framework'],
    synonyms: [/^framework$/i],
  },
  'Frontend Framework': {
    canonical: 'Frontend Framework',
    categories: ['Frontend'],
    children: ['Angular', 'AngularJS', 'CSS Framework', 'React', 'Vue.js'],
    parents: ['Framework'],
    related: ['MVC'],
    synonyms: [/frontend framework/i, /javascript framework/i, /js framework/i],
  },
  FRUIT: {
    canonical: 'FRUIT',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['Testing'],
  },
  'Game Development': {
    canonical: 'Game Development',
    categories: ['Concepts'],
    children: [
      'Construct 2',
      'Custom Game Engine',
      'Entity Component System',
      'Facebook Games',
      'Flash',
      'Panda.js',
      'Phaser',
      'Unity',
    ],
    synonyms: [/game dev/i],
  },
  Git: {
    canonical: 'Git',
    categories: ['DevOps & Build & CI/CD'],
    children: ['BitBucket', 'GitHub', 'GitLab'],
    related: ['CI/CD', 'Conventional Commits', 'SVN', 'TFS'],
    synonyms: [/^git$/i],
  },
  GitHub: {
    canonical: 'GitHub',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    children: ['GitHub Actions', 'GitHub API'],
    parents: ['Git'],
    related: ['CI/CD'],
    synonyms: [/^github$/i],
  },
  'GitHub Actions': {
    canonical: 'GitHub Actions',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['CI/CD', 'GitHub'],
    synonyms: [/github[-_\s]*actions?/i],
  },
  'GitHub API': {
    canonical: 'GitHub API',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    includes: ['API Integration'],
    parents: ['GitHub'],
    related: ['CI/CD', 'OAuth2', 'REST'],
  },
  GitLab: {
    canonical: 'GitLab',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    children: ['GitLab CI'],
    parents: ['Git'],
    related: ['CI/CD'],
  },
  'GitLab CI': {
    canonical: 'GitLab CI',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['CI/CD', 'GitLab'],
  },
  GLSL: {
    canonical: 'GLSL',
    categories: ['Frontend'],
    parents: ['OpenGL'],
    related: ['Shader programming'],
    synonyms: [/^glsl$/i, /opengl shading language/i],
  },
  'Google Analytics': {
    canonical: 'Google Analytics',
    categories: ['Tools & Libraries'],
    related: ['GTM'],
  },
  'Google App Engine': {
    canonical: 'Google App Engine',
    categories: ['Cloud & Infrastructure'],
    parents: ['Cloud Platforms'],
    synonyms: [/^google app engine/i, /gae/i],
  },
  'Google Code': {
    canonical: 'Google Code',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    related: ['BitBucket', 'CI/CD', 'Git', 'GitHub', 'GitLab', 'SVN'],
  },
  'Google Maps API': {
    canonical: 'Google Maps API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration', 'REST'],
    synonyms: [/google maps? api/i, /maps javascript api/i],
  },
  Gradle: {
    canonical: 'Gradle',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['Ant', 'CI/CD', 'Maven'],
  },
  GraphQL: {
    canonical: 'GraphQL',
    categories: ['Backend', 'Concepts', 'Frontend', 'Tools & Libraries'],
    related: ['API Integration', 'Backend Systems', 'REST'],
  },
  Grunt: {
    canonical: 'Grunt',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Gulp', 'npm', 'yarn'],
  },
  GTM: {
    canonical: 'GTM',
    categories: ['Tools & Libraries'],
    related: ['Google Analytics'],
    synonyms: [/google tag manager/i, /gtm/i],
  },
  Gulp: {
    canonical: 'Gulp',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Grunt', 'npm', 'yarn'],
  },
  HTML: {
    canonical: 'HTML',
    categories: ['Frontend'],
    related: ['ARIA', 'Mobile First', 'Responsive Design', 'WCAG'],
  },
  HTML5: {
    canonical: 'HTML5',
    categories: ['Frontend'],
    includes: ['CSS', 'HTML', 'JavaScript'],
  },
  'HTML Canvas': {
    canonical: 'HTML Canvas',
    categories: ['Frontend'],
    includes: ['HTML', 'JavaScript'],
    parents: ['Computer Graphics'],
    related: ['2D', 'WebGL'],
    synonyms: [/^canvas$/i, /^html canvas/i],
  },
  IAM: {
    canonical: 'IAM',
    categories: ['Cloud & Infrastructure'],
    children: ['IAM Identity Center'],
    parents: ['AWS'],
    synonyms: [/^aws iam$/i, /^iam$/i],
  },
  'IAM Identity Center': {
    canonical: 'IAM Identity Center',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS', 'IAM'],
  },
  'Image Processing': {
    canonical: 'Image Processing',
    categories: ['Concepts'],
    related: ['Computer Vision', 'Pattern Recognition'],
  },
  'IntelliJ IDEA': {
    canonical: 'IntelliJ IDEA',
    categories: ['Tools & Libraries'],
    related: ['Eclipse', 'Gradle', 'Java', 'Maven', 'Netbeans'],
    synonyms: [/^intellij$/i, /intellij\s*idea/i],
  },
  'Intel XDK': {
    canonical: 'Intel XDK',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['Cordova', 'HTML5'],
    related: ['CI/CD', 'Ionic', 'React Native'],
  },
  Ionic: {
    canonical: 'Ionic',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML', 'JavaScript'],
    related: ['Angular', 'Intel XDK', 'React', 'Vue.js'],
  },
  iOS: {
    canonical: 'iOS',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Mobile Development'],
    related: ['CI/CD'],
  },
  J2EE: {
    canonical: 'J2EE',
    categories: ['Backend', 'Tools & Libraries'],
    children: ['Java Servlets'],
    parents: ['Backend Systems', 'Java'],
    related: ['Maven', 'Spring Boot'],
    synonyms: [
      /^j2ee$/i,
      /^jakarta\s*ee$/i,
      /^java\s*ee$/i,
      /java\s*2\s*enterprise\s*edition/i,
    ],
  },
  Jasmine: {
    canonical: 'Jasmine',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    parents: ['Unit Testing'],
  },
  Java: {
    canonical: 'Java',
    categories: ['Backend'],
    children: ['J2EE', 'Java Servlets', 'JNativeHook', 'Spring Boot'],
    related: ['Backend Systems', 'OOP'],
    synonyms: [/^java$/i],
  },
  JavaScript: {
    canonical: 'JavaScript',
    categories: ['Backend', 'Frontend'],
    children: ['TypeScript'],
    related: ['Backend Systems'],
    synonyms: [/^js$/i, /javascript/i],
  },
  'Java Servlets': {
    canonical: 'Java Servlets',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Backend Systems', 'J2EE', 'Java'],
    related: ['Spring Boot'],
    synonyms: [/java servlets?/i, /servlets?/i],
  },
  Jenkins: {
    canonical: 'Jenkins',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['CI/CD'],
  },
  Jest: {
    canonical: 'Jest',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    parents: ['Unit Testing'],
  },
  Jira: {
    canonical: 'Jira',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
  },
  jMonkeyEngine: {
    canonical: 'jMonkeyEngine',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['Java', 'OpenGL'],
    related: ['3D', 'Artemis-ODB', 'GLSL', 'Nifty GUI', 'OpenGL'],
    synonyms: [/^jme$/i],
  },
  JNativeHook: {
    canonical: 'JNativeHook',
    categories: ['Tools & Libraries'],
    parents: ['Java'],
  },
  jQuery: {
    canonical: 'jQuery',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['jQuery UI', 'jQuery.qrcode'],
    includes: ['JavaScript'],
  },
  'jQuery.qrcode': {
    canonical: 'jQuery.qrcode',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['JavaScript'],
    parents: ['jQuery'],
    related: ['QR Codes'],
    synonyms: [/jquery.*qrcode/i],
  },
  'jQuery UI': {
    canonical: 'jQuery UI',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['JavaScript'],
    parents: ['jQuery'],
  },
  JSci: {
    canonical: 'JSci',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    related: ['Java'],
  },
  JSON: {
    canonical: 'JSON',
    categories: ['Concepts'],
  },
  JUnit: {
    canonical: 'JUnit',
    categories: ['Testing and QA'],
    includes: ['Java'],
    parents: ['Unit Testing'],
  },
  Kanban: {
    canonical: 'Kanban',
    categories: ['Concepts'],
    parents: ['Agile'],
  },
  Karma: {
    canonical: 'Karma',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    parents: ['Unit Testing'],
    related: ['Jasmine'],
  },
  Kubernetes: {
    canonical: 'Kubernetes',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['Container'],
    related: ['CI/CD', 'Docker'],
    synonyms: [/^k8s$/i, /^kubernetes$/i],
  },
  LESS: {
    canonical: 'LESS',
    categories: ['Frontend'],
    includes: ['CSS'],
    parents: ['Preprocessor'],
    related: ['Bootstrap', 'CSS', 'SASS', 'SCSS'],
  },
  Lighthouse: {
    canonical: 'Lighthouse',
    categories: ['Testing and QA', 'Tools & Libraries'],
    related: ['WCAG', 'Web Vitals'],
  },
  Lit: {
    canonical: 'Lit',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['Web Components'],
    related: ['Custom Elements', 'Shadow DOM', 'Stencil'],
    synonyms: [/^lit$/i, /lit-html/i],
  },
  Lodash: {
    canonical: 'Lodash',
    categories: ['Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Underscore'],
  },
  Maven: {
    canonical: 'Maven',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['Ant', 'CI/CD', 'Gradle', 'J2EE'],
  },
  'Micro Frontends': {
    canonical: 'Micro Frontends',
    categories: ['Concepts', 'Frontend'],
    related: ['Microservices'],
    synonyms: [/micro[-_\s]*frontends?/i],
  },
  Microservices: {
    canonical: 'Microservices',
    categories: ['Backend', 'Concepts'],
    parents: ['Backend Systems'],
    related: ['Micro Frontends', 'Mono Repo'],
    synonyms: [/microservice/i],
  },
  'Mobile Development': {
    canonical: 'Mobile Development',
    categories: ['Misc'],
    children: ['Android', 'iOS'],
    related: ['Mobile First', 'Responsive Design'],
    synonyms: [/mobile dev/i],
  },
  'Mobile First': {
    canonical: 'Mobile First',
    categories: ['Concepts', 'Frontend'],
    includes: ['Responsive Design'],
    related: ['CSS', 'HTML', 'Mobile Development', 'Web Development'],
    synonyms: [/mobile-?first/i],
  },
  mocha: {
    canonical: 'mocha',
    categories: ['Testing and QA'],
    parents: ['Unit Testing'],
  },
  mockito: {
    canonical: 'mockito',
    categories: ['Testing and QA'],
    includes: ['Java'],
    parents: ['Unit Testing'],
    related: ['JUnit'],
  },
  'Model-based testing': {
    canonical: 'Model-based testing',
    categories: ['Concepts', 'Testing and QA'],
    children: ['Classification Tree Method', 'Systematic Test Generation'],
    parents: ['Testing'],
  },
  MongoDB: {
    canonical: 'MongoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
    related: ['Backend Systems'],
    synonyms: [/^mongo$/i, /mongodb/i],
  },
  Mongoose: {
    canonical: 'Mongoose',
    categories: ['Backend', 'Tools & Libraries'],
    includes: ['MongoDB', 'Node.js'],
    related: ['Backend Systems'],
  },
  MonoDevelop: {
    canonical: 'MonoDevelop',
    categories: ['Tools & Libraries'],
    related: [
      'C#',
      'Eclipse',
      'IntelliJ IDEA',
      'Netbeans',
      'Notepad++',
      'Sublime Text',
      'Unity',
      'XCode',
    ],
  },
  'Mono Repo': {
    canonical: 'Mono Repo',
    categories: ['Concepts'],
    children: ['Nx'],
    related: ['Microservices'],
  },
  MVC: {
    canonical: 'MVC',
    categories: ['Concepts'],
    parents: ['Software Design'],
    related: [
      'Design Patterns',
      'Frontend Framework',
      'OOP',
      'Software Architecture',
    ],
    synonyms: [/^mvc$/i, /model[- ]view[- ]controller/i],
  },
  Nao: {
    canonical: 'Nao',
    categories: ['Misc'],
    parents: ['Robotics Control Systems'],
    synonyms: [/^nao$/i, /nao.*robots?/i],
  },
  NestJS: {
    canonical: 'NestJS',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Express'],
  },
  Netbeans: {
    canonical: 'Netbeans',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    related: ['Eclipse', 'IntelliJ IDEA', 'Maven'],
  },
  NgRx: {
    canonical: 'NgRx',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['RxJS', 'State Management'],
    related: ['Angular', 'Redux'],
  },
  'Nifty GUI': {
    canonical: 'Nifty GUI',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['Java'],
    related: ['jMonkeyEngine'],
  },
  'Node.js': {
    canonical: 'Node.js',
    categories: ['Backend'],
    children: ['Express'],
    includes: ['JavaScript'],
    parents: ['Backend Systems'],
    synonyms: [/node/i],
  },
  'Notepad++': {
    canonical: 'Notepad++',
    categories: ['Tools & Libraries'],
    related: ['MonoDevelop', 'Sublime Text', 'Visual Studio'],
    synonyms: [/^notepad\+\+$/i, /notepad plus plus/i],
  },
  npm: {
    canonical: 'npm',
    categories: ['DevOps & Build & CI/CD'],
    related: ['Build Tools', 'CI/CD', 'Gulp', 'SemVer'],
  },
  Nx: {
    canonical: 'Nx',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['npm'],
    parents: ['Mono Repo'],
    related: ['CI/CD', 'JavaScript', 'TypeScript'],
    synonyms: [/^nrwl nx$/i, /^nx$/i],
  },
  OAuth2: {
    canonical: 'OAuth2',
    categories: ['Concepts'],
    related: ['API Integration'],
    synonyms: [/oauth 2/i, /oauth2/i],
  },
  OOP: {
    canonical: 'OOP',
    categories: ['Concepts'],
    parents: ['Software Design'],
    related: [
      'C#',
      'C++',
      'Design Patterns',
      'Java',
      'MVC',
      'TypeScript',
      'UML',
    ],
    synonyms: [/^oop$/i, /object[- ]oriented programming/i],
  },
  OpenAI: {
    canonical: 'OpenAI',
    categories: ['Tools & Libraries'],
    parents: ['Artificial Intelligence'],
    related: ['API Integration'],
  },
  OpenAPI: {
    canonical: 'OpenAPI',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Backend Systems'],
    related: ['API Integration', 'REST'],
    synonyms: [/^open\s*api$/i, /swagger/i],
  },
  OpenGL: {
    canonical: 'OpenGL',
    categories: ['Frontend'],
    children: ['GLSL', 'WebGL'],
    parents: ['Computer Graphics'],
    related: ['Shader programming'],
    synonyms: [/^opengl$/i],
  },
  OSGI: {
    canonical: 'OSGI',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    related: ['Eclipse EMF', 'Eclipse PDE', 'Eclipse RCP'],
  },
  'Panda.js': {
    canonical: 'Panda.js',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['HTML5', 'JavaScript'],
    parents: ['Game Development'],
    related: ['HTML Canvas', 'Phaser'],
  },
  'Pattern Recognition': {
    canonical: 'Pattern Recognition',
    categories: ['Concepts'],
    parents: ['Artificial Intelligence'],
    related: ['Image Processing'],
  },
  'PayPal API': {
    canonical: 'PayPal API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration', 'OAuth2', 'REST'],
  },
  'Peer-to-Peer': {
    canonical: 'Peer-to-Peer',
    categories: ['Concepts'],
    children: ['WebRTC'],
    synonyms: [/^p2p$/i, /peer[- ]to[- ]peer/i],
  },
  peerJS: {
    canonical: 'peerJS',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['WebRTC'],
  },
  'Performance Testing': {
    canonical: 'Performance Testing',
    categories: ['Concepts', 'Testing and QA'],
    parents: ['Testing'],
    related: ['Lighthouse', 'Web Vitals'],
    synonyms: [/load[-_\s]*tests?/i, /performance[-_\s]*tests?/i],
  },
  Phaser: {
    canonical: 'Phaser',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['JavaScript', 'WebGL'],
    parents: ['Game Development'],
  },
  Playwright: {
    canonical: 'Playwright',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['E2E Testing'],
    related: ['UI Testing'],
  },
  Polly: {
    canonical: 'Polly',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  Preprocessor: {
    canonical: 'Preprocessor',
    categories: ['DevOps & Build & CI/CD', 'Frontend'],
    children: ['LESS', 'SASS', 'SCSS'],
    synonyms: [/^preprocessor$/i, /css preprocessor/i],
  },
  Prettier: {
    canonical: 'Prettier',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['CSS', 'ESLint', 'HTML', 'JavaScript', 'SCSS', 'TypeScript'],
  },
  'Project Management': {
    canonical: 'Project Management',
    categories: ['Misc'],
    synonyms: [/^pm$/i, /project management/i],
  },
  Prototyping: {
    canonical: 'Prototyping',
    categories: ['Misc'],
    related: ['Figma', 'UI/UX'],
    synonyms: [/prototyping/i],
  },
  Puppeteer: {
    canonical: 'Puppeteer',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['E2E Testing'],
    related: ['JavaScript', 'TypeScript', 'UI Testing'],
  },
  Python: {
    canonical: 'Python',
    categories: ['Backend'],
    related: ['Backend Systems'],
    synonyms: [/^py$/i, /^python$/i],
  },
  QA: {
    canonical: 'QA',
    categories: ['Misc'],
    related: ['Debugging', 'Testing'],
    synonyms: [/^qa$/i, /quality assurance/i],
  },
  'QF-Test': {
    canonical: 'QF-Test',
    categories: ['Testing and QA'],
    parents: ['UI Testing'],
    related: ['JUnit'],
  },
  'QR Codes': {
    canonical: 'QR Codes',
    categories: ['Concepts'],
    related: ['jQuery.qrcode'],
    synonyms: [/^qr\s*codes?$/i],
  },
  RabbitMQ: {
    canonical: 'RabbitMQ',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Backend Systems'],
  },
  'Raspberry Pi': {
    canonical: 'Raspberry Pi',
    categories: ['Misc'],
    related: ['USB Monitor'],
    synonyms: [/^raspberry\s*pi$/i, /^rpi$/i],
  },
  React: {
    canonical: 'React',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['React Native', 'React Web'],
    includes: ['CSS', 'HTML', 'SPA', 'TypeScript'],
    parents: ['Frontend Framework'],
    synonyms: [/^react$/i, /react\.js/i],
  },
  'React Native': {
    canonical: 'React Native',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['React'],
  },
  'React Web': {
    canonical: 'React Web',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['React'],
  },
  Redash: {
    canonical: 'Redash',
    categories: ['Tools & Libraries'],
    includes: ['SQL'],
  },
  Redux: {
    canonical: 'Redux',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['React'],
    parents: ['State Management'],
    related: ['NgRx'],
  },
  requireJS: {
    canonical: 'requireJS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Webpack'],
  },
  'Responsive Design': {
    canonical: 'Responsive Design',
    categories: ['Concepts', 'Frontend'],
    related: [
      'Bootstrap',
      'CSS',
      'HTML',
      'Mobile Development',
      'Mobile First',
      'UI/UX',
      'Web Development',
    ],
    synonyms: [/^rwd$/i, /responsive design/i, /responsive web design/i],
  },
  REST: {
    canonical: 'REST',
    categories: ['Concepts'],
    related: ['API Integration', 'GraphQL', 'OpenAPI'],
    synonyms: [/^rest$/i, /rest api/i, /restful/i],
  },
  'Robotics Control Systems': {
    canonical: 'Robotics Control Systems',
    categories: ['Misc'],
    children: ['Nao'],
    parents: ['Artificial Intelligence'],
    synonyms: [/robotics[-_\s]*control[-_\s]*systems?/i],
  },
  RxJS: {
    canonical: 'RxJS',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['NgRx'],
    includes: ['TypeScript'],
    related: ['Angular'],
  },
  S3: {
    canonical: 'S3',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  SASS: {
    canonical: 'SASS',
    categories: ['Frontend'],
    includes: ['CSS'],
    parents: ['Preprocessor'],
    related: ['LESS', 'SCSS'],
  },
  'Scientific Paper': {
    canonical: 'Scientific Paper',
    categories: ['Misc'],
    related: ['Diploma Thesis'],
  },
  SCRUM: {
    canonical: 'SCRUM',
    categories: ['Concepts'],
    parents: ['Agile'],
  },
  SCSS: {
    canonical: 'SCSS',
    categories: ['Frontend'],
    includes: ['CSS'],
    parents: ['Preprocessor'],
    related: ['LESS', 'SASS'],
  },
  Selenium: {
    canonical: 'Selenium',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['E2E Testing', 'UI Testing'],
    related: ['Cypress', 'Playwright', 'Puppeteer'],
  },
  SemVer: {
    canonical: 'SemVer',
    categories: ['Concepts', 'DevOps & Build & CI/CD'],
    related: ['Conventional Commits', 'npm'],
    synonyms: [/^semver$/i, /semantic versioning/i],
  },
  'Sensor Fusion': {
    canonical: 'Sensor Fusion',
    categories: ['Concepts'],
    parents: ['Artificial Intelligence'],
  },
  Sentry: {
    canonical: 'Sentry',
    categories: ['Tools & Libraries'],
    related: ['Debugging'],
  },
  'Shader programming': {
    canonical: 'Shader programming',
    categories: ['Concepts'],
    parents: ['Computer Graphics'],
    related: ['GLSL', 'WebGL'],
  },
  'Shadow DOM': {
    canonical: 'Shadow DOM',
    categories: ['Frontend'],
    parents: ['Web Components'],
    related: ['Custom Elements'],
  },
  'Software Architecture': {
    canonical: 'Software Architecture',
    categories: ['Concepts'],
    children: ['Entity Component System'],
    related: [
      'Design Patterns',
      'Microservices',
      'MVC',
      'Software Design',
      'UML',
    ],
  },
  'Software Design': {
    canonical: 'Software Design',
    categories: ['Concepts'],
    children: ['Design Patterns', 'MVC', 'OOP'],
    related: ['Software Architecture', 'UML'],
  },
  SPA: {
    canonical: 'SPA',
    categories: ['Concepts', 'Frontend'],
    synonyms: [/^spa$/i, /single[- ]page application/i],
  },
  Spacer: {
    // NOTE: this is not a real technology, but a placeholder for empty spaces in the UI
    canonical: 'Spacer',
    categories: ['Misc'],
    synonyms: [/^placeholder$/i, /^spacer$/i],
  },
  Splunk: {
    canonical: 'Splunk',
    categories: ['Cloud & Infrastructure', 'Tools & Libraries'],
    related: ['DataDog'],
  },
  'Spring Boot': {
    canonical: 'Spring Boot',
    categories: ['Backend'],
    parents: ['Backend Systems', 'Java'],
    related: ['J2EE', 'Java Servlets'],
  },
  SQL: {
    canonical: 'SQL',
    categories: ['Backend'],
    related: ['Backend Systems'],
  },
  'State Management': {
    canonical: 'State Management',
    categories: ['Concepts', 'Frontend'],
    children: ['NgRx', 'Redux'],
  },
  Stencil: {
    canonical: 'Stencil',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['TypeScript', 'Web Components'],
    related: ['Component Library', 'Fractal', 'Storybook'],
  },
  Storybook: {
    canonical: 'Storybook',
    categories: ['Frontend', 'Tools & Libraries'],
    related: ['Component Library', 'Web Components'],
  },
  'Sublime Text': {
    canonical: 'Sublime Text',
    categories: ['Tools & Libraries'],
    related: ['MonoDevelop', 'Notepad++', 'Visual Studio'],
    synonyms: [/^sublime(\s*text)?$/i],
  },
  SVN: {
    canonical: 'SVN',
    categories: ['DevOps & Build & CI/CD'],
    children: ['TortoiseSVN'],
    related: ['CI/CD', 'Git', 'GitHub'],
    synonyms: [/subversion/i, /svn/i],
  },
  Swiper: {
    canonical: 'Swiper',
    categories: ['Frontend', 'Tools & Libraries'],
  },
  'Systematic Test Generation': {
    canonical: 'Systematic Test Generation',
    categories: ['Concepts', 'Testing and QA'],
    parents: ['Model-based testing'],
  },
  Tailwind: {
    canonical: 'Tailwind',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML'],
    parents: ['CSS Framework'],
    related: ['Angular Material', 'Bootstrap'],
  },
  TeddyMocks: {
    canonical: 'TeddyMocks',
    categories: ['Testing and QA'],
    parents: ['Unit Testing'],
    related: ['chai', 'Jest', 'mocha'],
  },
  Testing: {
    canonical: 'Testing',
    categories: ['Concepts'],
    children: [
      'Custom Test Framework',
      'E2E Testing',
      'FRUIT',
      'Model-based testing',
      'Performance Testing',
      'TESTONA',
      'UI Testing',
      'Unit Testing',
    ],
    related: ['Debugging', 'QA'],
    synonyms: [/^testing$/i, /test\s*automation/i],
  },
  TESTONA: {
    canonical: 'TESTONA',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['Testing'],
  },
  TFS: {
    canonical: 'TFS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['CI/CD', 'Git'],
    synonyms: [/^tfs$/i, /team foundation server/i],
  },
  TortoiseSVN: {
    canonical: 'TortoiseSVN',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['SVN'],
  },
  'Travis CI': {
    canonical: 'Travis CI',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['CI/CD'],
    related: ['GitHub', 'GitLab', 'Jenkins'],
    synonyms: [/travis/i],
  },
  Trello: {
    canonical: 'Trello',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
    related: ['Kanban', 'Project Management'],
  },
  tsd: {
    canonical: 'tsd',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD', 'npm', 'TypeScript'],
    synonyms: [/^tsd$/i],
  },
  Twitter: {
    canonical: 'Twitter',
    categories: ['Tools & Libraries'],
    children: ['Twitter API'],
    related: ['OAuth2'],
  },
  'Twitter API': {
    canonical: 'Twitter API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration'],
    parents: ['Twitter'],
    related: ['OAuth2', 'REST'],
  },
  TypeScript: {
    canonical: 'TypeScript',
    categories: ['Backend', 'Frontend'],
    parents: ['JavaScript'],
    related: ['Backend Systems', 'OOP'],
    synonyms: [/^ts$/i, /typescript/i],
  },
  'UI/UX': {
    canonical: 'UI/UX',
    categories: ['Concepts', 'Frontend'],
    related: [
      'Accessibility',
      'Component Library',
      'CSS',
      'Figma',
      'Prototyping',
      'Responsive Design',
      'Web Development',
      'Zeplin',
    ],
    synonyms: [/^ui\/ux$/i, /user experience/i, /user interface/i],
  },
  'UI Testing': {
    canonical: 'UI Testing',
    categories: ['Concepts', 'Testing and QA'],
    children: [
      'Capture-and-Replay',
      'Cypress',
      'QF-Test',
      'Selenium',
      'Widget Trees',
    ],
    parents: ['Testing'],
    related: ['E2E Testing', 'Puppeteer'],
  },
  UML: {
    canonical: 'UML',
    categories: ['Concepts'],
    children: ['UML state machine'],
    related: ['OOP', 'Software Architecture', 'Software Design'],
  },
  'UML state machine': {
    canonical: 'UML state machine',
    categories: ['Concepts'],
    parents: ['UML'],
    related: ['DOORS'],
  },
  Underscore: {
    canonical: 'Underscore',
    categories: ['Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Lodash'],
  },
  'Unit Testing': {
    canonical: 'Unit Testing',
    categories: ['Concepts', 'Testing and QA'],
    children: [
      'chai',
      'Jasmine',
      'Jest',
      'JUnit',
      'Karma',
      'mocha',
      'mockito',
      'TeddyMocks',
    ],
    parents: ['Testing'],
    related: ['E2E Testing', 'UI Testing'],
    synonyms: [/unit[-\s]*tests?/i],
  },
  Unity: {
    canonical: 'Unity',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['C#'],
    parents: ['Game Development'],
    related: ['3D', 'Blender', 'jMonkeyEngine', 'MonoDevelop'],
    synonyms: [/^unity$/i, /^unity3d$/i],
  },
  'USB Monitor': {
    canonical: 'USB Monitor',
    categories: ['Tools & Libraries'],
    related: ['Raspberry Pi'],
  },
  'Various Technologies': {
    canonical: 'Various Technologies',
    categories: ['Misc'],
  },
  'Visual Studio': {
    canonical: 'Visual Studio',
    categories: ['Tools & Libraries'],
    related: [
      'C#',
      'C++',
      'Eclipse',
      'IntelliJ IDEA',
      'Netbeans',
      'Notepad++',
      'Sublime Text',
      'VSCode',
      'XCode',
    ],
    synonyms: [/^visual studio$/i, /^vs$/i],
  },
  Vite: {
    canonical: 'Vite',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Build Tools'],
    related: ['Webpack'],
  },
  VSCode: {
    canonical: 'VSCode',
    categories: ['Tools & Libraries'],
    related: ['Visual Studio'],
    synonyms: [/^vs\s*code$/i, /^vscode$/i, /visual\s+studio\s+code/i],
  },
  'Vue.js': {
    canonical: 'Vue.js',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['SPA'],
    parents: ['Frontend Framework'],
    synonyms: [/^vue/i],
  },
  WCAG: {
    canonical: 'WCAG',
    categories: ['Concepts', 'Frontend'],
    parents: ['Accessibility'],
    related: ['ARIA', 'HTML', 'Lighthouse', 'Web Development', 'Web Vitals'],
    synonyms: [
      /^wcag$/i,
      /accessibility guidelines/i,
      /web content accessibility guidelines/i,
    ],
  },
  'Web Components': {
    canonical: 'Web Components',
    categories: ['Concepts', 'Frontend'],
    children: ['Custom Elements', 'Shadow DOM'],
    related: ['ARIA'],
    synonyms: [/web[-_\s]*components?/i],
  },
  'Web Development': {
    canonical: 'Web Development',
    categories: ['Misc'],
    related: [
      'Accessibility',
      'ARIA',
      'Mobile First',
      'Responsive Design',
      'UI/UX',
      'WCAG',
    ],
    synonyms: [/web dev/i, /web development/i],
  },
  WebGL: {
    canonical: 'WebGL',
    categories: ['Frontend'],
    parents: ['OpenGL'],
    related: ['GLSL', 'HTML Canvas'],
    synonyms: [/^webgl$/i],
  },
  Webpack: {
    canonical: 'Webpack',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Vite'],
  },
  WebRTC: {
    canonical: 'WebRTC',
    categories: ['Backend', 'Concepts', 'Frontend'],
    children: ['peerJS'],
    includes: ['JavaScript'],
    parents: ['Peer-to-Peer'],
  },
  'Web Vitals': {
    canonical: 'Web Vitals',
    categories: ['Concepts'],
    related: ['Lighthouse', 'WCAG'],
    synonyms: [/web[-_\s]*vitals?/i],
  },
  'Widget Trees': {
    canonical: 'Widget Trees',
    categories: ['Testing and QA'],
    parents: ['UI Testing'],
    synonyms: [/widget[-_\s]*trees?/i],
  },
  'Wikipedia API': {
    canonical: 'Wikipedia API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration', 'JSON', 'REST'],
    synonyms: [/wikipedia/i],
  },
  XCode: {
    canonical: 'XCode',
    categories: ['DevOps & Build & CI/CD'],
    includes: ['iOS'],
    related: ['CI/CD'],
  },
  XML: {
    canonical: 'XML',
    categories: ['Concepts'],
    related: ['JSON', 'XSD'],
  },
  XSD: {
    canonical: 'XSD',
    categories: ['Concepts'],
    includes: ['XML'],
    related: ['XML'],
  },
  yarn: {
    canonical: 'yarn',
    categories: ['DevOps & Build & CI/CD'],
    related: ['Build Tools', 'CI/CD', 'Gulp', 'npm'],
  },
  Yeoman: {
    canonical: 'Yeoman',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    children: ['yo'],
    related: ['CI/CD', 'npm'],
  },
  yo: {
    canonical: 'yo',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Yeoman'],
    related: ['CI/CD'],
    synonyms: [/^yo$/i],
  },
  Zeplin: {
    canonical: 'Zeplin',
    categories: ['Tools & Libraries'],
    related: ['Figma', 'UI/UX'],
  },
} satisfies Record<InternalTagName, TaxonomyData>;

export type TagName = keyof typeof INTERNAL_TAXONOMY;
export const TAXONOMY = INTERNAL_TAXONOMY as Readonly<
  Record<InternalTagName, TaxonomyData>
>;

// NOTE: check if any non defined tags are used, by checking this type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type nonDefinedTags = Exclude<InternalTagName, TagName>;
