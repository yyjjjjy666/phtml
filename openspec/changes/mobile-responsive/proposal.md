## Why

The nav menu on mobile is oversized and obscures content when scrolled, and the tools pages (wheel, password generator) have no mobile-specific layout — inputs, canvases, and panels overflow or are cramped on small screens.

## What Changes

- Nav bar hides when user scrolls down and reappears when scrolling up (scroll-aware hide/show)
- Nav font size and item padding reduced on mobile so the stacked menu takes less vertical space
- Wheel canvas and controls adapt to narrow viewports (canvas scales down, controls stack)
- Password generator tabs, panels, and inputs adapt to narrow viewports (tabs wrap or scroll, panels stack, no horizontal overflow)

## Capabilities

### New Capabilities

- `nav-scroll-hide`: Nav hides on scroll-down and shows on scroll-up on mobile

### Modified Capabilities

- `mobile-layout`: Existing mobile layout requirements extended — nav sizing, tool page responsiveness added

## Impact

- `css/styles.css` — media query additions and new scroll-hide transition styles
- `js/` — new small inline script or addition to existing JS for scroll-hide behaviour (one shared script all pages include)
- `tools/wheel/index.html` — canvas sizing adjustments
- `tools/password/index.html` — tab and panel layout adjustments
- All `index.html` pages — include scroll-hide script if added as a separate file
