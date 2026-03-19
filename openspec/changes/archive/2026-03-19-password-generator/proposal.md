## Why

The site has one tool (wheel) but no security utilities. A password generator built entirely in-browser serves a practical need while keeping the site's no-backend philosophy and adds educational value by explaining *why* a generated credential is strong.

## What Changes

- New page at `geller.ee/tools/password` with a full-featured client-side password generator
- Dropdown nav on every page gains a `password` entry
- `tools/index.html` hub lists the new tool
- New JS file `js/password.js` (≈600–900 lines, no dependencies)
- No new CSS file — styles added to shared `css/styles.css`

## Capabilities

### New Capabilities

- `password-generator`: Client-side password/passphrase generation, strength evaluation, breach check, and clipboard utilities delivered as a single-page tool

### Modified Capabilities

- `site-structure`: Nav dropdown and tools hub gain one new entry (`password`)

## Impact

- `tools/password/index.html` — new file
- `js/password.js` — new file (~800 LOC, vanilla JS + WebCrypto API)
- `css/styles.css` — new section for password tool UI
- `tools/index.html` — add listing
- All other `index.html` files — add `<li><a href="/tools/password">password</a></li>` to dropdown
