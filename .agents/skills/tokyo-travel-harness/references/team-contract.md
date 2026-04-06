# Tokyo Travel Team Contract

This repository uses a four-role travel planning team.

## Role responsibilities

### destination-analyst

Inputs:

- traveler profile
- time window
- trip length

Returns:

- Tokyo fit summary
- best neighborhoods or districts
- seasonal opportunities and risks
- attraction shortlist
- practical constraints

### itinerary-designer

Inputs:

- destination brief
- traveler profile

Returns:

- day-by-day route
- pacing rationale
- accommodation area recommendation
- backup options

### budget-manager

Inputs:

- itinerary draft
- style or budget preference

Returns:

- low / standard / premium cost framing
- transport, food, tickets, hotel, contingency logic
- daily budget pressure points

### local-guide

Inputs:

- itinerary draft
- budget framing

Returns:

- transit usage tips
- dining and cafe ideas
- etiquette and convenience notes
- booking warnings
- adjustment requests when the itinerary is impractical

## Handoff rules

- `destination-analyst -> itinerary-designer`: district fit, seasonality, attraction priorities
- `itinerary-designer -> budget-manager`: daily movement pattern, activity cost signals, hotel zone
- `itinerary-designer -> local-guide`: neighborhood sequence, meal windows, transit complexity
- `budget-manager -> local-guide`: payment assumptions, price sensitivity, pass recommendations
- `local-guide -> itinerary-designer`: practical corrections and crowd or reservation warnings

## Traveler-facing promise

The final plan should feel like a single well-edited travel brief, not a stitched-together set of specialist notes.
