# floating-badges Specification

## Purpose
TBD - created by archiving change fix-home-form-cta. Update Purpose after archive.
## Requirements
### Requirement: Floating Badge Copy Legibility
Every floating glassmorphism stat badge MUST present its descriptive paragraph
with improved legibility: font size `text-sm` and weight `font-semibold`,
while keeping the existing color token (`text-verde-bosque/70`) and leading.
This applies across all pages using the pattern: `src/pages/index.astro`,
`formacion.astro`, `psicologia.astro`, `testing.astro`, `talento.astro`
and `id.astro`.

#### Scenario: All floating badge paragraphs are emphasized
- **Given** any page rendering a floating glassmorphism stat badge
- **When** its descriptive paragraph classes are inspected
- **Then** they include `text-sm` and `font-semibold` (and no longer `text-xs` without a weight utility)

#### Scenario: Badge set is fully covered
- **Given** the source files `index.astro`, `formacion.astro`, `psicologia.astro`, `testing.astro`, `talento.astro` and `id.astro`
- **When** they are searched for the legacy badge paragraph classes `text-xs text-verde-bosque/70 leading-tight`
- **Then** no occurrence remains

### Requirement: Floating Badge Ambient Motion
Every floating glassmorphism stat badge MUST carry the ambient `animate-float`
utility so it bobs gently up and down while visible. The motion MUST stay
disabled under `prefers-reduced-motion` (existing `global.css` behavior).

#### Scenario: All stat badges float
- **Given** any page rendering a floating stat badge (`max-w-[200px]` glassmorphism container)
- **When** its container class attribute is inspected
- **Then** it includes `animate-float`

#### Scenario: Reduced motion disables the bobbing
- **Given** the compiled stylesheet with `prefers-reduced-motion: reduce`
- **When** the `.animate-float` rules are inspected
- **Then** the animation is disabled via `animation: none !important`

