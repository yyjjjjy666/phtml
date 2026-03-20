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

## 7. CSS — hamburger menu

- [x] 7.1 Hide `#nav-toggle-li` on desktop (`display: none`); inside `@media (max-width: 600px)` show it (`display: block; float: left`) and hide all other `li` except `#theme-li`
- [x] 7.2 When `.navbar.nav-open`, show all hidden `li` as stacked blocks; change `#nav-toggle` icon to `✕`
- [x] 7.3 Style `#nav-toggle` button: borderless, same height as nav, `font-size: 20px`, cursor pointer

## 8. JS — hamburger toggle

- [x] 8.1 In `nav-scroll.js`: on mobile, attach click handler to `#nav-toggle` that toggles `.nav-open` on `.navbar` and updates button text `☰`/`✕`; suppress scroll-hide while menu is open; close menu on outside click

## 9. HTML — add hamburger button to all pages

- [x] 9.1 Add `<li id="nav-toggle-li"><button id="nav-toggle" aria-label="menu">☰</button></li>` as first item in `<ul>` in `index.html`
- [x] 9.2 Same in `wiki/index.html`
- [x] 9.3 Same in `gallery/index.html`
- [x] 9.4 Same in `contact/index.html`
- [x] 9.5 Same in `tools/index.html`
- [x] 9.6 Same in `tools/wheel/index.html`
- [x] 9.7 Same in `tools/password/index.html`

## 10. CSS — fix toggle/hamburger row alignment

- [x] 10.1 In the hamburger `@media (max-width: 600px)` block, add `width: auto` to `#nav-toggle-li` and `#theme-li` to override the `width: 100%` set by `.navbar li` earlier in the same query — this keeps both on the same row
