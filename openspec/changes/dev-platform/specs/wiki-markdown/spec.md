## ADDED Requirements

### Requirement: Wiki articles are authored as Markdown files
Wiki content SHALL be stored as `.md` files under `wiki/content/<slug>.md`. Each file SHALL begin with a YAML-like frontmatter block delimited by `---`.

#### Scenario: Article file structure
- **WHEN** a wiki article file exists at `wiki/content/my-article.md`
- **THEN** it begins with `---`, contains at minimum `title:` and `tags:` fields, ends with `---`, and is followed by Markdown body content

### Requirement: Wiki index file lists all articles
A file at `wiki/content/index.json` SHALL list all articles as an array of objects with `slug`, `title`, `category`, and `tags` fields.

#### Scenario: Index file structure
- **WHEN** `wiki/content/index.json` is fetched
- **THEN** it parses as a JSON array where each entry has `slug` (string), `title` (string), `category` (string), `tags` (string array)

### Requirement: Wiki shell renders Markdown client-side
`wiki/index.html` SHALL act as a router shell: it reads the URL hash (e.g., `#my-article`), fetches `wiki/content/<slug>.md`, parses frontmatter, renders the Markdown body using marked.js, and inserts it into the page.

#### Scenario: Direct article URL renders content
- **WHEN** user navigates to `/wiki#my-article`
- **THEN** the page fetches `wiki/content/my-article.md`, renders it as HTML, and displays the article title and body

#### Scenario: No hash shows article list
- **WHEN** user navigates to `/wiki` with no hash
- **THEN** the page fetches `wiki/content/index.json` and renders a list of articles grouped by category

### Requirement: Markdown rendering supports standard elements
The renderer SHALL support: headings (H1–H4), paragraphs, bold/italic, inline code, fenced code blocks with language hint, unordered and ordered lists, links, blockquotes, and horizontal rules.

#### Scenario: Fenced code block renders with formatting
- **WHEN** article contains a fenced code block (``` with language hint)
- **THEN** it renders inside a `<pre><code>` element with the language class applied

### Requirement: Wiki articles display tag and category metadata
Rendered articles SHALL show the article's category and tags from frontmatter, above the body content.

#### Scenario: Tags displayed on article
- **WHEN** article frontmatter contains `tags: [foo, bar]`
- **THEN** rendered page shows those tags as clickable labels

### Requirement: Clicking a tag filters the article list
Clicking a tag label SHALL navigate to the wiki index filtered to that tag.

#### Scenario: Tag click filters list
- **WHEN** user clicks a tag label on an article or the index
- **THEN** wiki index displays only articles sharing that tag
