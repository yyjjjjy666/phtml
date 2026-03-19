## 1. .gitignore

- [x] 1.1 Create `.gitignore` at repo root covering: `.DS_Store`, `Thumbs.db`, `desktop.ini`, `*.lnk`, `~$*`, `*.tmp`, `*.swp`, `.vscode/` (optional local settings)

## 2. CSS — Dropdown Styles

- [x] 2.1 Add `/* === dropdown === */` section to `css/styles.css` with styles for `.dropdown` (position relative), `.dropdown-menu` (absolute, hidden by default, `#383838` bg, `z-index: 100`, min-width, no list style), `.dropdown-menu a` (block display, padding, color `#EEEEEE`), `.dropdown:hover .dropdown-menu` (display block), and `@media (max-width: 600px) { .dropdown-menu { display: none !important; } }`

## 3. Rename `docs/` → `files/`

- [x] 3.1 Rename the folder `docs/` to `files/` (contains personal guide files: `.txt`, `.pdf`)

## 4. Create page subfolders with index.html

- [x] 4.1 `docs.html` → `docs/index.html` (update file links from `docs/filename` to `/files/filename`)
- [x] 4.2 `links.html` → `links/index.html`
- [x] 4.3 `gallery.html` → `gallery/index.html`
- [x] 4.4 `contact.html` → `contact/index.html`

## 5. Move wheel into tools section

- [x] 5.1 Create `tools/wheel/` directory
- [x] 5.2 Copy `wheel.html` content into `tools/wheel/index.html`; update all paths to root-relative; set `tools` nav item to `class="active"`; delete `wheel.html`

## 6. Create tools hub page

- [x] 6.1 Create `tools/index.html`: shared head (title "tools"), nav with "tools" active, `<main>` with heading "tools" and a list of links to each tool starting with `<li><a href="/tools/wheel">wheel</a> — spin a custom fortune wheel</li>`; footer + visitor-info script

## 7. Update `index.html` (root)

- [x] 7.1 Update all nav `href` values in `index.html` to root-relative (`/docs`, `/links`, `/gallery`, `/tools`, `/contact`); add tools dropdown markup; update asset paths (`/css/styles.css`, `/js/visitor-info.js`)

## 8. Update nav markup on all pages to include dropdown

- [x] 8.1 Apply dropdown nav markup to `docs/index.html`
- [x] 8.2 Apply dropdown nav markup to `links/index.html`
- [x] 8.3 Apply dropdown nav markup to `gallery/index.html`
- [x] 8.4 Apply dropdown nav markup to `contact/index.html`
- [x] 8.5 Apply dropdown nav markup to `tools/index.html` (set tools `class="active"`)
- [x] 8.6 Apply dropdown nav markup to `tools/wheel/index.html` (set tools `class="active"`)
- [x] 8.7 Apply dropdown nav markup to `index.html`

## 9. Update CLAUDE.md

- [x] 9.1 Update `CLAUDE.md` to reflect new directory structure: subfolder pages, `files/` instead of `docs/`, tools section, root-relative paths, and note about clean URLs via `folder/index.html` pattern

## 10. Verification

- [x] 10.1 Serve with `python -m http.server 8080`; confirm `localhost:8080/docs`, `/links`, `/gallery`, `/contact`, `/tools`, `/tools/wheel` all load correctly
- [x] 10.2 Confirm hover over "tools" shows dropdown on desktop
- [x] 10.3 Confirm at 375px width dropdown is hidden and tapping "tools" navigates to hub
- [x] 10.4 Confirm visitor-info footer loads on all pages
- [x] 10.5 Confirm gallery lightbox still works at `/gallery`
- [x] 10.6 Confirm wheel still works at `/tools/wheel`
- [x] 10.7 Run `git status` and confirm no `.DS_Store`, `Thumbs.db`, or temp files appear
