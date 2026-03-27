# legal

## Table of contents

- [Overview](#overview)
- [GitHub Copilot setup](#github-copilot-setup)
- [Usage](#usage)
  - [Manually update the Legal Master Form](#manually-update-the-legal-master-form)
  - [First time document generation](#first-time-document-generation)
  - [Updating existing legal documents](#updating-existing-legal-documents)
  - [Regression check](#regression-check)

---

## Overview

This folder provides a structured way to generate and maintain legally consistent website documents based on a single source of truth.

- `legal.config.ts` (aka legal master form) defines the full legal setup of the project
- copilot snippets help enforce legal consistency during implementation and review
- prompt templates are used to generate, update, and validate legal documents
- final legal texts are not to be edited manually, but derived from the config via prompts

Core idea:  
Change the config → regenerate/update documents → verify changes

---

## GitHub Copilot setup

- Copy text from `legal/copilot-snippets/copilot-instructions.md` to `.github/copilot-instructions.md`
- Copy file `legal/copilot-snippets/legal.instructions.md` to `.github/instructions/legal.instructions.md`
  - replace `[YOUR LEGAL OUTPUT FOLDER]` with your actual output folder

Then keep them aligned with the project's legal workflow when the repository structure or legal generation flow changes.

---

## Usage

### Manually update the Legal Master Form

Edit `legal.config.ts` manually or ask AI in any way to assist you.

Single source of truth for the legal setup.

Update this file whenever anything legally relevant changes:

- operator/contact details
- domains and legal URLs
- hosting, CDN, DNS, WAF, email providers
- analytics, cookies, tracking, scripts
- forms, accounts, uploads, payments, booking, chat
- data-processing activities, recipients, retention, legal bases

---

### First time document generation

Use when no legal HTML documents exist yet.

Use an AI to generate legal documents from your `legal.config.ts`.
Ideally use an AI with access to the internet and reasoning capabilities. E.g. ChatGPT in _Deep Research_ Mode bears great results.

#### Usage

1. Paste the contents of `prompts/gpt-prompt-first-run.md` along with `legal.config.ts` (insert into prompts placeholder) into an AI prompt.
2. Run with an LLM (with web research activated)
3. Review the feedback and save generated HTML files into your output folder

---

### Updating existing legal documents

Use when legal HTML documents already exist and need to be updated.

Use an AI to update your existing legal documents based on changes in `legal.config.ts`.
Ideally use an AI with access to the internet and reasoning capabilities. E.g. ChatGPT in _Deep Research_ Mode bears great results.

#### Usage

1. Paste the contents of `prompts/gpt-prompt-document-updates.md`
2. Insert:
   - `legal.config.ts` into the config placeholder
   - all existing legal HTML files into the document placeholder
3. Run with an LLM (with web research activated)
4. Review the feedback and save generated HTML files into your output folder

---

### Regression check

Use after modifying or regenerating legal documents.

#### Usage

1. Paste the contents of `prompts/check-regressions.md`
2. Insert:
   - old version of the document
   - new version of the document
   - current `legal.config.ts`
3. Run with an LLM
4. Review:
   - improvements
   - regressions
   - general issues

Goal: detect accidental weakening, omissions, inconsistencies
