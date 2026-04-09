---
name: quality-gate
description: Use this skill when finishing work that should not be considered done until validation has happened, especially for bug fixes, refactors, production-facing changes, or harness and workflow edits that affect repeatable execution.
---

# Quality Gate

This skill defines the minimum bar before declaring work complete.

## Gate checklist

1. Syntax or parse validation passes.
2. The changed path is consistent with surrounding repo conventions.
3. User-visible strings and labels were checked if the task touched UI or content.
4. Any claims about current behavior were verified.
5. Known residual risks are stated plainly.

## Preferred validation order

1. cheap static validation
2. targeted behavioral check
3. broader test or smoke test if warranted

## Final answer rule

Do not imply full completion if validation could not run.
State exactly what was and was not checked.
