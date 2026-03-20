## ADDED Requirements

### Requirement: Command palette opens on keyboard shortcut
The system SHALL open a command palette overlay when the user presses Ctrl+K (Windows/Linux) or Cmd+K (macOS) from any page.

#### Scenario: Open via keyboard shortcut
- **WHEN** user presses Ctrl+K or Cmd+K on any page
- **THEN** a centered overlay appears with a text input focused and a list of navigation items

### Requirement: Command palette filters items by fuzzy query
The palette SHALL filter its item list in real time as the user types, matching against item titles using fuzzy/substring matching.

#### Scenario: Filtering items
- **WHEN** user types a query string in the palette input
- **THEN** only items whose title contains the query (case-insensitive) are displayed, sorted by relevance

#### Scenario: Empty query shows all items
- **WHEN** the palette input is empty
- **THEN** all available items are shown

### Requirement: Command palette supports keyboard navigation and activation
The user SHALL be able to navigate items with arrow keys and activate the selected item with Enter.

#### Scenario: Arrow key navigation
- **WHEN** user presses ArrowDown or ArrowUp
- **THEN** the highlighted item moves down or up respectively, wrapping at boundaries

#### Scenario: Activate item with Enter
- **WHEN** user presses Enter while an item is highlighted
- **THEN** the browser navigates to that item's URL

### Requirement: Command palette closes on Escape or outside click
The palette SHALL close without navigation when the user presses Escape or clicks outside the overlay.

#### Scenario: Close with Escape
- **WHEN** user presses Escape while palette is open
- **THEN** overlay closes and focus returns to the document

#### Scenario: Close on backdrop click
- **WHEN** user clicks outside the palette panel
- **THEN** overlay closes

### Requirement: Command palette item list includes pages and wiki articles
The palette item list SHALL include all top-level site pages and all wiki articles from the wiki index.

#### Scenario: Pages in palette
- **WHEN** palette is opened
- **THEN** items for main page, wiki, gallery, tools, contact, and individual tool pages are present

#### Scenario: Wiki articles in palette
- **WHEN** wiki index is available
- **THEN** each wiki article (from `wiki/content/index.json`) appears as an item with its title

### Requirement: Command palette has a visible trigger in the navbar
The navbar SHALL include a small trigger element that opens the command palette on click, for discoverability.

#### Scenario: Click trigger opens palette
- **WHEN** user clicks the palette trigger in the navbar
- **THEN** command palette opens with input focused
