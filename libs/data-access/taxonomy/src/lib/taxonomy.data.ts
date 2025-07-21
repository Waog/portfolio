export type TagName =
  | 'Angular'
  | 'AngularJS'
  | 'Angular Material'
  | 'CSS'
  | 'Framework'
  | 'Frontend Framework'
  | 'HTML'
  | 'JavaScript'
  | 'React'
  | 'React Native'
  | 'React Web'
  | 'RxJS'
  | 'SASS'
  | 'SCSS'
  | 'TypeScript'
  | 'Vue.js';

/**
 * Represents a single Keyword in the taxonomy.
 */
export type TaxonomyData = {
  /** Canonical Name of the Keyword, e.g. "Node.js" */
  readonly canonical: TagName;

  /**
   * Matching alternatives:
   * Alternative names and identifying Regexes which mean the same Keyword, e.g. "node".
   * If not defined, defaults to the lowercase alphanumeric-only version of the canonical name.
   * Example: "Vue.js" would implicitly have `synonyms: [/vue/i]`.
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
    canonical: 'Angular',
    synonyms: [/^angular$/i],
    includes: ['CSS', 'HTML', 'TypeScript'],
    related: ['Angular Material', 'AngularJS', 'RxJS', 'SASS', 'SCSS'],
    parents: ['Frontend Framework'],
    children: ['Angular Material'],
  },
  {
    canonical: 'Angular Material',
    parents: ['Angular'],
  },
  {
    canonical: 'AngularJS',
    synonyms: [/angular\.js/i, /angularjs/i],
    parents: ['Frontend Framework'],
    includes: ['CSS', 'HTML', 'TypeScript'],
    related: ['Angular'],
  },
  {
    canonical: 'CSS',
    synonyms: [/^css$/i],
  },
  {
    canonical: 'Framework',
    children: ['Frontend Framework'],
  },
  {
    canonical: 'Frontend Framework',
    synonyms: [/frontend framework/i, /javascript framework/i, /js framework/i],
    parents: ['Framework'],
    children: ['Angular', 'AngularJS', 'React', 'Vue.js'],
  },
  {
    canonical: 'HTML',
  },
  {
    canonical: 'JavaScript',
    synonyms: [/^js$/i, /javascript/i],
    children: ['TypeScript'],
  },
  {
    canonical: 'React',
    synonyms: [/^react$/i, /react\.js/i],
    parents: ['Frontend Framework'],
    children: ['React Native', 'React Web'],
    includes: ['CSS', 'HTML', 'TypeScript'],
  },
  {
    canonical: 'React Native',
    parents: ['React'],
  },
  {
    canonical: 'React Web',
    parents: ['React'],
  },
  {
    canonical: 'RxJS',
    related: ['Angular'],
    includes: ['TypeScript'],
  },
  {
    canonical: 'SASS',
    related: ['SCSS'],
    includes: ['CSS'],
  },
  {
    canonical: 'SCSS',
    related: ['SASS'],
    includes: ['CSS'],
  },
  {
    canonical: 'TypeScript',
    synonyms: [/^ts$/i, /typescript/i],
    parents: ['JavaScript'],
  },
  {
    canonical: 'Vue.js',
    synonyms: [/vue/i, /vue\.js/i, /vuejs/i],
    parents: ['Frontend Framework'],
  },
] as const;
