## ADDED Requirements

### Requirement: Fenced code blocks in wiki articles are syntax highlighted
After a wiki article is rendered from Markdown, any `<pre><code class="language-*">` elements SHALL be processed by Prism.js to apply syntax highlighting.

#### Scenario: Code block gets highlighting after render
- **WHEN** a wiki article containing a fenced code block is rendered
- **THEN** the code block displays with syntax-colored tokens (keywords, strings, etc.)

### Requirement: Prism.js is loaded on the wiki page only
Prism.js (core + autoloader plugin) SHALL be loaded via CDN `<script>` tag in `wiki/index.html` only. Other pages do not load Prism.

#### Scenario: Prism only on wiki
- **WHEN** any non-wiki page is loaded
- **THEN** no Prism.js script is requested

### Requirement: Highlighting is re-applied after each article render
Because wiki articles are rendered dynamically (JS fetch + innerHTML), Prism SHALL be invoked via `Prism.highlightAll()` or `Prism.highlightAllUnder(container)` after each article is inserted into the DOM.

#### Scenario: Re-highlight on navigation
- **WHEN** user navigates to a different wiki article via hash change
- **THEN** code blocks in the newly rendered article are highlighted

### Requirement: Prism theme matches the active site theme
The Prism CSS theme SHALL match the active site theme — a dark Prism theme when `data-theme` is dark, and a light Prism theme when `data-theme` is light. The theme SHALL update when the user toggles.

#### Scenario: Dark site uses dark code theme
- **WHEN** dark theme is active
- **THEN** code blocks use a dark background color scheme

#### Scenario: Light site uses light code theme
- **WHEN** light theme is active
- **THEN** code blocks use a light background color scheme

#### Scenario: Theme swap updates code theme immediately
- **WHEN** user toggles from dark to light (or vice versa)
- **THEN** the Prism CSS theme `<link>` href updates without page reload
