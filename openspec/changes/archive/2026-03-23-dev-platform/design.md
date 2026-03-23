## Context

Static site on GitHub Pages: plain HTML/CSS/vanilla JS, single shared `styles.css`, root-relative paths, no build tooling. Existing capabilities include a homepage dashboard, theme toggle (dark/light + system preference), wiki (plain HTML), password generator, IP tool, and image gallery. Navigation is a top navbar with a CSS dropdown for tools. The site is served as-is with no preprocessing.

## Goals / Non-Goals

**Goals:**
- Add keyboard-first navigation via command palette (Ctrl+K)
- Add client-side full-text search scoped to wiki articles and page titles
- Enable wiki pages to be authored and rendered as Markdown (no build step)
- Establish a minimal PWA baseline (manifest + service worker) for offline shell access

**Non-Goals:**
- Rewriting existing pages or the design system
- Adding authentication, user accounts, or backend
- Real-time collaboration or sync
- Replacing the existing dashboard, tools, or gallery
- Complex PWA features (push notifications, background sync)

## Decisions

### 1. Markdown parsing: CDN-loaded marked.js vs hand-rolled parser

**Decision:** Use `marked.js` from a CDN with a `integrity` hash.

**Rationale:** Full CommonMark support including fenced code blocks and tables in ~50 KB. A hand-rolled parser handles only a subset and becomes a maintenance burden. CDN with SRI hash gives the same security guarantees as self-hosting. `marked.js` is MIT-licensed and actively maintained.

**Alternative considered:** `micromark` — smaller but ESM-only, incompatible with the no-build constraint.

### 2. Wiki content structure: flat `.md` files vs JSON index

**Decision:** Wiki articles stored as `.md` files under `wiki/content/<slug>.md` with YAML-like frontmatter (`---` delimited). A handwritten `wiki/content/index.json` serves as the article manifest (slug → title, tags, category). `wiki/index.html` becomes a router shell that reads the URL hash (`#slug`) to fetch and render the correct file.

**Rationale:** No build step needed. Adding an article means creating a `.md` file and updating `index.json`. The index file doubles as the search corpus.

**Alternative considered:** Auto-scanning with a GitHub Actions workflow — adds CI dependency, overkill for a personal site.

### 3. Search: build-time index vs runtime scan

**Decision:** Runtime scan of `wiki/content/index.json` + on-demand fetch of article text for full-text queries. Results ranked by title-match first, then content-match.

**Rationale:** The wiki will stay small (< 100 articles); full-text scan of fetched Markdown is fast enough. No index file to maintain separately from article content.

**Alternative considered:** `lunr.js` pre-built index — useful at scale, unnecessary overhead for current size.

### 4. Command palette: custom vs library

**Decision:** Custom lightweight implementation (~100 lines) in `js/command-palette.js`.

**Rationale:** Needs are simple: static page list + wiki index fuzzy filter, keyboard navigation, Esc to close. No dependency justified. The palette is populated from `wiki/content/index.json` (wiki articles) plus a hardcoded page manifest.

### 5. PWA scope

**Decision:** Minimal — `manifest.json` for installability + service worker that caches the shell (HTML/CSS/JS) with a network-first strategy for content.

**Rationale:** Offline reading of previously visited pages is the primary value. Network-first ensures content is always fresh when online. Simple enough to implement without a service worker library.

## Risks / Trade-offs

- **CDN dependency for marked.js** → Mitigate with SRI hash; if CDN unavailable, wiki falls back to raw Markdown display (degraded but not broken)
- **Manual index.json maintenance** → Easy to forget when adding articles; mitigate with a clear comment in the file explaining this
- **Service worker update complexity** → Use a versioned cache name; on activation, delete old caches. Keep the SW simple to reduce bugs
- **Hash-based wiki routing breaks browser history expectations** → Acceptable for a personal tool; can be revisited with History API later

## Migration Plan

1. Deploy `manifest.json` and `sw.js` (additive, no changes to existing pages)
2. Update `wiki/index.html` to the new Markdown shell (wiki currently has minimal content — low risk)
3. Move existing wiki content to `.md` files in `wiki/content/`
4. Add command palette and search scripts (loaded on all pages via `<script>` in each HTML file)
5. No rollback needed for additive changes; wiki migration can be verified locally before push

## Open Questions

- Should the command palette be keyboard-only or also have a visible trigger button in the nav? (Proposed: add a small `⌘` icon in the nav that opens it, for discoverability)
- How many initial wiki articles to migrate? (Proposed: migrate all existing wiki content on first deploy)
