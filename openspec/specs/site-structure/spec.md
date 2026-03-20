# Site Structure

## Requirements

### Requirement: Clean URLs for all pages
Every page SHALL be accessible without a file extension. URLs SHALL follow the pattern `geller.ee/<page>` for top-level pages and `geller.ee/tools/<tool>` for tools.

#### Scenario: Top-level page URL
- **WHEN** a user navigates to `geller.ee/wiki`, `geller.ee/gallery`, or `geller.ee/contact`
- **THEN** the correct page loads without a `.html` extension in the URL

#### Scenario: Tool URL
- **WHEN** a user navigates to `geller.ee/tools/wheel`
- **THEN** the wheel tool page loads

### Requirement: Tools hub page
A page at `geller.ee/tools` SHALL list all available interactive tools with their names and brief descriptions.

#### Scenario: Hub lists all tools
- **WHEN** a user visits `geller.ee/tools`
- **THEN** all available tools are listed with links to their individual pages, including "wheel", "password", and "ip"

### Requirement: Tools nav dropdown on desktop
On viewports wider than 600px, hovering the "tools" nav item SHALL reveal a dropdown listing all tools. Clicking the "tools" nav item SHALL navigate to the hub page.

#### Scenario: Dropdown appears on hover
- **WHEN** a desktop user hovers over the "tools" nav item
- **THEN** a dropdown menu appears below it listing each tool as a clickable link, including "wheel", "password", and "ip"

#### Scenario: Dropdown hidden on mobile
- **WHEN** the viewport is 600px or less
- **THEN** no dropdown is shown; tapping "tools" navigates to the hub page

### Requirement: .gitignore present
The repository SHALL contain a `.gitignore` file that prevents OS-generated files, editor temp files, and OneDrive sync artifacts from appearing in git status.

#### Scenario: Common noise files excluded
- **WHEN** `.DS_Store`, `Thumbs.db`, `desktop.ini`, or `*.tmp` files are present
- **THEN** they do not appear in `git status`

### Requirement: Root-relative internal paths
All internal `href` and `src` attributes in every HTML file SHALL use root-relative paths (starting with `/`) rather than relative paths.

#### Scenario: Asset paths work from any subfolder
- **WHEN** any page at any folder depth is loaded from `geller.ee`
- **THEN** CSS, JS, and image assets load correctly without path traversal (`../../`)
