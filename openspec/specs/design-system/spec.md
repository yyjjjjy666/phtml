# Design System Specification

## Requirements

### Requirement: CSS custom property token layer is the single source of truth
The stylesheet SHALL define all visual values (colors, fonts, spacing, borders, shadows, transitions) as CSS custom properties on `:root`. No hardcoded color hex values or pixel sizes SHALL appear in component rules — only token references (`var(--token-name)`).

#### Scenario: Component rule uses only tokens
- **WHEN** any component CSS rule sets a color, spacing, or font value
- **THEN** the value references a CSS custom property (e.g., `color: var(--color-text)`) rather than a raw value

### Requirement: Dark theme is the default; light theme overrides semantic tokens
All semantic token values in `:root` SHALL define the dark theme. A `[data-theme="light"]` block on `:root` SHALL override only the semantic tokens whose values differ in light mode. Component rules need no modification to support both themes.

#### Scenario: Dark theme is default state
- **WHEN** no `data-theme` attribute is set on `<html>`
- **THEN** all token values resolve to their dark-theme defaults

#### Scenario: Light theme activates via attribute
- **WHEN** `data-theme="light"` is set on `<html>`
- **THEN** all semantic tokens resolve to their light-mode overrides and the page appearance changes

### Requirement: Color palette includes dark-theme neon accents
The dark theme SHALL use a near-black background (`#0d0d0d` or equivalent), a primary accent of cyan/electric-blue (`#00d4ff` or equivalent), a secondary accent of bright green (`#00ff88` or equivalent), muted gray text, and subtle borders.

#### Scenario: Background and text contrast
- **WHEN** the dark theme is active
- **THEN** body background is near-black and body text has sufficient contrast (WCAG AA minimum 4.5:1 for normal text)

#### Scenario: Accent color applied to interactive elements
- **WHEN** dark theme is active and a button or link is in its default state
- **THEN** the accent color is applied to the element

### Requirement: Typography tokens define two font families
The design system SHALL define `--font-sans` (Inter or equivalent modern sans-serif) for body text and `--font-mono` (JetBrains Mono or equivalent) for code, terminal elements, and monospace UI.

#### Scenario: Body text uses sans font
- **WHEN** any body paragraph or label renders
- **THEN** it uses the `--font-sans` stack

#### Scenario: Code elements use mono font
- **WHEN** any `<code>`, `<pre>`, or monospace UI element renders
- **THEN** it uses the `--font-mono` stack

### Requirement: Spacing scale is defined as tokens
A spacing scale (e.g., `--space-1` through `--space-12` or similar) SHALL be defined and used for margins, paddings, and gaps throughout the stylesheet.

#### Scenario: Spacing values are tokens
- **WHEN** a component rule sets margin, padding, or gap
- **THEN** it references a spacing token rather than a raw pixel value

### Requirement: Interactive elements have glow effects in dark mode
Buttons and focused form inputs SHALL show a subtle `box-shadow` glow using the accent color in dark mode.

#### Scenario: Button hover glow
- **WHEN** a button is hovered in dark theme
- **THEN** it shows a soft box-shadow in the accent color

#### Scenario: Input focus glow
- **WHEN** a text input receives focus in dark theme
- **THEN** it shows a focus ring in the accent color with a subtle glow
