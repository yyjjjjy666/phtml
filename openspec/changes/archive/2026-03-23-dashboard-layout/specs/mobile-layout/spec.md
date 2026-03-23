## ADDED Requirements

### Requirement: Dashboard single-column stack on mobile
On viewports below 600px the homepage dashboard SHALL render all widgets in a single vertically stacked column with comfortable vertical spacing between widgets.

#### Scenario: Dashboard stacks on mobile
- **WHEN** viewport width is below 600px
- **THEN** all dashboard zone grids have `grid-template-columns: 1fr` and widgets are stacked vertically without horizontal overflow
