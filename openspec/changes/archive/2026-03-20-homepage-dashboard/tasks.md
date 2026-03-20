## 1. HTML Structure

- [x] 1.1 Add `<div id="dashboard">` container to `index.html` with sections for each widget
- [x] 1.2 Add clock/date markup: `#dash-time`, `#dash-dow`, `#dash-date`
- [x] 1.3 Add weather markup: `#dash-weather` with icon, temp, description, wind spans
- [x] 1.4 Add progress bars markup: four `<div class="dash-progress-row">` items for day/week/month/year
- [x] 1.5 Add search markup: engine `<select>`, text `<input id="dash-search">`, submit button
- [x] 1.6 Add tasks markup: input row, `<ul id="dash-tasks">` list
- [x] 1.7 Add quick links markup: `<div id="dash-links">` grid, `+` button, inline add form
- [x] 1.8 Add intention markup: `<input id="dash-intention">` with label
- [x] 1.9 Add quote markup: `<blockquote id="dash-quote">`, author `<cite>`, refresh button
- [x] 1.10 Add `<script src="/js/dashboard.js"></script>` to `index.html`

## 2. CSS Styles

- [x] 2.1 Add `#dashboard` layout styles (max-width, spacing, section gaps)
- [x] 2.2 Add clock widget styles (large time font, smaller date/dow)
- [x] 2.3 Add weather widget styles (flex row, emoji size, temp/desc/wind layout)
- [x] 2.4 Add progress bar styles (`.dash-progress-bar` track + fill, label row)
- [x] 2.5 Add search bar styles (flex row, engine select, input, button)
- [x] 2.6 Add tasks list styles (checkbox items, done strikethrough, input row)
- [x] 2.7 Add quick links grid styles (`.dash-link-tile` card, hover state, `+` button)
- [x] 2.8 Add custom context menu styles (`.dash-ctx-menu` positioned div)
- [x] 2.9 Add intention field styles (full-width input, label)
- [x] 2.10 Add quote styles (blockquote, cite, refresh button)
- [x] 2.11 Add `[data-theme="light"]` overrides for all dashboard elements

## 3. JS — Clock & Progress Bars

- [x] 3.1 Implement `tickClock()` — update `#dash-time`, `#dash-dow`, `#dash-date` with current locale strings
- [x] 3.2 Implement `tickProgress()` — calculate and update all four progress bar fills and percentage labels
- [x] 3.3 Wire both into a single `setInterval(tick, 1000)` on DOMContentLoaded

## 4. JS — Weather

- [x] 4.1 Implement WMO weather code lookup table (code → `{emoji, label}`)
- [x] 4.2 Implement `fetchWeather()` — check `sessionStorage.dashWeather`; if cached and fresh, use it; otherwise fetch `ipapi.co/json/` then Open-Meteo
- [x] 4.3 Render weather data into `#dash-weather` spans
- [x] 4.4 Handle fetch errors gracefully (show error text in widget, don't crash)

## 5. JS — Search

- [x] 5.1 Implement engine config map (`{google, startpage, duckduckgo}` with search URL templates)
- [x] 5.2 Load saved engine from `localStorage.dashEngine` and set `<select>` value on init
- [x] 5.3 Save engine selection to localStorage on `<select>` change
- [x] 5.4 Implement `doSearch()` — build URL from engine + query, open in new tab
- [x] 5.5 Add `/` keydown listener on `document` (focus search if not already in an input)
- [x] 5.6 Add `Escape` keydown listener on search input (clear + blur)
- [x] 5.7 Add `Enter` keydown listener on search input to trigger `doSearch()`

## 6. JS — Tasks

- [x] 6.1 Implement `loadTasks()` — read `localStorage.dashTasks`, purge completed tasks from previous days, save purged list back
- [x] 6.2 Implement `saveTasks()` — write current tasks array to `localStorage.dashTasks`
- [x] 6.3 Implement `renderTasks()` — build `<li>` items with checkbox; clicking checkbox toggles `done` and re-renders
- [x] 6.4 Implement `addTask(text)` — append `{text, done: false, date: today}` to array, save, re-render
- [x] 6.5 Wire task input `Enter` keydown to `addTask()`

## 7. JS — Quick Links

- [x] 7.1 Implement `loadLinks()` / `saveLinks()` using `localStorage.dashLinks`
- [x] 7.2 Implement `renderLinks()` — build `.dash-link-tile` anchors; suppress right-click default, show custom context menu
- [x] 7.3 Implement context menu show/hide logic — position at cursor, dismiss on outside click
- [x] 7.4 Implement "remove" action from context menu — splice link from array, save, re-render
- [x] 7.5 Implement `+` button click — show inline add form
- [x] 7.6 Implement add form submit — validate URL, append link, save, re-render, hide form
- [x] 7.7 Add `Escape` handler on add form to dismiss it

## 8. JS — Intention

- [x] 8.1 Compute today's key `dashIntention_YYYY-MM-DD` and load value on init
- [x] 8.2 Save intention on input `blur` and `Enter` keydown
- [x] 8.3 Ensure old date keys are not loaded (key mismatch = blank field)

## 9. JS — Quote of the Day

- [x] 9.1 Add hardcoded array of at least 20 curated quotes (`{text, author}`)
- [x] 9.2 Implement `getDailyQuote()` — `dayOfYear % quotes.length`; check `localStorage.dashQuoteOverride` for today's override
- [x] 9.3 Render quote and author into `#dash-quote` and `<cite>`
- [x] 9.4 Implement refresh button — pick random different index, store as `{date, index}` in `localStorage.dashQuoteOverride`, re-render
