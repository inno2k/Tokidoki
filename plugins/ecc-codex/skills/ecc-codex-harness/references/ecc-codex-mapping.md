# ECC to Codex Mapping

Use this file when adapting Everything Claude Code concepts into Codex.

## Concept mapping

- `.claude-plugin/`
  maps to
  `.codex-plugin/`

- Claude plugin marketplace commands
  map to
  repo-local Codex marketplace registration in `.agents/plugins/marketplace.json`

- Claude `agents/`
  map to
  Codex delegation patterns and role specs in skills or `AGENTS.md`

- Claude `skills/`
  map to
  Codex `skills/` directly

- Claude `rules/`
  map to
  `AGENTS.md`, concise references, and explicit quality gate skills

- Claude `hooks/`
  map to
  lighter Codex operating conventions, checklists, and optional scripts where truly needed

- Claude slash commands
  map to
  prompt triggers plus focused skills

## Porting priorities

Port these first:

1. research-first workflow
2. quality gates
3. specialist role architecture
4. concise reusable skills
5. lightweight memory or lessons-captured flow

Port these selectively:

1. command catalog
2. runtime scripts
3. project rules

Do not force-port these unless there is a clear Codex benefit:

1. large hook systems
2. Claude-only command syntax
3. broad always-on rule packs

## Success criteria

A good Codex port should:

- feel native to Codex
- reduce ambiguity during execution
- improve verification discipline
- avoid excessive file sprawl
- stay understandable for teammates
