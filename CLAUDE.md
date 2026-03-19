# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML personal website hosted on GitHub Pages at `geller.ee`. No build process, no package manager, no framework — pure HTML/CSS/vanilla JS.

## Architecture

### Directory structure

```
phtml/
├── index.html              ← geller.ee/
├── wiki/index.html         ← geller.ee/wiki  (combined docs + links)
├── docs/index.html         ← redirects to /wiki
├── links/index.html        ← redirects to /wiki
├── gallery/index.html      ← geller.ee/gallery
├── contact/index.html      ← geller.ee/contact
├── tools/
│   ├── index.html          ← geller.ee/tools  (hub listing all tools)
│   ├── wheel/index.html    ← geller.ee/tools/wheel
│   └── password/index.html ← geller.ee/tools/password
├── css/styles.css          ← single shared stylesheet
├── js/
│   ├── visitor-info.js     ← footer IP fetch (shared, all pages)
│   ├── gallery.js          ← lightbox logic
│   ├── wheel.js            ← fortune wheel logic
│   └── password.js         ← password generator logic
├── files/                  ← personal guide files (.txt, .pdf)
├── images/                 ← gallery images
└── data/                   ← misc data files (JSON etc.)
```

### Clean URLs

Pages use `folder/index.html` so GitHub Pages serves them at `geller.ee/page` without `.html`. This is the only way to achieve clean URLs on GitHub Pages without server config.

### Root-relative paths

All internal `href` and `src` attributes use root-relative paths starting with `/`:
- `/css/styles.css` — not `css/styles.css` or `../../css/styles.css`
- `/js/visitor-info.js`
- `/wiki`, `/gallery`, `/tools`, `/tools/wheel`, `/tools/password`

This works from any subfolder depth. **Note:** root-relative paths break with `file://` — always use `python -m http.server 8080` for local testing.

### Navigation pattern

Every page has the same `<nav class="navbar">`. The current page gets `class="active"`, all others `class="non-active"`. The tools nav item uses a CSS-only hover dropdown:

```html
<li class="dropdown">
    <a href="/tools" class="non-active">tools</a>
    <ul class="dropdown-menu">
        <li><a href="/tools/wheel">wheel</a></li>
        <li><a href="/tools/password">password</a></li>
    </ul>
</li>
```

On mobile (≤600px) the dropdown is hidden; tapping "tools" goes to the hub. **When adding a new tool:** create `tools/<name>/index.html`, add a `<li>` to the dropdown on every page, and add a listing on `tools/index.html`.

### Design system (from `css/styles.css`)

- Background: `#2C2C2C`, text: `#E0E0E0`, accent: `#e0ff03`
- Font: `'Courier New', monospace`, 18px base
- Nav: `.active` = yellow bg + black text; `.non-active` = light text
- Links: wrap in `<div class="links">` for yellow styling
- All link/nav text is lowercase (`text-transform: lowercase`)

### Footer

Every page has `<footer id="visitor-footer">` with three spans (`visitor-ip`, `visitor-location`, `visitor-org`) populated by `/js/visitor-info.js` via `ipapi.co`. Results cached in `sessionStorage` under `visitorInfo`.

## Development

Serve locally: `python -m http.server 8080` then open `http://localhost:8080`.

Deploy: push to `main` branch — GitHub Pages serves automatically via `CNAME` → `geller.ee`.

## Known issues

- `gallery/index.html` references `/images/example.jpg` as a placeholder — replace with real images.
