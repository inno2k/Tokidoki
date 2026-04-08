# Tokyo Travel Team Contract

This repository uses an eight-role travel planning team.

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

### attraction-agent

Inputs:

- itinerary draft
- traveler interests
- child energy profile

Returns:

- short refresh-stop candidates
- gacha, arcade, and indoor play insertions
- stop duration guidance
- route-safe alternatives

### reservation-concierge

Inputs:

- itinerary draft
- attraction shortlist
- restaurant shortlist

Returns:

- reservation deadlines
- timed-entry and opening-hour risks
- must-book vs walk-in classification
- departure-week recheck list

### family-comfort-agent

Inputs:

- itinerary draft
- traveler ages
- pace preference

Returns:

- snack and rest timing
- restroom and indoor fallback logic
- fatigue-risk flags
- child-friendly substitutions

### memory-curator

Inputs:

- itinerary draft
- lived-history context

Returns:

- then-vs-now walk prompts
- family conversation cues
- photo reenactment ideas
- emotional anchor moments

## Handoff rules

- `destination-analyst -> itinerary-designer`: district fit, seasonality, attraction priorities
- `itinerary-designer -> budget-manager`: daily movement pattern, activity cost signals, hotel zone
- `itinerary-designer -> local-guide`: neighborhood sequence, meal windows, transit complexity
- `budget-manager -> local-guide`: payment assumptions, price sensitivity, pass recommendations
- `local-guide -> itinerary-designer`: practical corrections and crowd or reservation warnings
- `itinerary-designer -> attraction-agent`: where short reset stops fit without breaking pacing
- `reservation-concierge -> itinerary-designer`: what must be timed, reserved, or rechecked
- `family-comfort-agent -> itinerary-designer`: where rest, snacks, or indoor backup should be added
- `memory-curator -> main agent`: emotional and family narrative beats for the final presentation

## Traveler-facing promise

The final plan should feel like a single well-edited travel brief, not a stitched-together set of specialist notes.
