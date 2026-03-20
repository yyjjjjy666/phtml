## Context

The site currently shows minimal IP info (ip, city, country) in a fixed footer on every page via `visitor-info.js` + `ipapi.co/json/`. The API actually returns ~25 fields covering network, location, timezone, currency, and more. Moving this to a dedicated tool page unlocks showing all fields without any layout constraint.

## Goals / Non-Goals

**Goals:**
- Remove footer + visitor-info.js entirely from all pages
- New `/tools/ip` page that displays every useful field from `ipapi.co/json/`
- Fields grouped into logical sections: Network, Location, Time, Economy, Coordinates
- Lookup any IP (not just own) via an optional input field
- Light/dark theme support

**Non-Goals:**
- Map embed (no external map dependencies)
- Bulk IP lookup
- Historical lookup or caching across sessions beyond the same page visit

## Decisions

### API: keep `ipapi.co/json/`

`ipapi.co` is already in use and returns the richest free response (~25 fields). For custom IP lookup: `https://ipapi.co/<ip>/json/`. No key required for moderate traffic.

**Fields to display:**

| Group | Fields |
|---|---|
| Network | `ip`, `version`, `asn`, `org` |
| Location | `city`, `region`, `region_code`, `country_name`, `country_code`, `country_code_iso3`, `continent_code`, `postal`, `in_eu`, `country_capital` |
| Time | `timezone`, `utc_offset`, `country_calling_code` |
| Economy | `currency`, `currency_name`, `languages`, `country_population`, `country_area` |
| Coordinates | `latitude`, `longitude` |

### Layout: two-column definition list

Each group renders as a `<dl>` with `<dt>` (label) and `<dd>` (value) pairs. Two-column on desktop, single-column on mobile. Keeps output scannable without a table.

### Custom IP input

A text input + "look up" button at the top. Empty = own IP (`ipapi.co/json/`). Any value = `ipapi.co/<input>/json/`. Basic validation: reject obviously non-IP strings client-side; API handles invalid IPs and returns an error object.

### ip-tool.js as standalone script

`js/ip-tool.js` handles fetch, render, and the optional lookup input. No sessionStorage needed — users actively visit this page to look up IPs, caching is not important.

## Risks / Trade-offs

- [ipapi.co free tier rate limit ~1000 req/day] → Acceptable for personal site; no change needed.
- [Removing footer breaks the `padding-bottom` on main] → Safe to reduce `main { padding-bottom }` to `20px` globally; mobile still needs enough padding for the fixed-position hamburger nav.
- [`in_eu` / `country_area` may be null for some IPs] → Render "—" for null/undefined fields.

## Migration Plan

1. Remove footer HTML from all 7 pages
2. Remove `visitor-info.js` script tags from all 7 pages; delete the file
3. Remove footer CSS; adjust `main` padding
4. Create `tools/ip/` directory and `index.html`
5. Create `js/ip-tool.js`
6. Add to tools dropdown on all pages + tools hub listing
