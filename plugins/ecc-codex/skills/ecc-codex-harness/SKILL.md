---
name: ecc-codex-harness
description: Use this skill when the user wants Everything Claude Code style behavior in Codex, asks to port ECC into a repo, wants a Codex operating system or harness layer, or wants research-first and quality-gated execution rather than ad-hoc prompting.
---

# ECC Codex Harness

This skill ports the useful operating model of Everything Claude Code into Codex-native conventions.

Read `references/ecc-codex-mapping.md` first for platform mapping.
Read `references/operating-loop.md` when you need the exact execution loop.

## What this is

This is not a literal Claude plugin clone.

It is a Codex-native overlay that preserves ECC intent:

- research-first execution
- explicit planning before implementation
- structured delegation
- quality-gated completion
- lightweight memory capture for repeated work

## When to use

Use this skill when the user asks to:

- install or port Everything Claude Code into Codex
- use ECC style workflow in this repo
- audit a repo with an ECC-like harness
- make Codex work in a more disciplined, research-first way

## Core loop

1. Audit the repo for existing harness structure.
2. Classify the task:
   - discovery
   - implementation
   - review
   - release or handoff
3. Choose the smallest useful specialist set.
4. Do blocking work on the main thread.
5. Delegate only bounded, independent work.
6. Reconcile findings before editing.
7. Validate before calling the task done.
8. Capture reusable lessons into docs or skills only if they will help again.

## Codex-specific rules

- Prefer repo-local skills and `AGENTS.md` over Claude-only `rules/` mechanics.
- Treat `spawn_agent` as the replacement for persistent subagents.
- Treat concise repo docs as the replacement for Claude memory-heavy system layers.
- Avoid creating a large command surface unless the repo actually benefits from it.

## Deliverables for a repo port

For an ECC-to-Codex port, usually produce:

- a repo-local Codex plugin or skills layer
- a short mapping doc from Claude concepts to Codex concepts
- a quality gate checklist
- a research-first operating loop
- optional domain-specialist skills if the repo is already domain-specific

## Boundaries

- Do not copy Claude-specific hooks or commands verbatim if Codex has no direct equivalent.
- Preserve intent over syntax.
- Prefer a small, maintainable Codex layer over a large incomplete mirror of ECC.
