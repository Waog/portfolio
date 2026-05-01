# Portfolio

A personal portfolio website built with Angular 19 and SSR, organized as an Nx monorepo.

## Tech Stack

- **Framework:** [Angular 19](https://angular.dev) with Server-Side Rendering (SSR)
- **UI Library:** [Angular Material](https://material.angular.io)
- **Monorepo:** [Nx](https://nx.dev)
- **Testing:** [Jest](https://jestjs.io) (unit), [Vitest](https://vitest.dev) (unit), [Playwright](https://playwright.dev) (e2e)
- **Component Explorer:** [Storybook](https://storybook.js.org)
- **Linting:** [ESLint](https://eslint.org) with [Prettier](https://prettier.io)

## Prerequisites

- [Node.js](https://nodejs.org) (see `.nvmrc` or `engines` field in `package.json` for the required version)
- [npm](https://www.npmjs.com)

## Setup

```sh
npm install
```

## Development

Start the dev server (available at `http://localhost:4200`):

```sh
npx nx serve frontend
```

Start with SSR in development mode:

```sh
npx nx serve-ssr frontend
```

## Building

Build the app for production:

```sh
npx nx build frontend
```

Build with prerendering:

```sh
npx nx prerender frontend
```

## Testing

Run all unit tests:

```sh
npx nx run-many -t test
```

Run unit tests for a specific project:

```sh
npx nx test frontend
```

Run end-to-end tests:

```sh
npx nx e2e frontend-e2e
```

## Linting

Lint all projects:

```sh
npx nx run-many -t lint
```

Format code with Prettier:

```sh
npx nx format:write
```

## Storybook

Start Storybook for component development:

```sh
npx nx storybook frontend
```

## Project Structure

```
apps/
  frontend/          # Angular SSR application
  frontend-e2e/      # Playwright e2e tests
libs/
  data-access/       # Data models and state (projects, taxonomy, etc.)
  feature/           # Feature components (about-me, project-list, skills, contact, etc.)
  ui/                # Reusable UI components
  util/              # Utilities and shared styles
```

## Contributing

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced via commitlint and Husky).

```
<type>(<scope>): <emoji> <short description>
```

Example: `feat(frontend): ✨ add dark mode toggle`
