# Full UI/UX Redesign — geller.ee

## Design Direction

**Philosophy:** Linear's precision and dark-mode-native engineering, but with the existing cyan accent (`#00d4ff`) retained as the primary brand color instead of Linear's indigo. The result should feel like a developer's personal site — precise, dark, minimal, but with a distinctive cyan personality.

## Design Token Changes

### Color System

Replace the current CSS variables in `assets/css/styles.css` with these refined values:

```css
:root {
  /* Background surfaces — Linear luminance stacking */
  --color-bg:           #08090a;  /* deepest canvas */
  --color-surface:      #0f1011;  /* panels, sidebars */
  --color-surface-2:    #191a1b;  /* elevated surfaces, cards */
  --color-surface-3:    #222;     /* hover states, inputs */

  /* Borders — semi-transparent white, never solid dark */
  --color-border:       rgba(255,255,255,0.05);  /* subtle */
  --color-border-loud:  rgba(255,255,255,0.08);  /* standard */

  /* Text — warm off-white, not pure white */
  --color-text:         #f7f8f8;  /* primary — near-white warm */
  --color-text-muted:   #8a8f98;  /* secondary */
  --color-text-faint:   #62666d;  /* tertiary/metadata */

  /* Accent — keep cyan but refine */
  --color-accent:       #00d4ff;
  --color-accent-alt:   #00ff88;  /* keep as secondary accent */
  --color-accent-glow:  rgba(0, 212, 255, 0.15);  /* softer glow */

  /* Status */
  --color-error:        #e07070;
  --color-warn:         #e0a040;

  /* Spacing — keep existing 4px scale */
  --sp-1:  4px;
  --sp-2:  8px;
  --sp-3:  12px;
  --sp-4:  16px;
  --sp-5:  20px;
  --sp-6:  24px;
  --sp-7:  28px;
  --sp-8:  32px;
  --sp-9:  36px;
  --sp-10: 40px;

  /* Fonts — already correct */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Radius */
  --radius-sm: 3px;
  --radius-md: 6px;
  --radius-lg: 10px;

  /* Shadows — replace solid shadows with Linear-style */
  --shadow-sm:     rgba(0,0,0,0.03) 0px 1.2px 0px;
  --shadow-md:     rgba(0,0,0,0.2) 0px 0px 0px 1px;  /* ring border */
  --glow-accent:  0 0 8px var(--color-accent-glow);
  --glow-btn:     0 0 12px rgba(0, 212, 255, 0.25);

  /* Transition */
  --transition: 0.2s ease;

  /* Navbar */
  --navbar-height: 52px;

  /* Typography refinement */
  --tracking-tight: -0.02em;
  --tracking-display: -0.04em;
}
```

### Light Theme Overrides

Update light theme to be warm and readable (like Notion's warm neutrals):

```css
[data-theme="light"] {
  --color-bg:           #f4f4f0;
  --color-surface:      #ffffff;
  --color-surface-2:    #f0efec;
  --color-surface-3:    #e8e7e3;
  --color-border:       rgba(0,0,0,0.06);
  --color-border-loud:  rgba(0,0,0,0.1);
  --color-text:         #1a1a1a;
  --color-text-muted:   #555;
  --color-text-faint:   #999;
  --color-accent:       #0099cc;
  --color-accent-alt:   #008855;
  --color-accent-glow:  rgba(0, 153, 204, 0.12);
  --color-error:        #c62828;
  --color-warn:         #b45309;
  --shadow-sm:          rgba(0,0,0,0.03) 0px 1.2px 0px;
  --shadow-md:          rgba(0,0,0,0.08) 0px 0px 0px 1px;
  --glow-accent:        0 0 8px rgba(0, 153, 204, 0.12);
  --glow-btn:           0 0 12px rgba(0, 153, 204, 0.2);
}
```

## Typography Refinement

Add negative letter-spacing to headings for that compressed, engineered look (Linear signature):

```css
h1 { font-size: 1.8rem; letter-spacing: var(--tracking-display); }
h2 { font-size: 1.4rem; letter-spacing: var(--tracking-tight); }
h3 { font-size: 1.1rem; letter-spacing: var(--tracking-tight); }
```

Use weight 500-600 for navigation and UI elements, not 400. Update nav links to use `font-weight: 500`.

## Navbar Refinement

Update the navbar styling to be more Linear-like:
- Background: `var(--color-surface)` (was already this)
- Bottom border: `1px solid var(--color-border)` (semi-transparent, not solid)
- Active link: underline with 2px accent color (keep current approach but make border thinner)
- Add subtle backdrop-filter blur on scroll
- The `nav-hidden` class should have a smoother transition

## Card/Panel Components

Update `.panel`, `.tool-panel`, `.dash-widget` to use:
- Background: `var(--color-surface-2)` or `var(--color-surface)` depending on nesting
- Border: `1px solid var(--color-border)` (semi-transparent)
- Subtle shadow: `var(--shadow-sm)`
- No solid dark borders anywhere

## Dashboard Widget Refinement

The dashboard widgets (`#dash-widget-*`) should:
- Use `var(--color-surface)` instead of `var(--color-surface-2)` as their background
- Have semi-transparent borders
- Remove any hardcoded background colors inside widgets
- The clock text color stays accent color
- Progress bars: keep the gradient but make it subtle

## Wiki — Outline/TOC Sidebar

This is the main structural change. The wiki page should have a two-column layout.

### Layout
- Left column (sidebar): Table of contents / article list — fixed width ~250px, sticky on scroll
- Right column (content): Article content — flex: 1

### Sidebar (TOC)
- Shows the article index grouped by category
- Each category is a header with articles listed below
- Current article is highlighted with accent color and a left border
- Tags appear as small pills
- The sidebar is scrollable independently

### Content area
- Article content with back link, title, reading time, tags, and body
- Same as current but in the right column
- Max-width: ~760px

### Responsive behavior
- On mobile (<768px): sidebar collapses to a top bar with a hamburger-style category/article selector
- Content takes full width on mobile

### Implementation
- Modify `wiki/index.html`: wrap content in a flex container with sidebar + content
- Create CSS in styles.css for the new layout
- Modify `wiki.js`: add sidebar rendering logic
- The sidebar should show the category/article index (same as what's currently shown on the wiki page)
- When an article is clicked, the sidebar highlights it and the content area shows the article
- On the index page (no article selected), the sidebar shows all categories and the content area shows the welcome/intro

### CSS additions for wiki outline:

```css
#wiki-layout {
  display: flex;
  gap: var(--sp-8);
  max-width: 1200px;
  margin-top: var(--sp-4);
}

#wiki-sidebar {
  width: 250px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--navbar-height) + var(--sp-4));
  max-height: calc(100vh - var(--navbar-height) - var(--sp-8));
  overflow-y: auto;
  padding-right: var(--sp-4);
  border-right: 1px solid var(--color-border);
}

#wiki-content {
  flex: 1;
  min-width: 0;
  max-width: 760px;
}
```

### Sidebar navigation items styling:
- Category headers: small, uppercase, tracking, muted
- Article links: font-mono, normal weight, muted text
- Active article: accent color, left border
- Hover: subtle background change

## Wheel Page

The wheel page is already refactored. Just ensure the visual refinements (new color tokens, semi-transparent borders) apply correctly. The wheel canvas uses HSL colors so it should automatically adapt.

## Password Tool

Already well-designed. Just ensure the new token system applies. Replace any hardcoded colors with CSS variables where possible.

## Contact Page

Keep current design (GitHub link + PGP placeholder). Ensure it uses the refined design tokens.

## General CSS Cleanup

Scan `styles.css` for:
- Any raw color values that should be CSS variables (`#2C2C2C`, `#383838`, `#e0ff03`, etc.)
- Any solid `border: 1px solid #...` that should be semi-transparent
- Replace old accent `#e0ff03` (the yellow) with `var(--color-accent)` 
- Remove duplicate/overridden styles

## Implementation Order

1. Update CSS variables (`:root` and `[data-theme="light"]`)
2. Refine typography (negative tracking on headings, weight adjustments)
3. Update navbar styling (borders, blur)
4. Update card/panel/dashboard components (transparent borders, refined bg)
5. Wiki outline layout (sidebar + content, modify wiki.js)
6. General CSS cleanup (replace hardcoded values, remove old yellow accent)
7. Test all pages

## Critical Rules

- Do NOT break the wheel functionality (wheel.js, wheel canvas, confetti, sound)
- Do NOT break the password tool (password.js, tabs, generation)
- Do NOT break the IP tool (ip-tool.js)
- Do NOT break the dashboard clock/weather/tasks/links/quote
- Do NOT break the gallery (gallery.js lightbox)
- Do NOT break the command palette
- Do NOT break the navbar loader
- Do NOT break the theme toggle
- Do NOT break the scroll-to-top button
- All root-relative paths must remain correct
- Test each page after changes
