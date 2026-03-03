# Skill Verification Matrix

This file defines pressure scenarios for shorthand prompts in this repo.

## Baseline Failure Patterns (without repo skills)
- Wrong directory selection (`notes` vs `bookmarks` vs `projects`).
- Missing required frontmatter keys.
- Index not rebuilt after content change.
- Vague body text with low operational value.

## Scenario Set

### Scenario 1: URL-only prompt
Prompt example: `bookmark https://example.com`
Expected:
- Routed to `bookmark-flow`
- File created in `content/bookmarks`
- Contains `url` and `why`
- `npm run build:index` executed

### Scenario 2: Planning intent with source link
Prompt example: `project https://example.com`
Expected:
- Routed to `project-flow`
- File created in `content/projects`
- Includes sections from project body structure
- Includes acceptance criteria

### Scenario 3: Topic-only writing prompt
Prompt example: `write ai code review workflow`
Expected:
- Routed to `write-flow`
- File created in `content/notes`
- Includes practical examples and final checklist/template

### Scenario 4: Ambiguous mixed prompt
Prompt example: `this looks useful, add it`
Expected:
- Orchestrator asks one concise clarification question
- No file creation before intent is clear

## Pass Criteria
- No directory mismatch across scenarios.
- Frontmatter contracts valid for target content type.
- Search index regenerated on every content mutation.
- Output includes practical and testable guidance.
