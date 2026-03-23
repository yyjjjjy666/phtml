## 1. CSS — Replace flat grid with zone-based layout

- [x] 1.1 Replace `#dashboard` rules: remove `max-width: 800px` and `grid-template-columns: 1fr 1fr`; set `max-width: 1400px`, `width: 100%`, `display: flex`, `flex-direction: column`, `gap: var(--sp-4)`, centered with `margin-inline: auto`
- [x] 1.2 Remove the `#dash-widget-progress, #dash-widget-search, #dash-widget-intention, #dash-widget-quote { grid-column: 1 / -1; }` rule (no longer applicable)
- [x] 1.3 Add `#dash-zone-top` grid: `display: grid; grid-template-columns: 2fr 1fr 2fr; gap: var(--sp-3);` so clock spans the left two visual columns, weather is center, progress is right
- [x] 1.4 Add `#dash-zone-main` grid: `display: grid; grid-template-columns: 1fr; gap: var(--sp-3);` with search as a full-width first row, then a nested `grid-template-columns: 1fr 1fr 1fr` sub-row for tasks, links, and intention — use `#dash-widget-search { grid-column: 1 / -1; }` on the outer zone-main grid and wrap tasks+links+intention in a `#dash-zone-main-bottom` 3-col grid
- [x] 1.5 Add `#dash-zone-bottom` as a full-width slim container: `display: block; padding: var(--sp-3) var(--sp-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius);` — quote inside gets no border/background of its own
- [x] 1.6 Remove `.dash-widget` border/background from `#dash-widget-quote` inside zone-bottom so it inherits zone styling
- [x] 1.7 Upgrade clock hero: change `#dash-time` font-size to `clamp(2.5rem, 5vw, 4.5rem)`; set `#dash-widget-clock` min-height to match zone height; add `display: flex; flex-direction: column; justify-content: center;`

## 2. CSS — Responsive breakpoints

- [x] 2.1 Add tablet breakpoint `@media (max-width: 1023px)`: collapse `#dash-zone-top` to `grid-template-columns: 1fr 1fr`, collapse `#dash-zone-main-bottom` to `grid-template-columns: 1fr 1fr`
- [x] 2.2 Update mobile breakpoint `@media (max-width: 599px)`: collapse `#dash-zone-top`, `#dash-zone-main`, `#dash-zone-main-bottom` all to `grid-template-columns: 1fr`; remove existing `#dashboard { grid-template-columns: 1fr; }` (replaced by zone rules)

## 3. HTML — Add zone wrappers to index.html

- [x] 3.1 Wrap `#dash-widget-clock`, `#dash-widget-weather`, and `#dash-widget-progress` in `<div id="dash-zone-top">`
- [x] 3.2 Inside `#dash-zone-main`: place `#dash-widget-search` first (full-width), then wrap `#dash-widget-tasks`, `#dash-widget-links`, and `#dash-widget-intention` in `<div id="dash-zone-main-bottom">`; wrap all of the above in `<div id="dash-zone-main">`
- [x] 3.3 Wrap `#dash-widget-quote` in `<div id="dash-zone-bottom">`
