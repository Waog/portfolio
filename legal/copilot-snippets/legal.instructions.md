---
applyTo: 'legal/legal-project-facts.data.ts,legal/legal-project-facts.type.ts,legal/legal-project-conclusions.data.ts,legal/legal-project-conclusions.type.ts,apps/frontend/src/**/*,apps/frontend/public/**/*,apps/frontend/index.html,apps/frontend/server.ts,apps/frontend/main.server.ts,apps/frontend/vite.config.mts,apps/frontend/project.json,apps/frontend-e2e/src/tests/legal-documents.spec.ts,libs/feature/contact-section/**/*,libs/feature/page-legal/**/*,libs/feature/web-metadata/**/*,package.json,package-lock.json'
---

<!-- COPY this file to .github/instructions/legal.instructions.md -->

# Legal consistency rules

## Source of truth

The Legal Project Facts Data (`legal/legal-project-facts.data.ts`) is the single source of truth for all legal-relevant facts in this repository.

If code or configuration changes affect legal or compliance-relevant facts, the Legal Project Facts Data must be reviewed and updated as needed.

If the Legal Project Facts Data changes, verify whether any legal output files also need updating.

## What counts as potentially legal-relevant

Treat changes as potentially legal-relevant when they introduce, remove, or modify items such as:

- contact options or contact forms
- collection of personal data
- analytics, tracking, cookies, consent, or embeds
- third-party services, SDKs, APIs, CDNs, or fonts
- hosting or server-side request handling
- authentication, user accounts, newsletters, or notifications
- legal page content, routing, or metadata that affect legal disclosures
- npm dependencies or other packages that process data or load third-party resources

Installing, removing, or reconfiguring a dependency can itself be legally relevant.

## Coding behavior

When actively changing code or configuration in the repository:

- perform a semantic check rather than a file-touch check
- determine whether your code/config change has legal impact and update the Legal Project Facts Data (`legal/legal-project-facts.data.ts`) accordingly

## Review behavior

When reviewing a pull request:

- perform a semantic check rather than a file-touch check
- determine whether the code/config change should have updated the Legal Project Facts Data
- determine whether a change in the Legal Project Facts Data should have updated the Legal Project Conclusions or any legal output file (HTML)
- it is valid that no follow-up change is required, but this must be explicitly justified

## Expected review output

If something is missing, point to the concrete missing artifact, for example:

- the missing or outdated section/key in the Legal Project Data (`legal/legal-project-facts.data.ts` or `legal/legal-project-conclusions.data.ts`)
- the affected legal output HTML file that likely needs updating

Do not give vague feedback like "check legal stuff." Provide concrete reasoning based on the actual change.
