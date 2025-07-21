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

export type TaxonomyData = {
  readonly canonical: TagName;
  readonly synonyms?: readonly (RegExp | string)[];
  readonly includes?: readonly TagName[];
  readonly related?: readonly TagName[];
  readonly parents?: readonly TagName[];
  readonly children?: readonly TagName[];
};

export const TAXONOMY: readonly TaxonomyData[] = [
  {
    canonical: 'Angular',
    synonyms: [/^angular$/i],
    includes: ['CSS', 'HTML', 'JavaScript'],
    related: ['Angular Material', 'AngularJS', 'RxJS', 'SASS', 'SCSS'],
    parents: ['Frontend Framework'],
    children: ['Angular Material'],
  },
  {
    canonical: 'Angular Material',
    synonyms: [/angular material/i],
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
    synonyms: [/html/i],
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
    synonyms: [/react native/i],
    parents: ['React'],
  },
  {
    canonical: 'React Web',
    synonyms: [/react web/i],
    parents: ['React'],
  },
  {
    canonical: 'RxJS',
    synonyms: [/rxjs/i],
    related: ['Angular'],
    includes: ['TypeScript'],
  },
  {
    canonical: 'SASS',
    synonyms: [/sass/i],
    related: ['SCSS'],
    includes: ['CSS'],
  },
  {
    canonical: 'SCSS',
    synonyms: [/scss/i],
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
