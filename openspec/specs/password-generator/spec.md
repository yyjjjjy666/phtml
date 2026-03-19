# Password Generator

## Requirements

### Requirement: Client-side random password generation
The tool SHALL generate passwords entirely in the browser using `crypto.getRandomValues()`. No data SHALL be sent to any server during generation. The UI SHALL explicitly state "generated locally — nothing is sent to any server".

#### Scenario: Generate with default settings
- **WHEN** a user opens the password tool
- **THEN** a password is immediately generated with length 16, lowercase + uppercase + digits + symbols enabled, and visually-similar chars excluded

#### Scenario: Adjust settings and regenerate
- **WHEN** a user changes any setting (length, character classes, exclude-similar toggle) and clicks "generate"
- **THEN** a new password matching the updated settings is generated

#### Scenario: Minimum viable charset
- **WHEN** a user disables all character classes except one
- **THEN** generation proceeds using only that class (tool does not block or throw)

### Requirement: Entropy and strength display
For every generated password the tool SHALL compute `H = L × log2(C)` (Shannon entropy) and display:
- Entropy in bits (e.g. "72 bits")
- A strength label: Weak (<40 bits), Fair (40–59), Strong (60–79), Very Strong (≥80)
- Estimated crack time at two threat levels: 10B guesses/s and 100T guesses/s

#### Scenario: Strong password shows green label
- **WHEN** a 16-char password with full charset (≥80 bits) is generated
- **THEN** the strength label reads "very strong" and the meter is full

#### Scenario: Short password shows weak label
- **WHEN** a 6-char digits-only password (≈19 bits) is generated
- **THEN** the strength label reads "weak" and crack time shows seconds

### Requirement: Passphrase mode
The tool SHALL provide a passphrase tab that generates word-based passphrases from the EFF Short Wordlist (1296 words). Configuration SHALL include word count (3–8), separator, capitalization toggle, and optional appended number or symbol.

#### Scenario: Default passphrase
- **WHEN** a user switches to the passphrase tab
- **THEN** a 4-word passphrase separated by hyphens is generated (e.g. "maple-river-torch-cloud")

#### Scenario: Custom separator and caps
- **WHEN** a user sets separator to "." and enables capitalization
- **THEN** each word is capitalized and joined with dots (e.g. "Maple.River.Torch.Cloud")

#### Scenario: Passphrase entropy
- **WHEN** a passphrase is generated
- **THEN** entropy is shown as `wordCount × log2(1296)` bits

### Requirement: Deterministic password mode
The tool SHALL provide a deterministic tab where a master phrase and a domain name together deterministically produce a password via PBKDF2-SHA256 (100 000 iterations). The same inputs SHALL always produce the same output. No data SHALL be stored or transmitted.

#### Scenario: Same inputs produce same output
- **WHEN** a user enters master phrase "mySecret" and domain "github.com" and generates
- **THEN** the result is always the same password regardless of browser session

#### Scenario: Different domain produces different output
- **WHEN** the domain changes from "github.com" to "gmail.com" with the same master phrase
- **THEN** the generated password is different

### Requirement: Custom pattern mode
The tool SHALL provide a pattern tab that accepts a template string where each character specifies a character class: `A` = uppercase, `a` = lowercase, `0` = digit, `!` = symbol, `*` = any. Any other character is treated as a literal.

#### Scenario: Pattern generates matching output
- **WHEN** a user enters pattern "Aa0!Aa0!"
- **THEN** the output has uppercase, lowercase, digit, symbol in that repeating order

#### Scenario: Literal in pattern is preserved
- **WHEN** a user enters pattern "Aa0-Aa0"
- **THEN** the hyphen appears as-is in the output

### Requirement: Password strength presets
The tool SHALL provide a preset selector with common site profiles that pre-configure generation settings:
- Default (16 chars, all classes, exclude-similar on)
- Gmail (20 chars, all classes)
- Apple ID (20 chars, all classes, no spaces)
- PIN (6 digits only)
- High-security (32 chars, all classes)

#### Scenario: Selecting a preset applies its constraints
- **WHEN** a user selects "PIN" preset
- **THEN** length is set to 6, only digits are enabled, and a new password is generated

### Requirement: HIBP breach check
The tool SHALL allow users to check a generated password against the Have I Been Pwned database using the k-anonymity API (SHA-1 prefix, only first 5 hex chars sent). The check SHALL be opt-in (button, not automatic).

#### Scenario: Clean password
- **WHEN** a user clicks "check breach" on a password not in known leaks
- **THEN** the result shows "not found in known breaches"

#### Scenario: Breached password
- **WHEN** a user clicks "check breach" on a commonly used password ("password123")
- **THEN** the result shows "found in X known breaches — do not use"

#### Scenario: Offline graceful degradation
- **WHEN** the HIBP API is unreachable
- **THEN** the UI shows "breach check unavailable (offline)" and generation is unaffected

### Requirement: Copy and clipboard management
The tool SHALL provide a one-click copy button. After copying, the clipboard SHALL be automatically cleared after a user-configurable timeout (default 30 s). A countdown SHALL be visible after copy.

#### Scenario: Copy clears after timeout
- **WHEN** a user copies a password and the countdown reaches zero
- **THEN** the clipboard is overwritten with an empty string

#### Scenario: Manual clear
- **WHEN** a user clicks "clear clipboard" before the countdown ends
- **THEN** the clipboard is cleared immediately and the countdown stops

### Requirement: QR code display
The tool SHALL render the generated password as a QR code on a `<canvas>` element (byte mode, low error correction) for cross-device transfer. No external library SHALL be used.

#### Scenario: QR renders on generation
- **WHEN** a new password is generated
- **THEN** a QR code is drawn immediately below the password field

#### Scenario: Scanning QR produces the password
- **WHEN** a user scans the QR with a phone camera
- **THEN** the phone displays the exact same password string

### Requirement: Local password history
The tool SHALL store the last 20 generated passwords in `localStorage` keyed by `pwHistory`. Each entry SHALL include the password string, timestamp, and generation mode. The history SHALL be viewable and clearable in the UI. History SHALL NOT be transmitted.

#### Scenario: History persists across sessions
- **WHEN** a user closes and reopens the browser tab
- **THEN** previously generated passwords appear in the history panel

#### Scenario: History cleared
- **WHEN** a user clicks "clear history"
- **THEN** `localStorage.removeItem('pwHistory')` is called and the list empties

### Requirement: No-server guarantee
The tool SHALL display a persistent notice: "all generation happens in your browser — nothing is sent to any server". The only exception is the opt-in HIBP check, which SHALL be labeled "sends anonymized hash prefix to haveibeenpwned.com".

#### Scenario: Notice always visible
- **WHEN** any tab is active
- **THEN** the no-server notice is visible without scrolling
