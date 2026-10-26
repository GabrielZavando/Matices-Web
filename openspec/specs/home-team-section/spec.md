# home-team-section Specification

## Purpose
TBD - created by archiving change update-team-profiles. Update Purpose after archive.
## Requirements
### Requirement: Team cards render in the agreed order

The section `#equipo` MUST render the four team cards in this DOM order:
María José Jimenez, Cristian Nova, Catalina Aguilera, Lorenzo Traverso. Because
the grid is `lg:grid-cols-4`, that DOM order MUST also be the left-to-right
visual order.

#### Scenario: cards appear in the agreed order

- **Given** the built home page (`dist/index.html`)
- **When** the `<article>` cards inside `#equipo` are read in DOM order
- **Then** their names are María José Jimenez, Cristian Nova, Catalina Aguilera
  and Lorenzo Traverso, in that order

### Requirement: Each team member links to their LinkedIn profile

Each card MUST render exactly one LinkedIn link next to the member name, with
the exact URL supplied by the client, `target="_blank"` and a `rel` containing
both `noopener` and `noreferrer`. The link MUST expose an accessible name that
identifies the member, and the icon MUST be a decorative inline `<svg>`
(`aria-hidden="true"`). The link MUST NOT use the external pngtree PNG, contain
an `<img>`, or reference any external image URL.

#### Scenario: exact profile URLs are rendered

- **Given** the built home page
- **When** the LinkedIn links inside `#equipo` are inspected
- **Then** their `href` values match exactly the four client-supplied profiles

#### Scenario: external links are safe and accessible

- **Given** a LinkedIn link inside `#equipo`
- **When** its attributes and content are inspected
- **Then** it has `target="_blank"`, `rel` with `noopener` and `noreferrer`,
  and an accessible name including the member name
- **And** its icon is an inline `<svg aria-hidden="true">` with no `<img>` and
  no pngtree reference

### Requirement: Team biographies are the approved literal copy

Each member's description MUST be exactly the text supplied in the ticket,
preserving accents, parentheses, capitalization and punctuation. The previous
copy MUST be fully replaced. The existing `role` values MUST be preserved.

#### Scenario: biographies match verbatim

- **Given** the built home page
- **When** each card description is read with whitespace normalized
- **Then** it equals the approved biography for that member exactly
- **And** none of the previous descriptions remains

### Requirement: Portraits keep the astro:assets contract and binaries stay untouched

Each card MUST keep exactly one portrait served by `<Image>` from
`astro:assets` with explicit `width`, `height`, `loading="lazy"`, `sizes` and a
descriptive `alt` containing the member name; hand-written native `<img>` is
forbidden. The change MUST NOT modify, restore, delete or check out any binary
under `src/assets/team/`; those files are updated manually by the human outside
this change.

#### Scenario: portraits remain optimized

- **Given** the built home page
- **When** the images inside `#equipo` are inspected
- **Then** each card has one image with `width`, `height`, `loading="lazy"`,
  `sizes` and a descriptive `alt`

#### Scenario: image binaries are not touched

- **Given** the working tree contains manually updated team images
- **When** the change is implemented and verified
- **Then** no binary under `src/assets/team/` is modified, restored, deleted or
  checked out by the agent

### Requirement: Section semantics and project suite remain green

The section MUST keep `<section id="equipo">`, one `<article>` per member, an
`<h3>` for the member name and the existing `Reveal` wrapper with
`variant="fade-up"`. `npm run build`, `npm run lint` and `npm test` MUST finish
without errors, and no other home section may change.

#### Scenario: semantics preserved and suite green

- **Given** the implemented change
- **When** the section markup is inspected and the project commands run
- **Then** the section keeps its `section`/`article`/`h3` structure and
  `reveal--fade-up` wrappers
- **And** build, lint and tests pass

