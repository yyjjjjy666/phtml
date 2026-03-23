# Mobile Layout

## Requirements

### Requirement: Dashboard single-column stack on mobile
On viewports below 600px the homepage dashboard SHALL render all widgets in a single vertically stacked column with comfortable vertical spacing between widgets.

#### Scenario: Dashboard stacks on mobile
- **WHEN** viewport width is below 600px
- **THEN** all dashboard zone grids have `grid-template-columns: 1fr` and widgets are stacked vertically without horizontal overflow

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

### Requirement: Responsive gallery grid
The gallery grid SHALL reduce column count on smaller viewports: 2 columns at ≤900px and 1 column at ≤600px.

#### Scenario: Gallery shows 2 columns on tablet
- **WHEN** the viewport width is between 601px and 900px
- **THEN** `.gallery-grid` has `column-count: 2`

#### Scenario: Gallery shows 1 column on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** `.gallery-grid` has `column-count: 1`

### Requirement: Wheel canvas scales to viewport on mobile
On viewports ≤600px the fortune wheel canvas SHALL fit within the viewport width and the controls below it SHALL stack vertically, so the tool is fully usable on small screens.

#### Scenario: Canvas fits on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the wheel canvas width does not exceed the viewport width (no horizontal overflow)

#### Scenario: Canvas controls stack on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** wheel control elements (buttons, inputs) are arranged vertically rather than side by side

### Requirement: Password generator adapts to mobile
On viewports ≤600px the password generator tabs SHALL be horizontally scrollable and the page SHALL have no horizontal overflow, so all controls remain reachable on small screens.

#### Scenario: Tabs scrollable on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the tab bar allows horizontal scrolling if tabs overflow, without breaking the layout

#### Scenario: No horizontal overflow on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the password generator page has no horizontal scrollbar (no content overflows the viewport width)

### Requirement: Main content bottom padding on mobile
On viewports ≤600px the `<main>` element SHALL have at least `60px` of bottom padding to prevent content from being hidden behind the fixed footer when it wraps to two lines.

#### Scenario: Sufficient padding on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** `main` has `padding-bottom` of at least `60px`

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
