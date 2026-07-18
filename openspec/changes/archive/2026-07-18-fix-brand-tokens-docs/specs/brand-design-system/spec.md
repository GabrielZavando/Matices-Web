## ADDED Requirements

### Requirement: Canonical Brand Palette
The design system MUST define a single canonical brand palette in `docs/DESIGN.md` and
`docs/frontend-standards.md` that matches the implemented tokens in `src/styles/global.css`
(Tailwind CSS v4 `@theme`). The palette is blue-primary:
`--color-matices-primary: #243B55`, `--color-matices-blue: #5A7FA3`,
`--color-matices-green: #98C245`, `--color-matices-orange: #F09E46`,
`--color-matices-bg: #F4F7F9`. Compatibility aliases (`verde-bosque`, `crema-calido`,
`verde-lima`, `azul-celeste`) map to those tokens and MUST NOT diverge from them.

#### Scenario: Documented palette matches implemented tokens
- **Given** a developer reads `docs/DESIGN.md` and `docs/frontend-standards.md`
- **When** they compare the documented hex values with `src/styles/global.css`
- **Then** the primary, secondary, tertiary and background values are identical and there is no divergent third palette

#### Scenario: No contradictory green primary documented
- **Given** `docs/frontend-standards.md` §3 lists the corporate palette
- **When** the palette is inspected
- **Then** it does NOT describe `primary: #236c32` (green) as the brand primary, and the only canonical palette is the `matices` token set

#### Scenario: Contact form inline style documented as deferred
- **Given** `src/pages/contacto.astro` contains a `<style>` block with a hardcoded navy/olive palette
- **When** the design documentation is reviewed
- **Then** that block is explicitly recorded as a deferred item outside the canonical palette
