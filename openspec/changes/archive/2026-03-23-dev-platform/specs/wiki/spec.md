## ADDED Requirements

### Requirement: Wiki supports Markdown-authored articles via hash routing
The wiki page SHALL act as a single-page shell: navigating to `/wiki#<slug>` SHALL fetch and render `wiki/content/<slug>.md` client-side. Without a hash, the shell SHALL display a categorized article index.

#### Scenario: Article rendered from hash URL
- **WHEN** user navigates to `geller.ee/wiki#my-article`
- **THEN** the page fetches `wiki/content/my-article.md`, renders its Markdown body, and displays the article

#### Scenario: Index shown without hash
- **WHEN** user navigates to `geller.ee/wiki` with no hash
- **THEN** wiki fetches `wiki/content/index.json` and displays all articles grouped by category

### Requirement: Wiki articles include category and tag metadata
Each wiki article's frontmatter SHALL include `title`, `category`, and `tags` fields. The article index SHALL group articles by category.

#### Scenario: Category grouping in index
- **WHEN** index is displayed
- **THEN** articles are grouped under their respective category headings

#### Scenario: Tags displayed on article page
- **WHEN** an article with tags is rendered
- **THEN** tag labels are shown and each is clickable to filter the index
