# Command Palette

## Requirements

### Requirement: Command palette overlay
The site SHALL provide a command palette that can be opened on any page, displaying a searchable list of all site pages and wiki articles.

#### Scenario: Palette opens with site pages
- **WHEN** the command palette is opened
- **THEN** an overlay appears with a text input and a list of all site pages (label + URL)

#### Scenario: Palette includes wiki articles
- **WHEN** the command palette is opened
- **THEN** wiki articles fetched from `wiki/content/index.json` are merged into the item list alongside static pages

### Requirement: Fuzzy/substring filtering
The command palette input SHALL filter items in real time using case-insensitive substring matching against item titles.

#### Scenario: Input filters results
- **WHEN** a user types in the palette input
- **THEN** only items whose titles contain the typed string (case-insensitive) are shown in the results list

### Requirement: Keyboard navigation
Users SHALL be able to navigate the palette results entirely by keyboard.

#### Scenario: Arrow keys move highlight
- **WHEN** the palette is open and the user presses ArrowDown or ArrowUp
- **THEN** the highlighted result moves down or up respectively

#### Scenario: Enter navigates to highlighted item
- **WHEN** the palette is open and the user presses Enter with an item highlighted
- **THEN** the browser navigates to that item's URL

#### Scenario: Escape closes palette
- **WHEN** the palette is open and the user presses Escape
- **THEN** the palette closes

#### Scenario: Enter with no highlight searches
- **WHEN** the palette is open, the user has typed a query, and no item is highlighted, and the user presses Enter
- **THEN** the browser navigates to `/search?q=<query>`

### Requirement: Close on backdrop click
The command palette SHALL close when the user clicks outside the palette panel (on the backdrop).

#### Scenario: Backdrop click closes palette
- **WHEN** the palette is open and the user clicks the backdrop area outside the panel
- **THEN** the palette closes

### Requirement: Global keyboard shortcut
The command palette SHALL be openable via Ctrl+K (Windows/Linux) or Cmd+K (macOS) on every page.

#### Scenario: Ctrl+K opens palette
- **WHEN** a user presses Ctrl+K on any page
- **THEN** the command palette opens

### Requirement: Palette available on every page
The command palette script SHALL be loaded on every HTML page, and every page's navbar SHALL include a trigger button that opens the palette.

#### Scenario: Trigger button present in navbar
- **WHEN** any page on `geller.ee` is loaded
- **THEN** the navbar contains a clickable element that opens the command palette
