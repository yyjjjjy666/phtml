## 1. CSS — nav mobile sizing

- [x] 1.1 Add `[data-theme] .navbar` transition for scroll-hide: `transition: transform 0.25s ease`
- [x] 1.2 Add `.nav-hidden` class: `transform: translateY(-100%)` (used by JS scroll listener)
- [x] 1.3 Reduce navbar `font-size` and `li a` padding inside `@media (max-width: 600px)` block

## 2. JS — scroll-hide script

- [x] 2.1 Create `js/nav-scroll.js`: IIFE that listens to `scroll` with `matchMedia('(max-width: 600px)')` guard, adds/removes `.nav-hidden` on `.navbar` based on scroll direction (threshold 10px)

## 3. HTML — add nav-scroll.js to all pages

- [x] 3.1 Add `<script src="/js/nav-scroll.js"></script>` before `</body>` in `index.html`
- [x] 3.2 Same in `wiki/index.html`
- [x] 3.3 Same in `gallery/index.html`
- [x] 3.4 Same in `contact/index.html`
- [x] 3.5 Same in `tools/index.html`
- [x] 3.6 Same in `tools/wheel/index.html`
- [x] 3.7 Same in `tools/password/index.html`

## 4. CSS — wheel page mobile

- [x] 4.1 Under `@media (max-width: 600px)`: set `#wheel-canvas` `max-width: 100%; height: auto` and make wheel controls (`#wheel-input-row`, item list, buttons) stack in a single column with full-width inputs

## 5. JS — wheel canvas resize

- [x] 5.1 In `js/wheel.js`, on `DOMContentLoaded` and on `window resize`, set `canvas.width = canvas.offsetWidth` and `canvas.height = canvas.offsetWidth`, then call `drawWheel(currentRotation)`

## 6. CSS — password page mobile

- [x] 6.1 Under `@media (max-width: 600px)`: set `.pw-tabs` to `overflow-x: auto; white-space: nowrap` so tabs scroll horizontally
- [x] 6.2 Under `@media (max-width: 600px)`: set `#pw-output-area`, `.pw-panel`, `#pw-history-panel` to `width: 100%; box-sizing: border-box` and reduce padding
- [x] 6.3 Under `@media (max-width: 600px)`: set range inputs and text inputs inside `.pw-panel` to `width: 100%; box-sizing: border-box`
- [x] 6.4 Under `@media (max-width: 600px)`: ensure no element inside `.pw-panel` causes horizontal overflow (check fixed widths, add `overflow-x: hidden` to page wrapper if needed)
