## 1. Page scaffold

- [x] 1.1 Create `tools/password/index.html` with nav (tools active), main container, footer, and `<script src="/js/password.js">`
- [x] 1.2 Add `<li><a href="/tools/password">password</a></li>` to the dropdown in `index.html`, `docs/index.html`, `links/index.html`, `gallery/index.html`, `contact/index.html`, `tools/index.html`, and `tools/wheel/index.html`
- [x] 1.3 Add password tool listing to `tools/index.html` hub

## 2. CSS

- [x] 2.1 Add `/* password tool */` section to `css/styles.css`: tab bar, active-tab highlight, meter bar (4 segments, color-coded), no-server notice, history panel, QR canvas wrapper

## 3. Core generator (js/password.js)

- [x] 3.1 Implement `randomInt(max)` using `crypto.getRandomValues()`
- [x] 3.2 Implement `buildCharset(opts)` — assembles charset from enabled classes (lower, upper, digits, symbols) with optional visual-similar exclusion (`O`, `0`, `l`, `I`, `1`)
- [x] 3.3 Implement `generatePassword(length, charset)` — picks `length` random chars from charset
- [x] 3.4 Implement `calcEntropy(length, charsetSize)` → bits as `length × log2(charsetSize)`
- [x] 3.5 Implement `crackTime(bits)` → returns `{fast, nation}` human-readable strings at 10B and 100T guesses/s
- [x] 3.6 Implement `strengthLabel(bits)` → "weak" / "fair" / "strong" / "very strong"

## 4. Passphrase mode

- [x] 4.1 Embed EFF Short Wordlist (1296 words) as a JS array `const EFF_WORDS = [...]`
- [x] 4.2 Implement `generatePassphrase(wordCount, separator, capitalize, appendExtra)` using `randomInt(1296)` for word selection
- [x] 4.3 Compute passphrase entropy as `wordCount × log2(1296)` and display it in the shared meter

## 5. Deterministic mode

- [x] 5.1 Implement `derivePassword(masterPhrase, domain, length, charset)` using `window.crypto.subtle.importKey` + `deriveBits` (PBKDF2-SHA256, 100 000 iterations); convert derived bytes to charset characters
- [x] 5.2 Wire master phrase and domain inputs; show spinner during derivation; update display when complete

## 6. Custom pattern mode

- [x] 6.1 Implement `generateFromPattern(pattern)` — maps `A`→upper, `a`→lower, `0`→digit, `!`→symbol, `*`→any, literal otherwise
- [x] 6.2 Wire pattern input and live-preview output length

## 7. Presets

- [x] 7.1 Add preset selector (`<select>`) with Default, Gmail, Apple ID, PIN, High-security options
- [x] 7.2 Applying a preset updates length slider and checkbox states and triggers regeneration

## 8. Strength meter UI

- [x] 8.1 Render entropy bits, strength label (color-coded), and crack-time table after every generation
- [x] 8.2 Animate meter bar width and color transition on new password

## 9. Copy and clipboard management

- [x] 9.1 Implement copy button using `navigator.clipboard.writeText()`
- [x] 9.2 Implement clipboard auto-clear: after copy, start countdown (default 30 s); on expiry call `navigator.clipboard.writeText('')`
- [x] 9.3 Add "clear clipboard" button that cancels countdown and clears immediately
- [x] 9.4 Make timeout configurable (input field, 10–120 s)

## 10. QR code

- [x] 10.1 Implement minimal ISO 18004 byte-mode QR encoder in `password.js` (version auto-select 1–10, low error correction)
- [x] 10.2 Render QR onto `<canvas id="pw-qr">` after every generation; show "QR" toggle to show/hide

## 11. HIBP breach check

- [x] 11.1 Implement `hibpCheck(password)`: SHA-1 hash via `crypto.subtle.digest`, send first 5 chars to `https://api.pwnedpasswords.com/range/{prefix}`, check suffix in response
- [x] 11.2 Wire "check breach" button; show loading state, result message, and error state if offline

## 12. Local history

- [x] 12.1 After each generation, prepend `{password, timestamp, mode}` to `localStorage['pwHistory']` (keep last 20)
- [x] 12.2 Render history list in collapsible panel; each entry shows timestamp and masked password (reveal on hover)
- [x] 12.3 Add "clear history" button that calls `localStorage.removeItem('pwHistory')` and clears the list

## 13. No-server notice

- [x] 13.1 Add persistent notice element: "all generation happens in your browser — nothing is sent to any server"
- [x] 13.2 HIBP check button label includes "sends anonymized hash prefix to haveibeenpwned.com"
