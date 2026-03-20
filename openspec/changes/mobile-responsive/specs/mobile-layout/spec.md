## MODIFIED Requirements

### Requirement: Responsive navbar on small screens
On viewports ≤600px the navbar SHALL stack navigation items vertically with reduced font size and padding so the menu is compact, and each item is accessible without horizontal scrolling.

#### Scenario: Navbar stacks on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** each `.navbar li` is displayed as a full-width block element

#### Scenario: Navbar remains horizontal on desktop
- **WHEN** the viewport width is greater than 600px
- **THEN** `.navbar li` items are displayed inline (float left) as before

#### Scenario: Navbar font size is reduced on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** navbar link font size SHALL be reduced (e.g. 14px) compared to the desktop default

## ADDED Requirements

### Requirement: Wheel canvas scales to viewport on mobile
On viewports ≤600px the wheel canvas SHALL resize to fit the viewport width so it does not overflow or require horizontal scrolling.

#### Scenario: Canvas fits on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the wheel canvas width and height SHALL be set to fit within the viewport width

#### Scenario: Canvas controls stack on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the wheel controls (input, buttons, item list) SHALL be displayed in a single stacked column with full-width inputs

### Requirement: Password generator adapts to mobile
On viewports ≤600px the password generator SHALL display without horizontal overflow — tabs SHALL be scrollable, panels SHALL stack, and inputs SHALL be full-width.

#### Scenario: Tabs scrollable on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the `.pw-tabs` container SHALL scroll horizontally if tabs exceed viewport width, without wrapping

#### Scenario: No horizontal overflow on mobile
- **WHEN** the viewport width is 600px or less
- **THEN** the password generator page SHALL NOT require horizontal scrolling to access any content
