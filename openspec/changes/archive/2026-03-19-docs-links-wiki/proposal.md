## Why

The nav has two separate items — "docs" and "links" — for what is essentially the same kind of content: curated text lists of personal references. Merging them into a single "wiki" page reduces nav clutter from 6 items to 5, and gives a natural home for any future reference content (notes, bookmarks, guides) without adding more nav items.

The hub+subpages pattern (as used for tools) is deliberately **not** used here. Each tool is a self-contained interactive application that warrants its own page. Docs and links are both plain content lists; a single page with two sections and anchor navigation is simpler and requires fewer clicks.

## What Changes

- New page at `geller.ee/wiki` — combined docs + links content, two `<section>` blocks with `id="docs"` and `id="links"` for anchor deep-linking
- Nav on all pages: remove `docs` and `links` items, add single `wiki` item
- `docs/index.html` and `links/index.html` replaced with `<meta http-equiv="refresh">` redirects to `/wiki` (so old URLs don't 404)
- No CSS changes needed — existing `.links` styling applies

## Capabilities

### New Capabilities

- `wiki`: Combined reference page at `geller.ee/wiki` merging docs and links content

### Modified Capabilities

- `site-structure`: Nav loses `docs` and `links`, gains `wiki`

## Impact

- `wiki/index.html` — new file (combined content)
- `docs/index.html` — replaced with redirect to `/wiki`
- `links/index.html` — replaced with redirect to `/wiki`
- All `index.html` nav blocks — remove two items, add one
