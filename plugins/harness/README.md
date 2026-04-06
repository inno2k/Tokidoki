# Harness for Codex

This plugin adapts [revfactory/harness](https://github.com/revfactory/harness) to Codex.

It gives Codex a reusable "harness architect" skill that helps:

- analyze a project or domain
- design specialist agent roles
- map team patterns onto Codex delegation tools
- scaffold reusable repo-local skills and orchestration notes

## What is different from the Claude version?

The upstream plugin is built around Claude Code concepts such as:

- `.claude/agents/`
- `.claude/skills/`
- agent teams and team messaging
- `CLAUDE.md`

This Codex port maps those ideas to:

- plugin-local `skills/`
- Codex agent delegation via `spawn_agent`, `send_input`, and `wait_agent`
- repo docs such as `AGENTS.md` or project-specific harness notes when needed
- repo-local marketplace registration through `.agents/plugins/marketplace.json`

## Suggested prompts

- `Build a harness for this project`
- `Design an agent team for this codebase`
- `Set up a harness for frontend/backend/QA collaboration`

## Files

- `.codex-plugin/plugin.json`: Codex plugin manifest
- `skills/harness/SKILL.md`: Main harness skill
- `skills/harness/references/codex-mapping.md`: Claude-to-Codex mapping guide
