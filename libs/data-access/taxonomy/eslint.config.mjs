import nx from '@nx/eslint-plugin';
import command from 'eslint-plugin-command/config';
import perfectionist from 'eslint-plugin-perfectionist';
import baseConfig from '../../../eslint.config.mjs';
import sortObjectArrays from './eslint-rules/sort-object-arrays.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  command(),
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lib',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/taxonomy.data.ts'],
    plugins: {
      perfectionist,
      custom: {
        rules: {
          'sort-object-arrays': sortObjectArrays,
        },
      },
    },
    rules: {
      'perfectionist/sort-union-types': 'error',
      'perfectionist/sort-objects': 'error',
      'custom/sort-object-arrays': [
        'error',
        {
          arrayProperties: [
            'categories',
            'children',
            'includes',
            'parents',
            'related',
            'synonyms',
          ],
          ignoreCase: true,
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
