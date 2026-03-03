---
name: bookmark-repo-orchestrator
description: Use when user prompts are shorthand commands like bookmark, project, or write and the agent must route work to the correct repository-specific content flow.
---

# Bookmark Repo Orchestrator

## Overview
This skill routes shorthand user commands to the correct content workflow and enforces shared quality gates.

## Routing Rules
- Intent `bookmark` -> use `bookmark-flow`
- Intent `project` -> use `project-flow`
- Intent `write` -> use `write-flow`

## Input Heuristics
- URL only + short phrase usually means `bookmark`.
- "Plan", "migration", "integration", "project" keywords usually mean `project`.
- "Guide", "note", "article", "yazi", "rehber" usually mean `write`.

## Shared Execution Contract
1. Resolve target type and destination directory.
2. Create or update one content file.
3. Run `npm run build:index`.
4. Validate changes with `git status -sb`.
5. Report changed files and next action (`commit + push` if requested).

## Decision Policy
- If ambiguity is low, proceed directly.
- If ambiguity risks wrong content type, ask one concise clarification question.
- Never block on optional metadata; infer reasonable defaults.

## Repo-Specific Constraints
- Slugs must be unique across all content types.
- Content must stay markdown-driven in `content/*`.
- Search index must reflect every content mutation.

## Red Flags
- Routing by keyword alone when user intent is explicit.
- Creating multiple content types in one request without user asking.
- Declaring completion before index rebuild.
