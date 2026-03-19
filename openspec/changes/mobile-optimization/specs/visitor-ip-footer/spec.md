## MODIFIED Requirements

### Requirement: Footer fixed at bottom of viewport
The footer SHALL be fixed to the bottom of the viewport so it remains visible without scrolling. On viewports ≤600px the footer flex container SHALL wrap its spans (`flex-wrap: wrap`) and reduce the gap to `12px` so content does not overflow horizontally.

#### Scenario: Footer visible on scroll
- **WHEN** a user scrolls down on a long page
- **THEN** the footer remains visible at the bottom of the screen

#### Scenario: Main content not obscured by footer
- **WHEN** any page is fully loaded on desktop (>600px)
- **THEN** the main content area has `padding-bottom: 40px` so it is not hidden behind the fixed footer

#### Scenario: Footer wraps on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the footer spans wrap to multiple lines rather than overflowing horizontally, and the gap between spans is `12px`

#### Scenario: Main content not obscured on mobile
- **WHEN** any page is fully loaded on mobile (≤600px)
- **THEN** the main content area has at least `60px` of bottom padding to account for a potentially two-line footer
