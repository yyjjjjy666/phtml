## Why

The homepage currently shows only basic personal info. Adding a personal dashboard transforms it into a useful daily start page — one central place for time, weather, tasks, search, and motivation, all without a server.

## What Changes

- Add a clock/date widget updating every second (time, day of week, date)
- Add weather widget via Open-Meteo API (free, no key), location resolved from IP via ipapi.co
- Add time progress bars for day, week, month, and year
- Add a search bar with engine switcher (Google, StartPage, DuckDuckGo), keyboard shortcut `/`
- Add a daily tasks list with localStorage persistence; completed tasks auto-clear next day
- Add quick links grid with right-click delete and `+` button to add new ones
- Add a "main intention for today" field — single text saved per day
- Add a daily quote with a refresh button
- All data persisted in localStorage; no server required

## Capabilities

### New Capabilities

- `homepage-dashboard`: Full dashboard on index.html — clock, weather, progress bars, search, tasks, quick links, daily intention, quote of the day

### Modified Capabilities

- `site-structure`: Homepage content changes significantly — dashboard widgets replace/extend the existing layout

## Impact

- `index.html`: Major content additions (all widgets)
- New `js/dashboard.js`: All dashboard logic
- `css/styles.css`: New widget styles, light theme overrides
- External APIs: `ipapi.co` (IP→location, already used), `open-meteo.com` (weather forecast, no key)
- No breaking changes to other pages
