## MODIFIED Requirements

### Requirement: SCOUTHEM CTA Without Link Underline
The SCOUTHEM CTA button MUST NOT use the `link-underline` utility, so no
animated underline line is drawn across it on hover or focus. Its remaining
hover feedback (`hover:bg-verde-bosque/5 transition-all`) MUST be preserved,
and its label "Conoce nuestra plataforma SCOUTHEM" with its external
destination MUST stay unchanged. As of `add-scouthem-section` (TICKET-005) the
CTA lives inside the home Scouthem showcase section (capability
`home-scouthem-section`), NOT in the hero: the hero renders only the primary
"Comenzar Proceso" CTA, and the page keeps exactly one SCOUTHEM CTA.

#### Scenario: SCOUTHEM button has no underline animation
- **Given** the home page SCOUTHEM CTA is rendered (inside the Scouthem
  showcase section)
- **When** its class attribute is inspected
- **Then** `link-underline` is absent and no `::after` underline is triggered on hover

#### Scenario: SCOUTHEM button keeps label and destination
- **Given** the home page SCOUTHEM CTA is rendered
- **When** its text and `href` are inspected
- **Then** the text is "Conoce nuestra plataforma SCOUTHEM" and the `href` still points to the Scouthem platform

#### Scenario: SCOUTHEM button is no longer rendered in the hero
- **Given** the home hero ("Reclutamiento y Selección Estratégica") is rendered
- **When** its CTA group is inspected
- **Then** no link labelled "Conoce nuestra plataforma SCOUTHEM" is present
- **And** the hero keeps only the "Comenzar Proceso" CTA
