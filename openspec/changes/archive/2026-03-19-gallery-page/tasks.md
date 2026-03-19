## 1. CSS — Gallery & Lightbox Styles

- [x] 1.1 Add masonry grid styles to `css/styles.css` (`.gallery-grid` with `column-count`, `column-gap`, `break-inside: avoid` on `.gallery-item`)
- [x] 1.2 Add lightbox overlay styles to `css/styles.css` (`#lightbox` with fixed positioning, dark semi-transparent background, centered image display, hidden by default)
- [x] 1.3 Add gallery section heading styles consistent with site theme

## 2. JS — Lightbox Behavior

- [x] 2.1 Create `js/gallery.js` with functions to open and close the lightbox on image click
- [x] 2.2 Implement Escape key listener to close the lightbox
- [x] 2.3 Implement click-on-overlay-background listener to close the lightbox

## 3. HTML — gallery.html

- [x] 3.1 Create `gallery.html` with shared `<head>` (charset, viewport, title "gallery", stylesheet link)
- [x] 3.2 Add `<nav class="navbar">` with five links (index, docs, links, gallery, contact); set "gallery" to `class="active"`
- [x] 3.3 Add `<main>` with an example category `<section>` containing a `.gallery-grid` div and at least a commented-out `<img>` example showing the expected markup
- [x] 3.4 Add `<div id="lightbox">` overlay markup with an `<img id="lightbox-img">` inside
- [x] 3.5 Link `js/gallery.js` at the bottom of `<body>`

## 4. Navigation — Update All Existing Pages

- [x] 4.1 Add `<li><a href="gallery.html" class="non-active">gallery</a></li>` to the nav in `index.html`
- [x] 4.2 Add the same nav item to `docs.html`
- [x] 4.3 Add the same nav item to `links.html`
- [x] 4.4 Add the same nav item to `contact.html`

## 5. Cleanup

- [x] 5.1 Remove "gallery page" from the todo list paragraph in `index.html`
- [x] 5.2 Remove the broken `<script src="js/*.js">` from `index.html` (replace with nothing or a proper script tag if needed)
