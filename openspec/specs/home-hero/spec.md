# home-hero Specification

## Purpose
TBD - created by archiving change fix-home-form-cta. Update Purpose after archive.
## Requirements
### Requirement: SCOUTHEM CTA Without Link Underline
The SCOUTHEM CTA button MUST NOT use the `link-underline` utility, so no
animated underline line is drawn across it on hover or focus. Its remaining
hover feedback (`hover:bg-verde-bosque/5 transition-all`) MUST be preserved,
and its label "Conoce nuestra plataforma SCOUTHEM" with its external
destination MUST stay unchanged.

#### Scenario: SCOUTHEM button has no underline animation
- **Given** the home page SCOUTHEM CTA is rendered
- **When** its class attribute is inspected
- **Then** `link-underline` is absent and no `::after` underline is triggered on hover

#### Scenario: SCOUTHEM button keeps label and destination
- **Given** the home page SCOUTHEM CTA is rendered
- **When** its text and `href` are inspected
- **Then** the text is "Conoce nuestra plataforma SCOUTHEM" and the `href` still points to the Scouthem platform

