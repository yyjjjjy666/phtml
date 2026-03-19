## ADDED Requirements

### Requirement: Gallery page exists and is navigable
The site SHALL include a `gallery.html` page accessible via the main navigation bar. All existing pages SHALL be updated to include a "gallery" link in the `<nav class="navbar">` element.

#### Scenario: User navigates to gallery from any page
- **WHEN** a user clicks the "gallery" nav link on any page
- **THEN** the browser loads `gallery.html` and the "gallery" nav item is styled with `class="active"`

#### Scenario: Gallery nav link is present on all pages
- **WHEN** a user visits any of the five site pages (index, docs, links, contact, gallery)
- **THEN** the nav bar contains exactly five items including "gallery"

### Requirement: Masonry image grid layout
The gallery page SHALL display images in a masonry-style multi-column grid using CSS `column-count`.

#### Scenario: Images displayed in columns
- **WHEN** the gallery page is loaded
- **THEN** images are arranged in a column-based masonry layout with consistent gutters

#### Scenario: Image does not break across column boundary
- **WHEN** an image is rendered inside the masonry grid
- **THEN** the image is not split across two columns (`break-inside: avoid` applied to image wrappers)

### Requirement: Image category sections
The gallery page SHALL support grouping images under named section headings.

#### Scenario: Category heading appears above its images
- **WHEN** a section with a heading and images is present in the HTML
- **THEN** the heading is rendered above the images belonging to that section

### Requirement: Lightbox overlay for full-size image view
Clicking an image SHALL open a full-screen lightbox overlay showing the full-size version of the image.

#### Scenario: User opens lightbox
- **WHEN** a user clicks on a thumbnail image in the gallery grid
- **THEN** a full-screen dark overlay opens displaying the full-size image

#### Scenario: User closes lightbox by clicking overlay
- **WHEN** a lightbox overlay is open and the user clicks outside the image (on the overlay background)
- **THEN** the lightbox closes and the gallery grid is visible again

#### Scenario: User closes lightbox with keyboard
- **WHEN** a lightbox overlay is open and the user presses the Escape key
- **THEN** the lightbox closes

### Requirement: Consistent visual design
The gallery page SHALL follow the existing site design system: dark background (`#2C2C2C`), light text (`#E0E0E0`), accent color `#e0ff03`, and `'Courier New', monospace` font.

#### Scenario: Gallery page matches site theme
- **WHEN** the gallery page is loaded
- **THEN** the background, text color, and font match the other pages on the site
