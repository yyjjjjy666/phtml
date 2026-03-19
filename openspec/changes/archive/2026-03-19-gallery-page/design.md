## Context

The site is a static HTML personal website at `geller.ee` (four pages, one shared stylesheet `css/styles.css`). No build tooling, no framework, no package manager. The `images/` directory is currently empty. Navigation is a shared `<nav class="navbar">` pattern — every page must be updated when a new nav item is added.

## Goals / Non-Goals

**Goals:**
- Add a fifth page (`gallery.html`) with a masonry-style image grid
- Support grouping images by category using section headings
- Provide a lightbox overlay to view full-size images on click, implemented with vanilla JS (no libraries)
- Keep visual design consistent with the existing dark theme (background `#2C2C2C`, accent `#e0ff03`, monospace font)
- Add gallery nav link to all existing pages

**Non-Goals:**
- Dynamic image loading (no API, no directory scanning — HTML is manually maintained)
- External image hosting or CDN integration
- Image upload / CMS functionality
- Server-side rendering or any build step
- Pagination or infinite scroll (future concern)

## Decisions

### 1. Masonry layout via CSS columns

**Decision:** Use CSS `column-count` / `column-gap` for the masonry layout.

**Rationale:** No JS required for layout; works natively in all modern browsers; keeps the zero-dependency philosophy of the project. Alternative of CSS Grid with `grid-template-rows: masonry` was considered but has very limited browser support (experimental in Firefox only as of writing).

### 2. Lightbox via vanilla JS + CSS overlay

**Decision:** Implement a minimal lightbox with a single `<div id="lightbox">` overlay toggled by vanilla JS `onclick` handlers on `<img>` tags.

**Rationale:** The project already mentions that `js/` will eventually hold scripts. A lightweight inline script (or a `js/gallery.js` file) keeps dependencies at zero while providing the expected UX. No external lightbox library needed given the simplicity of requirements.

### 3. Images stored in `images/` folder; HTML references maintained manually

**Decision:** Images live in the `images/` folder; `gallery.html` references them with relative paths. Sections/categories are static HTML `<section>` blocks.

**Rationale:** Matches the project's "no build process" constraint. Updating the gallery requires editing `gallery.html` directly, which is consistent with how other pages work.

### 4. Add `gallery` as the fourth nav item (between `links` and `contact`)

**Decision:** Insert `gallery.html` as a nav item after `links` and before `contact`.

**Rationale:** Logical grouping — visual content comes after text content pages. All five files must be updated.

## Risks / Trade-offs

- [Manual HTML maintenance] Adding images requires editing `gallery.html` → Acceptable given the site's small scale; document the process in a comment block inside `gallery.html`
- [Masonry layout reflow] CSS columns can produce uneven gaps with portrait/landscape-mixed images → Acceptable visual quirk; can improve with `break-inside: avoid` on image wrappers
- [Lightbox accessibility] Simple JS lightbox may not handle screen readers well → Low priority for a personal site; can add `aria-` attributes later
- [Empty images/ directory] Gallery.html will be committed with placeholder structure since there are currently no images → Add placeholder note or a sample section with commented-out examples

## Open Questions

- Should the gallery nav item be named "gallery" or something else (e.g., "photos")?  → Default to "gallery" to match the page file name; easy to change later.
- Should category sections be collapsible? → No, keep it simple for v1.
