## Context

Static site (GitHub Pages), no build tooling, single `css/styles.css`, vanilla JS. Current stylesheet is ~1400 lines of ad-hoc rules. Recent additions (dashboard, wiki markdown, command palette, search) each appended their own styles without a shared token layer. The result is inconsistent spacing, mixed color values, and no systematic typography. The redesign must replace the entire stylesheet while keeping all existing JS logic intact.

## Goals / Non-Goals

**Goals:**
- Define a CSS custom-property token layer as the single source of truth for color, typography, spacing, borders, and shadows
- Apply the dark-primary / light-override theme pattern consistently via `[data-theme]` attribute (already in use)
- Redesign navbar with fixed positioning, slide-in mobile drawer
- Upgrade fonts to JetBrains Mono + Inter via Google Fonts
- Add Prism.js syntax highlighting to wiki code blocks
- Replace every hardcoded color/size with a token reference

**Non-Goals:**
- Changing any JS logic (dashboard, tools, wiki, search, command palette)
- Migrating to a CSS framework (Tailwind, Bootstrap, etc.)
- Adding a build step or bundler
- Redesigning page content/layouts (adding new sections, moving widgets)

## Decisions

### 1. Token architecture: flat tokens vs semantic tokens

**Decision:** Two-layer system — primitive tokens (raw values) defined once, semantic tokens (purpose-named) that reference primitives. Semantic tokens are what components use.

```css
:root {
  /* Primitives */
  --color-cyan-400: #00d4ff;
  --color-green-400: #00ff88;
  --space-4: 16px;

  /* Semantic */
  --color-accent: var(--color-cyan-400);
  --color-bg: #0d0d0d;
  --color-text: #e8e8e8;
  --space-content: var(--space-4);
}
[data-theme="light"] {
  --color-accent: #0099cc;
  --color-bg: #f4f4f0;
  --color-text: #1a1a1a;
}
```

**Rationale:** Components reference `--color-accent`, not `--color-cyan-400`. Theme switching flips the semantic tokens without touching component rules. Flat tokens are simpler for a personal site but make theme overrides verbose.

### 2. Fonts: self-hosted vs Google Fonts CDN

**Decision:** Google Fonts CDN with `display=swap` and `preconnect`. No self-hosting.

**Rationale:** Personal site — CDN latency is acceptable. Self-hosting requires downloading font files and updating manually. `display=swap` prevents invisible text during load.

**Fonts chosen:**
- **JetBrains Mono** — code, monospace UI elements, terminal-style displays
- **Inter** — body text, labels, UI copy

**Alternative considered:** IBM Plex Mono + IBM Plex Sans — equally good but JetBrains Mono is more recognizable in developer contexts.

### 3. Navbar: fixed vs sticky vs static

**Decision:** Fixed navbar, full-width, `z-index: 100`. `main` gets `padding-top: var(--navbar-height)` to prevent content overlap.

**Rationale:** Fixed nav keeps navigation always accessible while scrolling — important for long wiki articles and dashboard use. Sticky works similarly but fixed is simpler to implement consistently.

### 4. Mobile drawer: CSS-only vs JS toggle

**Decision:** JS toggle (add/remove `.nav-open` class on `<nav>`) — same pattern as existing hamburger toggle.

**Rationale:** The existing `nav-scroll.js` already toggles `.nav-open`. The CSS just needs to implement the drawer behavior for that class. No additional JS required.

### 5. Syntax highlighting: Prism.js vs highlight.js vs custom

**Decision:** Prism.js via CDN (autoloader plugin). Theme: `prism-one-dark` for dark, `prism-one-light` for light — loaded as a `<link>` that swaps when theme changes.

**Rationale:** Prism is lightweight (~2 KB core + autoloader), language autoloading avoids bundling unused grammars, and theme CSS files are stable CDN assets. The autoloader detects `language-*` classes that marked.js already adds to fenced code blocks.

**Alternative considered:** highlight.js — slightly larger, different API; no compelling advantage for this use case.

### 6. Glow effects: CSS box-shadow vs filter:drop-shadow

**Decision:** `box-shadow` for UI elements (buttons, cards, focused inputs). `text-shadow` avoided — too heavy.

**Rationale:** `box-shadow` is GPU-composited and performant. Glows are subtle (1–4px spread, 10–20% opacity) to feel tech, not garish.

### 7. Old stylesheet: delete vs archive

**Decision:** Rename `css/styles.css` to `css/styles.old.css` during migration, then remove once new file verified.

**Rationale:** Provides a reference during development. The archive is not linked from any HTML so it has no runtime cost.

## Risks / Trade-offs

- **Google Fonts CDN failure** → Fallback font stacks ensure readability (`system-ui, sans-serif`; `'Courier New', monospace`)
- **Prism.js theme swap on theme toggle** → Requires JS to swap the Prism CSS `<link>` `href` when theme changes; adds a small coupling to `theme.js`
- **Fixed navbar + mobile drawer** → Drawer must not cause horizontal scroll; `overflow-x: hidden` on `body` required
- **Full stylesheet replacement** → Any missed element will fall back to browser defaults. Mitigate by working section-by-section and testing each page before proceeding
- **Font load flash** → `display=swap` causes layout shift on slow connections. Acceptable for a personal site

## Migration Plan

1. Copy current `css/styles.css` to `css/styles.old.css`
2. Write new `css/styles.css` from scratch, starting with tokens → reset → base → components → pages
3. Update all HTML `<head>` sections: add Google Fonts preconnect + `<link>`, add Prism CSS links
4. Update navbar markup in all HTML files (new structure)
5. Update `js/theme.js` to handle Prism theme swap
6. Add `js/prism-init.js` to wiki page for post-render highlighting
7. Verify each page individually
8. Remove `css/styles.old.css`

## Open Questions

- Should the navbar show the site name/logo on the left, or keep it minimal (links only)?
  → Proposed: show `geller.ee` as a styled monospace wordmark on the left
- Should tool pages get a distinct "panel" frame around their content, or just inherit the base card style?
  → Proposed: distinct `.tool-panel` component with a terminal-style header bar
