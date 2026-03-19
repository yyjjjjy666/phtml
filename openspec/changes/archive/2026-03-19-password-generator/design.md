## Context

Static site with no backend. All computation must run client-side. The tool sits at `geller.ee/tools/password` following the existing `folder/index.html` clean-URL pattern. Shared stylesheet and the existing design system (dark bg, `#e0ff03` accent, Courier New) apply.

The feature set is large; it is split into tiers so each tier is independently shippable:
- **Tier 1 (core):** random-char generator, strength/entropy display, copy + clipboard auto-clear
- **Tier 2 (passphrase):** word-list passphrase mode
- **Tier 3 (extras):** deterministic mode, custom pattern, HIBP breach check, QR code, local history

## Goals / Non-Goals

**Goals:**
- Generate passwords entirely in the browser using `crypto.getRandomValues()` (CSPRNG)
- Show real entropy (bits) and estimated crack time (human-readable)
- Passphrase mode with configurable words, separator, capitalization, numbers/symbols
- Deterministic mode: PBKDF2(masterPhrase + domain) → reproducible password without storing anything
- Custom pattern syntax: e.g. `Aa0!` meaning upper+lower+digit+symbol repeated
- HIBP k-anonymity check (SHA-1 prefix, no full hash sent)
- QR code display (drawn on `<canvas>` using a tiny inline QR encoder — no CDN)
- Clipboard auto-clear after configurable timeout (default 30 s)
- Local history in `localStorage` (clearable, never sent anywhere)
- Presets for common site constraints (Gmail, Apple ID, etc.)
- Explicit "no server" notice in the UI

**Non-Goals:**
- Server-side storage or accounts
- Browser extension
- Full password manager (vault, autofill)
- Username generator (can be added later as a trivial extension)
- Full i18n / RTL support

## Decisions

### D1: No external dependencies
**Decision:** All logic in a single `js/password.js` file; QR encoding via a ~200-line inline implementation (ISO 18004 numeric/alphanumeric/byte modes, low error correction).
**Why:** Keeps the site dependency-free. A CDN for qrcode.js adds a network round-trip and external trust dependency.
**Alternative considered:** `qrcode.js` from CDN — rejected for above reasons.

### D2: CSPRNG via Web Crypto
**Decision:** Use `crypto.getRandomValues(new Uint32Array(1))` for all randomness.
**Why:** Available in all modern browsers, cryptographically strong.
**Alternative:** `Math.random()` — rejected, not cryptographically secure.

### D3: Entropy formula
**Decision:** `H = L × log2(C)` where L = length, C = charset size. Crack-time estimate assumes 10B guesses/s (GPU cluster) and 100T guesses/s (nation-state), displayed as human-readable duration.
**Why:** Standard NIST / Shannon entropy definition; two threat models give useful context.

### D4: Passphrase word list
**Decision:** Embed the EFF Short Wordlist 1 (1296 words, ~25 KB minified) inline in `password.js` as a JS array.
**Why:** No extra network request; 1296 words give 10.3 bits/word (adequate). Full Diceware (7776 words) would add ~100 KB.
**Alternative:** Fetch word list on demand — rejected for offline support.

### D5: Deterministic mode via WebCrypto PBKDF2
**Decision:** `PBKDF2(masterPhrase, domain, 100_000 iterations, SHA-256)` → derive bytes → encode to charset.
**Why:** Standard KDF; runs entirely in browser; same inputs always produce same output without any stored state.
**Security note:** Master phrase never leaves the device; displayed password should be treated like any password.

### D6: HIBP check via k-anonymity
**Decision:** SHA-1 hash password, send first 5 hex chars to `api.pwnedpasswords.com/range/{prefix}`, check if full hash suffix is in response.
**Why:** HIBP's official k-anonymity model — the actual password is never sent.
**Constraint:** Requires a network call; show a clear "checking..." state and gracefully degrade if offline.

### D7: QR code
**Decision:** Draw on `<canvas>` using a self-contained ISO 18004 encoder limited to byte mode.
**Why:** Sufficient for passwords (arbitrary byte sequences); keeps zero external deps.

### D8: Local history
**Decision:** Store last 20 generated passwords in `localStorage` as a JSON array `{password, timestamp, mode}`. Never auto-sync or upload.
**Why:** Convenience without any server exposure. User can clear at any time.

### D9: Tab-based UI
**Decision:** Four tabs — **generate** | **passphrase** | **deterministic** | **pattern** — share a single entropy/strength meter and copy controls below the tabs.
**Why:** Avoids a single overwhelming page; each mode is independently usable.

## Risks / Trade-offs

- **HIBP offline failure** → Show "offline – check skipped" gracefully; never block generation.
- **QR encoder complexity** → Inline ISO 18004 encoder is ~200 lines; it handles byte mode only, which covers all password characters. If a password exceeds QR capacity (~2953 bytes for version 40) show an error. Passwords are always ≪ this limit.
- **PBKDF2 blocking main thread** → 100k iterations is ~50–200 ms; acceptable. If it causes visible lag, drop to 50k with a note in the UI.
- **localStorage history** → Not encrypted at rest. Document this clearly — history is a convenience feature, not a vault.
- **EFF word list size** → ~25 KB adds to `password.js` total size (~900 LOC + 1296 words). Acceptable for a static page; no build step needed.

## Migration Plan

No migration needed — this is a new page. Steps:
1. Create `tools/password/index.html`
2. Create `js/password.js`
3. Add CSS section to `css/styles.css`
4. Update nav dropdown on all pages
5. Update `tools/index.html` hub
