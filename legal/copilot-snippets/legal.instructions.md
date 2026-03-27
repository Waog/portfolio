---
applyTo: 'legal/legal.config.ts,apps/frontend/src/**/*,apps/frontend/public/**/*,apps/frontend/index.html,apps/frontend/server.ts,apps/frontend/main.server.ts,apps/frontend/vite.config.mts,apps/frontend/project.json,apps/frontend-e2e/src/tests/legal-documents.spec.ts,libs/feature/contact-section/**/*,libs/feature/page-legal/**/*,libs/feature/web-metadata/**/*,package.json,package-lock.json'
---

<!-- COPY this file to .github/instructions/legal.instructions.md -->

# Legal consistency rules

## Source of truth

`legal/legal.config.ts` is the single source of truth for all legal-relevant facts in this repository.

If code or configuration changes affect legal/compliance-relevant facts, `legal/legal.config.ts` must be checked and updated if needed.

If `legal/legal.config.ts` changes, you must check whether the legal output files also need to be updated.

## What counts as potentially legal-relevant

Treat changes as potentially legal-relevant if they introduce, remove, or modify things such as:

- contact options or contact forms
- collection of personal data
- analytics, tracking, cookies, consent, embeds
- third-party services, SDKs, APIs, CDNs, fonts
- hosting or server-side request handling
- authentication, user accounts, newsletter, notifications
- legal page content, routing, or metadata that affects legal disclosures
- npm dependencies or other packages that may process data or load third-party resources

Installing, removing, or reconfiguring a dependency can itself be legally relevant.

## Coding behavior

When actively changing code or configs in the repository:

- perform a semantic check, not a file-touch check
- determine whether your code/config change has a legal impact and change the `legal/legal.config.ts` accordingly

## Review behavior

When reviewing a pull request:

- perform a semantic check, not a file-touch check
- determine whether the code/config change should have changed `legal/legal.config.ts`
- determine whether a change in `legal/legal.config.ts` should have changed any legal output file.
- it is valid that no follow-up change is needed, but this must be explicitly justified

## Expected review output

If something is missing, point to the concrete missing artifact, for example:

- the missing or outdated section/key in `legal/legal.config.ts`
- the affected legal output file that should likely be updated

Do not give vague feedback like “check legal stuff”.
Give concrete reasoning based on the actual change.
