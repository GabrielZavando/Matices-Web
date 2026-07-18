# code-correctness Specification

## Purpose
TBD - created by archiving change fix-minor-bugs. Update Purpose after archive.
## Requirements
### Requirement: Source Correctness Hygiene
The codebase MUST NOT contain HTML void-element misuse, unreplaced placeholders,
redundant local type redeclarations where the canonical type exists, or dead duplicate
assets.

#### Scenario: No invalid void element closure
- **Given** `src/components/global/Footer.astro`
- **When** its markup is inspected
- **Then** there is no `</br>` and line breaks use a self-closing `<br />`

#### Scenario: Package name is not a placeholder
- **Given** `package.json`
- **When** the `name` field is read
- **Then** it is `matices-web`, not `tmp-astro`

#### Scenario: Test uses canonical ImageMetadata type
- **Given** `src/components/ui/EvidenceGallery.spec.ts`
- **When** its imports are inspected
- **Then** `ImageMetadata` is imported from `astro` (not locally redeclared)

#### Scenario: No dead duplicate assets
- **Given** `src/assets/`
- **When** the directory is listed
- **Then** there are no unused `.png` duplicates of existing `.webp` files

