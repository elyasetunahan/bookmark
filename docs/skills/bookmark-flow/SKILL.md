---
name: bookmark-flow
description: Use when a user asks to add or update a bookmark entry in this repository, especially when only a URL or short context is provided.
---

# Bookmark Flow

## Overview
This skill standardizes bookmark creation for this repo so output is valid on first run and searchable immediately.

## When to Use
- User says `bookmark` and gives a URL.
- User asks to update an existing bookmark note or metadata.
- User wants a concise insight note attached to a resource.

Do not use for long-form writing (`content/notes`) or delivery plans (`content/projects`).

## Required Output Contract
Write file under `content/bookmarks/*.md` with this frontmatter:

```md
---
title: "..."
slug: "kebab-case-slug"
summary: "At least 8 characters"
tags: ["tag-1", "tag-2"]
publishedAt: "YYYY-MM-DD"
url: "https://..."
why: "Why this matters"
---
```

Body requirement:
- 1 short intro paragraph
- 3 practical usage bullets

## Execution Steps
1. Derive a stable title from source name.
2. Generate unique kebab-case slug.
3. Write summary with concrete value, not generic praise.
4. Select 3 to 6 lowercase tags.
5. Set `publishedAt` to current date.
6. Write `why` as practical utility statement.
7. Add concise body with actionable bullets.
8. Run `npm run build:index`.
9. Check `git status -sb` and confirm touched files.

## Quality Gates
- `slug` matches `^[a-z0-9-]+$`.
- `summary` length >= 8.
- `tags` non-empty and lowercase.
- URL is valid and reachable in principle.
- Search index rebuilt after edit.

## Red Flags
- Writing to `content/notes` or `content/projects` by mistake.
- Skipping `why` and leaving only raw URL metadata.
- Forgetting `npm run build:index`.

## Common Mistakes
- Duplicate slug across content types.
Fix: run a slug search before finalizing.

- Overly broad tags like `tech` only.
Fix: use topic + domain + intent tags.
