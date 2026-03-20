## Why

The site currently functions as a static personal page but lacks the utility of a developer workstation: there's no way to find content quickly, the wiki is plain HTML with no structure, and there's no keyboard-driven navigation. The goal is to evolve it into a daily-use developer platform — one visit to do everything — without abandoning the lightweight static architecture.

## What Changes

- **Command palette** (Ctrl+K): overlay with fuzzy search over pages, tools, and links — keyboard-first navigation
- **Global search**: client-side full-text search across wiki pages and tool descriptions, no backend required
- **Wiki markdown rendering**: wiki pages rendered from `.md` files via a lightweight client-side parser (no build step); categories/tag metadata in frontmatter
- **PWA baseline**: `manifest.json` + service worker for offline access to previously visited pages and installability — no push notifications, no complex caching

Existing features (dashboard, theme toggle, password generator, IP tool, gallery) are unchanged.

## Capabilities

### New Capabilities
- `command-palette`: Keyboard-triggered (Ctrl+K / Cmd+K) overlay listing all pages, tools, and wiki articles with fuzzy filtering and keyboard navigation
- `global-search`: Client-side search index built from wiki article frontmatter and page titles; rendered inline on a `/search` page
- `wiki-markdown`: Wiki pages served as `.md` files, parsed client-side; supports frontmatter (title, tags, category), headings, code blocks, lists, links
- `pwa`: Web app manifest + service worker caching shell and static assets for offline use and home-screen installation

### Modified Capabilities
- `wiki`: Requirements extend to support markdown source files, frontmatter metadata (title, tags, category), and a tag/category index page
- `site-structure`: New routes added (`/search`); nav gains command-palette trigger; tools dropdown extended as new tools are added

## Impact

- New files: `js/command-palette.js`, `js/search.js`, `js/markdown.js` (thin MD parser or marked.js CDN), `manifest.json`, `sw.js`
- Wiki: `.md` source files under `wiki/content/`; `wiki/index.html` becomes a shell that fetches and renders markdown
- CSS: overlay and search result styles added to `styles.css`
- No new build dependencies; marked.js loaded from CDN with integrity hash if chosen
- GitHub Pages compatible — all client-side
