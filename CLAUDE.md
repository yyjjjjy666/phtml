# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML personal website hosted on GitHub Pages at `geller.ee`. No build process, no package manager, no framework — pure HTML/CSS with an empty `js/` directory.

## Architecture

Four HTML pages sharing one stylesheet:

- [index.html](index.html) — main page (currently shows a todo list)
- [docs.html](docs.html) — index of documentation files in `docs/`
- [links.html](links.html) — curated links (software, services, AI tools, study resources)
- [contact.html](contact.html) — contact page
- [css/styles.css](css/styles.css) — single shared stylesheet for all pages

### Navigation pattern

Every page has the same `<nav class="navbar">` with four links. The current page gets `class="active"`, all others get `class="non-active"`. Update all four pages when adding a new nav item.

### Design system (from styles.css)

- Background: `#2C2C2C`, text: `#E0E0E0`, accent/active: `#e0ff03` (yellow-green)
- Font: `'Courier New', monospace`, 18px base
- Links use `class="links"` wrapper for yellow styling; nav uses `.active`/`.non-active` classes
- All link text is lowercase (`text-transform: lowercase`)

## Known issues

- [index.html:26](index.html#L26) has a broken `<script src="js/*.js">` — wildcard globs don't work in script src attributes. Remove or replace with actual filenames when adding JS.
- `js/` and `images/` directories are empty.

## Development

No build step. Edit HTML/CSS directly and open in a browser. Deploy by pushing to the `main` branch (GitHub Pages serves it automatically via the `CNAME` pointing to `geller.ee`).
