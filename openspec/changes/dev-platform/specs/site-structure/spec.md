## ADDED Requirements

### Requirement: Search route exists at /search
The site SHALL serve a page at `geller.ee/search` that accepts a `?q=` query parameter and displays matching results.

#### Scenario: Search page loads at /search
- **WHEN** user navigates to `geller.ee/search`
- **THEN** the search page loads with a query input field

### Requirement: Navbar includes command palette trigger
The navbar SHALL include a trigger element (e.g., a `⌘` icon button) that opens the command palette on click.

#### Scenario: Palette trigger present in navbar
- **WHEN** any page is loaded
- **THEN** a command palette trigger element is visible in the navbar

### Requirement: Site includes manifest and service worker registration
Every HTML page SHALL link to `manifest.json` and register `/sw.js` for PWA support.

#### Scenario: Manifest linked in every page
- **WHEN** any page is loaded
- **THEN** `<link rel="manifest" href="/manifest.json">` is present in `<head>`

#### Scenario: Service worker registered on page load
- **WHEN** any page loads in a supporting browser
- **THEN** `/sw.js` is registered via `navigator.serviceWorker.register`
