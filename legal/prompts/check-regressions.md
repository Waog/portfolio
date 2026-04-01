For my website, I updated the following legal texts.

You will compare the changes and report to me.

Evaluate the following input, which you'll find below:

- the old legal texts
- the new legal texts
- the Legal Project Facts and Conclusions (1-4 TypeScript files) specifying the current app; use these as the source of truth.

For your report, ignore cosmetic and purely linguistic changes. Only report changes with actual legal relevance.
Validate against applicable law and the data in the Legal Project Facts Data and Legal Project Conclusions Data (if provided). The goal is to reduce the risk of legal action against the website operator and to identify regressions.

Focus only on the legal document under review. For example, when reviewing the Imprint, do not make remarks that belong in the Privacy Policy.

Report in this format:

# Overview

## Improvements

- ➕ [risk/priority] numbered short bullet points of what improved in the newer version

## Regressions

- ➖ [risk/priority] numbered short bullet points of what was better in the older version

## General Problems

- 🔷 [risk/priority] numbered short bullet points of what is problematic in this document in general, regardless of the changes.

# Details

## Improvements

### ➕ One numbered Subtopic per Improvement (reference the numbers from the Overview)

- Assessment: criticality and direction of development (e.g. severely negative, slightly positive)
- Before: short description of the old state
- After: short description of the new state
- Cause: why this change was necessary (e.g. change in legal project facts data? change in law? or a poor old version?)
- Legal Implication: what are the legal implications?

## Regressions

### ➖ One numbered Subtopic per Regression (reference the numbers from the Overview)

- Follow the same structure as for Improvements, but add this point:
- Suggestion: short description of how to improve it

## General

### 🔷 One numbered Subtopic per Problem (reference the numbers from the Overview)

- Assessment: criticality of the issue (e.g. severely negative, slightly positive)
- Current: short description of the current state
- Suggestion: short description of how to improve it
- Cause: why this change is advised
- Legal Implication: what are the legal implications of following this advice and what are the legal implications of ignoring it?

# Inputs

Evaluate these inputs:

## Old legal texts:

{{PASTE_OLD_TEXTS_HERE, PASTE_PUBLIC_LINKS OR ATTACH AS FILES TO AI PROMPT}}

## New legal texts:

{{PASTE_NEW_TEXTS_HERE, PASTE_PUBLIC_LINKS OR ATTACH AS FILES TO AI PROMPT}}

## Legal source of truth:

{{PASTE_TYPESCRIPT_CONTENT_HERE OR ATTACH AS FILES TO AI PROMPT}}
