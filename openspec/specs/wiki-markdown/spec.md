# Wiki Markdown

## Requirements

### Requirement: Markdown rendering via marked.js
The wiki page SHALL use the `marked` library (loaded from CDN) to parse and render Markdown article files.

#### Scenario: Marked loaded from CDN
- **WHEN** `wiki/index.html` is loaded
- **THEN** the `<head>` includes a `<script>` tag loading `marked.min.js` from the jsDelivr CDN with integrity and crossorigin attributes

### Requirement: Dynamic wiki body
The wiki page body SHALL contain only a `#wiki-content` container div; all content SHALL be injected by `js/wiki.js` at runtime.

#### Scenario: No static wiki content in HTML
- **WHEN** `wiki/index.html` is rendered
- **THEN** the visible article/link content comes from JS-injected HTML, not from static markup in the file

### Requirement: Article content stored as Markdown with frontmatter
Each wiki article SHALL be stored as a `.md` file under `wiki/content/<slug>.md` with YAML-style frontmatter containing at minimum `title`, `category`, and `tags`.

#### Scenario: Article file structure
- **WHEN** a Markdown article file is opened
- **THEN** the file begins with a frontmatter block containing `title`, `category`, and `tags` fields, followed by the Markdown body

### Requirement: Content index file
A `wiki/content/index.json` file SHALL list all articles with their `slug`, `title`, `category`, and `tags` fields to enable index rendering and search without fetching individual article files.

#### Scenario: Index contains all articles
- **WHEN** `wiki/content/index.json` is fetched
- **THEN** the response is a JSON array where each entry has `slug`, `title`, `category`, and `tags`

### Requirement: Wiki styles
The shared stylesheet SHALL include styles for wiki article typography, tag labels, category headings, and code block formatting.

#### Scenario: Code blocks styled
- **WHEN** a wiki article containing a fenced code block is rendered
- **THEN** the code block is visually distinct with appropriate background and font styling

#### Scenario: Tag labels styled
- **WHEN** tag labels are rendered in the wiki index or article view
- **THEN** each tag appears as a styled chip/label element
