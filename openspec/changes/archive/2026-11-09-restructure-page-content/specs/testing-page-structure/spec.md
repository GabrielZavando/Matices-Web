## ADDED Requirements

### Requirement: Scouthem showcase section opens the testing page
The testing page (`src/pages/testing.astro`) MUST render the Scouthem showcase
section (`<ScouthemShowcase />`) as the FIRST `<section>` child of `<main>`,
before the "Psicometría Científica de Vanguardia Potenciada por Inteligencia
Artificial" section, and the relative order of the remaining testing sections
MUST be preserved. The root `<section>` of the showcase MUST declare
`id="scouthem"`, so that the internal link `/testing#scouthem` rendered by the
`/talento` page resolves to an existing target. The home page
(`src/pages/index.astro`) MUST NOT render that section nor any link labelled
"Conoce la plataforma SCOUTHEM": the site keeps exactly one SCOUTHEM CTA,
inside the Scouthem showcase of `/testing`, pointing to
`https://scouthem.com/es/pagina-de-inicio/` with `target="_blank"` and
`rel="noopener"`.

#### Scenario: the showcase is the first section of the testing page
- **Given** the built testing page `/testing`
- **When** the `<section>` elements inside `<main>` are inspected in document order
- **Then** the first one is the Scouthem showcase (badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN" and headline "Revoluciona tu Selección de Talento")
- **And** the next one is the "Psicometría Científica de Vanguardia Potenciada por Inteligencia Artificial" section

#### Scenario: the home page no longer renders the showcase
- **Given** the built home page `/`
- **When** the sections inside `<main>` and the links of the document are inspected
- **Then** no section contains the badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN"
- **And** there is no link labelled "Conoce la plataforma SCOUTHEM"

#### Scenario: exactly one SCOUTHEM CTA in the site
- **Given** the built home and testing pages
- **When** links labelled "Conoce la plataforma SCOUTHEM" are counted
- **Then** there is exactly one across both pages, inside the Scouthem showcase of `/testing`
- **And** it points to `https://scouthem.com/es/pagina-de-inicio/` with `target="_blank"` and `rel` including `noopener`

#### Scenario: the showcase exposes the scouthem anchor
- **Given** the built testing page `/testing`
- **When** the root `<section>` of the Scouthem showcase is inspected
- **Then** it declares `id="scouthem"`
- **And** the `/testing#scouthem` link of the `/talento` page points to that target

### Requirement: The Rigor Técnico hero section is removed from the testing page
The testing page MUST NOT render the former opening hero block: the badge
"Rigor Técnico & Diagnóstico", the introductory paragraph "Garantizamos la
precisión y el encaje en la selección…", the "Solicita tu Demo" call to action
and the image served from `src/assets/hero-business.webp` MUST all be absent
from the built page. The asset file itself MUST remain on disk (it becomes
unreferenced) until the human owner approves its deletion.

#### Scenario: the hero block is gone from the built page
- **Given** the built testing page `/testing`
- **When** its markup and text content are inspected
- **Then** the text "Rigor Técnico & Diagnóstico" is absent
- **And** the text "Garantizamos la precisión y el encaje en la selección" is absent
- **And** there is no link labelled "Solicita tu Demo"

#### Scenario: the hero image is no longer served
- **Given** the built testing page `/testing`
- **When** the `<img>` elements are inspected
- **Then** none of them is derived from `hero-business.webp`
- **And** `src/assets/hero-business.webp` still exists in the repository

### Requirement: The testing page keeps exactly one h1
The testing page MUST expose exactly one `<h1>`, carrying the text "Pruebas y
Testing Organizacional" and rendered visually hidden (Tailwind `sr-only`), so
that the page keeps a valid h1 → h2 heading hierarchy after the hero removal.
The Scouthem showcase section MUST keep exactly one `<h2>` (its headline
"Revoluciona tu Selección de Talento") and MUST NOT introduce a second `<h1>`.

#### Scenario: one h1 remains and it is visually hidden
- **Given** the built testing page `/testing`
- **When** its `<h1>` elements are counted and inspected
- **Then** there is exactly one
- **And** its text is "Pruebas y Testing Organizacional"
- **And** its class attribute includes `sr-only`

#### Scenario: the showcase keeps a single h2
- **Given** the built testing page `/testing`
- **When** the Scouthem showcase section is inspected
- **Then** it contains exactly one `<h2>` with the text "Revoluciona tu Selección de Talento"
