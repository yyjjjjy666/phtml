## Context

Static GitHub Pages site. No server config, no build step. All URL routing is done via `folder/index.html`. The nav currently has: main page | docs | links | gallery | tools | contact (6 items).

Existing content:
- `docs/`: 6 sections — linux (2), windows (1), network (2), software configs (1), documents (1), scripts (2)
- `links/`: 4 sections — software (4), services & tools (tech 7 + ai 4), media (1), study (6)

## Goals / Non-Goals

**Goals:**
- Single `wiki/index.html` containing all docs + links content
- Old `/docs` and `/links` URLs redirect gracefully (no 404)
- Nav simplified from 6 to 5 items
- Anchor links (`/wiki#docs`, `/wiki#links`) work for deep-linking

**Non-Goals:**
- Search or filter functionality
- Section-level subpages
- Any CSS changes (existing `.links` styling already covers this)

## Decisions

### D1: Single page with two `<section>` blocks
**Decision:** `wiki/index.html` uses `<section id="docs">` and `<section id="links">` as top-level dividers.
**Why:** The page is short enough to scroll. Anchor IDs enable deep-linking. No JS needed.

### D2: `<meta refresh>` redirects for old URLs
**Decision:** Replace `docs/index.html` and `links/index.html` content with `<meta http-equiv="refresh" content="0; url=/wiki">`.
**Why:** GitHub Pages has no `.htaccess` or redirect config. Meta-refresh is the only client-side redirect available. `content="0"` means instant redirect.

### D3: Keep `docs/` and `links/` directories
**Decision:** Leave the folders in place (they now contain only the redirect HTML). Do not delete them.
**Why:** Safe — no risk of accidentally breaking unrelated references. The redirected files are tiny.

### D4: Nav order
**Decision:** Replace the two nav items with a single `wiki` item in the same position as `docs` was (second slot): main page | wiki | gallery | tools | contact.
**Why:** Keeps the nav order stable. Gallery and tools/contact stay in their expected positions.

### D5: Content migration
**Decision:** Copy all content from both pages verbatim into `wiki/index.html`, docs section first, then links. No content is removed or reorganized.
**Why:** Avoids any risk of losing items during migration. Content curation is a separate concern.

## Migration Plan

1. Create `wiki/index.html` with merged content
2. Replace `docs/index.html` with redirect
3. Replace `links/index.html` with redirect
4. Update nav on all pages (remove docs + links, add wiki)
5. No server changes needed; GitHub Pages serves `wiki/index.html` at `geller.ee/wiki`
