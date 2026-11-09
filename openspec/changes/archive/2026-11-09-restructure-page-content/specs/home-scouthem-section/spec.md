## MODIFIED Requirements

### Requirement: Navy visual panel reserves space regardless of asset presence
The visual panel MUST use the canonical token `bg-verde-bosque` (no hardcoded
hex, per `brand-design-system`) with a reserved aspect ratio, and MUST render
even when `src/assets/scouthem-section.*` is absent, without breaking
`npm run build`. The asset is resolved via
`import.meta.glob('../../assets/scouthem-section.*', { eager: true })` (from
`src/components/ui/`, resolving to `src/assets/`): when a
match exists the image is served with `<Image>` from `astro:assets` (explicit
`width`/`height`/`format`/`loading="eager"`/`sizes` and a descriptive `alt`,
never a native `<img>`); an unprocessable asset MUST fail the build with a
clear `astro:assets` error instead of publishing broken markup.

**Reason**: The showcase is no longer the second section of the home page: it
is the FIRST section of the testing page (`/testing`), so its panel image is the
Largest Contentful Paint (LCP) candidate of that page. Lazy loading it delays
the LCP element, so the image MUST be requested eagerly. `loading="eager"` does
not apply to the asset glob resolution (`{ eager: true }`), which already
resolved the asset at build time.

**Migration**: The `loading` attribute of the panel image changes from `lazy` to
`eager`; every other attribute (`width`, `height`, `format`, `sizes`, `alt`) and
the reserved aspect ratio remain unchanged. The contract test
(`src/lib/testingScouthemSection.spec.ts`) asserts the new value.

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
  `width`, `height`, `format`, `loading="eager"` and `sizes`, plus a
  descriptive `alt`
- **And** the panel keeps its aspect ratio without layout shift

#### Scenario: unprocessable asset fails the build early
- **Given** the asset exists but cannot be processed by `astro:assets`
- **When** `npm run build` runs
- **Then** the build exits non-zero with a clear `astro:assets` error
- **And** no HTML with a native or broken `<img>` is published

## REMOVED Requirements

### Requirement: Scouthem section renders right after the home hero
**Reason**: The Scouthem showcase section no longer belongs to the home page.
It is relocated to the testing page (`/testing`) as its first section, where the
product narrative ("plataforma de reclutamiento y selección") is contextually
correct. The home page keeps its hero, its services and the client logos, and no
longer renders a SCOUTHEM CTA at all.
**Migration**: The placement contract now lives in capability
`testing-page-structure` (requirement "Scouthem showcase section opens the
testing page"); the home-side constraint that no SCOUTHEM CTA remains in the
home page lives in capability `home-hero` (requirement "SCOUTHEM CTA Without
Link Underline"). The visual/content requirements of the section itself (mock
copy, mobile-first layout, navy visual panel, semantic markup) are unchanged and
keep applying wherever the section is rendered.
