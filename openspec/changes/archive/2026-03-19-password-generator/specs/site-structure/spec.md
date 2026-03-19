## MODIFIED Requirements

### Requirement: Tools nav dropdown on desktop
On viewports wider than 600px, hovering the "tools" nav item SHALL reveal a dropdown listing all tools. Clicking the "tools" nav item SHALL navigate to the hub page.

#### Scenario: Dropdown appears on hover
- **WHEN** a desktop user hovers over the "tools" nav item
- **THEN** a dropdown menu appears below it listing each tool as a clickable link, including "wheel" and "password"

#### Scenario: Dropdown hidden on mobile
- **WHEN** the viewport is 600px or less
- **THEN** no dropdown is shown; tapping "tools" navigates to the hub page

### Requirement: Tools hub page
A page at `geller.ee/tools` SHALL list all available interactive tools with their names and brief descriptions.

#### Scenario: Hub lists all tools
- **WHEN** a user visits `geller.ee/tools`
- **THEN** all available tools are listed with links to their individual pages, including "wheel" and "password"
