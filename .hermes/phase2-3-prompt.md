# Phase 2+3: Contact page + New features

## Context
Repository at ~/phtml has been restructured. All paths use `/assets/...`. Navbar is loaded from `/shared/navbar.html` via `navbar-loader.js`. The fortune wheel has been fully refactored with localStorage persistence, weights, presets, confetti, and sound.

## Task 1: Contact page — update from placeholder

File: `/contact/index.html`

Replace the current content:
```html
<h2>content is being added...</h2>
<p>Lorem ipsum...</p>
```

With a proper contact page that has:
- **GitHub link**: `https://github.com/yyjjjjy666` — show as a tile/button with GitHub icon (use text "gh" or SVG inline)
- **PGP key**: placeholder section "PGP key — coming soon" — grayed out, with a note that email contact will be available once PGP is set up
- Style: match the design system (dark theme from CSS variables). Use `.tool-panel` or a clean card layout.

The page should still have the full `<html>` template with navbar-loader, theme.js, etc.

## Task 2: Scroll-to-top button

Add a floating scroll-to-top button to all pages.

### Implementation:
1. Add a `<button id="scroll-top-btn" title="back to top">↑</button>` at the bottom of `<body>` in all HTML files. Actually, better: add it to `shared/navbar.html` or inject it via a shared script. Best approach: add a `<div id="scroll-top-container"></div>` in each page's body, and let a shared script inject the button.

Actually, simplest approach: add the button HTML directly to each page's body (just before the scripts), and add one shared CSS + JS for it. Or even simpler: inject via a small inline script in shared/navbar.html since every page loads it.

Best approach:
1. Add `<button id="scroll-top-btn" aria-label="Scroll to top">↑</button>` right before `</body>` in all HTML pages
2. Add CSS to `assets/css/styles.css`:
```css
#scroll-top-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: #000;
  border: none;
  font-size: 20px;
  cursor: pointer;
  z-index: 999;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: var(--shadow-md);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
#scroll-top-btn.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
#scroll-top-btn:hover {
  box-shadow: var(--glow-btn);
}
```
3. Add JS (inline or in a shared file like `assets/js/lib/scroll-top.js`):
```js
(function() {
  var btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  var threshold = 300;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > threshold);
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
```
Include this script in all HTML pages.

## Task 3: Reading time for wiki articles

When a wiki article is rendered (in `assets/js/pages/wiki.js`), calculate and display reading time.

Reading time = ceil(word_count / 200) minutes. If < 1 min, show "< 1 min read".

Add the reading time display right below the article title, before the tags:
```html
<span class="wiki-reading-time">~3 min read</span>
```

Style in `assets/css/styles.css`:
```css
.wiki-reading-time {
  font-size: 12px;
  color: var(--color-text-faint);
  font-family: var(--font-mono);
  display: block;
  margin-bottom: var(--sp-2);
}
```

## Task 4: Keyboard shortcuts (1-5 for navbar)

Add keyboard shortcut support: pressing 1, 2, 3, 4, 5 on desktop navigates to navbar items.

Add to a shared script (e.g., `assets/js/lib/nav-scroll.js` or a new `assets/js/lib/keyboard-nav.js`):
```js
(function() {
  var NAV_KEYS = {
    '1': '/',
    '2': '/wiki',
    '3': '/gallery',
    '4': '/tools',
    '5': '/contact'
  };
  document.addEventListener('keydown', function(e) {
    // Don't trigger if user is typing in an input/textarea
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    // Don't trigger if modifier keys are pressed
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    
    var url = NAV_KEYS[e.key];
    if (url) {
      e.preventDefault();
      window.location.href = url;
    }
  });
})();
```

Include in all HTML pages.

## Task 5: RSS feed for wiki

Create `/wiki/feed.xml` — an RSS 2.0 feed of wiki articles.

Since the wiki content is static .md files, create a static feed.xml with the current 4 articles. Include:
- Title, link, description for each article
- `<pubDate>` based on last git commit date (use an approximate date or the date shown in the md files)
- `<guid>` per article

Generate the feed.xml file at `/wiki/feed.xml`.

Also add a `<link>` tag in `/wiki/index.html` `<head>`:
```html
<link rel="alternate" type="application/rss+xml" title="geller.ee wiki" href="/wiki/feed.xml">
```

## Implementation order

1. Contact page (index.html)
2. Scroll-to-top (CSS + JS + all HTML pages)
3. Reading time (wiki.js + CSS)
4. Keyboard nav (JS file + all HTML pages)
5. RSS feed (feed.xml + wiki/index.html link tag)

## Important notes
- All HTML pages must remain valid — preserve the full template with DOCTYPE, head, navbar-container, theme script, scripts, etc.
- Keep root-relative paths (starting with `/`)
- Test that all pages still load correctly after changes
- Don't break the wheel functionality
