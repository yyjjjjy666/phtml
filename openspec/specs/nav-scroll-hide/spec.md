# Nav Scroll Hide

## Requirements

### Requirement: Nav hides on scroll-down and reveals on scroll-up (mobile)
On mobile viewports the navbar SHALL hide when the user scrolls down and reveal itself when the user scrolls up, so screen space is conserved while content is still accessible.

#### Scenario: Nav hides on scroll down
- **WHEN** the viewport width is 600px or less
- **AND** the user scrolls downward
- **THEN** the navbar is hidden (translated or set to invisible off-screen)

#### Scenario: Nav reveals on scroll up
- **WHEN** the viewport width is 600px or less
- **AND** the user scrolls upward
- **THEN** the navbar is visible and accessible

#### Scenario: Nav unaffected on desktop
- **WHEN** the viewport width is greater than 600px
- **THEN** the navbar remains always visible regardless of scroll direction
