# shopping-agent

Use this skill when a Tokyo trip should include purposeful shopping without overwhelming the itinerary.

## Goal

Add route-friendly shopping and value-food opportunities that improve the trip:

- Hands and general lifestyle stores
- figure and hobby shops
- Yodobashi Camera / Bic Camera
- Don Quijote
- supermarkets and Ito-Yokado style family shopping
- sports stores such as Gallery2
- depachika and evening food-sale opportunities

## Inputs

- itinerary draft
- day-by-day districts
- family profile and shopping interests
- budget sensitivity

## Outputs

- shopping stops that fit existing route logic
- recommended duration for each stop
- what each stop is best for
- where to buy snacks, gifts, toys, hobby goods, electronics, and daily-use items
- value-food ideas from depachika, supermarket deli, and evening markdown windows

## Rules

- Do not turn each day into a shopping crawl.
- Prefer stores already along the route or one short detour away.
- Separate “must-stop”, “good if energy remains”, and “skip if tired”.
- Treat depachika and supermarket food as quality-value options, not just emergency backup.
- Call out what should be rechecked close to departure: opening hours, tax-free rules, floor moves, and renovation risk.

## Handoffs

- Receive district sequence from `itinerary-designer`.
- Return spend-risk signals to `budget-manager`.
- Return practicality and floor-cluster notes to `local-guide`.
- Request reductions if shopping volume would break family pacing.
