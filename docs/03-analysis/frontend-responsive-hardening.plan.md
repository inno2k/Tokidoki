# Frontend Responsive Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Tokyo trip page reliably readable and operable across desktop, Android, iPhone, and iPad by hardening sticky layout behavior, touch/keyboard interaction, map interpretation, and mobile/tablet information density.

**Architecture:** Keep the existing static HTML/CSS/JS structure, but replace hardcoded sticky offsets with runtime-calculated CSS variables from `app.js`. Apply accessibility and interaction improvements in `styles.css`, and only add small structural hints in `index.html` where the UI needs explicit user-facing explanation such as the map legend. Preserve current visual direction while reducing platform-specific breakage.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Leaflet, JSON-backed content.

---

## File Structure

- Modify: `docs/assets/js/app.js`
  - Add runtime sticky offset calculation and resize refresh logic
  - Add map legend rendering hook and any small state wiring needed for UI clarity
- Modify: `docs/assets/css/styles.css`
  - Replace hardcoded sticky offsets with CSS variables
  - Add consistent focus-visible rules for secondary controls
  - Improve touch target sizing and mobile/tablet density handling
  - Add map legend styles and small-screen layout refinements
- Modify: `docs/index.html`
  - Add lightweight map legend container near the map UI if JS needs a stable mount point
- Verify only: `docs/responsive-qa-checklist.md`
  - Use existing checklist to record manual validation expectations; no structural rewrite required unless implementation reveals a gap

### Task 1: Lock the sticky layout strategy

**Files:**
- Modify: `docs/assets/js/app.js`
- Modify: `docs/assets/css/styles.css`

- [ ] **Step 1: Document the current sticky dependency points**

Inspect and confirm the current hardcoded offsets before changing behavior:

- `docs/assets/css/styles.css:292`
- `docs/assets/css/styles.css:1225`
- `docs/assets/css/styles.css:1286`
- `docs/assets/css/styles.css:1368`
- `docs/assets/js/app.js:255`

Expected finding:
- `content-tabs` and `section-jumpbar` use fixed `top` values
- `scroll-padding-top` is global and not synchronized to actual rendered sticky heights

- [ ] **Step 2: Add runtime CSS variable sync for sticky heights**

Implement a small helper in `docs/assets/js/app.js`:

```js
function syncStickyMetrics() {
  const root = document.documentElement;
  const tabs = document.querySelector(".content-tabs");
  const jumpbar = document.querySelector(".section-jumpbar");
  const tabsHeight = tabs?.offsetHeight || 0;
  const jumpbarHeight = jumpbar?.offsetHeight || 0;

  root.style.setProperty("--sticky-tabs-height", `${tabsHeight}px`);
  root.style.setProperty("--sticky-jumpbar-height", `${jumpbarHeight}px`);
  root.style.setProperty("--sticky-stack-offset", `${tabsHeight + jumpbarHeight}px`);
}
```

- [ ] **Step 3: Re-run sticky metric sync at the right lifecycle points**

Wire the helper in `docs/assets/js/app.js` after the UI is rendered and on resize/orientation changes:

```js
window.addEventListener("resize", syncStickyMetrics, { passive: true });
window.addEventListener("orientationchange", syncStickyMetrics);
requestAnimationFrame(syncStickyMetrics);
```

Also call it at these required points:

- immediately after the initial UI render completes
- immediately after `renderSectionJumpbar(...)`
- immediately after `setContentTab(...)`
- once after `document.fonts?.ready`

- [ ] **Step 4: Replace hardcoded sticky `top` values with CSS variables**

Update `docs/assets/css/styles.css` to use variables instead of fixed numbers:

```css
html {
  scroll-padding-top: calc(var(--sticky-stack-offset, 96px) + 28px + var(--safe-top));
}

.content-tabs {
  top: calc(10px + var(--safe-top));
}

.section-jumpbar {
  top: calc(10px + var(--safe-top) + var(--sticky-tabs-height, 74px));
}
```

Apply the same pattern inside the `900px`, `720px`, and `520px` breakpoints instead of separate hardcoded heights.

- [ ] **Step 5: Verify the sticky layout logic still parses**

Run: `node --check docs/assets/js/app.js`

Expected:
- Exit code `0`
- No syntax errors

### Task 2: Harden keyboard and touch interaction affordances

**Files:**
- Modify: `docs/assets/css/styles.css`

- [ ] **Step 1: Expand focus-visible coverage to all interactive secondary controls**

Add the same visible focus ring used for tabs to these selectors:

```css
.map-toolbar button:focus-visible,
.budget-switch button:focus-visible,
.weather-switch button:focus-visible,
.section-jumpbar button:focus-visible,
.content-tabs button:focus-visible,
.action-chip:focus-visible,
.timeline-link:focus-visible,
.map-link:focus-visible {
  outline: 3px solid rgba(210, 106, 66, 0.32);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Enforce minimum touch target sizing on mobile-first controls**

In `docs/assets/css/styles.css`, ensure buttons/chips used on mobile meet a practical minimum height:

```css
.content-tabs button,
.section-jumpbar button,
.map-toolbar button,
.budget-switch button,
.weather-switch button,
.action-chip {
  min-height: 44px;
}
```

- [ ] **Step 3: Reduce accidental crowding between links and chips in dense cards**

Increase spacing and wrapping behavior in dense interaction rows:

```css
.timeline-links,
.timeline-actions {
  row-gap: 8px;
}
```

If needed, keep `copy` buttons visually subordinate to primary links.

- [ ] **Step 4: Verify there is no selector regression**

Run: `rg -n ":focus-visible|map-toolbar button|budget-switch button|weather-switch button|min-height: 44px" docs/assets/css/styles.css`

Expected:
- New focus-visible coverage present
- Touch-target rule present

### Task 3: Make the map semantics obvious on every platform

**Files:**
- Modify: `docs/index.html`
- Modify: `docs/assets/js/app.js`
- Modify: `docs/assets/css/styles.css`

- [ ] **Step 1: Add a stable legend mount point near the map**

Insert a small container near the map controls in `docs/index.html`:

```html
<div class="map-legend" id="map-legend" aria-label="지도 범례"></div>
```

Place it near `map-toolbar` / `trip-map` so users see it before interacting with the map.

- [ ] **Step 2: Render a two-state legend from JavaScript**

Add a lightweight render helper in `docs/assets/js/app.js`:

```js
function renderMapLegend() {
  const root = document.getElementById("map-legend");
  if (!root) return;
  root.innerHTML = `
    <span class="map-legend-item"><span class="map-line-sample map-line-core"></span><span class="map-dot map-dot-core"></span>메인 동선</span>
    <span class="map-legend-item"><span class="map-dot map-dot-optional"></span>선택형 보조 포인트</span>
  `;
}
```

Call it from `renderMaps(data)` or `initMap(data)`.

- [ ] **Step 3: Add legend styles with clear contrast**

In `docs/assets/css/styles.css`, add:

```css
.map-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0 14px;
}

.map-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.88rem;
}

.map-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.map-line-sample {
  width: 18px;
  height: 0;
  border-top: 3px dashed #3c5d53;
}

.map-dot-core {
  background: var(--matcha);
  box-shadow: 0 0 0 2px rgba(148, 65, 35, 0.22);
}

.map-dot-optional {
  background: #f1c7df;
  box-shadow: 0 0 0 2px #7a5674;
}
```

- [ ] **Step 4: Verify the map UI hooks still connect**

Run: `rg -n "map-legend|renderMapLegend|drawMapPoints\\(" docs/index.html docs/assets/js/app.js docs/assets/css/styles.css`

Expected:
- Legend container present in HTML
- Legend render helper present in JS
- Legend styling present in CSS

### Task 4: Reduce mobile and tablet information overload without losing content

**Files:**
- Modify: `docs/assets/css/styles.css`

- [ ] **Step 1: Strengthen content hierarchy inside dense cards**

Adjust visual weight so “meta” reads lighter than “decision content”:

```css
.timeline-meta span {
  background: rgba(33, 48, 41, 0.05);
  color: var(--muted);
}

.support-box.support-strong {
  background: rgba(111, 140, 97, 0.08);
  border-color: rgba(111, 140, 97, 0.18);
}
```

- [ ] **Step 2: Make mobile cards less visually noisy**

Inside the `720px` and `520px` breakpoints, reduce simultaneous emphasis:

```css
@media (max-width: 720px) {
  .timeline-links {
    margin-top: 6px;
  }

  .timeline-meta {
    row-gap: 6px;
  }

  .support-box {
    padding: 12px;
  }
}
```

- [ ] **Step 3: Keep tablet layouts readable instead of merely compressed**

In the `900px` and `1100px` ranges, make sure mixed two-column zones do not create overlong dense cards:

```css
@media (max-width: 1100px) {
  .ops-grid,
  .guide-grid,
  .itinerary-grid {
    align-items: start;
  }
}
```

If one card type still dominates height, prefer collapsing that grid to a single column earlier.

- [ ] **Step 4: Verify responsive rules exist in all target breakpoints**

Run: `rg -n "@media \\(max-width: 1100px\\)|@media \\(max-width: 900px\\)|@media \\(max-width: 720px\\)|@media \\(max-width: 520px\\)|support-strong|timeline-meta span" docs/assets/css/styles.css`

Expected:
- All four breakpoint bands present
- Updated hierarchy styles present

### Task 5: Run final cross-platform verification

**Files:**
- Verify: `docs/assets/js/app.js`
- Verify: `docs/assets/css/styles.css`
- Verify: `docs/index.html`
- Review against: `docs/responsive-qa-checklist.md`

- [ ] **Step 1: Run syntax verification**

Run: `node --check docs/assets/js/app.js`

Expected:
- Exit code `0`

- [ ] **Step 2: Run structural verification for sticky and legend hooks**

Run:

```powershell
@'
const fs = require('fs');
const html = fs.readFileSync('docs/index.html','utf8');
const css = fs.readFileSync('docs/assets/css/styles.css','utf8');
const js = fs.readFileSync('docs/assets/js/app.js','utf8');
console.log(JSON.stringify({
  hasLegendMount: html.includes('id="map-legend"'),
  hasStickyVars: css.includes('--sticky-tabs-height') && css.includes('--sticky-stack-offset'),
  hasStickySync: js.includes('syncStickyMetrics'),
  hasLegendRender: js.includes('renderMapLegend'),
  hasFocusCoverage: css.includes('.map-toolbar button:focus-visible') && css.includes('.budget-switch button:focus-visible') && css.includes('.weather-switch button:focus-visible')
}, null, 2));
'@ | node -
```

Expected:
- All booleans `true`

- [ ] **Step 3: Run manual QA checklist against target environments**

Use `docs/responsive-qa-checklist.md` and re-check these target conditions:

- Desktop: sticky stack, map legend visibility, keyboard focus visibility
- Android portrait: horizontal tab scroll, button tap comfort, no jumpbar overlap
- iPhone portrait: safe-area spacing, sticky stack alignment, chip/link tap targets
- iPad portrait and landscape: sticky behavior, map controls, dense card readability

Expected:
- No blocking overlap or unreachable controls
- Any remaining issue must be recorded as `NEED REAL DEVICE`

Treat these as blocking failures:

- sticky overlap between tab bar and jumpbar
- sideways page scrolling on target mobile viewports
- controls that cannot be comfortably tapped or focused
- map presentation that still implies optional points are mandatory route stops

Treat these as non-blocking / `NEED REAL DEVICE`:

- Safari-specific scroll feel
- font rendering differences across engines
- minor hover/active nuance differences on desktop browsers

- [ ] **Step 4: Summarize verification evidence before claiming completion**

Capture:
- commands run
- structural checks passed
- any remaining real-device-only risk

---

## Spec Coverage Self-Review

- Covered sticky stability across desktop, Android, iPhone, and iPad: **yes** (`Task 1`, `Task 5`)
- Covered keyboard/touch operability for secondary controls: **yes** (`Task 2`)
- Covered map semantics clarity: **yes** (`Task 3`)
- Covered mobile/tablet information density tuning: **yes** (`Task 4`)
- Covered explicit validation steps: **yes** (`Task 5`)

## Placeholder Scan

- No `TODO` / `TBD` placeholders remain.
- All modified files are explicitly named.
- Every task has concrete verification commands or concrete CSS/JS targets.

## Type / Naming Consistency Check

- Sticky helper name is consistently `syncStickyMetrics`
- Map legend helper name is consistently `renderMapLegend`
- CSS variable names are consistently `--sticky-tabs-height`, `--sticky-jumpbar-height`, `--sticky-stack-offset`

## Execution Handoff

Plan complete and saved to `docs/03-analysis/frontend-responsive-hardening.plan.md`.

Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session in order with verification checkpoints
