# Wiki

## Requirements

### Requirement: Wiki page combines docs and links
A single page at `geller.ee/wiki` SHALL combine the content previously found on `geller.ee/docs` and `geller.ee/links` into one unified page.

#### Scenario: Wiki page contains docs content
- **WHEN** a user visits `geller.ee/wiki`
- **THEN** the page displays the document/guide content previously available at `geller.ee/docs`

#### Scenario: Wiki page contains links content
- **WHEN** a user visits `geller.ee/wiki`
- **THEN** the page displays the curated links previously available at `geller.ee/links`

### Requirement: Old docs and links URLs redirect to wiki
The old URLs `geller.ee/docs` and `geller.ee/links` SHALL redirect users to `geller.ee/wiki` so that existing bookmarks and external links continue to work.

#### Scenario: Redirect from /docs
- **WHEN** a user navigates to `geller.ee/docs`
- **THEN** the user is redirected to `geller.ee/wiki`

#### Scenario: Redirect from /links
- **WHEN** a user navigates to `geller.ee/links`
- **THEN** the user is redirected to `geller.ee/wiki`

### Requirement: Markdown article hash routing
The wiki page SHALL support hash-based routing so that individual articles are addressable by URL fragment. When a hash is present in the URL, the corresponding Markdown article SHALL be fetched and rendered.

#### Scenario: Article loads from hash
- **WHEN** a user navigates to `geller.ee/wiki#<slug>`
- **THEN** the wiki page fetches `wiki/content/<slug>.md`, parses the frontmatter, renders the Markdown body, and displays the article title and tags

#### Scenario: No hash shows article index
- **WHEN** a user navigates to `geller.ee/wiki` with no hash
- **THEN** the wiki page fetches `wiki/content/index.json` and renders a grouped list of all articles

### Requirement: Category and tag metadata on articles
Each wiki article SHALL include `category` and `tags` frontmatter fields. The wiki index SHALL group articles by category, and users SHALL be able to filter the index by tag.

#### Scenario: Articles grouped by category
- **WHEN** a user views the wiki index
- **THEN** articles are grouped under their respective category headings

#### Scenario: Tag filter
- **WHEN** a user clicks a tag label
- **THEN** the URL is updated with `?tag=<name>` and the index re-renders showing only articles with that tag
