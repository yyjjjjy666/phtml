## 1. Design System — CSS Token Layer

- [x] 1.1 Copy current `css/styles.css` to `css/styles.old.css` (reference backup)
- [x] 1.2 Create new `css/styles.css` — write `:root` dark-theme token block: color primitives (`--c-*`), semantic colors (`--color-bg`, `--color-surface`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-alt`), spacing scale (`--sp-1` through `--sp-10`), font tokens (`--font-sans`, `--font-mono`), border/radius/shadow tokens, transition token
- [x] 1.3 In new `css/styles.css` — write `[data-theme="light"]` block overriding semantic color tokens for light mode
- [x] 1.4 Write CSS reset + base: `*, body, main` box-model reset, `body` using `--color-bg`, `--color-text`, `--font-sans`, `font-size: 16px`, `line-height: 1.6`
- [x] 1.5 Write base link, heading (h1–h4), paragraph, list, table, code, pre styles using only tokens

## 2. Navigation Bar

- [x] 2.1 Update navbar HTML markup in all 9 pages: add `.navbar-brand` (`geller.ee` wordmark link), restructure `<ul>` into `.navbar-links` (center) and `.navbar-actions` (right — palette btn + theme btn); keep existing IDs for JS compatibility
- [x] 2.2 Write `.navbar` CSS: fixed top, full width, `--color-surface` background, flex layout (brand left, links center, actions right), height token, border-bottom, backdrop-blur optional
- [x] 2.3 Write `.navbar-brand` CSS: monospace font, accent color, no underline, font-weight 700
- [x] 2.4 Write `.navbar-links` + `.navbar-links a` CSS: horizontal flex, link styles (no underline, `--color-text`), `.active` link uses accent color + border-bottom indicator
- [x] 2.5 Write `.navbar-actions` CSS: flex row, gap, align center
- [x] 2.6 Write `.dropdown` + `.dropdown-menu` CSS for desktop hover dropdown using tokens
- [x] 2.7 Write `main { padding-top: var(--navbar-height); }` so content isn't hidden behind fixed nav
- [x] 2.8 Write mobile navbar CSS (≤768px): hide `.navbar-links`, show hamburger; `.nav-open .navbar-links` becomes a full-width slide-in drawer; each link full-width block, min 44px height
- [x] 2.9 Update `js/nav-scroll.js` selectors if any class names changed (verify — keep `.navbar` and `.nav-open` intact)

## 3. Typography & Fonts

- [x] 3.1 Add Google Fonts preconnect + stylesheet `<link>` to all 9 HTML pages' `<head>` (Inter 400/500/600 + JetBrains Mono 400/500)
- [x] 3.2 Update page `<title>` in all 9 pages to follow `<page> — geller.ee` pattern; homepage stays `geller.ee`

## 4. Core UI Components (CSS)

- [x] 4.1 Write button styles: `.btn` base (padding, border-radius, font, transition), `.btn-primary` (accent bg, dark text, hover glow), `.btn-ghost` (transparent, accent border, hover fill); touch target ≥44px
- [x] 4.2 Write form input styles: `input[type="text"]`, `input[type="number"]`, `select`, `textarea` — using surface bg, border token, focus ring with accent glow
- [x] 4.3 Write card / `.panel` component: surface bg, border, border-radius, padding using space tokens
- [x] 4.4 Write `.tool-panel` component: panel with a terminal-style header bar (dark strip, monospace label, accent dot indicator)
- [x] 4.5 Write code block styles: `pre`, `code` — mono font, surface-2 bg, border-left accent bar, padding; inline `code` with tinted bg
- [x] 4.6 Write `.badge` / `.tag` component using tokens (used in wiki tags, search results, command palette type labels)
- [x] 4.7 Write progress bar styles (`#dashboard` progress bars) using tokens; bar fill uses accent gradient
- [x] 4.8 Write table styles: border-collapse, header row with surface-2 bg, striped rows, border token

## 5. Page-Specific Styles

- [x] 5.1 Homepage dashboard (`#dashboard`): update grid to use space tokens; widget cards use `.panel` component; progress bars use new token-based styles
- [x] 5.2 Wiki page (`#wiki-content`): update all wiki-specific rules to use tokens; tag chips, category headings, article title, back link
- [x] 5.3 Gallery page: update gallery grid and lightbox to use tokens
- [x] 5.4 Tools hub page: tool listing items use `.panel` or card style
- [x] 5.5 Tool pages (wheel, password, IP lookup): wrap tool content in `.tool-panel`; update form inputs and buttons to new component styles
- [x] 5.6 Search page (`#search-page`): update search input and results list to use tokens and new input/badge component styles
- [x] 5.7 Command palette overlay: update `#cmd-overlay`, `#cmd-panel`, `#cmd-input`, `#cmd-results` to use token values

## 6. Theme Toggle Update

- [x] 6.1 Update `js/theme.js`: after theme change, check for `#prism-theme` link element; if present, swap its `href` between dark and light Prism theme CDN URLs

## 7. Syntax Highlighting (Prism.js)

- [x] 7.1 Add Prism.js CSS `<link id="prism-theme">` to `wiki/index.html` `<head>` (dark theme URL as default)
- [x] 7.2 Add Prism.js core + autoloader `<script>` to `wiki/index.html` (CDN)
- [x] 7.3 Create `js/prism-init.js`: export a function `highlightWiki(container)` that calls `Prism.highlightAllUnder(container)` if `window.Prism` is defined
- [x] 7.4 Update `js/wiki.js`: call `highlightWiki(container)` after each article render (after `container.innerHTML = html`)
- [x] 7.5 Add `<script src="/js/prism-init.js"></script>` to `wiki/index.html` before `wiki.js`

## 8. Cleanup

- [x] 8.1 Remove `css/styles.old.css` after verifying all pages render correctly
- [x] 8.2 Verify all 9 pages: manifest link, SW, palette script, Google Fonts link all present
- [x] 8.3 Verify dark/light theme toggle works on every page and all components switch correctly
- [x] 8.4 Verify mobile drawer opens/closes on all pages at 375px viewport width
- [x] 8.5 Verify wiki page: articles render, code blocks are syntax highlighted, Prism theme swaps on toggle
