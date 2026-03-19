## Why

A fun interactive tool for making random decisions. The user can define a custom set of options, set how long the wheel spins, and let it land on a random result. Useful for picking anything from what to eat to who goes first in a game.

## What Changes

- Add a new `wheel.html` page with a canvas-based spinning fortune wheel
- Add wheel-specific CSS to `css/styles.css`
- Add `js/wheel.js` with all wheel logic (item management, canvas rendering, spin animation, timer)
- Update the `<nav>` bar on all six existing pages to include a "wheel" link
- Remove "hover links" from the todo list in `index.html` (not related — keep only wheel-related cleanup)

## Capabilities

### New Capabilities

- `fortune-wheel`: Interactive spinning wheel where the user adds custom text items, sets a spin duration in seconds, spins the wheel, and sees the winning segment highlighted with an announcement

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- New file: `wheel.html`
- New file: `js/wheel.js`
- Modified: `css/styles.css` (wheel page styles)
- Modified: `index.html`, `docs.html`, `links.html`, `gallery.html`, `contact.html` (nav updated to include wheel link)
- No build process changes; pure HTML5 Canvas + vanilla JS
