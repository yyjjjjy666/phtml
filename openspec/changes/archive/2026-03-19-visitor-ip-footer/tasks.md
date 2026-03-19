## 1. CSS — Footer Styles

- [x] 1.1 Add footer styles to `css/styles.css`: fixed position at bottom of viewport, full width, dark background (`#1e1e1e`), light text, smaller monospace font (14px), horizontal padding
- [x] 1.2 Add `padding-bottom` to `main` in `css/styles.css` so page content is not hidden behind the fixed footer

## 2. JS — Visitor Info Fetcher

- [x] 2.1 Create `js/visitor-info.js` that on `DOMContentLoaded` shows "loading..." in footer spans, fetches `https://ipwho.is/`, populates `#visitor-ip`, `#visitor-location`, and `#visitor-org` spans with returned data
- [x] 2.2 Implement error handling: on fetch failure or non-success response, display "ip info unavailable" in the footer

## 3. HTML — Add Footer to All Pages

- [x] 3.1 Add `<footer id="visitor-footer">` with three `<span>` elements (`id="visitor-ip"`, `id="visitor-location"`, `id="visitor-org"`) to `index.html`; link `js/visitor-info.js` at the bottom of `<body>`
- [x] 3.2 Add the same footer and script tag to `docs.html`
- [x] 3.3 Add the same footer and script tag to `links.html`
- [x] 3.4 Add the same footer and script tag to `contact.html`
- [x] 3.5 Add the same footer and script tag to `gallery.html`

## 4. Cleanup

- [x] 4.1 Remove "public ip of visitor (and other related info)" from the todo list paragraph in `index.html`
