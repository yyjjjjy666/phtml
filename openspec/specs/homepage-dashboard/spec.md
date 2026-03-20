# Homepage Dashboard

## Requirements

### Requirement: Clock and date display
The homepage at `geller.ee/` SHALL display a live clock showing the current time and date, updating in real time.

#### Scenario: Clock updates in real time
- **WHEN** a user views the homepage
- **THEN** a clock widget is visible showing the current time and date, and it updates every second without a page reload

### Requirement: Weather widget
The homepage SHALL display a weather widget showing current weather conditions relevant to the user's location.

#### Scenario: Weather is shown on load
- **WHEN** a user visits `geller.ee/`
- **THEN** a weather widget displays current conditions (e.g., temperature, description) fetched from a weather API

### Requirement: Time progress bars
The homepage SHALL display progress bars indicating how far through the current day, week, month, and year the user is.

#### Scenario: Progress bars reflect current time
- **WHEN** a user views the homepage
- **THEN** progress bars for day, week, month, and year are visible and their fill accurately reflects the elapsed portion of each period

### Requirement: Search bar
The homepage SHALL include a search bar that allows the user to perform a web search without leaving the page.

#### Scenario: Search submits to search engine
- **WHEN** a user types a query into the search bar and submits
- **THEN** the browser navigates to the results page of the configured search engine with that query

### Requirement: Daily tasks
The homepage SHALL display a daily task list that persists across page reloads for the current day.

#### Scenario: Tasks persist within the day
- **WHEN** a user adds or checks off a task and then reloads the page
- **THEN** the task list state is preserved

#### Scenario: Tasks reset daily
- **WHEN** a new calendar day begins
- **THEN** the completed tasks are cleared and the list resets for the new day

### Requirement: Quick links
The homepage SHALL display a set of user-defined quick links for frequently visited sites.

#### Scenario: Quick links are clickable
- **WHEN** a user views the homepage
- **THEN** a grid or list of quick links is displayed and each link opens the configured URL

### Requirement: Daily intention
The homepage SHALL display a daily intention prompt where the user can set or view an intention for the current day.

#### Scenario: Intention persists for the day
- **WHEN** a user sets a daily intention and reloads the page
- **THEN** the same intention text is shown for the remainder of the current day

### Requirement: Quote of the day
The homepage SHALL display a quote of the day, changing once per calendar day.

#### Scenario: Quote changes daily
- **WHEN** a new calendar day begins
- **THEN** a new quote is shown

#### Scenario: Quote is stable within the day
- **WHEN** a user reloads the homepage multiple times on the same day
- **THEN** the same quote is shown each time

### Requirement: Dashboard light theme support
The homepage dashboard SHALL support a light theme variant in addition to the site's default dark theme, toggleable by the user.

#### Scenario: User switches to light theme
- **WHEN** a user activates the light theme toggle on the homepage
- **THEN** the dashboard widgets render with a light background and appropriately contrasting text

#### Scenario: Theme preference persists
- **WHEN** a user sets a theme preference and reloads the page
- **THEN** the previously selected theme is applied automatically
