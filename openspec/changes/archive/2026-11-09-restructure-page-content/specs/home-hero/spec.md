## MODIFIED Requirements

### Requirement: SCOUTHEM CTA Without Link Underline
The SCOUTHEM CTA button MUST NOT use the `link-underline` utility, so no
animated underline line is drawn across it on hover or focus. Its remaining
hover feedback (`hover:bg-verde-bosque/5 transition-all`) MUST be preserved,
and its label "Conoce la plataforma SCOUTHEM" with its external
destination MUST stay unchanged. As of `restructure-page-content` (TICKET-007)
the CTA lives inside the Scouthem showcase section rendered by the testing page
(`/testing`, capability `testing-page-structure`), NOT in the home page: the
home hero renders only the primary "Comenzar Proceso" CTA and the home page
contains no SCOUTHEM CTA at all, while the site as a whole keeps exactly one
SCOUTHEM CTA (inside the Scouthem showcase of `/testing`).

#### Scenario: SCOUTHEM button has no underline animation
- **Given** the SCOUTHEM CTA is rendered (inside the Scouthem showcase section
  of the testing page)
- **When** its class attribute is inspected
- **Then** `link-underline` is absent and no `::after` underline is triggered on hover

#### Scenario: SCOUTHEM button keeps label and destination
- **Given** the SCOUTHEM CTA is rendered
- **When** its text and `href` are inspected
- **Then** the text is "Conoce la plataforma SCOUTHEM" and the `href` still points to the Scouthem platform

#### Scenario: SCOUTHEM button is no longer rendered in the hero
- **Given** the home hero ("Reclutamiento y Selección Estratégica") is rendered
- **When** its CTA group is inspected
- **Then** no link labelled "Conoce la plataforma SCOUTHEM" is present
- **And** the hero keeps only the "Comenzar Proceso" CTA

#### Scenario: The home page contains no SCOUTHEM CTA
- **Given** the built home page `/`
- **When** links labelled "Conoce la plataforma SCOUTHEM" are counted
- **Then** there are none
- **And** the built testing page `/testing` contains exactly one, inside the
  Scouthem showcase section
