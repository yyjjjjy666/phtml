## ADDED Requirements

### Requirement: Site has a Web App Manifest
The site root SHALL serve a `manifest.json` file referenced from all HTML pages via `<link rel="manifest">`.

#### Scenario: Manifest is linked and valid
- **WHEN** any page is loaded
- **THEN** a `<link rel="manifest" href="/manifest.json">` is present in the `<head>`

#### Scenario: Manifest contains required fields
- **WHEN** `manifest.json` is fetched
- **THEN** it contains `name`, `short_name`, `start_url`, `display`, `background_color`, `theme_color`, and at least one icon entry

### Requirement: Site registers a service worker
The site SHALL register a service worker (`/sw.js`) on page load in browsers that support it.

#### Scenario: Service worker registers without error
- **WHEN** a supported browser loads any page
- **THEN** `navigator.serviceWorker.register('/sw.js')` is called and resolves without error

### Requirement: Service worker caches the shell on install
The service worker SHALL cache the site shell (HTML pages, `styles.css`, shared JS files) during the install event.

#### Scenario: Shell assets cached on first visit
- **WHEN** service worker installs for the first time
- **THEN** `index.html`, `css/styles.css`, and shared JS files are added to the cache

### Requirement: Service worker uses network-first strategy for content
The service worker SHALL attempt network fetch first; on network failure, fall back to the cache.

#### Scenario: Cached page served offline
- **WHEN** user visits a previously-loaded page while offline
- **THEN** the cached version is served

#### Scenario: Fresh content served when online
- **WHEN** user visits a page while online
- **THEN** the network response is served and the cache is updated

### Requirement: Old service worker caches are cleaned up on activation
The service worker SHALL delete caches from previous versions during the activate event.

#### Scenario: Old caches removed on update
- **WHEN** a new service worker activates
- **THEN** any cache entries not matching the current cache version name are deleted
