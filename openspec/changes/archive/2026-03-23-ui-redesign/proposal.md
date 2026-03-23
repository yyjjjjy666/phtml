## Why

The current site uses a basic dark stylesheet with yellow accents but has no design system, inconsistent spacing, and no visual hierarchy beyond color. As the site evolves into a developer platform (wiki, tools, dashboard), it needs a cohesive futuristic aesthetic — terminal-inspired, high-tech, readable — that reinforces the "developer hub" identity and works well for long reading sessions on all devices.

## What Changes

- **BREAKING: Replace `css/styles.css` entirely** — old stylesheet removed; new design system CSS replaces it with CSS custom properties (tokens) as the foundation
- **Design system** — CSS token layer: color palette, typography scale, spacing scale, border/radius/shadow tokens, all in `:root` and `[data-theme="light"]` overrides
- **Dark theme** — near-black background (`#0d0d0d`), cyan/electric-blue primary accent (`#00d4ff`), secondary accent green (`#00ff88`), muted purple highlight, subtle glow effects on interactive elements
- **Light theme** — off-white background (`#f4f4f0`), teal/blue accents adapted from dark palette, same layout
- **Navigation** — redesigned navbar: fixed top bar with logo/site-name left, nav links center, palette+theme toggle right; hamburger menu on mobile with slide-in drawer
- **Typography** — JetBrains Mono (Google Fonts) for code/mono elements; Inter (Google Fonts) for body text; replaced `Courier New` monospace everywhere
- **Components** — redesigned: buttons, cards, forms, code blocks (with Prism.js syntax highlighting), badges/tags, progress bars, search inputs, tool panels
- **Syntax highlighting** — Prism.js loaded via CDN for code blocks; theme-aware (Atom Dark / GitHub light variants)
- **Animations** — subtle CSS transitions: hover glows, focus rings, color transitions; no heavy motion
- **All HTML pages updated** — navbar markup restructured; Google Fonts `<link>` added; Prism.js script added to wiki page

## Capabilities

### New Capabilities
- `design-system`: CSS custom property token layer defining all colors, fonts, spacing, borders, shadows for both dark and light themes — single source of truth for the visual language
- `syntax-highlighting`: Prism.js-based syntax highlighting for fenced code blocks in wiki articles; theme-aware (dark/light); languages: bash, js, css, html, python, yaml, json

### Modified Capabilities
- `theme-toggle`: Color palette requirements change — dark theme now uses near-black + cyan/blue/green neon accents instead of `#2C2C2C` + yellow; light theme uses off-white + teal accents; toggle button redesigned as a labeled switch
- `mobile-layout`: Navigation requirements change — hamburger now triggers a full-width slide-in drawer (not just showing/hiding inline items); touch targets minimum 44px; font sizes adjusted for mobile readability
- `site-structure`: Navbar structure requirements change — fixed positioning, logo/title left, links centered, utility buttons right; page titles use `<title>` pattern `<page> — geller.ee`

## Impact

- `css/styles.css` — fully replaced (~1400 lines → new file; old file archived as `css/styles.old.css`)
- All HTML files — `<link>` for Google Fonts added, navbar markup restructured
- `js/theme.js` — updated to handle new toggle markup; logic unchanged
- `js/nav-scroll.js` — updated for new navbar selector if needed
- `wiki/index.html` — Prism.js script tag added
- New file: `js/prism-init.js` — configures Prism after marked.js renders markdown
- No changes to tool logic (dashboard.js, wheel.js, password.js, ip-tool.js, wiki.js, search.js, command-palette.js)
- No backend changes; GitHub Pages compatible
- Google Fonts + Prism.js via CDN (SRI hashes added)
