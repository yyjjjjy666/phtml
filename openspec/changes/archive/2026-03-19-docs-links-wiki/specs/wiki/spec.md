## ADDED Requirements

### Requirement: Wiki page combines docs and links
A page at `geller.ee/wiki` SHALL present all personal reference content (guides, configs, curated links) in two labelled sections: **docs** and **links**. Each section SHALL use the existing `.links` CSS class for styling consistency.

#### Scenario: Wiki page loads
- **WHEN** a user navigates to `geller.ee/wiki`
- **THEN** the page loads with both the docs section and links section visible

#### Scenario: Anchor navigation to docs section
- **WHEN** a user navigates to `geller.ee/wiki#docs`
- **THEN** the browser scrolls to the docs section

#### Scenario: Anchor navigation to links section
- **WHEN** a user navigates to `geller.ee/wiki#links`
- **THEN** the browser scrolls to the links section

### Requirement: Old docs and links URLs redirect
The URLs `geller.ee/docs` and `geller.ee/links` SHALL redirect instantly to `geller.ee/wiki` so that existing bookmarks or links do not result in a 404.

#### Scenario: Old docs URL redirects
- **WHEN** a user navigates to `geller.ee/docs`
- **THEN** they are immediately redirected to `geller.ee/wiki`

#### Scenario: Old links URL redirects
- **WHEN** a user navigates to `geller.ee/links`
- **THEN** they are immediately redirected to `geller.ee/wiki`
