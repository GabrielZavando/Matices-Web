## MODIFIED Requirements

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
