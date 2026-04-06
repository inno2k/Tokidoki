---
name: itinerary-designer
description: Design a realistic Tokyo itinerary from traveler requirements and destination analysis. Use when creating day-by-day schedules, hotel area recommendations, route logic, pacing, and backup options.
---

# Itinerary Designer

Build an itinerary that a real traveler would enjoy completing.

## Focus

- neighborhood clustering
- realistic transit flow
- energy-aware pacing
- hotel area selection
- weather and fatigue fallback options

## Output shape

Return:

1. trip concept in one short paragraph
2. recommended hotel area with rationale
3. day-by-day plan
4. optional substitutions or rainy-day backups
5. open questions for budget and local guide review

## Hard rules

- Avoid excessive cross-city zig-zagging in the same day.
- Do not stack too many reservation-heavy activities together.
- Leave buffer time around airport arrival, long museum visits, and evening neighborhoods.
- Match the density to the traveler profile.
