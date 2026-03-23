## MODIFIED Requirements

### Requirement: Tools nav dropdown on desktop
On viewports wider than 768px, hovering the "tools" nav item SHALL reveal a dropdown listing all tools. Clicking the "tools" nav item SHALL navigate to the hub page.

#### Scenario: Dropdown appears on hover
- **WHEN** a desktop user hovers over the "tools" nav item
- **THEN** a dropdown menu appears below it listing each tool as a clickable link

#### Scenario: Dropdown hidden on mobile
- **WHEN** the viewport is 768px or less
- **THEN** no hover dropdown is shown; tools links appear inside the nav drawer

## ADDED Requirements

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
