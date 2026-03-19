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
