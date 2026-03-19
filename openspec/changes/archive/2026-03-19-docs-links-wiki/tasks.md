## 1. Create wiki page

- [x] 1.1 Create `wiki/` directory and `wiki/index.html` with nav (wiki active), two sections (`<section id="docs">` and `<section id="links">`), all content migrated verbatim from both existing pages, footer, and visitor-info script

## 2. Redirect old pages

- [x] 2.1 Replace `docs/index.html` content with an instant meta-refresh redirect to `/wiki`
- [x] 2.2 Replace `links/index.html` content with an instant meta-refresh redirect to `/wiki`

## 3. Update nav on all pages

- [x] 3.1 Update nav in `index.html`: remove `<li><a href="/docs">docs</a></li>` and `<li><a href="/links">links</a></li>`, add `<li><a href="/wiki" class="non-active">wiki</a></li>` in their place
- [x] 3.2 Update nav in `wiki/index.html`: same removal + add wiki as active (`class="active"`)
- [x] 3.3 Update nav in `gallery/index.html`: remove docs + links items, add wiki
- [x] 3.4 Update nav in `contact/index.html`: remove docs + links items, add wiki
- [x] 3.5 Update nav in `tools/index.html`: remove docs + links items, add wiki
- [x] 3.6 Update nav in `tools/wheel/index.html`: remove docs + links items, add wiki
- [x] 3.7 Update nav in `tools/password/index.html`: remove docs + links items, add wiki
