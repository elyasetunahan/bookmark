# Bookmark Repo Skills

These skills standardize shorthand content operations in this repository.

## Skills
- `bookmark-flow`: Add or update entries in `content/bookmarks`.
- `project-flow`: Add or update entries in `content/projects`.
- `write-flow`: Add or update entries in `content/notes`.
- `bookmark-repo-orchestrator`: Route shorthand prompts (`bookmark`, `project`, `write`) to the right flow.

## Suggested Use Order
1. Load `bookmark-repo-orchestrator` for intent routing.
2. Load one target flow skill (`bookmark-flow`, `project-flow`, or `write-flow`).
3. Execute content change and run `npm run build:index`.

## Example Triggers
- `bookmark https://example.com`
- `project https://example.com migrate plan`
- `write codex workflow guide`

## Verification
- See `/Users/elyase/works/bookmark/docs/skills/verification.md` for pressure scenarios and pass criteria.
