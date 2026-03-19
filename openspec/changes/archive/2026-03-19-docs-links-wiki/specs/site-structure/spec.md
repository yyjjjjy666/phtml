## MODIFIED Requirements

### Requirement: Clean URLs for all pages
Every page SHALL be accessible without a file extension. URLs SHALL follow the pattern `geller.ee/<page>` for top-level pages and `geller.ee/tools/<tool>` for tools.

#### Scenario: Top-level page URL
- **WHEN** a user navigates to `geller.ee/wiki`, `geller.ee/gallery`, or `geller.ee/contact`
- **THEN** the correct page loads without a `.html` extension in the URL

#### Scenario: Tool URL
- **WHEN** a user navigates to `geller.ee/tools/wheel`
- **THEN** the wheel tool page loads
