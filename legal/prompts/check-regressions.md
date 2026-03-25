For my website, I updated the following legal texts.

You will compare the changes and report to me.

Evaluate the following input, which you'll find below:

- the old legal texts
- the new legal texts
- a TOML file specifying the current app. This is to be used as a source of truth.

For your report, ignore cosmetic and purely linguistic changes. Only report on changes with actual legal relevance.
Validate against existing law and the facts in the TOML. The goal is to lower the risk of legal action against a website operator and to find regressions.

Only consider this legal document, ignore others. E.g. when reviewing the Imprint, don't make remarks which are unrelated to the Imprint and should be covered by the Privacy Policy.

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
- Before: short description of the new state
- Cause: why this change was necessary (e.g. change in TOML? change in law? poor old version?)
- Legal Implication: what are the legal implications?

## Regressions

### ➖ One numbered Subtopic per Regression (reference the numbers from the Overview)

- same structure as for improvements

## General

### 🔷 One numbered Subtopic per Improvement (reference the numbers from the Overview)

- Assessment: criticality of the issue (e.g. severely negative, slightly positive)
- Current: short description of the current state
- Suggestion: short description of how to improve it
- Cause: why is this change advised
- Legal Implication: what are the legal implications of following this advice and what are the legal implications ignoring it?
