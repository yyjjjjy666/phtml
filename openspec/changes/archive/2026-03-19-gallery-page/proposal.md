## Why

The site currently has no visual content section. A gallery page was listed as a planned feature and would make the personal site more expressive, showcasing photos or other images in an organized, visually appealing way.

## What Changes

- Add a new `gallery.html` page with a masonry-style image grid
- Add a CSS lightbox overlay that opens when an image is clicked
- Add gallery-specific CSS rules to `css/styles.css`
- Support optional image category/section groupings
- Update the `<nav>` bar on all five pages to include the new "gallery" link
- Remove the `gallery page` entry from the todo list in `index.html`

## Capabilities

### New Capabilities

- `image-gallery`: Masonry-style grid layout displaying local images from the `images/` folder, with category/section groupings and a pure CSS/JS lightbox for full-size image viewing

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- New file: `gallery.html`
- Modified: `css/styles.css` (masonry layout, lightbox styles, gallery-specific rules)
- Modified: `index.html`, `docs.html`, `links.html`, `contact.html` (nav updated to include gallery link)
- The `images/` directory will hold source images; filenames are referenced directly in `gallery.html`
- No build process changes; pure HTML/CSS with minimal vanilla JS for the lightbox
