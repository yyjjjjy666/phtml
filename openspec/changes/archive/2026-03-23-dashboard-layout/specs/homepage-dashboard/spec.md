## ADDED Requirements

### Requirement: Dashboard uses a multi-zone grid layout
The homepage dashboard SHALL organise widgets into three visual zones — top, main, and bottom — rendered as a responsive CSS grid that uses the full available width up to 1400px.

#### Scenario: Three zones visible on desktop
- **WHEN** a user views the homepage on a viewport ≥1024px
- **THEN** the dashboard renders a top zone (clock, weather, progress), a main zone (search, tasks, links, intention), and a bottom zone (quote), each as a distinct horizontal row

#### Scenario: Dashboard fills available width
- **WHEN** a user views the homepage on a wide viewport
- **THEN** dashboard content extends across the full viewport width up to a 1400px maximum, with no large empty columns on either side

### Requirement: Clock widget is a hero element
The clock widget SHALL be displayed as the visually dominant element of the dashboard, with a significantly larger time display than other widgets.

#### Scenario: Clock is visually prominent
- **WHEN** a user views the homepage
- **THEN** the clock time display is rendered at a large size (≥3rem) and spans at least 2 columns in the top zone, making it immediately identifiable as the primary widget

### Requirement: Dashboard responsive breakpoints
The dashboard grid SHALL adapt at two breakpoints: collapsing to 2 columns at viewports below 1024px, and to a single column at viewports below 600px.

#### Scenario: Two-column layout on tablet
- **WHEN** viewport width is between 600px and 1023px
- **THEN** each dashboard zone collapses to a 2-column grid

#### Scenario: Single-column layout on mobile
- **WHEN** viewport width is below 600px
- **THEN** all dashboard widgets stack in a single column

## MODIFIED Requirements

### Requirement: Search bar
The homepage SHALL include a search bar that allows the user to perform a web search without leaving the page. The search bar SHALL span the full width of the main zone to make it immediately accessible.

#### Scenario: Search submits to search engine
- **WHEN** a user types a query into the search bar and submits
- **THEN** the browser navigates to the results page of the configured search engine with that query

#### Scenario: Search is full-width in main zone
- **WHEN** a user views the homepage on any viewport
- **THEN** the search input row spans the full horizontal width of the main dashboard zone
