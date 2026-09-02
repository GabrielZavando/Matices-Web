# brand-design-system Specification

## Purpose
TBD - created by archiving change fix-brand-tokens-docs. Update Purpose after archive.
## Requirements
### Requirement: Canonical Brand Palette
The design system MUST define a single canonical brand palette in `docs/DESIGN.md` and
`docs/frontend-standards.md` that matches the implemented tokens in `src/styles/global.css`
(Tailwind CSS v4 `@theme`). The canonical palette is blue-primary:
`--color-matices-primary: #243B55`, `--color-matices-blue: #5A7FA3`,
`--color-matices-green: #98C245`, `--color-matices-orange: #F09E46`,
`--color-matices-bg: #F4F7F9`. Compatibility aliases (`verde-bosque`, `crema-calido`,
`verde-lima`, `azul-celeste`) map to those tokens and MUST NOT diverge from them.
A contact-page-specific sub-palette (`--color-contact-*`, navy/olive) MAY be defined in
`src/styles/global.css` and used exclusively by `src/pages/contacto.astro`. The contact
sub-palette MUST NOT be applied to other components.

#### Scenario: Documented palette matches implemented tokens
- **Given** a developer reads `docs/DESIGN.md` and `docs/frontend-standards.md`
- **When** they compare the documented hex values with `src/styles/global.css`
- **Then** the primary, secondary, tertiary and background values of the canonical `matices` palette are identical

#### Scenario: No contradictory green primary documented
- **Given** `docs/frontend-standards.md` §3 lists the corporate palette
- **When** the palette is inspected
- **Then** it does NOT describe `primary: #236c32` (green) as the brand primary, and the only canonical palette is the `matices` token set

#### Scenario: Contact form uses tokenized sub-palette
- **Given** `src/pages/contacto.astro` previously contained a `<style>` block with a hardcoded navy/olive palette
- **When** the contact page is reviewed after the refactor
- **Then** the hardcoded `<style>` block is removed and its colors are provided exclusively via `--color-contact-*` tokens in `src/styles/global.css`

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

