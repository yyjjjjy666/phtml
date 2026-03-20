## MODIFIED Requirements

### Requirement: Tools hub page
A page at `geller.ee/tools` SHALL list all available interactive tools with their names and brief descriptions. The homepage at `geller.ee/` SHALL also serve as a personal dashboard with widgets for clock, weather, tasks, search, and quick links.

#### Scenario: Hub lists all tools
- **WHEN** a user visits `geller.ee/tools`
- **THEN** all available tools are listed with links to their individual pages, including "wheel", "password", and "ip"

#### Scenario: Homepage serves as dashboard
- **WHEN** a user visits `geller.ee/`
- **THEN** the homepage displays dashboard widgets: clock/date, weather, progress bars, search, tasks, quick links, daily intention, and quote
