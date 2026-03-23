# Global Search

## Requirements

### Requirement: Search page at /search
A dedicated search page SHALL exist at `geller.ee/search` with a text input and a results container. The page SHALL read the `?q=` query parameter on load and execute the search automatically.

#### Scenario: URL query runs search on load
- **WHEN** a user navigates to `geller.ee/search?q=<query>`
- **THEN** the search page runs the query and displays results without requiring user interaction

#### Scenario: Empty query shows empty state
- **WHEN** a user navigates to `geller.ee/search` with no `?q=` parameter
- **THEN** no results are shown and the input is focused

### Requirement: Search against wiki content
The search page SHALL fetch `wiki/content/index.json` and score results by relevance, ranking title matches above tag matches.

#### Scenario: Title match ranks higher
- **WHEN** a query matches both an article title and a tag on different articles
- **THEN** the article with the title match appears above the article with only the tag match

#### Scenario: Results display title, type badge, and tags
- **WHEN** results are rendered
- **THEN** each result item shows the article title as a link, a type badge, and the article's tags

### Requirement: Input updates URL and re-runs search
Pressing Enter in the search input SHALL update the URL's `?q=` parameter and re-execute the search without a full page reload.

#### Scenario: Enter key updates URL and results
- **WHEN** a user types a new query and presses Enter
- **THEN** the URL updates to `?q=<new-value>` and the results list re-renders with the new query results
