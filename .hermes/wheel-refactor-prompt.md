# Phase 1: Repo Restructure + Wheel Refactor

## Task 1: Restructure repository layout

### Current structure (move from):
- `/css/styles.css`
- `/js/` (flat — 12 JS files)
- `/images/`
- `/files/`
- `/docs/index.html` (redirect)
- `/links/index.html` (redirect)

### Target structure (move to):
- `/assets/css/styles.css`
- `/assets/js/lib/theme.js`, `nav-scroll.js`, `command-palette.js`
- `/assets/js/pages/dashboard.js`, `wheel.js`, `password.js`, `ip-tool.js`, `gallery.js`, `search.js`, `wiki.js`, `prism-init.js`
- `/assets/images/`
- `/assets/files/`
- `/shared/navbar.html` — new file

### Delete:
- `/docs/` — entire directory (was just a redirect)
- `/links/` — entire directory (was just a redirect)

### File moves (git mv to preserve history if possible, else just mv):

1. `css/styles.css` → `assets/css/styles.css`
2. `js/theme.js` → `assets/js/lib/theme.js`
3. `js/nav-scroll.js` → `assets/js/lib/nav-scroll.js`
4. `js/command-palette.js` → `assets/js/lib/command-palette.js`
5. `js/dashboard.js` → `assets/js/pages/dashboard.js`
6. `js/wheel.js` → `assets/js/pages/wheel.js`
7. `js/password.js` → `assets/js/pages/password.js`
8. `js/ip-tool.js` → `assets/js/pages/ip-tool.js`
9. `js/gallery.js` → `assets/js/pages/gallery.js`
10. `js/search.js` → `assets/js/pages/search.js`
11. `js/wiki.js` → `assets/js/pages/wiki.js`
12. `js/prism-init.js` → `assets/js/pages/prism-init.js`
13. `images/` → `assets/images/`
14. `files/` → `assets/files/`

### Update ALL HTML files:
Update root-relative paths in ALL HTML files:
- `/css/styles.css` → `/assets/css/styles.css`
- `/js/...` → `/assets/js/lib/...` or `/assets/js/pages/...`
- `/images/...` → `/assets/images/...`
- `/files/...` → `/assets/files/...`

Files to update:
- `index.html`
- `wiki/index.html`
- `gallery/index.html`
- `contact/index.html`
- `search/index.html`
- `tools/index.html`
- `tools/wheel/index.html`
- `tools/password/index.html`
- `tools/ip/index.html`
- Also update `CLAUDE.md` with new paths
- Also update `/data/EarsAudioToolkitPresets.json` if it references `/files/...`

### Create `/shared/navbar.html`:
Extract the navbar HTML from `index.html` (the `<header>` with `<nav class="navbar">`) into a standalone file. The navbar is identical on every page except the `class="active"` / `class="non-active"` on the current page link.

The navbar.html should use a placeholder like `{ACTIVE_main}` / `{ACTIVE_wiki}` etc. that gets replaced client-side.

### Update all pages to load navbar from `/shared/navbar.html`:
Each page should:
1. Remove the inline `<header>` block
2. Add a `<div id="navbar-container"></div>` in its place
3. At the top of each page's JS (or in a shared script), fetch `/shared/navbar.html`, replace placeholders based on current page, and inject into `#navbar-container`

Example replacement logic:
```js
(function() {
  fetch('/shared/navbar.html')
    .then(r => r.text())
    .then(html => {
      // Determine current page from window.location.pathname
      const page = window.location.pathname;
      // Replace {ACTIVE_page} with 'active' or 'non-active'
      html = html.replace(/\{ACTIVE_(\w+)\}/g, function(match, p1) {
        const pages = {
          'main': '/',
          'wiki': '/wiki',
          'gallery': '/gallery',
          'tools': '/tools',
          'contact': '/contact'
        };
        return page.startsWith(pages[p1] || '/nonexistent') ? 'active' : 'non-active';
      });
      document.getElementById('navbar-container').innerHTML = html;
      // Re-run theme init (theme button may need re-binding)
      if (typeof applyTheme === 'function') applyTheme(localStorage.getItem('theme') || 'dark');
    });
})();
```

Important: The theme inline script in `<head>` that sets `document.documentElement.dataset.theme` from localStorage must remain — it prevents flash of wrong theme before the JS loads.

## Task 2: Wheel refactor

### File: `/assets/js/pages/wheel.js` — complete rewrite target

Requirements for the new fortune wheel:

### Core functionality
- Items persist in localStorage under key `wheelItems` (array of {label, weight})
- Max 30 items (was 20)
- Weight field per item (number input, default 1, min 1)
- Probability % shown next to item in list
- Clear All button
- Presets dropdown: "Yes/No", "Truth or Dare", "What to eat?", "Movie night", customizable
- Spin result: animation with confetti

### Visual improvements
- Canvas size: responsive (400px default, scales on mobile)
- Segment colors: use HSL-based generation instead of hardcoded array — evenly spaced hues
- Gradient fill on segments (radial gradient from center)
- Drop shadow on the wheel (circle shadow)
- Text: white with black text-shadow (1px 1px 2px rgba(0,0,0,0.8)) for readability on any color
- Font: fallback from Inter to JetBrains Mono to monospace
- Pointer: redesign — a simple downward-pointing chevron/arrow, NOT a triangle. Draw it ABOVE the wheel (not overlapping). Style it in accent color.
- Outer ring: draw a thin border ring around the wheel
- Center circle: draw a small circle at the center with a dot or brand letter

### Animation
- Easing: use cubic-bezier(0.22, 0.99, 0.19, 1) — natural deceleration
- Min spin: 5 full rotations, max: 8 full rotations
- Duration: respect user's input (1-60s, default 5s)
- During spin: add a CSS class `spinning` to the wheel container for glow animation
- On stop: flash the winning segment 3 times (quick border/opacity flash)
- Confetti: implement lightweight confetti using a second canvas OVERLAY. ~80 particles, random colors from segment palette, gravity + fade out. Duration: 2s. Auto-cleanup.

### Sound
- Use Web Audio API (no external files):
  - Tick sound during spin: quiet click every 15° of rotation (respects easing — more often at start, less at end? Actually just emit when the pointer crosses a segment boundary)
  - Result chime: a short ascending tone (200ms, frequency sweep 400→800Hz)
- All sounds gated behind a `wheelSoundEnabled` boolean (default true), persist in localStorage
- Toggle button with 🔊/🔇 icon near spin controls

### Keyboard shortcuts
- Space or Enter while not on input: trigger spin
- Escape: clear result / cancel spin (if spinning, stop and show partial result)

### UI layout (tools/wheel/index.html)
Layout: wheel on left, controls on right (flex row, wrap on mobile)

Controls panel:
1. Item input row: text input + "Add" button + weight input (number, 1-99)
2. Item list: each item shows label, [weight: N], [probability: X%], [remove button]
3. Presets dropdown + "Clear All" button
4. Spin controls: duration slider (1-60s) + "Spin!" big button + sound toggle
5. Result display: large text, accent color, animated entrance (scale from 0.8 to 1 + fade)

### CSS additions for wheel (add to `assets/css/styles.css`)

The wheel CSS section (=== 11. WHEEL TOOL === in current CSS) needs updates:

- `.spinning` class: add a subtle box-shadow/glow animation
- Result display: entrance animation with @keyframes
- Confetti canvas: position absolute, pointer-events none, z-index high
- Item list: show weight and probability in a row
- Responsive: stack on mobile, canvas full width

### Presets data structure
```js
const WHEEL_PRESETS = {
  'yes-no': { label: 'Yes / No', items: [{label:'Yes', weight:1}, {label:'No', weight:1}] },
  'truth-dare': { label: 'Truth or Dare', items: [{label:'Truth', weight:1}, {label:'Dare', weight:1}] },
  'eat': { label: 'What to eat?', items: [{label:'Pizza', weight:3}, {label:'Sushi', weight:2}, {label:'Burger', weight:2}, {label:'Salad', weight:1}, {label:'Pasta', weight:2}] },
  'movie': { label: 'Movie night', items: [{label:'Action', weight:2}, {label:'Comedy', weight:2}, {label:'Sci-Fi', weight:2}, {label:'Horror', weight:1}, {label:'Drama', weight:1}] },
};
```

### Important notes
- The HTML file `tools/wheel/index.html` must be updated to reflect the new layout and controls
- Add a `<div id="confetti-canvas-container" style="position:relative">` wrapping the wheel canvas
- Style the presets select and sound toggle to match the design system
- Keep the theme.js integration: on theme toggle, redraw wheel colors (use HSL so this is automatic)
- Test both dark and light themes

## Task 3: CLAUDE.md update

Update `CLAUDE.md` to reflect the new directory structure. Refresh the Architecture section with new paths.

## Task 4: Clean up

- Delete `/docs/` and `/links/` directories
- Update `.gitignore` if needed
- Verify all internal links still work
- Verify all paths are root-relative (starting with `/`)
