## ADDED Requirements

### Requirement: Clock and date display
The dashboard SHALL display the current time (hours:minutes:seconds), day of week, and full date, updated every second via `setInterval`.

#### Scenario: Time updates in real time
- **WHEN** the homepage is open
- **THEN** the clock display updates every second with the current local time, day of week, and date

### Requirement: Weather widget
The dashboard SHALL fetch the user's approximate location from `ipapi.co/json/` and then fetch current weather from `api.open-meteo.com` using those coordinates. The widget SHALL display temperature (°C), a weather description with emoji, and wind speed. The result SHALL be cached in `sessionStorage` to avoid repeated fetches within the same browser session.

#### Scenario: Weather loads on page open
- **WHEN** a user opens the homepage and has internet access
- **THEN** the weather widget displays current temperature, condition emoji+label, and wind speed for the user's approximate location within a few seconds

#### Scenario: Weather uses session cache
- **WHEN** the user navigates away and back to the homepage in the same session
- **THEN** weather data loads instantly from `sessionStorage` without a new network request

#### Scenario: Weather fetch fails
- **WHEN** either the IP or Open-Meteo request fails
- **THEN** the widget displays a brief error message and does not crash other widgets

### Requirement: Time progress bars
The dashboard SHALL display four progress bars showing how much of the current day, week, month, and year has elapsed as a percentage.

#### Scenario: Day progress
- **WHEN** it is noon (12:00:00)
- **THEN** the day progress bar shows approximately 50%

#### Scenario: Week progress
- **WHEN** it is Wednesday at noon
- **THEN** the week progress bar shows approximately 50% (week runs Monday–Sunday)

#### Scenario: Progress updates live
- **WHEN** the clock ticks
- **THEN** all four progress bars update their values

### Requirement: Search bar with engine switcher
The dashboard SHALL include a search input with a dropdown to select the search engine (Google, StartPage, DuckDuckGo). Pressing Enter or clicking the search button SHALL open the search in a new tab. The selected engine SHALL persist in `localStorage`. Pressing `/` anywhere on the page SHALL focus the search input. Pressing `Escape` SHALL clear the input and blur it.

#### Scenario: Search with Google
- **WHEN** Google is selected and user types a query and presses Enter
- **THEN** a new tab opens with a Google search for that query

#### Scenario: Engine preference persists
- **WHEN** user selects DuckDuckGo and reloads the page
- **THEN** DuckDuckGo is still selected

#### Scenario: Slash hotkey
- **WHEN** user presses `/` while not in a text input
- **THEN** the search input is focused

### Requirement: Daily tasks list
The dashboard SHALL display a task list persisted in `localStorage` under key `dashTasks`. Each task has text, a done flag, and a creation date. Pressing Enter in the task input SHALL add a new task. Clicking a task's checkbox SHALL mark it done. On page load, completed tasks from previous days SHALL be automatically removed. Incomplete tasks SHALL persist indefinitely.

#### Scenario: Add a task
- **WHEN** user types text in the task input and presses Enter
- **THEN** the task appears in the list and is saved to localStorage

#### Scenario: Complete a task
- **WHEN** user clicks a task's checkbox
- **THEN** the task is marked done with a strikethrough style

#### Scenario: Auto-purge previous day's completed tasks
- **WHEN** the page is loaded on a new day
- **THEN** tasks that were marked done on a previous day are automatically removed from the list

### Requirement: Quick links grid
The dashboard SHALL display a grid of user-defined quick links stored in `localStorage` as `dashLinks` (array of `{label, url}`). Each link SHALL open in a new tab. Right-clicking a link tile SHALL show a custom context menu with a "remove" option. A `+` button SHALL open an inline form to add a new link (label + URL). The form SHALL be dismissed with Escape.

#### Scenario: Add a quick link
- **WHEN** user clicks `+`, fills in label and URL, and confirms
- **THEN** the new tile appears in the grid and is saved to localStorage

#### Scenario: Remove a quick link
- **WHEN** user right-clicks a link tile and selects "remove"
- **THEN** the tile is removed from the grid and localStorage

#### Scenario: Links open in new tab
- **WHEN** user clicks a quick link tile
- **THEN** the URL opens in a new browser tab

### Requirement: Daily intention field
The dashboard SHALL display a single text input for a daily intention (goal/focus for the day). The value SHALL be stored in `localStorage` keyed by today's date (`dashIntention_YYYY-MM-DD`). The previous day's intention SHALL not appear on a new day.

#### Scenario: Set today's intention
- **WHEN** user types in the intention field and presses Enter or blurs
- **THEN** the text is saved to localStorage under today's date key

#### Scenario: Intention clears on new day
- **WHEN** a new day begins and user opens the homepage
- **THEN** the intention field is empty (previous day's value is not loaded)

### Requirement: Quote of the day
The dashboard SHALL display one quote selected from a hardcoded list of at least 20 curated quotes. The daily quote SHALL be deterministic (same quote all day, chosen by `dayOfYear % quotes.length`). A "refresh" button SHALL display a different random quote and store the override in `localStorage` as `{date, index}`, cleared automatically on a new day.

#### Scenario: Consistent daily quote
- **WHEN** user opens the homepage multiple times in one day without clicking refresh
- **THEN** the same quote is shown each time

#### Scenario: Refresh picks a different quote
- **WHEN** user clicks the refresh button
- **THEN** a different quote is shown and persisted for the rest of the day

### Requirement: Dashboard light theme support
All dashboard widgets SHALL respect the site's existing light/dark theme system. In light theme (`[data-theme="light"]`), widgets SHALL use appropriate light-mode colors matching the existing site palette.

#### Scenario: Light theme applies to widgets
- **WHEN** user switches to light theme
- **THEN** all dashboard widget backgrounds, text, and accents update to light palette values
