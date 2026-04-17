# Responsive UI QA Checklist

## Scope

- Target page: `docs/index.html`
- Target browsers:
- `iPhone Safari` portrait
- `iPad Safari` portrait and landscape
- `Android Chrome` portrait
- `Desktop Chrome / Edge / Safari / Firefox`

## Common Checks

- Page loads without broken layout or overlapping sticky bars.
- Hero title and summary wrap naturally without clipping.
- Top tabs are fully reachable and horizontally scroll when needed.
- Section jumpbar remains usable after switching tabs.
- No horizontal page scroll appears on first load.
- Long Korean or English labels wrap without overflowing cards.
- All buttons and chips remain tappable without accidental double zoom.
- Map area stays visible and does not collapse.
- Links open correctly and copy buttons remain visible.

## iPhone Safari Portrait

- Safe area at top and bottom is respected on notch devices.
- Top tab bar does not hide behind the status bar.
- Hero card stacks correctly into one column.
- Budget, weather, and map buttons remain full-width and readable.
- Timeline links and action chips stack vertically without clipping.
- Sticky tab bar does not jitter while scrolling.
- Festival, food, and shopping cards do not overflow sideways.
- Map height remains usable after orientation lock in portrait.

## iPad Safari

- Portrait mode shows two-column cards where intended and does not create cramped text blocks.
- Landscape mode keeps sticky tab bar and section jumpbar aligned.
- No excessive blur/performance drop while scrolling long pages.
- Map stays responsive and does not trap scroll unexpectedly.
- Budget panel two-column layout remains readable.

## Android Chrome Portrait

- Tab bar horizontal scrolling is smooth.
- Sticky elements do not overlap the hero or section headings.
- Hero title line breaks stay balanced.
- Day cards, meal cards, and festival cards stack cleanly.
- Map and external links remain tappable without zoom issues.

## Desktop

- Full-width layout remains centered without overly wide text lines.
- Hero and overview cards keep intended multi-column layout.
- Hover states appear on tabs, chips, and links.
- Festival, budget, and shopping grids maintain consistent spacing.
- Map and side cards align correctly in explore tab.

## Menu-by-Menu Checks

- `개요`: hero, team cards, comms, photos all render.
- `일정`: Day 1~5 cards, weather variants, timeline links all render.
- `운영`: 준비, 회복, 추억, 날씨, 후지큐 cards all render.
- `탐색`: options, map, guide cards all render and map controls work.
- `축제`: all festival cards render with date, place, access, links.
- `예산`: 절약, 균형, 여유 switch works and detail groups render.
- `식사 전략`: 추억 음식, 검증 후보, 장르 카드, Day meal plans, 가성비 카드 all render.
- `쇼핑`: 카테고리 카드와 Day별 운영 카드 모두 render.
- `검증`: source cards and recheck note render.

## Manual Result Template

- Device / Browser:
- Orientation:
- Page load:
- Tabs:
- Sticky bars:
- Card layout:
- Map:
- Links / copy buttons:
- Issues found:
- Screenshots captured:

## Execution Matrix

| Environment | Orientation | Status | Notes |
|---|---|---|---|
| iPhone Safari | Portrait | FIXED | Mobile hero overflow reproduced in representative viewport render, then fixed by correcting `.page-shell` width math and reducing mobile hero type size. Final capture: `docs/qa-artifacts/iphone-portrait-final.png` |
| iPad Safari | Portrait | PASS | Representative tablet portrait render shows stable hero, sticky bars, and card spacing. Capture: `docs/qa-artifacts/ipad-portrait-fixed.png` |
| iPad Safari | Landscape | NEED REAL DEVICE | Real Safari landscape scrolling, sticky overlap, and map touch behavior still need direct device verification |
| Android Chrome | Portrait | FIXED | Same mobile hero overflow was visible in representative portrait render and was resolved after the CSS fix. Final capture: `docs/qa-artifacts/android-portrait-final.png` |
| Desktop Chrome | Landscape | PASS | Desktop representative render shows centered layout, stable grids, and no obvious clipping. Capture: `docs/qa-artifacts/desktop-fixed.png` |
| Desktop Safari | Landscape | NEED REAL DEVICE | Safari-specific font loading, sticky behavior, and hover states still need direct browser verification |
| Desktop Firefox | Landscape | NEED REAL DEVICE | Firefox-specific wrapping, sticky offsets, and map layout still need direct browser verification |

## Pre-Check Result

These items were verified from current code and structure before real-device testing.

| Check | Result | Notes |
|---|---|---|
| Viewport safe area support | PASS | `viewport-fit=cover` and safe-area CSS vars applied |
| Sticky offset protection | PASS | `scroll-padding-top` and sticky top offsets applied |
| Tab/panel structure | PASS | Top tabs and panels match 1:1 |
| Horizontal overflow guard | PASS | `overflow-wrap:anywhere` and media max-width guards applied |
| Touch scrolling for tab bars | PASS | `-webkit-overflow-scrolling: touch` applied |
| Mobile breakpoints | PASS | `900 / 720 / 520` breakpoints present |
| iOS visual fallback | PASS | blur/fixed effects reduced for WebKit touch environments |
| JS syntax | PASS | `node --check docs/assets/js/app.js` |
| JSON validity | PASS | trip data parses successfully |

## High-Priority Real Device Checks

1. On `iPhone Safari portrait`, confirm top tabs can scroll horizontally without accidental page jitter.
2. On `iPhone Safari portrait`, switch through every top menu and confirm no card causes sideways page scrolling.
3. On `iPad Safari portrait/landscape`, confirm sticky tab bar and section jumpbar do not overlap section headings.
4. On `Android Chrome portrait`, confirm `festival`, `budget`, and `food` cards wrap cleanly with long Korean/English text.
5. On desktop, confirm `explore` map + side cards stay aligned and no tab panel leaves empty broken space.

## Recorded Result

### PASS

- Pre-check structure validation passed: tab/panel mapping, render roots, JSON parsing, and JS syntax.
- Representative iPad portrait render passed for initial layout stability and readable spacing.
- Representative desktop render passed for overall layout width, hero composition, and section grid alignment.

### FIXED

- Mobile hero overflow was reproduced in narrow portrait renders.
- Root cause 1: invalid mobile `.page-shell` width expressions such as `min(100% - 24px, 1200px)` were being ignored by the browser.
- Root cause 2: hero title and meta type remained too aggressive for narrow widths.
- Fix applied in [styles.css](/D:/GitHub/Tokidoki/docs/assets/css/styles.css#L405), [styles.css](/D:/GitHub/Tokidoki/docs/assets/css/styles.css#L1123), and [styles.css](/D:/GitHub/Tokidoki/docs/assets/css/styles.css#L1261).
- Revalidated with representative captures: [iphone-portrait-final.png](/D:/GitHub/Tokidoki/docs/qa-artifacts/iphone-portrait-final.png) and [android-portrait-final.png](/D:/GitHub/Tokidoki/docs/qa-artifacts/android-portrait-final.png).

### NEED REAL DEVICE

- iPhone Safari real scrolling feel, notch safe-area behavior, and tab bar jitter need direct device confirmation.
- iPad Safari landscape sticky offsets and map touch/scroll interaction need direct device confirmation.
- Desktop Safari and Firefox still need engine-specific verification for font rendering, wrapping, hover, and sticky behavior.
