Write all source code in English, regardless of our chat language.

## For Code Review: Legal consistency (mandatory)

This repository uses `legal/legal-project-facts.data.ts` and `legal/legal-project-conclusions.data.ts` as the Legal Project Data source of truth for all legal-relevant facts.

When reviewing pull requests:

- Check if code changes introduce or modify legally relevant functionality (e.g. forms, tracking, third-party services, authentication, payments, notifications).
- If yes, verify that the content of Legal Project Facts Data (`legal/legal-project-facts.data.ts`) was updated to reflect that change.
- If Legal Project Facts Data (`legal/legal-project-facts.data.ts`) changed, verify that the Legal Project Conclusions Data (`legal/legal-project-conclusions.data.ts`) and the content of the files in `libs/feature/page-legal/src/lib/legal-texts/generated/` was updated accordingly.
- It is valid that no change is needed, but this must be explicitly justified.

# For Agent Mode

In agent mode, complete the requested work without extra explanation unless I explicitly ask for advice or an explanation. Finish the implementation and return working code.

When you execute CLI commands in agent mode, there is a bug that can make you inspect the CLI result before it has finished executing. Therefore, always run a second trivial command (for example, `echo`) before reading the output of the first command.

# For Chat Mode

When you are in chat mode: Before making high-level modifications like creating or modifying the public interface of a package, class, interface, or component, give me multiple suggestions/options for how the public interface of that class/component could look. Present them in a very brief numbered list, which only expects me to choose a number. Only present how the modified item will be consumed. Mark the recommended option as recommended.

When you are in chat mode: Prefer using the VSCode tools you have access to over custom command line execution.

# General Coding Guidelines

Prefer minimal changes over large refactors, unless the code is very bad or you are asked to do a refactor.

Prefer using libraries and reusing existing code over writing new code. Suggest new libraries instead of reinventing the wheel. Brief and non-duplicated code is always more maintainable and preferred.

Always implement things according to clean code practices, especially:

Apply the newspaper metaphor: top-level general functions, which call others, at the top of the file; low-level detailed helper functions, which are called, at the bottom of the file. I.e., no callee shall be above its caller in a file.

Avoid spaghetti code, pyramids of doom, and callback hells: Ensure that all statements within a function operate at the same level of abstraction—either orchestrating high-level steps or performing low-level details, but not both. Instead of having deeply nested loops and if-statements in one code snippet, extract named helper methods.

Avoid comments: instead of writing comments describing your code blocks, extract methods with speaking names to wrap these code blocks. (Exception: Don't remove existing `TODO`, `FIXME`, etc. unless you fixed them. Don't remove concrete examples, e.g., input string and output of a regex. Don't remove information which can't be derived from viewing the code.)

Assume existing code as best practice: Don't make up your own code style; instead, mimic existing code styles, unless you think existing code style is non-optimal.
Prefer placing import statements at the top of the file, rather than using inline imports, requires, or Fully Qualified Class Names.

## Commit Message Guidelines

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification, as enforced by commitlint and the commit message editor configuration. A valid commit message should have the following structure:

```
<type>[<scope>]: <emoji> <short description>

<body>

<footer>
```

- **type**: One of:

  - `fix`: A bug fix; triggers patch version bump and new release.
  - `feat`: A new feature; triggers minor version bump and new release.
  - `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - `chore`: Updating grunt tasks etc; no production code change
  - `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
  - `docs`: Documentation only changes
  - `perf`: A code change that improves performance
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `revert`: Revert a previous commit
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  - `test`: Adding missing tests or correcting existing tests

- **scope** (optional): One of:

  - `frontend`
  - `backend`
  - `infrastructure`
  - `docs`
  - `root`
  - `multiple`
    Use a scope to provide additional contextual information, e.g., `feat(parser): add ability to parse arrays`.

- **emoji**: One of:

  - `🪲` bugfix (`fix`)
  - `♻️` refactor (`refactor`)
  - `✨` add feature (`feat`)
  - `🗑️` remove feature
  - `📦` build process, CI/CD (`build`, `ci`)
  - `🚧` WIP - squash later
  - `📄` Documentation (`docs`)

- **short description**: Brief summary of the change.

- **body** (optional): More detailed description.

- **footer** (optional): Additional information, such as:
  - `BREAKING CHANGE: ...` (triggers major version bump and new release.)
  - `NATIVE CHANGE` (if Expo OTA publish is insufficient and a new native build and app store release is required)

**When to use which type and emoji:**

- Use `feat` + `✨` for new features.
- Use `fix` + `🪲` for bug fixes.
- Use `refactor` + `♻️` for code refactoring that does not add features or fix bugs.
- Use `docs` + `📄` for documentation changes.
- Use `build` or `ci` + `📦` for build process or CI/CD changes.
- Use `chore` for maintenance tasks that do not affect production code.
- Use `test` for adding or correcting tests.
- Use `style` for formatting or stylistic changes.
- Use `revert` for reverting previous commits.
- Use `🗑️` for removing features.
- Use `🚧` for work-in-progress commits that should be squashed later.

**Examples:**

```
feat(frontend): ✨ add user login page

Added a new login page with form validation.

BREAKING CHANGE: The authentication flow has changed.
```

```
fix(backend): 🪲 handle null pointer in user service
```
