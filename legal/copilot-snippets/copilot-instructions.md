<!-- COPY the snippet below into .github/copilot-instructions.md -->

## For Code Review: Legal consistency (mandatory)

This repository uses `legal/legal-project-facts.data.ts` and `legal/legal-project-conclusions.data.ts` as the single source of truth for all legal-relevant facts.

When reviewing pull requests:

- check whether code changes introduce or modify legally relevant functionality (e.g. forms, tracking, third-party services, authentication, payments, notifications)
- if so, verify that the Legal Project Facts Data (`legal/legal-project-facts.data.ts`) was updated to reflect the change
- if the Legal Project Facts Data (`legal/legal-project-facts.data.ts`) changed, verify that the Legal Project Conclusions Data (`legal/legal-project-conclusions.data.ts`) and the files in `[YOUR LEGAL OUTPUT FOLDER]` were updated accordingly
- it is valid that no change is required, but that outcome must be explicitly justified
