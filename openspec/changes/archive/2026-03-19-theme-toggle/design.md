## Context

Static site, no build step. CSS is a single shared file. All pages share the same nav structure. The current design uses hardcoded hex colors throughout `styles.css` (no CSS variables). The toggle must work without refactoring every color declaration.

## Goals / Non-Goals

**Goals:**
- Toggle between dark (current) and light theme on every page
- Persist choice across pages and sessions via `localStorage`
- Respect `prefers-color-scheme` on first visit
- No flash of wrong theme on page load
- Button sits at the far right of the nav bar

**Non-Goals:**
- Refactoring all CSS to use custom properties (would touch every rule)
- Per-page theme memory
- Auto-switching based on time of day

## Decisions

### D1: `data-theme` attribute on `<html>` element
**Decision:** Apply `data-theme="light"` or `data-theme="dark"` to `document.documentElement`. CSS selects `[data-theme="light"]` to override colors.
**Why:** Highest-specificity selector without `!important`; applies before first paint if the script runs in `<head>`.

### D2: Inline script in `<head>` to prevent FODT (Flash of Default Theme)
**Decision:** Add a small `<script>` block directly in `<head>` (before the stylesheet) that reads `localStorage` and sets the attribute immediately.
**Why:** External scripts with `src` are deferred or async by convention and can cause a visible flash. An inline `<head>` script blocks parsing just long enough to set the attribute before any CSS is applied.

### D3: Override block rather than full CSS variable refactor
**Decision:** Add a single `[data-theme="light"] { ... }` block at the bottom of `styles.css` that overrides only the color declarations that need to change.
**Why:** Minimizes change surface. Refactoring all ~50 color references to variables is a large separate change with risk of regressions.

### D4: Light theme color palette
| Role | Dark value | Light value |
|---|---|---|
| Page background | `#2C2C2C` | `#f5f5f0` |
| Nav background | `#383838` | `#e8e8e2` |
| Body text | `#E0E0E0` | `#1a1a1a` |
| Accent | `#e0ff03` | `#5a6e00` (darker for contrast on light bg) |
| Link color (`.links a`) | `#e0ff03` | `#4a5c00` |
| Active nav bg | `#e0ff03` | `#5a6e00` |
| Active nav text | `#000` | `#fff` |
| Footer bg | `#1e1e1e` | `#d8d8d2` |
| Footer text | `#E0E0E0` | `#1a1a1a` |

### D5: Toggle button label
**Decision:** Button shows `☀` (sun) when currently dark (click to go light) and `☾` (crescent) when currently light (click to go dark). No text label — icon only, consistent with the minimal nav style.

### D6: Button position
**Decision:** `margin-left: auto` on the button's `<li>` pushes it to the far right of the `display: flow-root` nav. No JS positioning needed.

## Migration Plan

No migration needed. Steps:
1. Add inline `<head>` script + `<script src="/js/theme.js">` to every page
2. Add theme button `<li>` to nav on every page
3. Add `[data-theme="light"]` block to `styles.css`
4. Create `js/theme.js`
