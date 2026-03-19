## 1. CSS — Wheel Page Styles

- [x] 1.1 Add `#wheel-page` layout styles to `css/styles.css`: two-column flex layout (canvas left, controls right) with a `gap`, wrapping on small screens
- [x] 1.2 Add `#wheel-canvas` styles: `display: block`, `border-radius: 50%` visual hint, cursor default
- [x] 1.3 Add `#item-list` styles: unstyled list, each `<li>` flex row with item label and remove button aligned right
- [x] 1.4 Add `#result` styles: prominent centered text below the wheel in accent color (`#e0ff03`), min-height so layout doesn't jump
- [x] 1.5 Add `#spin-controls` input and button styles consistent with site theme (dark inputs, accent-colored spin button)

## 2. JS — Wheel Logic (`js/wheel.js`)

- [x] 2.1 Define `items` array and `isSpinning` flag; implement `addItem(label)` (trim, max 20, no empty) and `removeItem(index)`
- [x] 2.2 Implement `drawWheel(rotation)`: clear canvas, draw equal arc segments alternating between `#e0ff03` and `#555555`, draw truncated text labels (max 12 chars + ellipsis) rotated to center of each segment, draw fixed triangular pointer at top
- [x] 2.3 Implement `spin()`: read duration input (clamp 1–60), pick random winner index, calculate target rotation to land winner under pointer, animate with `requestAnimationFrame` using ease-out, disable spin button during animation
- [x] 2.4 On animation end: re-enable spin button, display winner label in `#result`
- [x] 2.5 Wire up DOM events on `DOMContentLoaded`: add-item form submit (Enter + button click), remove buttons (delegated), spin button click; call `drawWheel(0)` to render initial empty state

## 3. HTML — `wheel.html`

- [x] 3.1 Create `wheel.html` with shared `<head>` (charset, viewport, title "wheel", stylesheet link)
- [x] 3.2 Add `<nav class="navbar">` with seven links (index, docs, links, gallery, wheel, contact); set "wheel" to `class="active"`
- [x] 3.3 Add `<main>` with `<div id="wheel-page">` containing: `<canvas id="wheel-canvas" width="400" height="400">` and a controls column with item input + add button, item list `<ul id="item-list">`, spin duration input, spin button `<button id="spin-btn">`, and result display `<p id="result">`
- [x] 3.4 Link `js/wheel.js` at the bottom of `<body>`

## 4. Navigation — Update All Existing Pages

- [x] 4.1 Add `<li><a href="wheel.html" class="non-active">wheel</a></li>` to the nav in `index.html` (after gallery, before contact)
- [x] 4.2 Add the same nav item to `docs.html`
- [x] 4.3 Add the same nav item to `links.html`
- [x] 4.4 Add the same nav item to `gallery.html`
- [x] 4.5 Add the same nav item to `contact.html`
