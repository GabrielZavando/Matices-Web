# footer-cta Specification

## Purpose
TBD - created by archiving change fix-home-form-cta. Update Purpose after archive.
## Requirements
### Requirement: Footer Diagnostic CTA Section
The fourth footer column of the global `Footer.astro` component MUST present
the diagnostic offer with: heading "Cotiza tu diagnóstico organizacional"; CTA
button labeled "Solicita una propuesta personalizada" linking directly to
WhatsApp `https://wa.me/56982666745` with a URL-encoded prefill text, opening
in a new tab via `target="_blank"` and `rel="noopener noreferrer"`; and no
`link-underline` utility on the button.

#### Scenario: Footer heading invites to quote a diagnostic
- **Given** any page with the global footer is rendered
- **When** the fourth column heading is inspected
- **Then** its text is exactly "Cotiza tu diagnóstico organizacional"

#### Scenario: Footer CTA redirects to WhatsApp
- **Given** the footer CTA button is rendered
- **When** its attributes are inspected
- **Then** the text is "Solicita una propuesta personalizada", the `href` is
  `https://wa.me/56982666745?text=Hola%2C%20me%20interesa%20un%20diagn%C3%B3stico%20organizacional`,
  and it carries `target="_blank"` with `rel="noopener noreferrer"`

#### Scenario: Footer CTA has no underline animation
- **Given** the footer CTA button is rendered
- **When** its class attribute is inspected
- **Then** `link-underline` is absent

