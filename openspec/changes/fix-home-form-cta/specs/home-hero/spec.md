## ADDED Requirements

### Requirement: Hero Precision Badge Legibility
The floating hero badge on `src/pages/index.astro` MUST present the copy
"Precisión en selección de mandos medios y cargos directivos" with improved
legibility: font size `text-sm` and weight `font-semibold`, while keeping the
existing color token (`text-verde-bosque/70`) and leading.

#### Scenario: Precision copy is emphasized
- **Given** the home page hero badge is rendered
- **When** its paragraph classes are inspected
- **Then** they include `text-sm` and `font-semibold` (and no longer `text-xs` without a weight utility)

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
