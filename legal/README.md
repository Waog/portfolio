# legal

## Table of contents

- [Overview](#overview)
- [GitHub Copilot setup](#github-copilot-setup)
- [Usage](#usage)
  - [Manually update Legal Project Facts Data](#manually-update-legal-project-facts-data)
  - [Automatically update Legal Project Data](#automatically-update-legal-project-data)
  - [First time document generation](#first-time-document-generation)
  - [Updating existing legal documents](#updating-existing-legal-documents)
  - [Regression check](#regression-check)
  - [Black Box external check](#black-box-external-check)
  - [Incorporate Feedback into Legal Project Data](#incorporate-feedback-into-legal-project-data)

## Overview

This folder provides a structured way to generate and maintain legally consistent website documents based on a single source of truth.

- **Legal Project Facts Data** ([`legal-project-facts.data.ts`](./legal-project-facts.data.ts)) - This is the file which needs to be maintained thoroughly to reflect the legal project reality. The single source of truth.
- **Legal Project Facts Type** ([`legal-project-facts.type.ts`](./legal-project-facts.type.ts)) - The corresponding schema.
- **Legal Project Conclusion Data** ([`legal-project-conclusions.data.ts`](./legal-project-conclusions.data.ts)) - This file is generated/filled by AI with conclusions and research data derived from the _Legal Project Facts Data_. Only edit to guide AI.
- **Legal Project Conclusion Type** ([`legal-project-conclusions.type.ts`](./legal-project-conclusions.type.ts)) - The corresponding schema.
- **Copilot Snippets** ([`copilot-snippets/`](./copilot-snippets)) - Help to enforce legal consistency during implementation and review via GitHub Copilot.
- **Prompt Templates** ([`prompts/`](./prompts)) - copy to chatGPT or any AI to generate, update, and validate legal documents.
- **Final Legal Texts** - The AI-generated HTML files. Do not edit them manually; derive them from the Legal Project Data via the provided prompts and include them on your website.

### Core idea

Change _Legal Project Facts Data_ -> (re-)generate/update files and documents -> verify changes

## GitHub Copilot setup

- Copy text from [`legal/copilot-snippets/copilot-instructions.md`](./copilot-snippets/copilot-instructions.md) to `.github/copilot-instructions.md`
  - replace `[YOUR LEGAL OUTPUT FOLDER]` with your actual output folder
- Copy file [`legal/copilot-snippets/legal.instructions.md`](./copilot-snippets/legal.instructions.md) to `.github/instructions/legal.instructions.md`

Then keep them aligned with the project's legal workflow when the repository structure or legal generation flow changes.

## Usage

### Manually update Legal Project Facts Data

Edit [`legal-project-facts.data.ts`](./legal-project-facts.data.ts) manually or ask AI in any way to assist you.

Single source of truth for the legal setup.

Update this file whenever anything legally relevant changes:

- operator/contact details
- 3rd party providers or their settings
- domains and legal URLs
- hosting, CDN, DNS, WAF, email providers
- analytics, cookies, tracking, scripts
- forms, accounts, uploads, payments, booking, chat
- data-processing activities, recipients, retention, legal bases

### Automatically update Legal Project Data

If you don't want [manually update Legal Project Facts Data](#manually-update-legal-project-facts-data), you can use the steps from [Incorporate Feedback into Legal Project Data](#incorporate-feedback-into-legal-project-data). Just include your free text improvement/instructions into the "Feedback" placeholder.

### First time document generation

Use when no legal HTML documents exist yet.

Use an AI to generate legal documents from your Legal Project Facts Data ([`legal-project-facts.data.ts`](./legal-project-facts.data.ts)).
Prefer an AI with web-research and reasoning capabilities (for example, ChatGPT in _Deep Research_ mode bears great results).

#### Usage

1. Paste the contents of [`prompts/generate-legal-docs.md`](./prompts/generate-legal-docs.md) into an AI prompt.
2. insert into the prompt placeholder or just attach/upload these files if possible:
   - all 4 TypeScript files:
     - `legal/legal-project-conclusions.data.ts`
     - `legal/legal-project-conclusions.type.ts`
     - `legal/legal-project-facts.data.ts`
     - `legal/legal-project-facts.type.ts`
3. Start the LLM (with web research enabled, ideally _Deep Research_ mode)
4. Review the feedback and save the generated files:
   - save generated HTML files into your output folder
   - save the typescript files and review the changes
5. Search, review, and fix the `TODO` items in the changed files.

### Updating existing legal documents

Use when legal HTML documents already exist and need to be updated.

Use an AI to update your existing legal documents based on changes in your Legal Project Facts Data.
Prefer an AI with web-research and reasoning capabilities (for example, ChatGPT in _Deep Research_ mode bears great results).

#### Usage

Same as [First time document generation](#first-time-document-generation), but additionally pass your existing HTML files.

### Regression check

Use after modifying or regenerating legal documents.

#### Usage

1. Paste the contents of [`prompts/check-regressions.md`](./prompts/check-regressions.md) into an AI prompt input
2. Insert (paste texts, paste public links, or attach/upload files):

   - old version of the final documents (HTML or rendered version)
   - new version of the final documents (HTML or rendered version)
   - current [`legal-project-facts.data.ts`](./legal-project-facts.data.ts)
   - (Optional) current [`legal-project-facts.type.ts`](./legal-project-facts.type.ts)
   - (Optional) current [`legal-project-conclusions.data.ts`](./legal-project-conclusions.data.ts)
   - (Optional) current [`legal-project-conclusions.type.ts`](./legal-project-conclusions.type.ts)

3. Run the LLM
4. Review:
   - improvements
   - regressions
   - general issues

Goal: detect accidental weakening, omissions, or inconsistencies

### Black Box external check

Check the hosted website as a black box, similar to how warning-letter lawyer bots (Abmahnung lawyer bots) would assess it.
Collect data with different tools and manual copy-pasting, and let an AI evaluate the collected data.

#### Usage

1. Host the website on a public URL.
2. Paste [`prompts/blackbox-url-check.md`](./prompts/blackbox-url-check.md) into an AI prompt.
3. Replace placeholders:
   - `[ENTER Website URL]` - the domain of the website to audit
   - `[ENTER Website ENTRY POINT URLs]` - all URLs the AI is supposed to start crawling from to understand your website better
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
4. Review the report and take appropriate actions (for example: [Manually update Legal Project Facts Data](#manually-update-legal-project-facts-data), [Update existing legal documents](#updating-existing-legal-documents), or automatically [Incorporate Feedback into Legal Project Data](#incorporate-feedback-into-legal-project-data)).

#### Create Reusable template

Note that some of the placeholders (like your domain) seldom change. Consider copying and modifying the template or modifying it directly to hardcode this data.

### Incorporate Feedback into Legal Project Data

After feedback or improvement advice is received from any of the other prompt, automatically adjust Legal Project Data.

#### Usage

1. Paste the contents of [`prompts/apply-feedback-to-legal-files.md`](./prompts/apply-feedback-to-legal-files.md) into an AI prompt.
2. Insert _free-text feedback or instructions_ into the feedback placeholder.
3. Insert (paste texts, or attach/upload files):
   - current [`legal-project-facts.data.ts`](./legal-project-facts.data.ts)
   - (Optional) current [`legal-project-conclusions.type.ts`](./legal-project-conclusions.type.ts)
   - (Optional) current [`legal-project-conclusions.data.ts`](./legal-project-conclusions.data.ts)
   - (Optional) current [`legal-project-conclusions.type.ts`](./legal-project-conclusions.type.ts)
   - (Optional) current HTML legal files
4. Start the LLM (with web research enabled, ideally _Deep Research_ mode).
5. Review the feedback and save the generated files:
   - save generated HTML files into your output folder and review the changes
   - save the TypeScript files and review the changes
