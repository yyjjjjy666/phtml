## Why

The site currently has no responsive layout — the navbar, gallery grid, and footer are not adapted for small screens, making the site difficult to use on phones and tablets. Mobile traffic is significant and the site should be usable on all devices.

## What Changes

- Add responsive navbar that stacks vertically on small screens
- Make the gallery grid collapse from 3 columns to 1 column on mobile
- Adjust font sizes and spacing for small viewports
- Ensure the fixed visitor-info footer does not overlap content on mobile
- Add/verify `<meta name="viewport">` on all pages

## Capabilities

### New Capabilities
- `mobile-layout`: Responsive layout rules for navbar, gallery, footer, and body across breakpoints

### Modified Capabilities
- `visitor-ip-footer`: Footer padding and layout must adapt on small screens so content is not obscured

## Impact

- `css/styles.css`: Add media queries for mobile breakpoints
- All HTML pages: Verify viewport meta tag is present
- `openspec/specs/visitor-ip-footer/spec.md`: Minor update for mobile footer behaviour
