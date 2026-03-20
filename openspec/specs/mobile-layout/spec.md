# Mobile Layout

## Requirements

### Requirement: Responsive navbar on small screens
On viewports ≤600px the navbar SHALL stack navigation items vertically, each item taking full width, with reduced font size and padding so the menu is compact, so all links are accessible without horizontal scrolling.

#### Scenario: Navbar stacks on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** each `.navbar li` is displayed as a full-width block element

#### Scenario: Navbar remains horizontal on desktop
- **WHEN** the viewport width is greater than 600px
- **THEN** `.navbar li` items are displayed inline (float left) as before

#### Scenario: Navbar font size is reduced on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the navbar font size and item padding are smaller than their desktop values

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
