## Context

The homepage is a personal developer dashboard with 7 widgets: clock, weather, time-progress bars, search, tasks, quick links, today's focus, and a quote. Currently they sit in a narrow 800px centered 2-column grid where most widgets (`progress`, `search`, `intention`, `quote`) span `grid-column: 1 / -1` — making the layout effectively a single-column list with a narrow two-column section for clock+weather only.

The design system (CSS tokens) is already in place from the ui-redesign change. No new dependencies are introduced.

## Goals / Non-Goals

**Goals:**
- Use the full available width (max ~1400px) on desktop
- Create clear visual hierarchy through widget sizing and zone placement
- Make the clock a dominant hero element
- Make search immediately accessible and prominent
- Group related information spatially
- Responsive 3-tier: wide desktop / tablet / mobile

**Non-Goals:**
- Adding new widgets or new JS functionality
- Changing any widget's internal markup or behaviour
- Touching any page other than `index.html` and `css/styles.css`
- Changing the navbar

## Decisions

### Decision 1: Three-zone layout with CSS Grid areas

The dashboard uses three named row zones via `grid-template-areas`:
- **top**: clock (hero) + weather + progress bars
- **main**: search (full width) + tasks + links + intention
- **bottom**: quote (full width, slim)

**Rationale**: Named areas make the intent obvious, are easy to reorder responsively via `@media`, and avoid magic `grid-column` span numbers scattered across rules.

**Alternative considered**: Nested flex/grid containers per zone — rejected because it makes responsive reordering harder and adds extra DOM wrapper elements.

### Decision 2: Clock as a hero widget, not an equal card

`#dash-widget-clock` gets explicit sizing: large monospace time display (`~4–5rem`), spanning 2 grid columns in the top zone. It is the visual anchor of the page.

**Rationale**: The clock is the most time-sensitive information and the natural first thing a user's eye should land on. Making it large communicates "this is a dashboard, not a webpage."

### Decision 3: DOM restructuring with zone wrappers

Three `<div>` wrappers are added inside `#dashboard`: `#dash-zone-top`, `#dash-zone-main`, `#dash-zone-bottom`. Each zone is itself a CSS grid.

**Rationale**: Flat grid with all 8 widgets in one `grid-template-areas` produces fragile layouts when responsive behaviour changes. Separate zone grids are independently controllable.

### Decision 4: Breakpoints — 1024px and 600px

- `≥1024px`: full multi-column layout (3-col top, 4-col main)
- `600px–1023px`: 2-column layout (zones collapse to 2 cols)
- `<600px`: single column stack

**Rationale**: 1024px is a standard tablet-landscape / small-laptop boundary. 600px is already used elsewhere in the codebase for mobile. Matches `mobile-layout` spec.

### Decision 5: Search bar spans full width in main zone

Search gets `grid-column: 1 / -1` in the main zone so it reads as the entry point before the secondary widgets below it.

**Rationale**: Search is the most action-oriented widget — full width makes it instantly scannable and avoids awkward half-width search box.

## Risks / Trade-offs

- **Risk**: Adding zone wrappers changes the DOM structure — any CSS rules targeting `.dash-widget` directly inside `#dashboard` could break. → **Mitigation**: Audit `styles.css` dashboard section during implementation; rules already use `#dash-widget-*` IDs so impact is minimal.
- **Risk**: Very wide clocks on large screens may look odd. → **Mitigation**: `max-width: 1400px` on `#dashboard` keeps it sane; `font-size` uses `clamp()` so it scales smoothly.
- **Trade-off**: Zone wrappers add 3 DOM elements. Acceptable for a personal static site.

## Migration Plan

1. Update `index.html`: add zone wrappers, move widgets into correct zones, keep all widget IDs unchanged
2. Update `css/styles.css` dashboard section: replace current flat grid rules with zone-based grid rules
3. Verify at three viewport sizes (1280px, 768px, 375px)
4. Rollback: revert both files — no data migration, no server changes
