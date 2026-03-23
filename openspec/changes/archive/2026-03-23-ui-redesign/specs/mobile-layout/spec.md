## MODIFIED Requirements

### Requirement: Responsive navbar on small screens
On viewports ≤768px the navbar SHALL show only the site wordmark and a hamburger button. Tapping the hamburger SHALL open a full-width slide-in drawer containing all nav links. The drawer SHALL close when a link is tapped or when the hamburger is tapped again.

#### Scenario: Drawer opens on hamburger tap
- **WHEN** viewport is ≤768px and user taps the hamburger button
- **THEN** a full-width nav drawer slides in from the top (or side), revealing all nav links

#### Scenario: Drawer closes on link tap
- **WHEN** the nav drawer is open and user taps a nav link
- **THEN** the drawer closes and navigation proceeds

#### Scenario: Desktop navbar remains horizontal
- **WHEN** viewport is greater than 768px
- **THEN** nav links are displayed horizontally in a single bar without a hamburger button visible

## ADDED Requirements

### Requirement: Touch targets meet minimum size
All interactive elements (buttons, nav links, form controls) SHALL have a minimum touch target size of 44×44px on mobile viewports.

#### Scenario: Button touch target on mobile
- **WHEN** viewport is ≤768px
- **THEN** all buttons have a minimum height and width of 44px

### Requirement: Body text is readable on mobile
The base font size SHALL be at least 16px on all viewports. Line height SHALL be at least 1.6 for body text.

#### Scenario: Font size on mobile
- **WHEN** any mobile viewport loads any page
- **THEN** body text renders at ≥16px with line-height ≥1.6
