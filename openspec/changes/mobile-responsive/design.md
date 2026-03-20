## Context

The site uses a single shared `css/styles.css` with one existing mobile breakpoint at `≤600px`. The nav is float-based (not flexbox). Tool pages (wheel, password) were built desktop-first with fixed-size canvases and multi-column panel layouts that do not adapt to narrow screens.

## Goals / Non-Goals

**Goals:**
- Nav hides on scroll-down, reappears on scroll-up (mobile only, ≤600px)
- Nav item font size and padding reduced on mobile to take less screen real estate
- Wheel canvas scales to viewport width on mobile; controls stack vertically
- Password generator tabs scroll horizontally if needed; panels stack; no horizontal overflow

**Non-Goals:**
- Full flexbox nav rewrite — keep existing float layout, adjust sizes only
- Hamburger menu — stacked full-width links (already implemented) are sufficient
- Tablet-specific layouts (601–900px) beyond what already exists

## Decisions

### Scroll-hide via JS + CSS class

**Decision:** A small scroll listener in `js/nav-scroll.js` adds/removes a `.nav-hidden` class on `<nav>`. CSS transitions handle the animation (`transform: translateY(-100%)` with `transition: transform 0.25s ease`). Only active on `≤600px` via a `matchMedia` guard so desktop nav is unaffected.

**Alternative considered:** Pure CSS `position: sticky` with scroll-linked animation — not supported without JS in a meaningful way for hide-on-down / show-on-up.

**Rationale:** Minimal JS, no framework, easy to maintain. The class toggle pattern matches how `theme.js` was added.

### Canvas scaling on wheel page

**Decision:** Set `canvas` `max-width: 100%` in CSS under the mobile breakpoint, and read `canvas.offsetWidth` to set both `canvas.width` and `canvas.height` on resize and on initial load. `drawWheel()` already uses `canvas.width/height` to derive center and radius, so no draw-logic changes needed.

**Alternative considered:** CSS `width: 100%; height: auto` on a canvas — canvas dimensions (pixel buffer) and CSS display size are separate; scaling via CSS alone distorts the bitmap. Must set the attribute.

### Password page layout

**Decision:** Under `≤600px`:
- `.pw-tabs` gets `overflow-x: auto; white-space: nowrap` so tabs scroll horizontally without wrapping (4 tabs fit ~200px each on small screens — too wide to stack)
- `.pw-panel` padding reduced
- `#pw-output-area`, `#pw-history-panel` width set to `100%` with `box-sizing: border-box`
- Range inputs get `width: 100%`
- No structural HTML changes needed

### nav-scroll.js as shared script

**Decision:** New `js/nav-scroll.js` included on every page before `</body>` alongside `theme.js`. Self-contained IIFE, no global exports needed.

## Risks / Trade-offs

- [Scroll-hide conflicts with bottom-of-page fixed footer] → Nav is at top, footer at bottom — no overlap issue.
- [Canvas resize causes brief flicker] → Acceptable; only triggers on window resize, not scroll.
- [nav-scroll.js must be added to all 7 pages] → Repetitive but straightforward; same pattern used for theme.js.

## Migration Plan

1. Add CSS changes to `css/styles.css`
2. Create `js/nav-scroll.js`
3. Add `<script src="/js/nav-scroll.js">` to all pages
4. Add canvas resize logic to `js/wheel.js`
5. Test on mobile viewport (Chrome DevTools 375px)
