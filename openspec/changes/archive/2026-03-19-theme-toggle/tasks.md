## 1. CSS

- [x] 1.1 Add `#theme-btn` styles to `css/styles.css`: float right via `margin-left: auto`, icon-only button matching nav style, no background/border, cursor pointer
- [x] 1.2 Add `[data-theme="light"]` override block to `css/styles.css` with full light palette (page bg, nav bg, body text, accent, links, active nav, footer, dropdown, input fields)

## 2. JavaScript

- [x] 2.1 Create `js/theme.js`: reads `localStorage['theme']`, falls back to `prefers-color-scheme`, sets `document.documentElement.dataset.theme`, updates button icon on click, saves to localStorage

## 3. HTML — inline head script (anti-flash)

- [x] 3.1 Add inline `<script>` in `<head>` of `index.html` that reads localStorage and sets `data-theme` on `<html>` before CSS loads
- [x] 3.2 Same inline script in `wiki/index.html`
- [x] 3.3 Same inline script in `gallery/index.html`
- [x] 3.4 Same inline script in `contact/index.html`
- [x] 3.5 Same inline script in `tools/index.html`
- [x] 3.6 Same inline script in `tools/wheel/index.html`
- [x] 3.7 Same inline script in `tools/password/index.html`

## 4. HTML — toggle button in nav

- [x] 4.1 Add `<li id="theme-li"><button id="theme-btn" title="toggle theme">☀</button></li>` as last item in nav of `index.html`, and `<script src="/js/theme.js"></script>` before `</body>`
- [x] 4.2 Same button + script in `wiki/index.html`
- [x] 4.3 Same button + script in `gallery/index.html`
- [x] 4.4 Same button + script in `contact/index.html`
- [x] 4.5 Same button + script in `tools/index.html`
- [x] 4.6 Same button + script in `tools/wheel/index.html`
- [x] 4.7 Same button + script in `tools/password/index.html`
