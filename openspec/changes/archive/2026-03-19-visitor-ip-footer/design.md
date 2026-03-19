## Context

The site is a zero-dependency static HTML website hosted on GitHub Pages. There is no server-side code. The only way to detect the visitor's IP is to call a third-party client-side IP geolocation API from the browser. All five pages (index, docs, links, contact, gallery) share one stylesheet and must show the same footer.

## Goals / Non-Goals

**Goals:**
- Display visitor's public IP, country, city, and ISP/org in a footer on every page
- Fetch data asynchronously so it never blocks page rendering
- Show a loading state while the request is in flight
- Show a graceful fallback message if the API request fails

**Non-Goals:**
- Server-side IP detection
- Storing or logging visitor data anywhere
- Geolocation map display
- IP-based access control or analytics

## Decisions

### 1. Use `ipwho.is` as the IP geolocation API

**Decision:** Call `https://ipwho.is/` (free, no API key, CORS-enabled, returns JSON).

**Rationale:** No API key required, no rate-limit registration, returns IP + country + city + org/ISP in one request. Alternative `ipapi.co` was considered but has a tighter free-tier rate limit (1000/day). `ipwho.is` is more liberal and simpler to use.

### 2. Vanilla `fetch()` in a shared `js/visitor-info.js`

**Decision:** A single JS file is linked at the bottom of `<body>` on every page. It looks for `<span id="visitor-ip">`, `<span id="visitor-location">`, `<span id="visitor-org">` inside `<footer id="visitor-footer">` and populates them.

**Rationale:** Consistent with the project's no-framework approach. A single script file keeps logic DRY while simple span IDs make the DOM contract clear and easy to test manually.

### 3. Footer as a fixed bottom bar

**Decision:** Use `position: fixed; bottom: 0` styling so the footer is always visible without scrolling; small font size (14px) and subdued color so it doesn't compete with page content.

**Rationale:** Makes the visitor info always accessible. A static footer at document end would be invisible on short pages or require scrolling on long ones.

### 4. Graceful degradation

**Decision:** On fetch failure (network error or non-OK status), display "ip info unavailable".

**Rationale:** The feature is informational only; a hard failure should never break the page or distract from content.

## Risks / Trade-offs

- [Third-party API availability] `ipwho.is` could be down → Display "ip info unavailable" fallback; no user action needed
- [API rate limits] Free tier may throttle heavy traffic → Acceptable for a personal blog with low traffic
- [Privacy perception] Some visitors may be surprised to see their IP displayed → The information shown is already freely visible on many sites; no persistent storage
- [Fixed footer overlap] Footer may cover page content at bottom → Add `padding-bottom` to `<main>` to prevent content from being hidden under the footer

## Open Questions

- Which fields besides IP are most useful to show? → Default: IP, country + city, ISP/org (all returned by `ipwho.is` in one call)
