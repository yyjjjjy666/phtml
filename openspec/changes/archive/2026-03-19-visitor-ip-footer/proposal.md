## Why

The site's todo list calls out "public ip of visitor (and other related info)" as a planned feature. Adding a footer that fetches and displays the visitor's IP address plus additional metadata (ISP, country, city) makes the site more interactive and informative without requiring a backend.

## What Changes

- Add a shared `<footer>` element to all five pages displaying the visitor's public IP and related info (country, city, ISP/org)
- Create `js/visitor-info.js` to fetch visitor data from a free public IP geolocation API and render it in the footer
- Add footer CSS rules to `css/styles.css` consistent with the site's dark theme
- Remove "public ip of visitor (and other related info)" from the todo list in `index.html`

## Capabilities

### New Capabilities

- `visitor-ip-footer`: Footer widget on every page that fetches the visitor's public IP, country, city, and ISP/org from a third-party IP geolocation API and displays them asynchronously; shows a loading state while fetching and a graceful fallback if the request fails

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- Modified: `index.html`, `docs.html`, `links.html`, `contact.html`, `gallery.html` (footer + script tag added)
- Modified: `css/styles.css` (footer styles)
- New file: `js/visitor-info.js`
- External dependency: a free public IP geolocation API (e.g., `https://ipapi.co/json/` or `https://ipwho.is/`) — no API key required, CORS-friendly
- No build process changes; pure HTML/CSS/vanilla JS
