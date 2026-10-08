# home-scouthem-section Specification

## Purpose
TBD - created by archiving change add-scouthem-section. Update Purpose after archive.
## Requirements
### Requirement: Scouthem section renders right after the home hero

The home page (`src/pages/index.astro`) MUST render a `<section>` for the
Scouthem showcase as the second section of `<main>`, immediately after the
"Reclutamiento y Selección Estratégica" hero and before the "Nuestros
Servicios" section. The hero MUST NOT render the SCOUTHEM CTA: its CTA group
keeps only "Comenzar Proceso". The page MUST contain exactly one link labelled
"Conoce nuestra plataforma SCOUTHEM", living inside this new section, pointing
to `https://scouthem.com/es/pagina-de-inicio/` with `target="_blank"`.

#### Scenario: section sits between hero and services
- **Given** the built home page `/`
- **When** the `<section>` elements inside `<main>` are inspected
- **Then** the Scouthem section is the second one, right after the hero and
  before "Nuestros Servicios"

#### Scenario: hero renders only the primary CTA
- **Given** the home hero is rendered
- **When** its CTA group is inspected
- **Then** only "Comenzar Proceso" remains and no link labelled "Conoce
  nuestra plataforma SCOUTHEM" is present in the hero

#### Scenario: exactly one SCOUTHEM CTA with preserved destination
- **Given** the built home page
- **When** links labelled "Conoce nuestra plataforma SCOUTHEM" are counted
- **Then** there is exactly one, inside the Scouthem section
- **And** it links to `https://scouthem.com/es/pagina-de-inicio/` with
  `target="_blank"` and `rel="noopener"`

### Requirement: Section content matches the approved mock

The section MUST reproduce `docs/assets/design/nueva-seccion.jpeg` literally:
the badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN", the heading "Revoluciona
tu" followed by the span "Selección de Talento" styled with
`text-verde-lima italic` on `font-heading` (Antic — never Playfair Display),
the Scouthem paragraph and the CTA label, all as written in the mock.

#### Scenario: copy is rendered verbatim
- **Given** the Scouthem section is rendered
- **When** its text content is read
- **Then** the badge, heading (both lines), paragraph and CTA label match the
  approved mock exactly

### Requirement: Mobile-first layout scales to two columns

The section MUST be structured mobile-first (`docs/frontend-standards.md` §2):
by default a single column with the text block (badge, heading, paragraph, CTA)
on top and the visual panel below; only from `lg:` (≥1024px) it scales to a
2-column grid with the visual panel on the left and the text on the right. No
horizontal overflow at any breakpoint.

#### Scenario: single column with text first below 1024px
- **Given** the section is rendered at a viewport narrower than 1024px
- **When** its layout is inspected
- **Then** it is a single column with the text block above the visual panel

#### Scenario: two columns from 1024px with panel on the left
- **Given** the section is rendered at a viewport of at least 1024px
- **When** its layout is inspected
- **Then** it is a 2-column grid with the visual panel on the left and the
  text block on the right

### Requirement: Navy visual panel reserves space regardless of asset presence

The visual panel MUST use the canonical token `bg-verde-bosque` (no hardcoded
hex, per `brand-design-system`) with a reserved aspect ratio, and MUST render
even when `src/assets/scouthem-section.*` is absent, without breaking
`npm run build`. The asset is resolved via
`import.meta.glob('../../assets/scouthem-section.*', { eager: true })` (from
`src/components/ui/`, resolving to `src/assets/`): when a
match exists the image is served with `<Image>` from `astro:assets` (explicit
`width`/`height`/`format`/`loading="lazy"`/`sizes` and a descriptive `alt`,
never a native `<img>`); an unprocessable asset MUST fail the build with a
clear `astro:assets` error instead of publishing broken markup.

#### Scenario: panel reserved with canonical token, build stays green
- **Given** the section renders whether or not the asset
  `src/assets/scouthem-section.*` is present
- **When** the section is rendered and `npm run build` runs
- **Then** the panel is drawn with `bg-verde-bosque` and a reserved aspect
  ratio
- **And** the build completes without errors

#### Scenario: image served optimized from the delivered asset
- **Given** the asset exists
- **When** the section HTML is inspected
- **Then** the image is served via `<Image>` of `astro:assets` with explicit
  `width`, `height`, `format`, `loading="lazy"` and `sizes`, plus a
  descriptive `alt`
- **And** the panel keeps its aspect ratio without layout shift

#### Scenario: unprocessable asset fails the build early
- **Given** the asset exists but cannot be processed by `astro:assets`
- **When** `npm run build` runs
- **Then** the build exits non-zero with a clear `astro:assets` error
- **And** no HTML with a native or broken `<img>` is published

### Requirement: Section markup is semantic and animated consistently

The section MUST be a `<section>` with a single `<h2>` (keeping the page's
h1 → h2 hierarchy), MUST wrap its content in the existing `Reveal` component
with `variant="fade-up"`, and its content MUST remain visible under
`prefers-reduced-motion: reduce`.

#### Scenario: semantic markup and reveal animation
- **Given** the new section
- **When** its markup is inspected
- **Then** it uses `<section>` with one `<h2>` and its content is wrapped in
  `reveal--fade-up` elements
- **And** the content is visible when reduced motion is requested

