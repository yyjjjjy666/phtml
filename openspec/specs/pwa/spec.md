# PWA (Progressive Web App)

## Requirements

### Requirement: Web app manifest
A `manifest.json` file SHALL exist at the site root and SHALL be linked from every HTML page's `<head>`. The manifest SHALL include the fields required for PWA installability.

#### Scenario: Manifest contains required fields
- **WHEN** `/manifest.json` is fetched
- **THEN** the response contains `name`, `short_name`, `start_url`, `display`, `background_color`, `theme_color`, and `icons` fields

#### Scenario: Manifest linked on all pages
- **WHEN** any page on `geller.ee` is loaded
- **THEN** the `<head>` contains `<link rel="manifest" href="/manifest.json">`

### Requirement: Service worker with caching
A `sw.js` file SHALL exist at the site root and SHALL implement install, fetch, and activate lifecycle handlers for offline shell caching.

#### Scenario: Install handler caches shell assets
- **WHEN** the service worker installs
- **THEN** the install handler pre-caches the core shell assets (HTML pages, CSS, JS)

#### Scenario: Fetch handler is network-first
- **WHEN** a resource is requested while the service worker is active
- **THEN** the service worker attempts a network fetch first, falling back to the cache if the network is unavailable

#### Scenario: Activate handler purges old caches
- **WHEN** a new service worker version activates
- **THEN** caches from previous versions are deleted

### Requirement: Service worker registered on every page
Every HTML page SHALL include a service worker registration script so the worker is active regardless of which page the user first visits.

#### Scenario: Registration runs on page load
- **WHEN** any page on `geller.ee` is loaded in a browser that supports service workers
- **THEN** `navigator.serviceWorker.register('/sw.js')` is called

### Requirement: PWA installable in Chrome
The site SHALL meet Chrome's PWA installability criteria so that the browser install prompt appears for eligible users.

#### Scenario: Install prompt appears
- **WHEN** a user visits `geller.ee` in Chrome on desktop or Android
- **THEN** Chrome's install prompt or the install icon in the address bar becomes available
