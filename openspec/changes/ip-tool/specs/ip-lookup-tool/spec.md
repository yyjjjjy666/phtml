## ADDED Requirements

### Requirement: IP lookup tool page exists at /tools/ip
A page SHALL exist at `geller.ee/tools/ip` that displays geolocation and network information for any IP address using `ipapi.co`.

#### Scenario: Page accessible at clean URL
- **WHEN** a user navigates to `geller.ee/tools/ip`
- **THEN** the IP lookup tool page loads

### Requirement: Own IP shown on load
When the page loads with no input, the tool SHALL automatically fetch and display information for the visitor's own public IP address.

#### Scenario: Auto-lookup on page load
- **WHEN** the page loads with no IP entered in the input field
- **THEN** the tool fetches `https://ipapi.co/json/` and displays the result

#### Scenario: Loading state shown during fetch
- **WHEN** the fetch is in progress
- **THEN** a "loading..." indicator is visible

#### Scenario: Error shown on failure
- **WHEN** the API request fails or returns an error object
- **THEN** a human-readable error message is displayed and no partial data is shown

### Requirement: Custom IP lookup
The tool SHALL allow the user to enter any IPv4 or IPv6 address and look up its data.

#### Scenario: Custom IP lookup
- **WHEN** a user enters an IP address in the input field and submits
- **THEN** the tool fetches `https://ipapi.co/<ip>/json/` and displays the result

#### Scenario: Empty input falls back to own IP
- **WHEN** the user clears the input and submits
- **THEN** the tool fetches own IP data (`https://ipapi.co/json/`)

### Requirement: All available fields displayed in grouped sections
The tool SHALL display all meaningful fields returned by `ipapi.co/json/` organized into labeled sections.

#### Scenario: Network section shown
- **WHEN** data is loaded
- **THEN** the Network section displays: IP address, IP version, ASN, organisation

#### Scenario: Location section shown
- **WHEN** data is loaded
- **THEN** the Location section displays: city, region, region code, country name, country code (ISO2 and ISO3), continent code, postal code, capital, EU membership

#### Scenario: Time section shown
- **WHEN** data is loaded
- **THEN** the Time section displays: timezone, UTC offset, country calling code

#### Scenario: Economy section shown
- **WHEN** data is loaded
- **THEN** the Economy section displays: currency code, currency name, languages, country population, country area (km²)

#### Scenario: Coordinates section shown
- **WHEN** data is loaded
- **THEN** the Coordinates section displays: latitude and longitude

#### Scenario: Null fields shown as dash
- **WHEN** a field in the API response is null, undefined, or empty string
- **THEN** that field displays "—" rather than being hidden or showing "null"
