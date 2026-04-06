# Claude Harness to Codex Mapping

This note helps translate the upstream `revfactory/harness` model into Codex-native structures.

## Concept mapping

| Upstream concept | Codex-friendly equivalent |
|---|---|
| `.claude-plugin/plugin.json` | `.codex-plugin/plugin.json` |
| `.claude/skills/<name>/SKILL.md` | plugin or repo `skills/<name>/SKILL.md` |
| Claude agent team | coordinated `spawn_agent` usage |
| Team messaging | `send_input` plus explicit task contracts |
| `CLAUDE.md` persistent context | `AGENTS.md` or repo docs |
| Agent definition files | documented role specs and delegation prompts |

## Practical rules

1. Prefer plugin-local skills when the capability should travel with the plugin.
2. Prefer repo-local docs when the harness is project-specific.
3. Use `spawn_agent` only when the user explicitly wants delegation or when the active environment allows it as part of execution.
4. Keep the main thread responsible for integration, verification, and final explanation.

## Suggested Codex role split

- Analyst: codebase and requirements discovery
- Builder: concrete implementation
- Reviewer: regression and risk finding
- QA: targeted validation and test execution

## When not to overbuild

Do not create many role docs or many skills unless the repo will actually reuse them. A two-role harness that people can remember is better than a seven-role harness that nobody invokes.
