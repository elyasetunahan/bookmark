---
name: project-flow
description: Use when a user asks to create or update a project entry in this repository, including implementation plans, migration plans, or integration plans.
---

# Project Flow

## Overview
This skill produces portfolio-grade project entries with explicit technical plan quality.

## When to Use
- User says `project` with a link, tweet, or idea.
- User asks for a migration/integration plan in project format.
- User wants a project card that can be opened as a detailed case.

Do not use for short resource saves (`bookmark`) or editorial notes (`write`).

## Required Output Contract
Write file under `content/projects/*.md` with frontmatter:

```md
---
title: "..."
slug: "kebab-case-slug"
summary: "At least 8 characters"
tags: ["..."]
publishedAt: "YYYY-MM-DD"
role: "..."
stack: ["..."]
featured: false
impact: "..."
links:
  - label: "..."
    url: "https://..."
---
```

## Body Structure
Use this order:
1. `## Problem`
2. `## Goal`
3. `## Scope`
4. `## Technical Plan`
5. `## Risks and Mitigations`
6. `## Acceptance Criteria`

## Execution Steps
1. Convert user intent into a clear project outcome.
2. Define technical boundaries and assumptions.
3. Fill frontmatter aligned with repo types.
4. Write plan with concrete steps, not abstract advice.
5. Add measurable acceptance criteria.
6. Run `npm run build:index`.
7. Verify changed files with `git status -sb`.

## Quality Gates
- Scope is explicit and finite.
- Risks include at least one mitigation each.
- Acceptance criteria are testable.
- Links are relevant primary references.
- Index regenerated.

## Red Flags
- Turning project page into a bookmark summary.
- Missing `impact` or vague value statement.
- No acceptance criteria.

## Common Mistakes
- Mixing optional and required metadata inconsistently.
Fix: follow the frontmatter contract exactly.

- Writing only strategy with no execution steps.
Fix: include specific implementation sequence.
