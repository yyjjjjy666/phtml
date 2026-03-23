## Why

The homepage dashboard widgets all exist and function correctly, but the layout is a narrow 800px two-column grid that wastes horizontal space on wide screens and doesn't communicate visual hierarchy — everything is treated as equal. The page feels like a list of cards rather than a developer dashboard.

## What Changes

- Expand `#dashboard` to use the full available width (up to ~1400px) with a true multi-column grid
- Reorganise widgets into three visual zones: **top strip** (clock, weather, time-progress), **main area** (search, tasks, quick links, today's focus), **lower strip** (quote)
- Make the clock widget a dominant hero element (large time display) rather than a small card
- Search bar promoted to full-width spanning across the top of the main area for instant access
- Tasks and quick links side-by-side on desktop so the right half of the screen is used
- Quote demoted to a slim bottom band — decorative, not primary
- Responsive breakpoints: 4-col desktop (≥1024px) → 2-col tablet (≥600px) → 1-col mobile
- No new widgets added; no JS logic changes — pure layout and HTML structure refactor

## Capabilities

### New Capabilities

_(none — all widgets already exist)_

### Modified Capabilities

- `homepage-dashboard`: layout requirements change — grid column count, widget placement zones, breakpoints, and clock widget sizing are all spec-level changes
- `mobile-layout`: breakpoint for dashboard collapse changes from 2-col → 1-col at 600px (existing) to match the new 3-tier responsive system (≥1024px / ≥600px / <600px)

## Impact

- `index.html` — HTML restructuring to add zone wrapper divs and rearrange widget order in DOM
- `css/styles.css` — dashboard section rewritten; clock widget gets hero sizing; new zone layout classes
- No JS files changed
- No other pages affected
