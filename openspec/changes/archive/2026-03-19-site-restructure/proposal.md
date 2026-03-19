## Why

The site is growing beyond a handful of flat HTML files. Three problems have emerged:
1. URLs expose `.html` extensions (`geller.ee/wheel.html`), which looks unpolished
2. Every new tool gets its own top-level nav item — the nav will become unmanageable
3. There is no `.gitignore`, causing OS/editor noise to appear in git status when working across machines

This change restructures the site to support clean URLs, a scalable tools section, and proper git hygiene — without introducing any build tooling.

## What Changes

- Add `.gitignore` (OS files, editor temp files)
- Move each page into its own folder (`page/index.html`) for clean URLs
- Rename `docs/` (personal guide files) → `files/` to free the `docs/` name for the docs page folder
- Move `wheel.html` into `tools/wheel/index.html`; add a `tools/index.html` hub page
- Switch all internal paths to root-relative (`/css/`, `/js/`, `/files/`) so they work from any subfolder depth
- Add a CSS-only hover dropdown on the "tools" nav item (desktop); on mobile the dropdown is hidden and the hub page serves as the tool index
- Keep a single `css/styles.css`; add dropdown styles in a new section

## Capabilities

### New Capabilities

- `tools-section`: A `/tools` hub page listing all interactive tools, with a CSS hover dropdown in the desktop nav. New tools are added by creating `tools/<name>/index.html` and one `<li>` in the dropdown.

### Modified Capabilities

- `site-navigation`: Nav updated to use root-relative hrefs and include the tools dropdown
- `fortune-wheel`: Moved from `/wheel` to `/tools/wheel`
- `image-gallery`: Moved from `/gallery.html` to `/gallery`
- All existing pages: clean URLs, root-relative asset paths

## Impact

- New file: `.gitignore`
- New folder: `tools/` (hub + wheel subfolder)
- New folder per page: `docs/`, `links/`, `gallery/`, `contact/` (each with `index.html`)
- Renamed: `docs/` → `files/` (personal guide files)
- Removed: `docs.html`, `links.html`, `gallery.html`, `contact.html`, `wheel.html` (replaced by index.html in subfolders)
- Modified: `css/styles.css` (dropdown styles added)
- Modified: `CLAUDE.md` (reflects new structure)
- All `href`, `src`, `action` paths in every HTML file updated to root-relative
