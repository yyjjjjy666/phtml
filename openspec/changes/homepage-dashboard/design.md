## Context

The site is a static GitHub Pages site with no build process, no framework, and no server. All JS is vanilla, all persistence is client-side. The homepage (`index.html`) currently shows a short personal intro. The dashboard widgets will be added below (or replacing) that content. A single new file `js/dashboard.js` handles all dashboard logic.

## Goals / Non-Goals

**Goals:**
- Clock/date widget updating every second via `setInterval`
- Weather via Open-Meteo (free, no API key): coordinates resolved from `ipapi.co/json/` (reuse from ip-tool)
- Time progress bars: day (0–24h), week (Mon–Sun), month (1–last day), year (Jan 1–Dec 31)
- Search bar with Google / StartPage / DuckDuckGo switcher; saves last engine to localStorage; `/` hotkey focuses it, `Escape` clears, `Enter` submits
- Daily tasks: add with Enter, check off to complete; auto-purge completed tasks on new day; stored as `{text, done, date}` array in `localStorage.dashTasks`
- Quick links: stored as `{label, url}[]` in `localStorage.dashLinks`; rendered as clickable tiles; right-click opens context menu with "remove"; `+` button opens inline add form
- Daily intention: single text input per day stored in `localStorage.dashIntention_{YYYY-MM-DD}`; clears automatically next day
- Quote of the day: hardcoded curated list of ~30 quotes; pick by `dayOfYear % quotes.length`; refresh button picks random different quote and stores override in `localStorage.dashQuoteOverride` (cleared next day)
- Full light theme support matching existing CSS variables

**Non-Goals:**
- No server, no external quote API (to avoid rate limits and keep it offline-capable)
- No drag-and-drop reordering (scope creep)
- No push notifications or service worker
- No sync across devices

## Decisions

### Single JS file (`js/dashboard.js`)
All widget logic in one file loaded at bottom of `index.html`. No modules, consistent with the rest of the codebase. Sections clearly delimited by comments.

**Alternative considered:** Separate file per widget — rejected; overkill for a static site, adds more `<script>` tags.

### Weather: two-step fetch
1. `ipapi.co/json/` → `{latitude, longitude, city}` (already used by ip-tool)
2. `api.open-meteo.com/v1/forecast?latitude=…&longitude=…&current_weather=true` → temp, windspeed, weathercode
Cache result in `sessionStorage.dashWeather` to avoid redundant fetches on nav back.

**WMO weather codes** mapped to emoji + label (clear, cloudy, rain, snow, etc.) via a lookup table in JS.

### Progress bars: pure math
No external lib. `dayProgress = (now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds()) / 86400`. Week: Monday = 0 via `(day+6)%7`. Month: `(date-1)/(daysInMonth-1)`. Year: dayOfYear / (isLeap ? 366 : 365).

### Tasks: date-keyed purge
On init, filter `dashTasks` array: keep items where `!item.done || item.date === today`. This auto-clears yesterday's completed items without requiring a cron.

### Quick links: context menu
Native browser context menu suppressed on link tiles with `e.preventDefault()`. Custom `<div class="ctx-menu">` shown at cursor position. Dismissed on any outside click.

### Quote list
~30 curated quotes hardcoded in `dashboard.js`. Daily quote = `quotes[dayOfYear % quotes.length]`. Override stored in `localStorage.dashQuoteOverride` as `{date, index}` — if date matches today, use override index.

## Risks / Trade-offs

- `ipapi.co` rate-limit (1000 req/day free tier) → Mitigated: weather geo-fetch cached in `sessionStorage`; ip-tool fetches are separate and user-triggered only
- Open-Meteo is free with no key but could change → Low risk; it's a stable open-data project. No mitigation needed now.
- Light theme: dashboard adds many new elements → All new elements must have `[data-theme="light"]` overrides in the CSS block
- Homepage content: existing `<main>` content (personal intro text) must coexist with dashboard → Dashboard placed in a `<div id="dashboard">` after existing content; or existing content trimmed to just the greeting + dashboard below

## Migration Plan

1. Add `<div id="dashboard">` to `index.html` with all widget markup
2. Create `js/dashboard.js`
3. Add dashboard CSS to `css/styles.css`
4. Add `<script src="/js/dashboard.js">` to `index.html`
5. No rollback complexity — static file; revert via git

## Open Questions

- Should the existing homepage intro text be kept, trimmed, or replaced? → Keep a short 1-line greeting; dashboard is the main content below it.
