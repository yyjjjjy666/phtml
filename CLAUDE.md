# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML personal website hosted on GitHub Pages at `geller.ee`. No build process, no package manager, no framework — pure HTML/CSS/vanilla JS.

## Architecture

### Directory structure

```
phtml/
├── index.html                    ← geller.ee/
├── wiki/index.html               ← geller.ee/wiki  (combined docs + links)
├── gallery/index.html            ← geller.ee/gallery
├── contact/index.html            ← geller.ee/contact
├── search/index.html             ← geller.ee/search
├── tools/
│   ├── index.html                ← geller.ee/tools  (hub listing all tools)
│   ├── wheel/index.html          ← geller.ee/tools/wheel
│   ├── password/index.html       ← geller.ee/tools/password
│   └── ip/index.html             ← geller.ee/tools/ip
├── assets/
│   ├── css/styles.css            ← single shared stylesheet
│   ├── js/
│   │   ├── lib/
│   │   │   ├── navbar-loader.js  ← fetches /shared/navbar.html, injects active states
│   │   │   ├── theme.js          ← theme toggle (dark/light)
│   │   │   ├── nav-scroll.js     ← navbar hide-on-scroll
│   │   │   └── command-palette.js← Ctrl+K command palette
│   │   └── pages/
│   │       ├── dashboard.js      ← homepage widgets (clock, weather, tasks, links)
│   │       ├── wheel.js          ← fortune wheel (FortuneWheel class)
│   │       ├── password.js       ← password / passphrase generator
│   │       ├── ip-tool.js        ← IP geolocation lookup
│   │       ├── gallery.js        ← lightbox logic
│   │       ├── search.js         ← site search
│   │       ├── wiki.js           ← markdown wiki renderer
│   │       └── prism-init.js     ← PrismJS syntax highlight init
│   ├── images/                   ← gallery images
│   └── files/                    ← personal guide files (.txt, .pdf)
├── shared/
│   └── navbar.html               ← shared navbar markup (loaded via fetch by navbar-loader.js)
└── data/                         ← misc data files (JSON etc.)
```

### Clean URLs

Pages use `folder/index.html` so GitHub Pages serves them at `geller.ee/page` without `.html`. This is the only way to achieve clean URLs on GitHub Pages without server config.

### Root-relative paths

All internal `href` and `src` attributes use root-relative paths starting with `/`:
- `/assets/css/styles.css`
- `/assets/js/lib/navbar-loader.js`
- `/assets/js/pages/dashboard.js`
- `/assets/images/...`, `/assets/files/...`
- `/wiki`, `/gallery`, `/tools`, `/tools/wheel`, `/tools/password`, `/tools/ip`

This works from any subfolder depth. **Note:** root-relative paths break with `file://` — always use `python -m http.server 8080` for local testing.

### Navigation pattern

The navbar HTML lives in `/shared/navbar.html` and is fetched + injected by `/assets/js/lib/navbar-loader.js`. Active state is determined from `window.location.pathname` at load time — placeholders like `{ACTIVE_main}`, `{ACTIVE_wiki}` etc. are replaced with `"active"` or `"non-active"` before injection.

Every page has:
1. A `<div id="navbar-container"></div>` where the navbar is injected.
2. A theme-init inline `<script>` in `<head>` that reads localStorage and sets `document.documentElement.dataset.theme` — this prevents flash-of-wrong-theme before JS loads.
3. `<script src="/assets/js/lib/navbar-loader.js"></script>` at the bottom of `<body>`.

Tools nav item uses a CSS-only hover dropdown for desktop; on mobile (≤600px) tapping "tools" goes to the hub. **When adding a new tool:** create `tools/<name>/index.html`, add a `<li>` to `shared/navbar.html`, and add a listing on `tools/index.html`.

### Design system (from `assets/css/styles.css`)

CSS variables defined in `:root` (dark) and overridden in `[data-theme="light"]`:
- `--color-bg` / `--color-surface` / `--color-surface-2` / `--color-surface-3` — backgrounds
- `--color-text` / `--color-text-muted` / `--color-text-faint` — text hierarchy
- `--color-accent` (#00d4ff dark / #0099cc light), `--color-accent-alt` (#00ff88)
- `--color-border`, `--color-border-loud` — borders
- `--font-sans` (Inter), `--font-mono` (JetBrains Mono)
- `--radius-sm` (3px), `--radius-md` (6px), `--radius-lg` (10px)
- `--sp-1`…`--sp-10` — spacing scale (4px increments)
- `--shadow-sm`, `--shadow-md`, `--glow-accent`, `--glow-btn`

All link/nav text is lowercase (`text-transform: lowercase`).

## Development

Serve locally: `python -m http.server 8080` then open `http://localhost:8080`.

Deploy: push to `main` branch — GitHub Pages serves automatically via `CNAME` → `geller.ee`.

## Known issues

- `gallery/index.html` references `/assets/images/example.jpg` as a placeholder — replace with real images.
