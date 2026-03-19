## Why

The site is currently dark-only. A theme toggle lets users switch to a light theme if they prefer, and respects the system preference on first visit (`prefers-color-scheme`). It's a small quality-of-life addition that fits the existing nav without structural changes.

## What Changes

- A toggle button appears at the right end of the nav bar on every page
- Clicking it switches between dark and light themes
- The chosen theme is persisted in `localStorage` so it survives page navigation and tab reloads
- On first visit, the system `prefers-color-scheme` is used as the default
- Light theme overrides CSS custom properties (colors only) — no layout changes
- A small shared JS file `js/theme.js` handles the toggle logic; it is loaded on every page
- `css/styles.css` gains a `[data-theme="light"]` block with color overrides

## Capabilities

### New Capabilities

- `theme-toggle`: Nav toggle button that switches between dark and light themes, persisted in localStorage

### Modified Capabilities

- `site-structure`: Every page's nav gains a theme toggle button at the right end

## Impact

- `css/styles.css` — new `[data-theme="light"]` override block + toggle button styles
- `js/theme.js` — new file (~40 lines): reads preference, applies theme, wires button
- All `index.html` files — add `<button id="theme-btn">` to nav, add `<script src="/js/theme.js">` (must load before body to avoid flash)
