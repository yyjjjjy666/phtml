# Mobile Layout

## Requirements

### Requirement: Responsive navbar on small screens
On viewports ≤600px the navbar SHALL stack navigation items vertically, each item taking full width, so all links are accessible without horizontal scrolling.

#### Scenario: Navbar stacks on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** each `.navbar li` is displayed as a full-width block element

#### Scenario: Navbar remains horizontal on desktop
- **WHEN** the viewport width is greater than 600px
- **THEN** `.navbar li` items are displayed inline (float left) as before

### Requirement: Responsive gallery grid
The gallery grid SHALL reduce column count on smaller viewports: 2 columns at ≤900px and 1 column at ≤600px.

#### Scenario: Gallery shows 2 columns on tablet
- **WHEN** the viewport width is between 601px and 900px
- **THEN** `.gallery-grid` has `column-count: 2`

#### Scenario: Gallery shows 1 column on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** `.gallery-grid` has `column-count: 1`

### Requirement: Main content bottom padding on mobile
On viewports ≤600px the `<main>` element SHALL have at least `60px` of bottom padding to prevent content from being hidden behind the fixed footer when it wraps to two lines.

#### Scenario: Sufficient padding on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** `main` has `padding-bottom` of at least `60px`
