<!-- COPY below text snippet into .github/copilot-instructions.md  -->

## For Code Review: Legal consistency (mandatory)

This repository uses `legal/legal.config.ts` as the single source of truth for all legal-relevant facts.

When reviewing pull requests:

- Check if code changes introduce or modify legally relevant functionality (e.g. forms, tracking, third-party services, authentication, payments, notifications).
- If yes, verify that the content `legal/legal.config.ts` was updated to reflect that change.
- If `legal/legal.config.ts` changed, verify that the content of files in `[YOUR LEGAL OUTPUT FOLDER]` was updated accordingly.
- It is valid that no change is needed, but this must be explicitly justified.
