# brand-design-system Specification (delta)

## Purpose

Define el contrato de tokens de identidad de marca. Este delta añade el
requisito de tipografía canónica que sustituye la fuente de cabeceras
`--font-heading` de **Playfair Display** a **Antic**.

## ADDED Requirements

### Requirement: Canonical Brand Typography

The design system MUST define a single canonical typography in
`docs/DESIGN.md` and `docs/frontend-standards.md` that matches the
implemented tokens in `src/styles/global.css` (Tailwind CSS v4 `@theme`).
The canonical heading font MUST be **Antic**:
`--font-heading: "Antic", ui-sans-serif, system-ui, sans-serif;`. The body font
MUST remain **Plus Jakarta Sans**:
`--font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;`.
Antic is a single-weight font (400 regular); heading weights MUST NOT rely on
variable italic/bold variants of Antic (fallback rendering applies for
`font-bold`/`font-extrabold`, per the migration decision in
`docs/DESIGN.md`). The webfont load in `src/layouts/Layout.astro` MUST request
`family=Antic` and MUST NOT request `family=Playfair+Display`.

#### Scenario: Documented heading font matches implemented token
- **Given** a developer reads `docs/DESIGN.md` and `docs/frontend-standards.md`
- **When** they compare the documented heading font with `--font-heading` in `src/styles/global.css`
- **Then** the heading font is `Antic` in all three sources

#### Scenario: Playfair Display no longer referenced in active context
- **Given** the canonical typography documentation and the heading token
- **When** the active (non-archived) code, docs and specs are searched for `Playfair Display`
- **Then** no active file references `Playfair Display` as the heading font

#### Scenario: Layout loads Antic instead of Playfair Display
- **Given** `src/layouts/Layout.astro` loads Google Fonts
- **When** the font stylesheet URL is inspected
- **Then** it contains `family=Antic`
- **And** it does not contain `family=Playfair+Display`

#### Scenario: Body font unchanged
- **Given** the canonical typography tokens
- **When** `--font-sans` is inspected in `src/styles/global.css`
- **Then** it remains `Plus Jakarta Sans`