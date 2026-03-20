## Why

The footer IP display is minimal (only ip + city/country) and clutters every page. Moving it to a dedicated tool page allows showing the full richness of the `ipapi.co` API response — timezone, ASN, currency, coordinates, calling code, and more — without crowding the layout of unrelated pages.

## What Changes

- **BREAKING** Remove `<footer id="visitor-footer">` and its three spans from all 7 pages
- **BREAKING** Remove `<script src="/js/visitor-info.js">` from all 7 pages
- **BREAKING** Delete `js/visitor-info.js` (logic moves into new tool script)
- Remove `#visitor-footer` CSS block from `css/styles.css`
- Remove `main { padding-bottom }` overrides that existed solely to clear the fixed footer
- Create `tools/ip/index.html` — new tool page at `geller.ee/tools/ip`
- Create `js/ip-tool.js` — fetches `ipapi.co/json/`, renders all available fields in grouped sections
- Add `tools/ip` entry to the tools dropdown nav on all pages and to `tools/index.html` listing

## Capabilities

### New Capabilities

- `ip-lookup-tool`: Dedicated page displaying full IP geolocation data from `ipapi.co` — network info, location, timezone, currency, language, coordinates

### Modified Capabilities

- `visitor-ip-footer`: Footer and its requirements are fully removed — **BREAKING**
- `site-structure`: New tool page `tools/ip` added to nav dropdown and tools hub

## Impact

- All 7 `index.html` pages — footer HTML and visitor-info script removed, tools dropdown updated
- `css/styles.css` — footer styles removed, padding-bottom adjustments revisited
- `js/visitor-info.js` — deleted
- `tools/index.html` — new ip tool listing added
- New files: `tools/ip/index.html`, `js/ip-tool.js`
