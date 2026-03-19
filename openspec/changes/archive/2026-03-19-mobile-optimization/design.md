## Context

The site is a static HTML/CSS/JS site with a single stylesheet (`css/styles.css`). Currently there are no media queries. The navbar uses `float: left` for horizontal layout, the gallery uses a fixed 3-column CSS grid, and the visitor-info footer is fixed at the bottom. All pages include `<meta name="viewport">` already.

## Goals / Non-Goals

**Goals:**
- Responsive navbar that stacks vertically on small screens (≤600px)
- Gallery grid collapses to 1 column on mobile, 2 columns on tablet
- Body font size reduced slightly on mobile for readability
- Footer content wraps or stacks gracefully on narrow viewports
- Sufficient bottom padding on `<main>` to avoid footer overlap on mobile

**Non-Goals:**
- Touch-specific interactions (swipe, pinch-zoom)
- Progressive Web App (PWA) features
- Server-side changes

## Decisions

**Single breakpoint strategy**: Use two breakpoints — `600px` (mobile) and `900px` (tablet) — applied via `@media (max-width: ...)` in `css/styles.css`. This keeps all styles in one file and avoids separate mobile stylesheets.

**Navbar stacking**: On ≤600px, `.navbar li` switches from `float: left` to `display: block` (full width). This is the simplest approach without JavaScript.

**Gallery columns**: `column-count` is overridden to `1` at ≤600px and `2` at ≤900px via media queries.

**Footer wrapping**: `#visitor-footer` flex container gets `flex-wrap: wrap` and reduced `gap` on mobile so spans wrap rather than overflow.

## Risks / Trade-offs

- [Float-based navbar] → Floats are legacy; acceptable here since the site already uses them and a full rewrite is out of scope.
- [Fixed footer height] → If the footer wraps to two lines on very small screens, `<main>` padding-bottom may need to be larger. Mitigation: set `padding-bottom: 60px` on mobile.
