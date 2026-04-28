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
    canonical: '2D',
    categories: ['Concepts', 'Frontend'],
    parents: ['Computer Graphics'],
    related: ['3D', 'HTML Canvas', 'Unity'],
    synonyms: [/^2d$/i, /two-?d/i],
  },
  {
    canonical: '3D',
    categories: ['Concepts', 'Frontend'],
    children: ['Blender', 'First-person camera'],
    parents: ['Computer Graphics'],
    related: ['2D', 'Unity', 'WebGL'],
    synonyms: [/^3d$/i, /three-?d/i],
  },
  {
    canonical: 'Accessibility',
    categories: ['Concepts', 'Frontend'],
    children: ['ARIA', 'WCAG'],
    related: ['UI/UX', 'Web Development'],
    synonyms: [/^a11y$/i, /accessibility/i],
  },
  {
    canonical: 'ActionScript',
    categories: ['Frontend'],
    related: ['JavaScript'],
    synonyms: [/^as3?$/i, /actionscript/i],
  },
  {
    canonical: 'Agile',
    categories: ['Concepts'],
    children: ['Kanban', 'SCRUM'],
  },
  {
    canonical: 'AJAX',
    categories: ['Concepts', 'Frontend'],
    related: ['JavaScript', 'REST'],
    synonyms: [/^ajax$/i, /xmlhttprequest/i],
  },
  {
    canonical: 'Android',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Mobile Development'],
    related: ['CI/CD', 'Java'],
  },
  {
    canonical: 'Angular Material',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Angular', 'CSS Framework'],
    related: ['Bootstrap', 'Tailwind'],
  },
  {
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
  {
    canonical: 'AngularJS',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML', 'SPA', 'TypeScript'],
    parents: ['Frontend Framework'],
    related: ['Angular'],
  },
  {
    canonical: 'Ant',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Gradle', 'Maven'],
    synonyms: [/^ant$/i, /apache ant/i],
  },
  {
    canonical: 'API Gateway',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
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
  {
    canonical: 'AppConfig',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
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
  {
    canonical: 'Artemis-ODB',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    parents: ['Entity Component System'],
    related: ['jMonkeyEngine'],
    synonyms: [/^artemis(-?odb)?$/i],
  },
  {
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
  {
    canonical: 'Atlassian',
    categories: ['Tools & Libraries'],
    children: ['BitBucket', 'Confluence', 'Jira', 'Trello'],
  },
  {
    canonical: 'AWS Organizations',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
    synonyms: [/aws[-_\s]*organizations?/i],
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
    parents: ['Cloud Platforms'],
    related: ['Cloudflare'],
    synonyms: [/^aws$/i, /amazon web services/i],
  },
  {
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
  {
    canonical: 'BitBucket',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Atlassian', 'Git'],
    related: ['CI/CD'],
  },
  {
    canonical: 'Blender',
    categories: ['Tools & Libraries'],
    parents: ['3D'],
    related: ['Unity'],
  },
  {
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
  {
    canonical: 'Bower',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD', 'npm', 'yarn'],
  },
  {
    canonical: 'bubble.io',
    categories: ['Frontend', 'Tools & Libraries'],
    related: ['Prototyping', 'Web Development'],
    synonyms: [/^bubble$/i, /bubble\.io/i],
  },
  {
    canonical: 'Build Tools',
    categories: ['DevOps & Build & CI/CD'],
    children: ['Ant', 'Gradle', 'Grunt', 'Gulp', 'Maven', 'Vite', 'Webpack'],
    related: ['CI/CD', 'npm', 'yarn'],
    synonyms: [/\bbuild[-_\s]*tools?\b/i],
  },
  {
    canonical: 'C#',
    categories: ['Backend', 'Frontend'],
    related: ['Backend Systems', 'OOP', 'Unity'],
    synonyms: [/^c[- ]sharp$/i, /^c#$/i],
  },
  {
    canonical: 'C++',
    categories: ['Backend'],
    related: ['Backend Systems', 'OOP'],
    synonyms: [/^c\+\+$/i, /^cpp$/i],
  },
  {
    canonical: 'Capture-and-Replay',
    categories: ['Testing and QA'],
    parents: ['UI Testing'],
  },
  {
    canonical: 'CDK',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['AWS', 'CI/CD'],
  },
  {
    canonical: 'chai',
    categories: ['Testing and QA'],
    parents: ['Unit Testing'],
  },
  {
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
  {
    canonical: 'Classification Tree Method',
    categories: ['Concepts', 'Testing and QA'],
    parents: ['Model-based testing'],
    synonyms: [/^ctm$/i, /classification\s*tree/i],
  },
  {
    canonical: 'Cloud Platforms',
    categories: ['Misc'],
    children: ['AWS', 'Cloudflare', 'Google App Engine'],
    synonyms: [/^cloud$/i, /cloud platform/i],
  },
  {
    canonical: 'Cloudflare',
    categories: ['Cloud & Infrastructure'],
    parents: ['Cloud Platforms'],
    related: ['AWS'],
  },
  {
    canonical: 'CloudFormation',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['AWS'],
    related: ['CI/CD'],
  },
  {
    canonical: 'CloudWatch',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'Component Library',
    categories: ['Concepts', 'Frontend'],
    related: ['Fractal', 'Storybook', 'UI/UX', 'Web Components'],
    synonyms: [/component[-_\s]*librar(y|ies)/i],
  },
  {
    canonical: 'Computer Graphics',
    categories: ['Concepts'],
    children: ['2D', '3D', 'HTML Canvas', 'OpenGL', 'Shader programming'],
  },
  {
    canonical: 'Computer Vision',
    categories: ['Concepts'],
    parents: ['Artificial Intelligence'],
    related: ['Image Processing'],
  },
  {
    canonical: 'Confluence',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
  },
  {
    canonical: 'Construct 2',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Game Development'],
    related: ['HTML5', 'Phaser', 'Unity'],
  },
  {
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
  {
    canonical: 'Conventional Commits',
    categories: ['Concepts', 'DevOps & Build & CI/CD'],
    related: ['Git', 'SemVer'],
    synonyms: [/^conventional commits?$/i],
  },
  {
    canonical: 'Cordova',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD', 'Intel XDK'],
  },
  {
    canonical: 'CSS Framework',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['Angular Material', 'Bootstrap', 'Tailwind'],
    parents: ['Frontend Framework'],
  },
  {
    canonical: 'CSS',
    categories: ['Frontend'],
    related: ['LESS', 'Mobile First', 'Responsive Design', 'SASS', 'SCSS'],
    synonyms: [/^css/i],
  },
  {
    canonical: 'Custom Elements',
    categories: ['Frontend'],
    parents: ['Web Components'],
    related: ['ARIA', 'Shadow DOM'],
    synonyms: [/custom[-_\s]*elements?/i],
  },
  {
    canonical: 'Custom Game Engine',
    categories: ['Misc'],
    parents: ['Game Development'],
    related: ['Entity Component System', 'Framework'],
  },
  {
    canonical: 'Custom Scripts',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD'],
    synonyms: [/custom[-_\s]*scripts?/i],
  },
  {
    canonical: 'Custom Test Framework',
    categories: ['Testing and QA'],
    parents: ['Testing'],
  },
  {
    canonical: 'Cypress',
    categories: ['Testing and QA'],
    parents: ['E2E Testing', 'UI Testing'],
    related: ['JavaScript', 'TypeScript'],
  },
  {
    canonical: 'Data Visualization',
    categories: ['Concepts', 'Frontend'],
    synonyms: [/data visuali[sz]ation/i, /dataviz/i],
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
    canonical: 'Debugging',
    categories: ['Concepts', 'Testing and QA'],
    related: ['DevOps Tools', 'QA', 'Sentry', 'Testing'],
  },
  {
    canonical: 'Design Patterns',
    categories: ['Concepts'],
    parents: ['Software Design'],
    related: ['MVC', 'OOP', 'Software Architecture'],
    synonyms: [/design patterns?/i],
  },
  {
    canonical: 'DevOps Tools',
    categories: ['Misc'],
    related: ['Debugging'],
    synonyms: [/devops[-_\s]*tools?/i],
  },
  {
    canonical: 'Diploma Thesis',
    categories: ['Misc'],
    related: ['Scientific Paper'],
  },
  {
    canonical: 'Docker',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['Container'],
    related: ['CI/CD', 'Kubernetes'],
  },
  {
    canonical: 'DOORS',
    categories: ['Testing and QA'],
  },
  {
    canonical: 'DynamoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
    parents: ['AWS'],
    related: ['Backend Systems'],
    synonyms: [/dynamo/i],
  },
  {
    canonical: 'E2E Testing',
    categories: ['Concepts', 'Testing and QA'],
    children: ['Cypress', 'Playwright', 'Puppeteer', 'Selenium'],
    parents: ['Testing'],
    related: ['UI Testing'],
    synonyms: [/e2e[- ]test/i, /end-to-end[- ]test/i],
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
    canonical: 'Eclipse Graphiti',
    categories: ['Tools & Libraries'],
    parents: ['Eclipse'],
    related: ['Eclipse EMF', 'Eclipse GMF'],
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
    children: [
      'Eclipse EMF',
      'Eclipse GMF',
      'Eclipse Graphiti',
      'Eclipse PDE',
      'Eclipse RCP',
    ],
    related: ['IntelliJ IDEA', 'Netbeans'],
  },
  {
    canonical: 'Elastic Beanstalk',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
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
  {
    canonical: 'ESLint',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['JavaScript', 'Prettier', 'TypeScript'],
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
    related: ['Backend Systems'],
  },
  {
    canonical: 'Facebook API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration'],
    parents: ['Facebook'],
    related: ['OAuth2', 'REST'],
  },
  {
    canonical: 'Facebook Games',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['Facebook', 'Game Development'],
    related: ['Flash', 'Unity'],
    synonyms: [/facebook games?/i],
  },
  {
    canonical: 'Facebook',
    categories: ['Tools & Libraries'],
    children: ['Facebook API', 'Facebook Games'],
    related: ['OAuth2'],
  },
  {
    canonical: 'Figma',
    categories: ['Tools & Libraries'],
    related: ['Prototyping', 'UI/UX', 'Zeplin'],
  },
  {
    canonical: 'First-person camera',
    categories: ['Frontend'],
    parents: ['3D'],
    related: ['Computer Graphics'],
    synonyms: [/first-?person camera/i, /fps camera/i],
  },
  {
    canonical: 'Flash',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['ActionScript'],
    parents: ['Game Development'],
    synonyms: [/^flash$/i, /adobe flash/i],
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
    synonyms: [/^framework$/i],
  },
  {
    canonical: 'Frontend Framework',
    categories: ['Frontend'],
    children: ['Angular', 'AngularJS', 'CSS Framework', 'React', 'Vue.js'],
    parents: ['Framework'],
    related: ['MVC'],
    synonyms: [/frontend framework/i, /javascript framework/i, /js framework/i],
  },
  {
    canonical: 'FRUIT',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['Testing'],
  },
  {
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
  {
    canonical: 'Git',
    categories: ['DevOps & Build & CI/CD'],
    children: ['BitBucket', 'GitHub', 'GitLab'],
    related: ['CI/CD', 'Conventional Commits', 'SVN', 'TFS'],
    synonyms: [/^git$/i],
  },
  {
    canonical: 'GitHub Actions',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['CI/CD', 'GitHub'],
    synonyms: [/github[-_\s]*actions?/i],
  },
  {
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
  {
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
  {
    canonical: 'GitLab CI',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['CI/CD', 'GitLab'],
  },
  {
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
  {
    canonical: 'GLSL',
    categories: ['Frontend'],
    parents: ['OpenGL'],
    related: ['Shader programming'],
    synonyms: [/^glsl$/i, /opengl shading language/i],
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
    canonical: 'Google Code',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    related: ['BitBucket', 'CI/CD', 'Git', 'GitHub', 'GitLab', 'SVN'],
  },
  {
    canonical: 'Google Maps API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration', 'REST'],
    synonyms: [/google maps? api/i, /maps javascript api/i],
  },
  {
    canonical: 'Gradle',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['Ant', 'CI/CD', 'Maven'],
  },
  {
    canonical: 'GraphQL',
    categories: ['Backend', 'Concepts', 'Frontend', 'Tools & Libraries'],
    related: ['API Integration', 'Backend Systems', 'REST'],
  },
  {
    canonical: 'Grunt',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Gulp', 'npm', 'yarn'],
  },
  {
    canonical: 'GTM',
    categories: ['Tools & Libraries'],
    related: ['Google Analytics'],
    synonyms: [/google tag manager/i, /gtm/i],
  },
  {
    canonical: 'Gulp',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Grunt', 'npm', 'yarn'],
  },
  {
    canonical: 'HTML Canvas',
    categories: ['Frontend'],
    includes: ['HTML', 'JavaScript'],
    parents: ['Computer Graphics'],
    related: ['2D', 'WebGL'],
    synonyms: [/^canvas$/i, /^html canvas/i],
  },
  {
    canonical: 'HTML',
    categories: ['Frontend'],
    related: ['ARIA', 'Mobile First', 'Responsive Design', 'WCAG'],
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
    canonical: 'Intel XDK',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['Cordova', 'HTML5'],
    related: ['CI/CD', 'Ionic', 'React Native'],
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
    related: ['Angular', 'Intel XDK', 'React', 'Vue.js'],
  },
  {
    canonical: 'iOS',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Mobile Development'],
    related: ['CI/CD'],
  },
  {
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
  {
    canonical: 'Jasmine',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    parents: ['Unit Testing'],
  },
  {
    canonical: 'Java Servlets',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Backend Systems', 'J2EE', 'Java'],
    related: ['Spring Boot'],
    synonyms: [/java servlets?/i, /servlets?/i],
  },
  {
    canonical: 'Java',
    categories: ['Backend'],
    children: ['J2EE', 'Java Servlets', 'JNativeHook', 'Spring Boot'],
    related: ['Backend Systems', 'OOP'],
    synonyms: [/^java$/i],
  },
  {
    canonical: 'JavaScript',
    categories: ['Backend', 'Frontend'],
    children: ['TypeScript'],
    related: ['Backend Systems'],
    synonyms: [/^js$/i, /javascript/i],
  },
  {
    canonical: 'Jenkins',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['CI/CD'],
  },
  {
    canonical: 'Jest',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    parents: ['Unit Testing'],
  },
  {
    canonical: 'Jira',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
  },
  {
    canonical: 'jMonkeyEngine',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['Java', 'OpenGL'],
    related: ['3D', 'Artemis-ODB', 'GLSL', 'Nifty GUI', 'OpenGL'],
    synonyms: [/^jme$/i],
  },
  {
    canonical: 'JNativeHook',
    categories: ['Tools & Libraries'],
    parents: ['Java'],
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
    canonical: 'JSci',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    related: ['Java'],
  },
  {
    canonical: 'JSON',
    categories: ['Concepts'],
  },
  {
    canonical: 'JUnit',
    categories: ['Testing and QA'],
    includes: ['Java'],
    parents: ['Unit Testing'],
  },
  {
    canonical: 'Kanban',
    categories: ['Concepts'],
    parents: ['Agile'],
  },
  {
    canonical: 'Karma',
    categories: ['Testing and QA'],
    includes: ['JavaScript'],
    parents: ['Unit Testing'],
    related: ['Jasmine'],
  },
  {
    canonical: 'Kubernetes',
    categories: ['Cloud & Infrastructure', 'DevOps & Build & CI/CD'],
    parents: ['Container'],
    related: ['CI/CD', 'Docker'],
    synonyms: [/^k8s$/i, /^kubernetes$/i],
  },
  {
    canonical: 'LESS',
    categories: ['Frontend'],
    includes: ['CSS'],
    parents: ['Preprocessor'],
    related: ['Bootstrap', 'CSS', 'SASS', 'SCSS'],
  },
  {
    canonical: 'Lighthouse',
    categories: ['Testing and QA', 'Tools & Libraries'],
    related: ['WCAG', 'Web Vitals'],
  },
  {
    canonical: 'Lit',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['Web Components'],
    related: ['Custom Elements', 'Shadow DOM', 'Stencil'],
    synonyms: [/^lit$/i, /lit-html/i],
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
    parents: ['Build Tools'],
    related: ['Ant', 'CI/CD', 'Gradle', 'J2EE'],
  },
  {
    canonical: 'Micro Frontends',
    categories: ['Concepts', 'Frontend'],
    related: ['Microservices'],
    synonyms: [/micro[-_\s]*frontends?/i],
  },
  {
    canonical: 'Microservices',
    categories: ['Backend', 'Concepts'],
    parents: ['Backend Systems'],
    related: ['Micro Frontends', 'Mono Repo'],
    synonyms: [/microservice/i],
  },
  {
    canonical: 'Mobile Development',
    categories: ['Misc'],
    children: ['Android', 'iOS'],
    related: ['Mobile First', 'Responsive Design'],
    synonyms: [/mobile dev/i],
  },
  {
    canonical: 'Mobile First',
    categories: ['Concepts', 'Frontend'],
    includes: ['Responsive Design'],
    related: ['CSS', 'HTML', 'Mobile Development', 'Web Development'],
    synonyms: [/mobile-?first/i],
  },
  {
    canonical: 'mocha',
    categories: ['Testing and QA'],
    parents: ['Unit Testing'],
  },
  {
    canonical: 'mockito',
    categories: ['Testing and QA'],
    includes: ['Java'],
    parents: ['Unit Testing'],
    related: ['JUnit'],
  },
  {
    canonical: 'Model-based testing',
    categories: ['Concepts', 'Testing and QA'],
    children: ['Classification Tree Method', 'Systematic Test Generation'],
    parents: ['Testing'],
  },
  {
    canonical: 'MongoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
    related: ['Backend Systems'],
    synonyms: [/^mongo$/i, /mongodb/i],
  },
  {
    canonical: 'Mongoose',
    categories: ['Backend', 'Tools & Libraries'],
    includes: ['MongoDB', 'Node.js'],
    related: ['Backend Systems'],
  },
  {
    canonical: 'Mono Repo',
    categories: ['Concepts'],
    children: ['Nx'],
    related: ['Microservices'],
  },
  {
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
  {
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
  {
    canonical: 'Nao',
    categories: ['Misc'],
    parents: ['Robotics Control Systems'],
    synonyms: [/^nao$/i, /nao.*robots?/i],
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
    canonical: 'NgRx',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['RxJS', 'State Management'],
    related: ['Angular', 'Redux'],
  },
  {
    canonical: 'Nifty GUI',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['Java'],
    related: ['jMonkeyEngine'],
  },
  {
    canonical: 'Node.js',
    categories: ['Backend'],
    children: ['Express'],
    includes: ['JavaScript'],
    parents: ['Backend Systems'],
    synonyms: [/node/i],
  },
  {
    canonical: 'Notepad++',
    categories: ['Tools & Libraries'],
    related: ['MonoDevelop', 'Sublime Text', 'Visual Studio'],
    synonyms: [/^notepad\+\+$/i, /notepad plus plus/i],
  },
  {
    canonical: 'npm',
    categories: ['DevOps & Build & CI/CD'],
    related: ['Build Tools', 'CI/CD', 'Gulp', 'SemVer'],
  },
  {
    canonical: 'Nx',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['npm'],
    parents: ['Mono Repo'],
    related: ['CI/CD', 'JavaScript', 'TypeScript'],
    synonyms: [/^nrwl nx$/i, /^nx$/i],
  },
  {
    canonical: 'OAuth2',
    categories: ['Concepts'],
    related: ['API Integration'],
    synonyms: [/oauth 2/i, /oauth2/i],
  },
  {
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
  {
    canonical: 'OpenAI',
    categories: ['Tools & Libraries'],
    parents: ['Artificial Intelligence'],
    related: ['API Integration'],
  },
  {
    canonical: 'OpenAPI',
    categories: ['Backend', 'Tools & Libraries'],
    parents: ['Backend Systems'],
    related: ['API Integration', 'REST'],
    synonyms: [/^open\s*api$/i, /swagger/i],
  },
  {
    canonical: 'OpenGL',
    categories: ['Frontend'],
    children: ['GLSL', 'WebGL'],
    parents: ['Computer Graphics'],
    related: ['Shader programming'],
    synonyms: [/^opengl$/i],
  },
  {
    canonical: 'OSGI',
    categories: ['Tools & Libraries'],
    includes: ['Java'],
    related: ['Eclipse EMF', 'Eclipse PDE', 'Eclipse RCP'],
  },
  {
    canonical: 'Panda.js',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['HTML5', 'JavaScript'],
    parents: ['Game Development'],
    related: ['HTML Canvas', 'Phaser'],
  },
  {
    canonical: 'Pattern Recognition',
    categories: ['Concepts'],
    parents: ['Artificial Intelligence'],
    related: ['Image Processing'],
  },
  {
    canonical: 'PayPal API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration', 'OAuth2', 'REST'],
  },
  {
    canonical: 'Peer-to-Peer',
    categories: ['Concepts'],
    children: ['WebRTC'],
    synonyms: [/^p2p$/i, /peer[- ]to[- ]peer/i],
  },
  {
    canonical: 'peerJS',
    categories: ['Frontend', 'Tools & Libraries'],
    parents: ['WebRTC'],
  },
  {
    canonical: 'Performance Testing',
    categories: ['Concepts', 'Testing and QA'],
    parents: ['Testing'],
    related: ['Lighthouse', 'Web Vitals'],
    synonyms: [/load[-_\s]*tests?/i, /performance[-_\s]*tests?/i],
  },
  {
    canonical: 'Phaser',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['JavaScript', 'WebGL'],
    parents: ['Game Development'],
  },
  {
    canonical: 'Playwright',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['E2E Testing'],
    related: ['UI Testing'],
  },
  {
    canonical: 'Polly',
    categories: ['Cloud & Infrastructure'],
    parents: ['AWS'],
  },
  {
    canonical: 'Preprocessor',
    categories: ['DevOps & Build & CI/CD', 'Frontend'],
    children: ['LESS', 'SASS', 'SCSS'],
    synonyms: [/^preprocessor$/i, /css preprocessor/i],
  },
  {
    canonical: 'Prettier',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['CSS', 'ESLint', 'HTML', 'JavaScript', 'SCSS', 'TypeScript'],
  },
  {
    canonical: 'Project Management',
    categories: ['Misc'],
    synonyms: [/^pm$/i, /project management/i],
  },
  {
    canonical: 'Prototyping',
    categories: ['Misc'],
    related: ['Figma', 'UI/UX'],
    synonyms: [/prototyping/i],
  },
  {
    canonical: 'Puppeteer',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['E2E Testing'],
    related: ['JavaScript', 'TypeScript', 'UI Testing'],
  },
  {
    canonical: 'Python',
    categories: ['Backend'],
    related: ['Backend Systems'],
    synonyms: [/^py$/i, /^python$/i],
  },
  {
    canonical: 'QA',
    categories: ['Misc'],
    related: ['Debugging', 'Testing'],
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
    parents: ['Backend Systems'],
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
    includes: ['CSS', 'HTML', 'SPA', 'TypeScript'],
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
    parents: ['State Management'],
    related: ['NgRx'],
  },
  {
    canonical: 'requireJS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Webpack'],
  },
  {
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
  {
    canonical: 'REST',
    categories: ['Concepts'],
    related: ['API Integration', 'GraphQL', 'OpenAPI'],
    synonyms: [/^rest$/i, /rest api/i, /restful/i],
  },
  {
    canonical: 'Robotics Control Systems',
    categories: ['Misc'],
    children: ['Nao'],
    parents: ['Artificial Intelligence'],
    synonyms: [/robotics[-_\s]*control[-_\s]*systems?/i],
  },
  {
    canonical: 'RxJS',
    categories: ['Frontend', 'Tools & Libraries'],
    children: ['NgRx'],
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
    parents: ['Preprocessor'],
    related: ['LESS', 'SCSS'],
  },
  {
    canonical: 'Scientific Paper',
    categories: ['Misc'],
    related: ['Diploma Thesis'],
  },
  {
    canonical: 'SCRUM',
    categories: ['Concepts'],
    parents: ['Agile'],
  },
  {
    canonical: 'SCSS',
    categories: ['Frontend'],
    includes: ['CSS'],
    parents: ['Preprocessor'],
    related: ['LESS', 'SASS'],
  },
  {
    canonical: 'Selenium',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['E2E Testing', 'UI Testing'],
    related: ['Cypress', 'Playwright', 'Puppeteer'],
  },
  {
    canonical: 'SemVer',
    categories: ['Concepts', 'DevOps & Build & CI/CD'],
    related: ['Conventional Commits', 'npm'],
    synonyms: [/^semver$/i, /semantic versioning/i],
  },
  {
    canonical: 'Sensor Fusion',
    categories: ['Concepts'],
    parents: ['Artificial Intelligence'],
  },
  {
    canonical: 'Sentry',
    categories: ['Tools & Libraries'],
    related: ['Debugging'],
  },
  {
    canonical: 'Shader programming',
    categories: ['Concepts'],
    parents: ['Computer Graphics'],
    related: ['GLSL', 'WebGL'],
  },
  {
    canonical: 'Shadow DOM',
    categories: ['Frontend'],
    parents: ['Web Components'],
    related: ['Custom Elements'],
  },
  {
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
  {
    canonical: 'Software Design',
    categories: ['Concepts'],
    children: ['Design Patterns', 'MVC', 'OOP'],
    related: ['Software Architecture', 'UML'],
  },
  {
    canonical: 'SPA',
    categories: ['Concepts', 'Frontend'],
    synonyms: [/^spa$/i, /single[- ]page application/i],
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
    parents: ['Backend Systems', 'Java'],
    related: ['J2EE', 'Java Servlets'],
  },
  {
    canonical: 'SQL',
    categories: ['Backend'],
    related: ['Backend Systems'],
  },
  {
    canonical: 'State Management',
    categories: ['Concepts', 'Frontend'],
    children: ['NgRx', 'Redux'],
  },
  {
    canonical: 'Stencil',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['TypeScript', 'Web Components'],
    related: ['Component Library', 'Fractal', 'Storybook'],
  },
  {
    canonical: 'Storybook',
    categories: ['Frontend', 'Tools & Libraries'],
    related: ['Component Library', 'Web Components'],
  },
  {
    canonical: 'Sublime Text',
    categories: ['Tools & Libraries'],
    related: ['MonoDevelop', 'Notepad++', 'Visual Studio'],
    synonyms: [/^sublime(\s*text)?$/i],
  },
  {
    canonical: 'SVN',
    categories: ['DevOps & Build & CI/CD'],
    children: ['TortoiseSVN'],
    related: ['CI/CD', 'Git', 'GitHub'],
    synonyms: [/subversion/i, /svn/i],
  },
  {
    canonical: 'Swiper',
    categories: ['Frontend', 'Tools & Libraries'],
  },
  {
    canonical: 'Systematic Test Generation',
    categories: ['Concepts', 'Testing and QA'],
    parents: ['Model-based testing'],
  },
  {
    canonical: 'Tailwind',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['CSS', 'HTML'],
    parents: ['CSS Framework'],
    related: ['Angular Material', 'Bootstrap'],
  },
  {
    canonical: 'TeddyMocks',
    categories: ['Testing and QA'],
    parents: ['Unit Testing'],
    related: ['chai', 'Jest', 'mocha'],
  },
  {
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
  {
    canonical: 'TESTONA',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['Testing'],
  },
  {
    canonical: 'TFS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['CI/CD', 'Git'],
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
    parents: ['CI/CD'],
    related: ['GitHub', 'GitLab', 'Jenkins'],
    synonyms: [/travis/i],
  },
  {
    canonical: 'Trello',
    categories: ['Tools & Libraries'],
    parents: ['Atlassian'],
    related: ['Kanban', 'Project Management'],
  },
  {
    canonical: 'tsd',
    categories: ['DevOps & Build & CI/CD'],
    related: ['CI/CD', 'npm', 'TypeScript'],
    synonyms: [/^tsd$/i],
  },
  {
    canonical: 'Twitter API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration'],
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
    related: ['Backend Systems', 'OOP'],
    synonyms: [/^ts$/i, /typescript/i],
  },
  {
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
  {
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
    related: ['OOP', 'Software Architecture', 'Software Design'],
  },
  {
    canonical: 'Underscore',
    categories: ['Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Lodash'],
  },
  {
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
  {
    canonical: 'Unity',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['C#'],
    parents: ['Game Development'],
    related: ['3D', 'Blender', 'jMonkeyEngine', 'MonoDevelop'],
    synonyms: [/^unity$/i, /^unity3d$/i],
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
  {
    canonical: 'Vite',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Build Tools'],
    related: ['Webpack'],
  },
  {
    canonical: 'VSCode',
    categories: ['Tools & Libraries'],
    related: ['Visual Studio'],
    synonyms: [/^vs\s*code$/i, /^vscode$/i, /visual\s+studio\s+code/i],
  },
  {
    canonical: 'Vue.js',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['SPA'],
    parents: ['Frontend Framework'],
    synonyms: [/^vue/i],
  },
  {
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
  {
    canonical: 'Web Components',
    categories: ['Concepts', 'Frontend'],
    children: ['Custom Elements', 'Shadow DOM'],
    related: ['ARIA'],
    synonyms: [/web[-_\s]*components?/i],
  },
  {
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
  {
    canonical: 'Web Vitals',
    categories: ['Concepts'],
    related: ['Lighthouse', 'WCAG'],
    synonyms: [/web[-_\s]*vitals?/i],
  },
  {
    canonical: 'WebGL',
    categories: ['Frontend'],
    parents: ['OpenGL'],
    related: ['GLSL', 'HTML Canvas'],
    synonyms: [/^webgl$/i],
  },
  {
    canonical: 'Webpack',
    categories: ['DevOps & Build & CI/CD'],
    parents: ['Build Tools'],
    related: ['CI/CD', 'Vite'],
  },
  {
    canonical: 'WebRTC',
    categories: ['Backend', 'Concepts', 'Frontend'],
    children: ['peerJS'],
    includes: ['JavaScript'],
    parents: ['Peer-to-Peer'],
  },
  {
    canonical: 'Widget Trees',
    categories: ['Testing and QA'],
    parents: ['UI Testing'],
    synonyms: [/widget[-_\s]*trees?/i],
  },
  {
    canonical: 'Wikipedia API',
    categories: ['Tools & Libraries'],
    includes: ['API Integration', 'JSON', 'REST'],
    synonyms: [/wikipedia/i],
  },
  {
    canonical: 'XCode',
    categories: ['DevOps & Build & CI/CD'],
    includes: ['iOS'],
    related: ['CI/CD'],
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
    related: ['Build Tools', 'CI/CD', 'Gulp', 'npm'],
  },
  {
    canonical: 'Yeoman',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    children: ['yo'],
    related: ['CI/CD', 'npm'],
  },
  {
    canonical: 'yo',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    parents: ['Yeoman'],
    related: ['CI/CD'],
    synonyms: [/^yo$/i],
  },
  {
    canonical: 'Zeplin',
    categories: ['Tools & Libraries'],
    related: ['Figma', 'UI/UX'],
  },
] satisfies readonly TaxonomyData[];

export type TagName = (typeof INTERNAL_TAXONOMY)[number]['canonical'];
export const TAXONOMY = INTERNAL_TAXONOMY as readonly TaxonomyData[];

// NOTE: check if any non defined tags are used, by checking this type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type nonDefinedTags = Exclude<InternalTagName, TagName>;
