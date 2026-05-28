# Main Page Redesign — geller.ee

## Context

The site is a static HTML/CSS/JS site on GitHub Pages at geller.ee. Current structure:
- Navbar loaded from `/shared/navbar.html` 
- All assets under `/assets/`
- Wiki has outline sidebar layout
- Tools (wheel, password, ip) work

## Design Direction

**Visual identity:** Dark industrial-terminal meets modern minimalism. The site should feel like a developer's command center — dark, precise, with cyan electric accents. Think: Linear's design precision + a terminal/infosec edge.

**Target audience:** Anonymous technical professional. No names, no personal photos, no location identifiers in the hero. The hero should describe a role/ethos that many technical people could relate to.

**Color palette** (already set in CSS variables — keep these):

```
:root {
  --color-bg: #08090a;
  --color-surface: #0f1011;
  --color-surface-2: #191a1b;
  --color-surface-3: #222;
  --color-border: rgba(255,255,255,0.05);
  --color-border-loud: rgba(255,255,255,0.08);
  --color-text: #f7f8f8;
  --color-text-muted: #8a8f98;
  --color-text-faint: #62666d;
  --color-accent: #00d4ff;     /* CYAN — keep */
  --color-accent-alt: #00ff88;  /* green accent for variety */
  --color-accent-glow: rgba(0,212,255,0.15);
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## Hero Section — Replace the Dashboard

The current dashboard (clock, weather, progress bars, tasks, links, intention, quote) should be replaced with a **landing/hero page** that serves as geller.ee's main page.

### Hero content (top section):
- A large tagline in JetBrains Mono, something like:
  `> infrastructure._secured()` or `> system.online` — a terminal-inspired greeting
- Below that: a one-line role description in muted text, anonymous:
  `security & infrastructure specialist · automation · estonia`
- No names, no personal info
- A subtle terminal-style cursor blinking animation (just a `_` character blinking)
- The hero text should have a very subtle cyan glow on the tagline

### Status bar (below hero):
A horizontal row of anonymous metrics:
- **uptime:** a randomly generated uptime (just for show, static)
- **location:** `ee` (just the country code)
- **focus:** `automation & security`
- **status:** `online`

Each metric is a small card/pill with a label and value, monospace font, subtle border.

### Projects grid (middle section):
4 project cards in a 2×2 grid layout:
- **ai-agent-bot** — telegram claude code executor for automated task management
- **finwise** — ai-powered personal finance manager with bank integration
- **ploopy** — markov chain telegram bot with premium subscription model
- **phtml** — personal site (this one) — static html/css/js

Each card:
- Title in cyan accent color
- Short description in muted text
- Tags/badges for tech stack (Python, Go, n8n, Telegram, etc.)
- Hover: subtle border glow
- Cards link to GitHub or wiki articles

### Tools quick-access (bottom section):
A row of tool cards linking to:
- `/tools/wheel` — 🎯 Fortune Wheel
- `/tools/password` — 🔑 Password Generator
- `/tools/ip` — 🌐 IP Lookup

Each tool card: icon + name, small, compact.

### Footer (keep existing):
The visitor info footer (IP, location, org) should remain at the bottom of all pages.

## Implementation Details

### HTML structure (index.html):

```html
<body>
  <div id="navbar-container"></div>
  <main>
    <div id="landing-hero">
      <div id="hero-terminal">
        <span id="hero-greeting">> infrastructure._secured()</span>
        <span id="hero-cursor">_</span>
      </div>
      <p id="hero-tagline">security & infrastructure specialist · automation · estonia</p>
      
      <div id="hero-status">
        <div class="status-item"><span class="status-label">uptime</span><span class="status-value">142d 7h</span></div>
        <div class="status-item"><span class="status-label">location</span><span class="status-value">ee</span></div>
        <div class="status-item"><span class="status-label">focus</span><span class="status-value">automation & security</span></div>
        <div class="status-item"><span class="status-label">status</span><span class="status-value">online</span></div>
      </div>
    </div>

    <section id="landing-projects">
      <h2 class="landing-section-title">projects</h2>
      <div id="project-grid">
        <!-- 4 project cards -->
      </div>
    </section>

    <section id="landing-tools">
      <h2 class="landing-section-title">tools</h2>
      <div id="tools-row">
        <!-- 3 tool cards -->
      </div>
    </section>
  </main>
  <footer id="visitor-footer">...</footer>
  
  <button id="scroll-top-btn">↑</button>
  <script src="/assets/js/lib/theme.js"></script>
  <script src="/assets/js/pages/dashboard.js"></script>
  <!-- dashboard.js should be updated to NOT render the dashboard widgets 
       since we're replacing them with the landing layout -->
</body>
```

### CSS additions (to styles.css):

Create styles for:
1. Hero section (terminal greeting, tagline, cursor blink animation)
2. Status bar (flex row, metric cards)
3. Projects grid (2×2 CSS grid, cards with hover effect)
4. Tools row (flex row, compact cards)
5. Section titles (monospace, uppercase, tracking, muted)
6. Cursor blink animation (@keyframes blink)

### Cursor blink animation:
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
#hero-cursor {
  animation: blink 1s step-end infinite;
  color: var(--color-accent);
}
```

### Project card hover effect:
On hover, the card border should glow with the accent color:
```css
.project-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 15px var(--color-accent-glow);
}
```

### Dashboard.js update:
The `dashboard.js` file currently builds the clock, weather, tasks, links, intention, and quote widgets for the main page. Since we're replacing the main page with a landing layout, `dashboard.js` should either:
- Be deleted/not loaded on the main page (only on old versions? No, it's the same page)
- Be modified to NOT render its widgets when the landing layout is detected

Best approach: update `index.html` to NOT include `dashboard.js` and instead include a new `landing.js` (or inline the landing logic). The dashboard.js is only needed if the user ever wants the old dashboard back.

Actually, simplest: just don't include `dashboard.js` in `index.html` anymore. The landing page doesn't need it. But keep the file in case we want it later.

### Other pages:
All other pages (wiki, gallery, tools, contact) should keep their current layout and functionality. Only `index.html` changes.

## What to Preserve

- Navbar (loaded from `/shared/navbar.html`)
- Theme toggle functionality (theme.js)
- Service worker registration
- Command palette (Ctrl+K)
- Keyboard nav (Alt+1-5)
- Scroll-to-top button
- Visitor IP footer
- Responsive design

## What to Remove from index.html

- The entire dashboard layout (`#dashboard`, `#dash-zone-top`, `#dash-zone-main`, `#dash-zone-bottom`, etc.)
- The dashboard widgets (clock, weather, progress, search, tasks, links, intention, quote)
- The context menu (`#dash-ctx-menu`)
- The `dashboard.js` script include

## Verification

After changes:
- `index.html` should load with the new landing layout
- Navbar should work (active state = main page)
- Theme toggle should work on the new page
- All links should work (wiki, gallery, tools, contact)
- Wiki, tools, gallery, contact should be UNCHANGED
- No JS errors
- Responsive on mobile
