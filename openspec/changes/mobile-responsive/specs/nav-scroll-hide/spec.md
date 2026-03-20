## ADDED Requirements

### Requirement: Nav hides on scroll-down and reveals on scroll-up (mobile)
On viewports ≤600px the nav bar SHALL slide out of view when the user scrolls down and slide back into view when the user scrolls up, so content is not obscured while reading.

#### Scenario: Nav hides when scrolling down
- **WHEN** the viewport is ≤600px and the user scrolls downward by more than 10px from the previous position
- **THEN** the nav bar SHALL animate off-screen upward (transform translateY -100%)

#### Scenario: Nav reveals when scrolling up
- **WHEN** the viewport is ≤600px and the user scrolls upward
- **THEN** the nav bar SHALL animate back into its normal position

#### Scenario: Nav unaffected on desktop
- **WHEN** the viewport width is greater than 600px
- **THEN** the nav bar SHALL remain visible regardless of scroll direction
