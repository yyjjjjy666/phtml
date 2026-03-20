## REMOVED Requirements

### Requirement: Footer present on all pages
**Reason**: The footer has been replaced by the dedicated `/tools/ip` page which shows full IP information. Showing partial IP data on every page was cluttering the layout.
**Migration**: Visit `geller.ee/tools/ip` to see IP and geolocation information.

### Requirement: Visitor IP and location fetched and displayed
**Reason**: Replaced by the `/tools/ip` tool which shows all available fields.
**Migration**: `js/visitor-info.js` is deleted; use `js/ip-tool.js` on the ip tool page only.

### Requirement: Session caching of visitor info
**Reason**: Removed along with the footer feature.
**Migration**: N/A

### Requirement: Footer does not block page rendering
**Reason**: Removed along with the footer feature.
**Migration**: N/A

### Requirement: Footer visual design matches site theme
**Reason**: Removed along with the footer feature.
**Migration**: N/A

### Requirement: Footer fixed at bottom of viewport
**Reason**: Removed along with the footer feature.
**Migration**: N/A
