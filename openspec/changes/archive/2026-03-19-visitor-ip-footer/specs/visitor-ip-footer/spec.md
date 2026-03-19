## ADDED Requirements

### Requirement: Footer present on all pages
Every page of the site (index, docs, links, contact, gallery) SHALL include a `<footer id="visitor-footer">` element containing spans for IP, location, and org data.

#### Scenario: Footer rendered on every page
- **WHEN** any page is loaded
- **THEN** a footer element with `id="visitor-footer"` is present in the DOM

### Requirement: Visitor IP and related info fetched and displayed
The footer SHALL asynchronously fetch the visitor's public IP, country, city, and ISP/organisation from `https://ipwho.is/` and display them in the footer.

#### Scenario: Successful fetch displays IP info
- **WHEN** the page loads and the `ipwho.is` API responds successfully
- **THEN** the footer displays the visitor's public IP address, country and city, and ISP/org name

#### Scenario: Loading state shown during fetch
- **WHEN** the page loads before the API response arrives
- **THEN** the footer displays a loading indicator (e.g., "loading...")

#### Scenario: Fallback on fetch failure
- **WHEN** the API request fails (network error or non-2xx response)
- **THEN** the footer displays "ip info unavailable" and no error is thrown to the console

### Requirement: Footer does not block page rendering
The visitor info fetch SHALL be initiated asynchronously and SHALL NOT block the initial render of any page.

#### Scenario: Page content loads immediately
- **WHEN** a page is opened with a slow network
- **THEN** all page content above the footer renders before the footer data is available

### Requirement: Footer visual design matches site theme
The footer SHALL use the site's design system: dark background (`#2C2C2C` or slightly different shade), light text (`#E0E0E0`), `'Courier New', monospace` font, smaller font size than body text.

#### Scenario: Footer styled consistently
- **WHEN** the footer is rendered with data
- **THEN** the footer background, font, and text color are consistent with the rest of the site

### Requirement: Footer fixed at bottom of viewport
The footer SHALL be fixed to the bottom of the viewport so it remains visible without scrolling.

#### Scenario: Footer visible on scroll
- **WHEN** a user scrolls down on a long page
- **THEN** the footer remains visible at the bottom of the screen

#### Scenario: Main content not obscured by footer
- **WHEN** any page is fully loaded
- **THEN** the main content area has sufficient bottom padding so it is not hidden behind the fixed footer
