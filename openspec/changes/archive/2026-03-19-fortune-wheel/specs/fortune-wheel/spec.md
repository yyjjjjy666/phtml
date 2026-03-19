## ADDED Requirements

### Requirement: Fortune wheel page exists and is navigable
The site SHALL include a `wheel.html` page accessible via the main navigation bar. All existing pages SHALL be updated to include a "wheel" link in the `<nav class="navbar">` element.

#### Scenario: User navigates to wheel from any page
- **WHEN** a user clicks the "wheel" nav link on any page
- **THEN** the browser loads `wheel.html` and the "wheel" nav item is styled with `class="active"`

### Requirement: Custom item management
The wheel page SHALL allow the user to add custom text items to the wheel and remove existing ones.

#### Scenario: User adds an item
- **WHEN** the user types text in the item input field and clicks "add" (or presses Enter)
- **THEN** the item is appended to the wheel item list and the wheel canvas redraws to show the new segment

#### Scenario: User removes an item
- **WHEN** the user clicks the remove button next to an item in the list
- **THEN** the item is removed from the list and the wheel canvas redraws

#### Scenario: Maximum item cap
- **WHEN** the item list already contains 20 items
- **THEN** the "add" button is disabled and no more items can be added

#### Scenario: Empty input rejected
- **WHEN** the user submits an empty or whitespace-only input
- **THEN** no item is added and the input is cleared

### Requirement: Spin duration control
The user SHALL be able to specify how long the wheel spins (in seconds) before stopping.

#### Scenario: Default duration
- **WHEN** the wheel page loads
- **THEN** the spin duration input is pre-filled with `5` seconds

#### Scenario: Duration range enforced
- **WHEN** the user sets a duration outside the 1–60 second range
- **THEN** the value is clamped to the nearest valid boundary on spin

### Requirement: Spinning animation with deceleration
Clicking "spin" SHALL animate the wheel rotating at high speed and gradually decelerating to a stop over the user-specified duration.

#### Scenario: Spin disabled while spinning
- **WHEN** the wheel is currently spinning
- **THEN** the "spin" button is disabled until the animation completes

#### Scenario: Spin requires at least 2 items
- **WHEN** the user clicks "spin" with fewer than 2 items on the wheel
- **THEN** the spin does not start and an inline message prompts the user to add more items

#### Scenario: Wheel decelerates smoothly
- **WHEN** the spin animation runs
- **THEN** the wheel starts fast and slows to a stop with an ease-out curve over the specified duration

#### Scenario: Wheel stops inside winning segment
- **WHEN** the spin animation completes
- **THEN** the pointer lands within the winning segment (not on a boundary), at a randomised position within the segment so the stop position varies each spin

### Requirement: Winner selection and announcement
After the wheel stops, the winning segment SHALL be clearly identified and announced to the user.

#### Scenario: Winner announced after spin
- **WHEN** the wheel animation completes
- **THEN** the winner's label is displayed in a result area below the wheel

#### Scenario: Fixed pointer indicates winner
- **WHEN** the wheel is rendered (spinning or stopped)
- **THEN** a fixed triangular pointer at the top of the canvas indicates which segment is currently at the top

### Requirement: Consistent visual design
The wheel page SHALL follow the existing site design system: dark background (`#2C2C2C`), light text (`#E0E0E0`), accent color `#e0ff03`, and `'Courier New', monospace` font. Wheel segments SHALL use alternating colors between the accent yellow-green and a muted dark tone.
