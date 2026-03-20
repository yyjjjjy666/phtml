## 1. Remove footer HTML from all pages

- [x] 1.1 Remove `<footer id="visitor-footer">…</footer>` block from `index.html`
- [x] 1.2 Same in `wiki/index.html`
- [x] 1.3 Same in `gallery/index.html`
- [x] 1.4 Same in `contact/index.html`
- [x] 1.5 Same in `tools/index.html`
- [x] 1.6 Same in `tools/wheel/index.html`
- [x] 1.7 Same in `tools/password/index.html`

## 2. Remove visitor-info.js script tags from all pages

- [x] 2.1 Remove `<script src="/js/visitor-info.js"></script>` from `index.html`
- [x] 2.2 Same in `wiki/index.html`
- [x] 2.3 Same in `gallery/index.html`
- [x] 2.4 Same in `contact/index.html`
- [x] 2.5 Same in `tools/index.html`
- [x] 2.6 Same in `tools/wheel/index.html`
- [x] 2.7 Same in `tools/password/index.html`

## 3. CSS cleanup

- [x] 3.1 Remove `#visitor-footer` CSS block from `css/styles.css`
- [x] 3.2 Remove the `#visitor-footer` mobile override (`flex-wrap: wrap; gap: 12px`) from the `@media (max-width: 600px)` block
- [x] 3.3 Reduce `main { padding-bottom }` from `40px` to `20px` (no longer needs to clear fixed footer)
- [x] 3.4 Reduce mobile `main { padding-bottom }` from `60px` to `30px`

## 4. Delete visitor-info.js

- [x] 4.1 Delete `js/visitor-info.js`

## 5. Create ip tool page

- [x] 5.1 Create `tools/ip/` directory and `tools/ip/index.html` with full nav (ip as active tool), inline head theme script, lookup input + button, results container with 5 section groups, `<script src="/js/ip-tool.js">` and `<script src="/js/theme.js">` and `<script src="/js/nav-scroll.js">`

## 6. Create ip-tool.js

- [x] 6.1 Create `js/ip-tool.js`: fetches `ipapi.co/json/` on load, renders all fields into 5 grouped `<dl>` sections (Network, Location, Time, Economy, Coordinates), handles null values as "—", handles errors with a message; lookup input submits on Enter or button click to re-fetch with custom IP

## 7. Add ip to nav dropdown on all pages

- [x] 7.1 Add `<li><a href="/tools/ip">ip</a></li>` to the tools dropdown in `index.html`
- [x] 7.2 Same in `wiki/index.html`
- [x] 7.3 Same in `gallery/index.html`
- [x] 7.4 Same in `contact/index.html`
- [x] 7.5 Same in `tools/index.html`
- [x] 7.6 Same in `tools/wheel/index.html`
- [x] 7.7 Same in `tools/password/index.html`
- [x] 7.8 Same in `tools/ip/index.html` (own nav)

## 8. Add ip to tools hub

- [x] 8.1 Add ip tool listing (name + description) to `tools/index.html`
