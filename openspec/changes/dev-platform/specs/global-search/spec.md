## ADDED Requirements

### Requirement: Search page exists at /search
The system SHALL serve a page at `/search` that accepts a query via URL parameter (`?q=`) and displays matching results.

#### Scenario: Navigate to search page with query
- **WHEN** user navigates to `/search?q=example`
- **THEN** the page renders and displays matching wiki articles and pages

#### Scenario: Empty query shows prompt
- **WHEN** user navigates to `/search` with no query parameter
- **THEN** page shows a search input with no results list

### Requirement: Search indexes wiki articles and page titles
The search corpus SHALL include: all wiki article titles and tag metadata (from `wiki/content/index.json`), and top-level page names.

#### Scenario: Wiki articles are searchable
- **WHEN** a wiki article title or tag matches the query
- **THEN** that article appears in results

#### Scenario: Page names are searchable
- **WHEN** a page name (e.g., "gallery", "password") matches the query
- **THEN** that page appears in results

### Requirement: Search results are ranked by relevance
Results SHALL be ordered: title exact match first, then title substring match, then tag match, then description match.

#### Scenario: Title matches rank above tag matches
- **WHEN** query matches both a title and a tag of different articles
- **THEN** the title-matching article appears above the tag-matching article

### Requirement: Search is triggered from the search input
The search page SHALL include a text input pre-filled with the current query; typing and pressing Enter updates the results without page reload.

#### Scenario: Search input submits on Enter
- **WHEN** user types a new query and presses Enter
- **THEN** URL updates to `/search?q=<query>` and results update

### Requirement: Each result shows title, type label, and a brief excerpt
Each search result item SHALL display: the item title, a type badge (e.g., "wiki", "tool", "page"), and for wiki articles the tag list.

#### Scenario: Result item content
- **WHEN** a result is displayed
- **THEN** it shows the title as a link, a type badge, and metadata (tags or page section)
