## MODIFIED Requirements

### Requirement: Theme toggle button in nav
Every page SHALL display a theme toggle button at the right end of the nav bar. The button SHALL show a sun icon (☀) when the current theme is dark and a crescent icon (☾) when the current theme is light. The toggle SHALL also update the active Prism.js CSS theme link when applicable.

#### Scenario: Button visible on all pages
- **WHEN** any page is loaded
- **THEN** a theme toggle button is visible at the right side of the nav bar

#### Scenario: Dark mode shows sun icon
- **WHEN** the current theme is dark
- **THEN** the button displays ☀ indicating "switch to light"

#### Scenario: Light mode shows crescent icon
- **WHEN** the current theme is light
- **THEN** the button displays ☾ indicating "switch to dark"

#### Scenario: Prism theme updates on toggle
- **WHEN** user toggles theme on the wiki page
- **THEN** the Prism CSS `<link id="prism-theme">` href switches between the dark and light Prism theme URL
