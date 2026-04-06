---
name: tokyo-travel-harness
description: Orchestrate a specialist Codex team for Tokyo trip planning. Use when the user wants a Tokyo itinerary, budget-aware travel plan, neighborhood recommendation, or a collaborative AI-designed Tokyo tour similar to a specialist travel-planner team.
---

# Tokyo Travel Harness

Use this skill to coordinate a Tokyo travel planning workflow across four specialist roles:

- `destination-analyst`
- `itinerary-designer`
- `budget-manager`
- `local-guide`

Read `references/team-contract.md` before substantial planning work.

## When to use

Trigger on requests such as:

- build a Tokyo trip
- design a Tokyo itinerary
- recommend a Tokyo route with budget
- create a Tokyo tourism plan with local guidance

## Workflow

1. Clarify or infer the traveler profile:
   - dates or season
   - trip length
   - budget level
   - pace
   - interests
   - lodging preference
   - departure airport or country when relevant
2. Ask only the minimum necessary questions. If missing details are non-critical, make reasonable assumptions and state them.
3. Produce or request specialist outputs in this order:
   - destination brief
   - itinerary draft
   - budget model
   - local practical guide
4. Reconcile conflicts before the final answer.
5. Present one integrated travel plan instead of four disconnected reports.

## Output contract

A strong final answer usually contains:

- trip concept
- assumptions
- neighborhood and hotel-area recommendation
- daily itinerary
- budget summary
- local transit and food tips
- cautions and recheck items

## Research rules

- If the answer depends on current openings, prices, visa rules, transit disruptions, or seasonal events, browse to verify.
- Use exact dates when the user gives relative timing that could be ambiguous.
- Call out what is verified versus what is inferred.

## Style rules

- Optimize for usable, realistic plans over exhaustive lists.
- Prefer coherent neighborhood clusters.
- Keep 2-4 key activities per day for a relaxed cultural trip unless the user explicitly wants a dense itinerary.
- Include backup logic for weather or fatigue on multi-day trips.
