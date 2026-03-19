## Context

Static HTML site on GitHub Pages (`geller.ee`). No build tooling, no framework, no package manager. Six pages today, more planned. Tools will be added regularly. Must work from `python -m http.server` locally.

## Goals / Non-Goals

**Goals:**
- Clean URLs (`geller.ee/wheel`, not `geller.ee/wheel.html`) via subfolder `index.html` pattern
- Scalable nav: new tools go under `/tools/` without touching the top-level nav items
- CSS-only hover dropdown for tools on desktop; hub page as mobile fallback
- Root-relative paths (`/css/styles.css`) throughout so paths work from any subfolder depth
- `.gitignore` covering OS, editor, and OneDrive temp files

**Non-Goals:**
- Any build step or tooling
- Server-side routing or rewrites
- Changing the visual design
- Splitting `css/styles.css` into multiple files

## Decisions

### 1. Clean URLs via `folder/index.html`

**Decision:** Each page moves from `page.html` at root to `page/index.html`. GitHub Pages serves `index.html` when a directory is requested, producing `geller.ee/page`.

**Rationale:** Only approach that works on GitHub Pages without server config. No `.htaccess`, no `_redirects` file, no JS redirect hacks.

### 2. Root-relative paths

**Decision:** All `href`, `src` attributes use paths starting with `/` (e.g., `/css/styles.css`, `/js/visitor-info.js`, `/gallery`).

**Rationale:** Relative paths break when HTML files are nested at different depths (`../../css/styles.css` is fragile). Root-relative paths work identically from any depth. Tradeoff: `file://` protocol breaks — acceptable since the site is served via `python -m http.server` locally and deployed to `geller.ee`.

### 3. Tools section at `/tools`

**Decision:** Interactive tools live at `tools/<name>/index.html` (`geller.ee/tools/wheel`). A hub page at `tools/index.html` lists all tools. The nav shows a single "tools" item.

**Rationale:** Prevents nav from growing unboundedly as tools are added. Hub page gives mobile users a way to discover all tools. Consistent URL namespace (`/tools/*`) makes it obvious what's a tool vs a content page.

### 4. CSS-only hover dropdown, hidden on mobile

**Decision:** `.dropdown:hover .dropdown-menu { display: block; }` on desktop. On mobile (≤600px), dropdown is `display: none !important` — the "tools" link navigates to the hub.

**Rationale:** No JS required. On touch devices, `:hover` is unreliable; hiding the dropdown and relying on the hub page is the cleanest fallback. The hub page content is identical to what the dropdown shows, so no information is lost.

### 5. Rename personal files folder `docs/` → `files/`

**Decision:** The folder containing personal guide files (`.txt`, `.pdf`) is renamed from `docs/` to `files/`. The docs page moves to `docs/index.html`.

**Rationale:** `docs/` is needed for the docs page subfolder. `files/` is a more accurate name for raw downloadable files anyway. All `href` links in the docs page update from `docs/filename` to `/files/filename`.

### 6. Single `css/styles.css`

**Decision:** Keep one stylesheet. Add a `/* === dropdown === */` section for the new nav styles.

**Rationale:** At ~220 lines after this change, splitting adds more link-tag maintenance than it saves in readability. Revisit at ~600 lines.

## Risks / Trade-offs

- [Broken bookmarks] Existing URLs like `geller.ee/wheel.html` will 404 after restructure → GitHub Pages has no redirect support for static files; acceptable for a personal site with low external linking
- [file:// breakage] Root-relative paths don't work when opening files directly → already mitigated by using `python -m http.server`
- [openspec archive paths] Archive references in CLAUDE.md may need updating → update CLAUDE.md as part of this change

## Open Questions

- None — all decisions resolved during exploration session.
