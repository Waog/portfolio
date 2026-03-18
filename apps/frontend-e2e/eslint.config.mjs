import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import baseConfig from '../../eslint.config.mjs';

// TODO: add e2e linting to CI/CD pipeline

export default [
  playwright.configs['flat/recommended'],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...baseConfig,
  // TODO: move TS config to root eslint file
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    // TODO: move await lint rules to root eslint file
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
];
