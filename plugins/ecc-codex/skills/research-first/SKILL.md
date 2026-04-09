---
name: research-first
description: Use this skill when the task would benefit from explicit discovery before editing, such as unclear code paths, unstable external dependencies, architectural uncertainty, or high-risk changes where implementation should follow evidence rather than guesswork.
---

# Research First

Use this skill to force a discovery pass before making changes.

## Workflow

1. State the question you need answered before implementation.
2. Inspect the minimum set of files or docs needed.
3. Summarize what is confirmed versus inferred.
4. Only then edit code or content.

## Use when

- the code path is unclear
- multiple implementation directions exist
- the task depends on current behavior
- a regression risk is non-trivial

## Output shape

Before editing, produce:

- current behavior
- constraints
- chosen implementation direction
- what still needs verification
