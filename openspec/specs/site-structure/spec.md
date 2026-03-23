# Site Structure

## Requirements

### Requirement: Clean URLs for all pages
Every page SHALL be accessible without a file extension. URLs SHALL follow the pattern `geller.ee/<page>` for top-level pages and `geller.ee/tools/<tool>` for tools.

#### Scenario: Top-level page URL
- **WHEN** a user navigates to `geller.ee/wiki`, `geller.ee/gallery`, or `geller.ee/contact`
- **THEN** the correct page loads without a `.html` extension in the URL

#### Scenario: Tool URL
- **WHEN** a user navigates to `geller.ee/tools/wheel`
- **THEN** the wheel tool page loads

### Requirement: Tools hub page
A page at `geller.ee/tools` SHALL list all available interactive tools with their names and brief descriptions. The homepage at `geller.ee/` SHALL also serve as a personal dashboard with widgets for clock, weather, tasks, search, and quick links.

#### Scenario: Hub lists all tools
- **WHEN** a user visits `geller.ee/tools`
- **THEN** all available tools are listed with links to their individual pages, including "wheel", "password", and "ip"

#### Scenario: Homepage serves as dashboard
- **WHEN** a user visits `geller.ee/`
- **THEN** the homepage displays personal dashboard widgets including a clock, weather, time progress bars, search bar, daily tasks, quick links, daily intention, and a quote of the day

### Requirement: Tools nav dropdown on desktop
On viewports wider than 768px, hovering the "tools" nav item SHALL reveal a dropdown listing all tools. Clicking the "tools" nav item SHALL navigate to the hub page.

#### Scenario: Dropdown appears on hover
- **WHEN** a desktop user hovers over the "tools" nav item
- **THEN** a dropdown menu appears below it listing each tool as a clickable link, including "wheel", "password", and "ip"

#### Scenario: Dropdown hidden on mobile
- **WHEN** the viewport is 768px or less
- **THEN** no hover dropdown is shown; tools links appear inside the nav drawer

### Requirement: .gitignore present
The repository SHALL contain a `.gitignore` file that prevents OS-generated files, editor temp files, and OneDrive sync artifacts from appearing in git status.

#### Scenario: Common noise files excluded
- **WHEN** `.DS_Store`, `Thumbs.db`, `desktop.ini`, or `*.tmp` files are present
- **THEN** they do not appear in `git status`

### Requirement: Search route at /search
A search page SHALL exist at `geller.ee/search` that accepts a `?q=` query parameter, searches wiki content, and renders ranked results.

#### Scenario: URL query populates search
- **WHEN** a user navigates to `geller.ee/search?q=<query>`
- **THEN** the search page runs the query against wiki content and displays ranked results on load

#### Scenario: Input triggers live search
- **WHEN** a user types in the search input and presses Enter
- **THEN** the URL is updated to `?q=<value>` and results re-render without a full page reload

### Requirement: Command palette trigger in navbar
Every page's navbar SHALL include a trigger element that opens the command palette. The palette SHALL also be openable via the keyboard shortcut Ctrl+K / Cmd+K globally.

#### Scenario: Navbar button opens palette
- **WHEN** a user clicks the command palette trigger in the navbar
- **THEN** the command palette overlay opens

#### Scenario: Keyboard shortcut opens palette
- **WHEN** a user presses Ctrl+K (or Cmd+K on macOS) on any page
- **THEN** the command palette overlay opens

### Requirement: PWA manifest and service worker registration
Every HTML page SHALL link a `manifest.json` and register a service worker so the site qualifies as a Progressive Web App and can be installed on supported devices.

#### Scenario: Manifest linked on all pages
- **WHEN** any page on `geller.ee` is loaded
- **THEN** the `<head>` contains `<link rel="manifest" href="/manifest.json">`

#### Scenario: Service worker registered
- **WHEN** any page on `geller.ee` is loaded in a browser that supports service workers
- **THEN** `/sw.js` is registered as the service worker for the origin

### Requirement: Navbar displays site wordmark
The navbar SHALL display `geller.ee` as a styled monospace wordmark at the left end on all viewports.

#### Scenario: Wordmark visible on all pages
- **WHEN** any page is loaded
- **THEN** `geller.ee` is visible at the left of the navbar as a link to the homepage

### Requirement: Google Fonts loaded on all pages
All HTML pages SHALL include `<link>` preconnect tags for `fonts.googleapis.com` and `fonts.gstatic.com`, and a stylesheet link loading Inter and JetBrains Mono.

#### Scenario: Font links present in head
- **WHEN** any page is loaded
- **THEN** the `<head>` contains preconnect links and a Google Fonts stylesheet link for Inter and JetBrains Mono

### Requirement: Page titles follow site pattern
Every page `<title>` SHALL follow the pattern `<page name> — geller.ee` (e.g., `wiki — geller.ee`). The homepage title SHALL be `geller.ee`.

#### Scenario: Page title format
- **WHEN** any non-homepage page is loaded
- **THEN** the browser tab title shows `<page name> — geller.ee`

### Requirement: Root-relative internal paths
All internal `href` and `src` attributes in every HTML file SHALL use root-relative paths (starting with `/`) rather than relative paths.

#### Scenario: Asset paths work from any subfolder
- **WHEN** any page at any folder depth is loaded from `geller.ee`
- **THEN** CSS, JS, and image assets load correctly without path traversal (`../../`)
