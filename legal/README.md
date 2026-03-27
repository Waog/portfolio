# legal

## Table of contents

- [Overview](#overview)
- [GitHub Copilot setup](#github-copilot-setup)
- [Usage](#usage)
  - [Manually update the Legal Master Form](#manually-update-the-legal-master-form)
  - [Automatically update the Legal Master Form](#automatically-update-the-legal-master-form)
  - [First time document generation](#first-time-document-generation)
  - [Updating existing legal documents](#updating-existing-legal-documents)
  - [Regression check](#regression-check)
  - [Black Box external check](#black-box-external-check)
  - [Incorporate Feedback into legal master form](#incorporate-feedback-into-legal-master-form)

## Overview

This folder provides a structured way to generate and maintain legally consistent website documents based on a single source of truth.

- `legal.config.ts` (aka legal master form) defines the full legal setup of the project
- copilot snippets help enforce legal consistency during implementation and review
- prompt templates are used to generate, update, and validate legal documents
- final legal texts are not to be edited manually, but derived from the config via prompts

Core idea:  
Change the config → regenerate/update documents → verify changes

## GitHub Copilot setup

- Copy text from `legal/copilot-snippets/copilot-instructions.md` to `.github/copilot-instructions.md`
- Copy file `legal/copilot-snippets/legal.instructions.md` to `.github/instructions/legal.instructions.md`
  - replace `[YOUR LEGAL OUTPUT FOLDER]` with your actual output folder

Then keep them aligned with the project's legal workflow when the repository structure or legal generation flow changes.

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

### Automatically update the Legal Master Form

If you don't want [manually update the Legal Master Form](#manually-update-the-legal-master-form), you can use the steps from [Incorporate Feedback into legal master form](#incorporate-feedback-into-legal-master-form). Just include your free text improvement into the "Feedback" placeholder.

### First time document generation

Use when no legal HTML documents exist yet.

Use an AI to generate legal documents from your `legal.config.ts`.
Ideally use an AI with access to the internet and reasoning capabilities. E.g. ChatGPT in _Deep Research_ Mode bears great results.

#### Usage

1. Paste the contents of `prompts/gpt-prompt-first-run.md` along with `legal.config.ts` (insert into prompts placeholder) into an AI prompt.
2. Run with an LLM (with web research activated)
3. Review the feedback and save generated HTML files into your output folder

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

### Black Box external check

Check the hosted website as a black box, like a warning lawyer's automation bots would do it.
Collect data with different tools and manual copy pasting, and let an AI evaluate the collected data.

#### Usage

1. Host the website on a public URL
2. Paste `prompts/blackbox-url-check.md` into an AI prompt
3. Replace Placeholders:
   - `[ENTER Website URL]` - the domain of the website to audit
   - `[ENTER Website ENTRY POINT URLs]` - all urls the AI is supposed to start crawling from to understand your website better
   - `[PASTE LEGAL TEXTS OR LINKS]` - Links to your legal texts or the complete text content
   - `[PASTE NETWORK TAB]`
     - Use chrome dev tools > Network
     - Enable _Preserve Log_
     - Add Filter: `-domain:yourdomain.com` (and e.g. `-domain:*.yoursubdomain.com` or whichever requests are okay)
     - surf your website to collect data
     - Right click an entry > Copy > Copy all listed as HAR (sanitized)
     - paste into `[PASTE NETWORK TAB]`
   - `[PASTE WEBBKOLL REPORT]` - use [Webbkoll](https://webbkoll.5july.net/) for your domain. Copy-Paste the whole output.
   - `[PASTE BUILTWITH REPORT]` - use [builtwith.com](https://builtwith.com/) for your domain. Copy-Paste the whole output.
4. Review the report and take according actions (e.g. [Manually update the Legal Master Form](#manually-update-the-legal-master-form) again and [Update existing legal documents](#updating-existing-legal-documents) )

#### Create Reusable template

Note that some of the placeholders (like your domain) seldom change. Consider copying and modifying the template or modifying it directly to hardcode this data.

### Incorporate Feedback into legal master form

After feedback or improvement advice is received from any of the other prompt, automatically adjust the legal master form.

#### Usage

1. Paste the contents of `prompts/apply-feedback-to-master-form.md` along with `legal.config.ts` and (insert into prompts placeholder) into an AI prompt.
2. Insert:
   - `legal.config.ts` into the config placeholder
   - _Free text feedback or instructions_ into the feedback placeholder
3. Run with an LLM (with web research activated)
4. Review the report and copy-paste the resulting `legal.config.ts` back into your project
