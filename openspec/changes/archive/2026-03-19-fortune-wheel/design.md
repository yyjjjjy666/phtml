## Context

The site is a zero-dependency static HTML website at `geller.ee`. No build tooling, no framework, no package manager. All pages share `css/styles.css` and the same `<nav class="navbar">` pattern. The JS folder (`js/`) currently holds `gallery.js` and `visitor-info.js`.

## Goals / Non-Goals

**Goals:**
- Render a segmented wheel on an HTML5 Canvas, colored with alternating accent/muted colors consistent with the dark theme
- Allow the user to add and remove custom text items (minimum 2 to spin)
- Allow the user to set spin duration in seconds (1–60 range)
- Animate the wheel spin with gradual deceleration, stopping on a randomly chosen winner
- Display the winner in a clear announcement below the wheel after it stops
- Keep visual design consistent with the site (dark background `#2C2C2C`, accent `#e0ff03`, monospace font)
- Add "wheel" nav link to all existing pages

**Non-Goals:**
- Saving wheel configurations across sessions
- Weighted/probability-adjusted segments
- Sound effects
- Sharing or exporting results
- Server-side anything

## Decisions

### 1. HTML5 Canvas for wheel rendering

**Decision:** Draw the wheel using the Canvas 2D API with `arc()` segments and rotated text labels.

**Rationale:** Canvas gives precise control over segment geometry and text positioning at any rotation angle. A pure CSS/DOM approach (rotating `<div>` slices) becomes unwieldy with many items and requires complex transforms for text. Canvas is well-supported in all modern browsers with no dependencies.

### 2. Spin animation via `requestAnimationFrame` with easing

**Decision:** Animate rotation using `requestAnimationFrame`. Spin speed starts high and decelerates with an ease-out curve over the user-specified duration. The winner segment is determined before the animation starts; the final rotation is calculated to land the pointer at the **center** of the winning segment plus a random ±35% jitter within that segment.

**Rationale:** Pre-calculating the winner allows a smooth, deterministic stop. The user-specified duration is honored exactly. Aiming for segment center (not boundary) ensures the pointer always lands clearly inside the winning slice. Jitter within the segment prevents the stop position from looking mechanical on repeated spins.

### 3. Item management via a live list in the DOM

**Decision:** Items are stored in a JS array. The UI shows a text input + "add" button and a list of current items each with a "remove" button. The canvas redraws on every item change.

**Rationale:** Simple, stateless, no persistence needed. The list doubles as a preview of what's on the wheel.

### 4. Spin duration input

**Decision:** A number input (1–60 seconds, default 5) lets the user control how long the wheel appears to spin before stopping.

**Rationale:** Direct and obvious. Range constraint prevents unreasonably short or long spins.

### 5. "Wheel" inserted as last nav item before "contact"

**Decision:** Insert `wheel.html` as a nav item after `gallery` and before `contact`.

**Rationale:** Follows existing ordering logic (tools after content pages). All six files must be updated.

## Risks / Trade-offs

- [Canvas text clipping] Long item labels may overflow their segment → Truncate labels longer than ~12 characters with ellipsis when drawing
- [Few items look sparse] With 2 items the wheel has only 2 large segments → Acceptable; still functional
- [Many items shrink text] With 20+ items text becomes hard to read → Cap at 20 items max
- [Spin feels random] Users may notice the winner is picked before spinning → Intentional and unavoidable; the visual experience is what matters

## Open Questions

- Should items persist in `localStorage` across page reloads? → No, keep it session-only for v1.
- Should there be a pointer/arrow indicator showing the winning segment? → Yes, a fixed triangle pointer at the top of the wheel.
