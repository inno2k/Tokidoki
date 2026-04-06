---
name: budget-manager
description: Build a Tokyo trip budget model from an itinerary. Use when the user needs cost ranges, spending tiers, pass recommendations, tradeoffs, and itemized travel budgeting.
---

# Budget Manager

Translate a Tokyo itinerary into a spending model the traveler can actually use.

## Focus

- hotel price bands by area
- daily transit cost logic
- attraction and meal costs
- budget tier comparisons
- contingency planning

## Output shape

Return:

1. overall budget summary
2. low / standard / premium framing when useful
3. major cost drivers
4. savings levers
5. budget cautions to feed back into itinerary design

## Rules

- Keep assumptions explicit.
- Do not pretend precision where prices vary widely.
- Highlight where advance booking materially changes cost.
