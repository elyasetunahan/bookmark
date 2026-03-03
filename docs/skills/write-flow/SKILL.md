---
name: write-flow
description: Use when a user asks to create or update long-form writing content in this repository, such as guides, playbooks, or opinionated technical notes.
---

# Write Flow

## Overview
This skill creates readable technical writing that fits the repo note schema and remains practical.

## When to Use
- User says `write` and gives a topic.
- User asks for a new note under writing/blog.
- User wants an existing note revised for clarity.

Do not use for project case studies or resource bookmarks.

## Required Output Contract
Write file under `content/notes/*.md` with frontmatter:

```md
---
title: "..."
slug: "kebab-case-slug"
summary: "At least 8 characters"
tags: ["..."]
publishedAt: "YYYY-MM-DD"
topic: "..."
---
```

## Body Structure
- Opening paragraph with concrete thesis.
- 3 to 7 sections with practical examples.
- Final section with actionable checklist or template.

## Execution Steps
1. Define target reader and single core takeaway.
2. Draft section outline before writing body.
3. Use short paragraphs and specific examples.
4. Keep claims operational and testable.
5. Regenerate search index: `npm run build:index`.
6. Confirm only intended files changed.

## Quality Gates
- Summary explains value, not topic only.
- Each section advances the main argument.
- At least one reusable checklist/template exists.
- Tags are specific and searchable.

## Red Flags
- Generic motivational language with low technical value.
- Missing examples.
- Skipping index rebuild.

## Common Mistakes
- Writing broad commentary without repo context.
Fix: ground points in local workflows and file contracts.

- Overusing abstract AI terminology.
Fix: convert to concrete decisions and commands.
