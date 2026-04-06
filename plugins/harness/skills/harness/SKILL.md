---
name: harness
description: Build or evolve a Codex harness for a repository or domain. Use this skill when the user asks to set up a harness, design an agent team, engineer skills for specialist agents, create orchestration structure, audit an existing harness, or port a revfactory/harness style workflow into Codex.
---

# Harness for Codex

Configure a reusable harness for the current repository. Define specialist agent roles, decide how they collaborate in Codex, and create only the artifacts that materially help future work.

## Core intent

Treat the harness as a living operating model for repeated work in this repo.

- Identify the domain, workflow shape, and verification needs.
- Prefer a small number of sharp specialist agents over a large vague team.
- Map collaboration onto Codex primitives:
  - reusable repo skills
  - agent delegation with `spawn_agent`
  - integration notes in repo docs when persistence matters
- Keep artifacts lightweight. Create files only when they improve repeated execution.

## Phase 0: Audit first

Before adding anything, inspect the current repository for existing harness signals such as:

- `AGENTS.md`
- `.agents/`
- `plugins/`
- repo-local skills
- orchestration or workflow docs

Classify the request:

- New harness: no meaningful harness structure exists
- Extension: a harness exists and needs new roles or skills
- Maintenance: audit, sync, tighten, or document an existing harness

Report the current state briefly, then proceed.

## Phase 1: Domain analysis

Understand:

- the project type and stack
- recurring task categories
- which tasks are independent versus tightly coupled
- where verification must happen

Typical task categories:

- analysis and discovery
- implementation
- review and QA
- documentation
- release or delivery support

## Phase 2: Team architecture

Choose the collaboration shape that best fits Codex.

Reference `references/codex-mapping.md` when deciding.

Recommended patterns:

- Pipeline: when output from one specialist feeds the next
- Fan-out/Fan-in: when several investigations or code slices can run in parallel
- Producer-Reviewer: when quality review is a first-class stage
- Supervisor: when central coordination is needed across multiple moving parts
- Hierarchical delegation: when a lead role decomposes a large task into bounded subtasks

Guidance:

- Default to 2-4 specialists.
- Use parallel delegation only for independent work.
- Keep the immediate blocker on the main thread when the next step depends on it.
- Prefer explorers for bounded codebase questions and workers for concrete implementation.

## Phase 3: Harness artifacts

Create the smallest useful set of artifacts for Codex. Common outputs:

- repo skill folders for repeated workflows
- a short harness section in `AGENTS.md` or another repo doc
- orchestration notes describing roles, triggers, and handoff rules

Do not recreate the Claude directory layout verbatim unless the user explicitly wants compatibility shims.

## Phase 4: Skill design

When generating repo skills:

- write a concrete `description` that strongly triggers on the right requests
- keep `SKILL.md` lean and move long detail into `references/`
- explain why choices exist, not just what to do
- design for progressive disclosure

Recommended shape:

```text
skill-name/
  SKILL.md
  references/
  scripts/
  assets/
```

## Phase 5: Orchestration

For each harness, define:

- who leads
- which roles can be delegated in parallel
- what each role must return
- what gets verified before completion

In Codex, the practical orchestration unit is:

1. main agent plans the delegation boundary
2. specialists investigate or implement
3. main agent integrates and verifies

## Phase 6: Validation

Check:

- every created skill has clear frontmatter
- triggers are specific enough to fire
- roles are not overlapping unnecessarily
- there is a defined verification path
- docs reflect the actual harness structure

## Porting notes

When adapting upstream `revfactory/harness`, preserve the intent, not the exact Claude-only mechanics.

- `.claude/skills/` maps well to repo or plugin `skills/`
- team orchestration maps to Codex delegation patterns
- `CLAUDE.md` persistence maps to `AGENTS.md` or repo-local docs
- agent definitions may be documented as role specs instead of tool-native persistent agents

Read `references/codex-mapping.md` when the user is explicitly porting from Claude harness conventions.
