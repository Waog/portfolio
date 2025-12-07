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
  | 'ActionScript'
  | 'Agile'
  | 'AJAX'
  | 'Android'
  | 'Angular'
  | 'AngularJS'
  | 'Angular Material'
  | 'Ant'
  | 'API Gateway'
  | 'AppConfig'
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
  | 'C#'
  | 'C++'
  | 'Capture-and-Replay'
  | 'CDK'
  | 'chai'
  | 'Classification Tree Method'
  | 'CloudFormation'
  | 'Cloud Platforms'
  | 'CloudWatch'
  | 'Computer Graphics'
  | 'Computer Vision'
  | 'Confluence'
  | 'Construct 2'
  | 'Cordova'
  | 'CSS'
  | 'Custom Game Engine'
  | 'Custom Scripts'
  | 'Custom Test Framework'
  | 'Cypress'
  | 'Database Systems'
  | 'DataDog'
  | 'DevOps Tools'
  | 'Diploma Thesis'
  | 'Docker'
  | 'DOORS'
  | 'DynamoDB'
  | 'Eclipse'
  | 'Eclipse EMF'
  | 'Eclipse GMF'
  | 'Eclipse Graphiti'
  | 'Eclipse PDE'
  | 'Eclipse RCP'
  | 'Elastic Beanstalk'
  | 'Entity Component System'
  | 'Expo'
  | 'Express'
  | 'Facebook'
  | 'Facebook API'
  | 'Facebook Games'
  | 'First-person camera'
  | 'Flash'
  | 'Fractal'
  | 'Framework'
  | 'Frontend Framework'
  | 'FRUIT'
  | 'Game Development'
  | 'Git'
  | 'GitHub'
  | 'GitHub API'
  | 'GitLab'
  | 'GLSL'
  | 'Google Analytics'
  | 'Google App Engine'
  | 'Google Code'
  | 'Gradle'
  | 'GraphQL'
  | 'Grunt'
  | 'GTM'
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
  | 'Model-based testing'
  | 'MongoDB'
  | 'Mongoose'
  | 'MonoDevelop'
  | 'Mono Repo'
  | 'Nao'
  | 'NestJS'
  | 'Netbeans'
  | 'Nifty GUI'
  | 'Node.js'
  | 'Notepad++'
  | 'npm'
  | 'Nx'
  | 'OAuth2'
  | 'OpenAI'
  | 'OpenGL'
  | 'OSGI'
  | 'Panda.js'
  | 'Pattern Recognition'
  | 'PayPal API'
  | 'Peer-to-Peer'
  | 'peerJS'
  | 'Phaser'
  | 'Polly'
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
  | 'REST'
  | 'Robotics Control Systems'
  | 'RxJS'
  | 'S3'
  | 'SASS'
  | 'Scientific Paper'
  | 'SCRUM'
  | 'SCSS'
  | 'Sensor Fusion'
  | 'Sentry'
  | 'Shader programming'
  | 'Software Architecture'
  | 'Software Design'
  | 'Spacer'
  | 'Splunk'
  | 'Spring Boot'
  | 'SQL'
  | 'Stencil'
  | 'Sublime Text'
  | 'SVN'
  | 'Swiper'
  | 'Systematic Test Generation'
  | 'TeddyMocks'
  | 'Testing'
  | 'TESTONA'
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
  | 'Unity'
  | 'USB Monitor'
  | 'Various Technologies'
  | 'Visual Studio'
  | 'Vue.js'
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
    canonical: 'ActionScript',
    categories: ['Frontend'],
    related: ['JavaScript'],
    synonyms: [/^as3?$/i, /actionscript/i],
  },
  {
    canonical: 'Agile',
    categories: ['Concepts'],
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
    related: ['Java'],
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
    parents: ['Atlassian', 'Git'],
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
    related: ['jQuery', 'SASS', 'SCSS'],
  },
  {
    canonical: 'Bower',
    categories: ['DevOps & Build & CI/CD'],
    related: ['npm', 'yarn'],
  },
  {
    canonical: 'C#',
    categories: ['Backend', 'Frontend'],
    related: ['Unity'],
    synonyms: [/^c[- ]sharp$/i, /^c#$/i],
  },
  {
    canonical: 'C++',
    categories: ['Backend'],
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
    parents: ['AWS'],
  },
  {
    canonical: 'chai',
    categories: ['Testing and QA'],
    parents: ['Testing'],
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
    canonical: 'Cordova',
    categories: ['DevOps & Build & CI/CD'],
    related: ['Intel XDK'],
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
    parents: ['Game Development'],
    related: ['Entity Component System', 'Framework'],
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
    canonical: 'Diploma Thesis',
    categories: ['Misc'],
    related: ['Scientific Paper'],
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
  },
  {
    canonical: 'Frontend Framework',
    categories: ['Frontend'],
    children: ['Angular', 'AngularJS', 'React', 'Vue.js'],
    parents: ['Framework'],
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
    related: ['SVN', 'TFS'],
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
    parents: ['Git'],
  },
  {
    canonical: 'GitLab',
    categories: [
      'Cloud & Infrastructure',
      'DevOps & Build & CI/CD',
      'Tools & Libraries',
    ],
    parents: ['Git'],
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
    related: ['BitBucket', 'Git', 'GitHub', 'GitLab', 'SVN'],
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
    related: ['Ionic', 'React Native'],
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
    children: ['Java Servlets', 'JNativeHook', 'Spring Boot'],
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
    children: ['Android', 'iOS'],
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
    canonical: 'Model-based testing',
    categories: ['Concepts', 'Testing and QA'],
    children: ['Classification Tree Method', 'Systematic Test Generation'],
    parents: ['Testing'],
  },
  {
    canonical: 'MongoDB',
    categories: ['Backend', 'Cloud & Infrastructure'],
    synonyms: [/^mongo$/i, /mongodb/i],
  },
  {
    canonical: 'Mongoose',
    categories: ['Backend', 'Tools & Libraries'],
    includes: ['MongoDB', 'Node.js'],
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
    parents: ['Artificial Intelligence'],
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
    includes: ['OAuth2', 'REST'],
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
    canonical: 'Phaser',
    categories: ['Frontend', 'Tools & Libraries'],
    includes: ['JavaScript', 'WebGL'],
    parents: ['Game Development'],
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
    canonical: 'Prototyping',
    categories: ['Misc'],
    synonyms: [/prototyping/i],
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
    canonical: 'requireJS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    includes: ['JavaScript'],
    related: ['Webpack'],
  },
  {
    canonical: 'REST',
    categories: ['Concepts'],
    synonyms: [/^rest$/i, /rest api/i, /restful/i],
  },
  {
    canonical: 'Robotics Control Systems',
    categories: ['Misc'],
    children: ['Nao'],
    parents: ['Artificial Intelligence'],
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
    canonical: 'Scientific Paper',
    categories: ['Misc'],
    related: ['Diploma Thesis'],
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
    canonical: 'Sensor Fusion',
    categories: ['Concepts'],
    parents: ['Artificial Intelligence'],
  },
  {
    canonical: 'Sentry',
    categories: ['Tools & Libraries'],
  },
  {
    canonical: 'Shader programming',
    categories: ['Concepts'],
    parents: ['Computer Graphics'],
    related: ['GLSL', 'WebGL'],
  },
  {
    canonical: 'Software Architecture',
    categories: ['Concepts'],
    children: ['Entity Component System'],
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
    canonical: 'Sublime Text',
    categories: ['Tools & Libraries'],
    related: ['MonoDevelop', 'Notepad++', 'Visual Studio'],
    synonyms: [/^sublime(\s*text)?$/i],
  },
  {
    canonical: 'SVN',
    categories: ['DevOps & Build & CI/CD'],
    children: ['TortoiseSVN'],
    related: ['Git', 'GitHub'],
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
      'FRUIT',
      'Jasmine',
      'Jest',
      'JUnit',
      'Karma',
      'mocha',
      'mockito',
      'Model-based testing',
      'TeddyMocks',
      'TESTONA',
      'UI Testing',
    ],
  },
  {
    canonical: 'TESTONA',
    categories: ['Testing and QA', 'Tools & Libraries'],
    parents: ['Testing'],
  },
  {
    canonical: 'TFS',
    categories: ['DevOps & Build & CI/CD', 'Tools & Libraries'],
    related: ['Git'],
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
    children: ['Capture-and-Replay', 'Cypress', 'QF-Test', 'Widget Trees'],
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
      'XCode',
    ],
    synonyms: [/^visual studio$/i, /^vs$/i],
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
    canonical: 'WebGL',
    categories: ['Frontend'],
    parents: ['OpenGL'],
    related: ['GLSL', 'HTML Canvas'],
    synonyms: [/^webgl$/i],
  },
  {
    canonical: 'Webpack',
    categories: ['DevOps & Build & CI/CD'],
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
  },
  {
    canonical: 'Wikipedia API',
    categories: ['Tools & Libraries'],
    includes: ['JSON', 'REST'],
    synonyms: [/wikipedia/i],
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
