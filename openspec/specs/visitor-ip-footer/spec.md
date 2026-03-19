# Visitor IP Footer

## Requirements

### Requirement: Footer present on all pages
Every page of the site (index, docs, links, contact, gallery) SHALL include a `<footer id="visitor-footer">` element containing spans for IP, location, and org data.

#### Scenario: Footer rendered on every page
- **WHEN** any page is loaded
- **THEN** a footer element with `id="visitor-footer"` is present in the DOM containing `<span id="visitor-ip">`, `<span id="visitor-location">`, and `<span id="visitor-org">`

### Requirement: Visitor IP and location fetched and displayed
The footer SHALL asynchronously fetch the visitor's public IP, country, and city from `https://ipapi.co/json/` and display them in the footer. The `visitor-org` span is reserved in the DOM but remains empty.

#### Scenario: Successful fetch displays IP and location
- **WHEN** the page loads and the `ipapi.co` API responds successfully with a valid `ip` field
- **THEN** the `visitor-ip` span displays `"ip: <address>"` and the `visitor-location` span displays `"<city>, <country_name>"` (omitting any falsy parts)
- **AND** the `visitor-org` span remains empty

#### Scenario: Loading state shown during fetch
- **WHEN** the page loads before the API response arrives
- **THEN** the `visitor-ip` span displays `"loading..."` and the `visitor-location` span is empty

#### Scenario: Fallback on fetch failure
- **WHEN** the API request fails (network error, non-2xx response, or missing `ip` field in response)
- **THEN** the `visitor-ip` span displays `"ip info unavailable"`, `visitor-location` and `visitor-org` are cleared, and no error is thrown to the console

### Requirement: Session caching of visitor info
Fetched visitor data SHALL be persisted in `sessionStorage` under the key `"visitorInfo"` so that subsequent navigations within the same browser session skip the network request.

#### Scenario: Cached data used on re-navigation
- **WHEN** a page is loaded and `sessionStorage["visitorInfo"]` contains a previously fetched object with a valid `ip` field
- **THEN** the footer populates immediately from cache without making a network request

#### Scenario: Corrupt or incomplete cache ignored
- **WHEN** `sessionStorage["visitorInfo"]` exists but the parsed object has no `ip` field
- **THEN** the entry is removed from `sessionStorage` and a fresh fetch is made

### Requirement: Footer does not block page rendering
The visitor info fetch SHALL be initiated asynchronously and SHALL NOT block the initial render of any page.

#### Scenario: Page content loads immediately
- **WHEN** a page is opened with a slow network
- **THEN** all page content above the footer renders before the footer data is available

### Requirement: Footer visual design matches site theme
The footer SHALL use the site's design system: dark background (`#1e1e1e`), light text (`#E0E0E0`), `'Courier New', monospace` font, `14px` font size (smaller than body text), fixed-positioned at the bottom of the viewport with `6px 16px` padding.

#### Scenario: Footer styled consistently
- **WHEN** the footer is rendered with data
- **THEN** the footer background is `#1e1e1e`, text color is `#E0E0E0`, font is `'Courier New', monospace` at `14px`, and spans are separated by `24px` gap

### Requirement: Footer fixed at bottom of viewport
The footer SHALL be fixed to the bottom of the viewport so it remains visible without scrolling. On viewports ≤600px the footer flex container SHALL wrap its spans (`flex-wrap: wrap`) and reduce the gap to `12px` so content does not overflow horizontally.

#### Scenario: Footer visible on scroll
- **WHEN** a user scrolls down on a long page
- **THEN** the footer remains visible at the bottom of the screen

#### Scenario: Main content not obscured by footer
- **WHEN** any page is fully loaded on desktop (>600px)
- **THEN** the main content area has `padding-bottom: 40px` so it is not hidden behind the fixed footer

#### Scenario: Footer wraps on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the footer spans wrap to multiple lines rather than overflowing horizontally, and the gap between spans is `12px`

#### Scenario: Main content not obscured on mobile
- **WHEN** any page is fully loaded on mobile (≤600px)
- **THEN** the main content area has at least `60px` of bottom padding to account for a potentially two-line footer
