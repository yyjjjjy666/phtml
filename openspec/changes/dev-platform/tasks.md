## 1. PWA — Manifest and Service Worker

- [ ] 1.1 Create `manifest.json` at site root with name, short_name, start_url, display, background_color, theme_color, and icons array
- [ ] 1.2 Create `sw.js` at site root with install (cache shell assets), fetch (network-first), and activate (purge old caches) handlers
- [ ] 1.3 Add `<link rel="manifest" href="/manifest.json">` to every HTML page's `<head>`
- [ ] 1.4 Add service worker registration script to every HTML page (inline in `<head>` or via shared JS)

## 2. Wiki — Content Structure

- [ ] 2.1 Create `wiki/content/` directory and `wiki/content/index.json` with empty article array (schema: `[{slug, title, category, tags}]`)
- [ ] 2.2 Migrate existing wiki HTML content to Markdown: create one `.md` file per article under `wiki/content/<slug>.md` with frontmatter (`title`, `category`, `tags`)
- [ ] 2.3 Populate `wiki/content/index.json` with entries for all migrated articles

## 3. Wiki — Markdown Shell

- [ ] 3.1 Add `<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" integrity="..." crossorigin="anonymous"></script>` to `wiki/index.html`
- [ ] 3.2 Rewrite `wiki/index.html` body: remove static content, add a `#wiki-content` container div
- [ ] 3.3 Create `js/wiki.js`: on load, read URL hash; if no hash fetch index.json and render grouped article list; if hash fetch `wiki/content/<slug>.md`, parse frontmatter, render markdown body, display title/tags
- [ ] 3.4 Add tag click handler in `js/wiki.js`: clicking a tag sets `?tag=<name>` in URL and re-renders the index filtered to that tag
- [ ] 3.5 Add wiki styles to `css/styles.css`: article body typography, tag labels, category headings, code block styling

## 4. Command Palette

- [ ] 4.1 Create `js/command-palette.js`: define static page manifest array (all site pages with label + URL)
- [ ] 4.2 In `command-palette.js`, add async function to fetch `wiki/content/index.json` and merge wiki articles into item list
- [ ] 4.3 Implement palette DOM: create overlay div with backdrop, inner panel, text input, and results `<ul>` — injected into `<body>` on first open
- [ ] 4.4 Implement fuzzy/substring filter: on input event, filter items by case-insensitive title match, re-render results list
- [ ] 4.5 Implement keyboard navigation: ArrowDown/ArrowUp to move highlight, Enter to navigate, Escape to close
- [ ] 4.6 Implement close on backdrop click
- [ ] 4.7 Bind Ctrl+K / Cmd+K globally on every page to open palette
- [ ] 4.8 Add palette trigger button to navbar in every HTML page's `<nav>`; wire click to open palette
- [ ] 4.9 Add `<script src="/js/command-palette.js"></script>` to every HTML page
- [ ] 4.10 Add command palette styles to `css/styles.css`: overlay, panel, input, result items, highlighted state

## 5. Global Search

- [ ] 5.1 Create `search/index.html` with search input, results container, and `<script src="/js/search.js">`
- [ ] 5.2 Create `js/search.js`: on load, read `?q=` from URL; fetch `wiki/content/index.json`; score and rank results (title match > tag match); render result items (title link, type badge, tags)
- [ ] 5.3 In `search.js`, implement Enter key handler on input: update URL `?q=<value>` and re-run search without page reload
- [ ] 5.4 Add search page link to navbar (or hook into command palette "search" action) — at minimum, the command palette `Enter` on a typed query should navigate to `/search?q=<query>` if no item is highlighted
- [ ] 5.5 Add search result styles to `css/styles.css`: result list, type badge, tag chips

## 6. Final Integration and QA

- [ ] 6.1 Verify all pages have manifest link, SW registration, and command-palette script
- [ ] 6.2 Test wiki article rendering: hash navigation, tag filtering, category index
- [ ] 6.3 Test command palette: open/close, filter, keyboard nav, wiki articles appear
- [ ] 6.4 Test search page: query via URL, query via input, result ranking
- [ ] 6.5 Test PWA: install prompt appears in Chrome, offline loads cached shell
- [ ] 6.6 Check light/dark theme consistency for all new UI (palette, search results, wiki article, tags)
- [ ] 6.7 Test mobile: palette overlay fits small screens, wiki index readable, search page usable
