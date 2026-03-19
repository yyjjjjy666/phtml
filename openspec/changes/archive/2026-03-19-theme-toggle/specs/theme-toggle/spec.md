## ADDED Requirements

### Requirement: Theme toggle button in nav
Every page SHALL display a theme toggle button at the right end of the nav bar. The button SHALL show a sun icon (☀) when the current theme is dark and a crescent icon (☾) when the current theme is light.

#### Scenario: Button visible on all pages
- **WHEN** any page is loaded
- **THEN** a theme toggle button is visible at the far right of the nav bar

#### Scenario: Dark mode shows sun icon
- **WHEN** the current theme is dark
- **THEN** the button displays ☀ indicating "switch to light"

#### Scenario: Light mode shows crescent icon
- **WHEN** the current theme is light
- **THEN** the button displays ☾ indicating "switch to dark"

### Requirement: Theme switching
Clicking the toggle button SHALL switch the active theme between dark and light. The switch SHALL apply immediately without a page reload.

#### Scenario: Toggle from dark to light
- **WHEN** the theme is dark and the user clicks the toggle button
- **THEN** the page switches to the light theme immediately

#### Scenario: Toggle from light to dark
- **WHEN** the theme is light and the user clicks the toggle button
- **THEN** the page switches to the dark theme immediately

### Requirement: Theme persistence
The chosen theme SHALL be saved to `localStorage` under the key `theme` and restored on every subsequent page load. The preference SHALL persist across browser sessions.

#### Scenario: Preference survives navigation
- **WHEN** a user sets the theme to light and navigates to another page
- **THEN** the light theme is active on the new page without the user toggling again

#### Scenario: Preference survives tab reload
- **WHEN** a user sets the theme to dark and reloads the tab
- **THEN** the dark theme is active immediately on reload

### Requirement: System preference default
On first visit (no `localStorage` entry), the theme SHALL default to the user's OS preference via `prefers-color-scheme`. If no preference is detected, dark theme SHALL be used.

#### Scenario: System dark preference
- **WHEN** a first-time visitor has OS dark mode enabled and no localStorage entry exists
- **THEN** the dark theme is active

#### Scenario: System light preference
- **WHEN** a first-time visitor has OS light mode enabled and no localStorage entry exists
- **THEN** the light theme is active

### Requirement: No flash of wrong theme
The theme SHALL be applied before the page is painted. A visible flash of the wrong theme (FODT) on page load is not acceptable.

#### Scenario: Correct theme on first paint
- **WHEN** a page loads with a saved light theme preference
- **THEN** the page renders in light theme immediately — no dark flash is visible
