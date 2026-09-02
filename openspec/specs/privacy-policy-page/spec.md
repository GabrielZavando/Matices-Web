# privacy-policy-page Specification

## Purpose
TBD - created by archiving change add-privacy-page. Update Purpose after archive.
## Requirements
### Requirement: Privacy policy renders at /privacidad with the canonical site layout
The route `/privacidad` SHALL render a static page built from
`src/pages/privacidad.astro` using the site's canonical structure:
`Layout` (SEO/GTM/fonts), `Header`, a semantic `<main>`, and `Footer`. The page
SHALL NOT require JavaScript to display its content (SSG).

#### Scenario: Build emits the privacy policy page
- **GIVEN** the site is built with `astro build`
- **WHEN** the output folder is inspected
- **THEN** `dist/privacidad/index.html` exists

#### Scenario: Page wraps content in the canonical layout
- **GIVEN** the built `dist/privacidad/index.html`
- **WHEN** its document structure is inspected
- **THEN** it contains a `<header>`, a semantic `<main>` and a `<footer>`
- **AND** the footer keeps the "Políticas de Privacidad" link pointing to `/privacidad`

### Requirement: Legal content is transcribed faithfully (12 sections)
The page SHALL render the client's privacy policy content verbatim as the source
of truth: an `<h1>` with the full title "Política de Privacidad y Protección de
Datos Personales", a visible "Última actualización: Septiembre 2026" notice, the
reference to "Ley N° 19.628", and the twelve numbered sections
("1. Introducción" through "12. Contacto") as `<h2>` headings with their
paragraphs and lists.

#### Scenario: Full title and update notice are rendered
- **GIVEN** the built `dist/privacidad/index.html`
- **WHEN** the document `<h1>` and intro block are inspected
- **THEN** the `<h1>` text is "Política de Privacidad y Protección de Datos Personales"
- **AND** the text "Última actualización: Septiembre 2026" is present

#### Scenario: All twelve numbered sections are present
- **GIVEN** the built privacy policy page
- **WHEN** the section headings are inspected
- **THEN** the headings "1. Introducción", "2. Datos Personales que Recopilamos",
  "3. Finalidad del Tratamiento", "4. Base Legal para el Tratamiento",
  "5. Uso de Cookies y Tecnologías de Rastreo", "6. Almacenamiento y
  Transferencia Internacional de Datos", "7. No Compartición con Terceros",
  "8. Plazo de Conservación", "9. Derechos del Titular de los Datos (Derechos ARCO)",
  "10. Seguridad de la Información", "11. Modificaciones a esta Política" and
  "12. Contacto" are all present, in order

#### Scenario: Chilean legal framework is referenced
- **GIVEN** the built privacy policy page
- **WHEN** the introduction section is inspected
- **THEN** it references "Ley N° 19.628 sobre Protección de la Vida Privada de Chile"

### Requirement: Data collection distinguishes required and optional fields
Section 2 SHALL list the personal data collected by the contact form, clearly
separating "Obligatorios" (Nombres y Apellidos, Correo electrónico, Teléfono)
from "Opcionales" (Nombre de la empresa, Cargo dentro de la organización, Tamaño
de la empresa) and SHALL state that no sensitive or candidate data is collected.

#### Scenario: Required fields are listed
- **GIVEN** the section "2. Datos Personales que Recopilamos"
- **WHEN** its "Obligatorios" list is inspected
- **THEN** it contains "Nombres y Apellidos", "Correo electrónico" and "Teléfono"

#### Scenario: Optional fields are listed
- **GIVEN** the section "2. Datos Personales que Recopilamos"
- **WHEN** its "Opcionales" list is inspected
- **THEN** it contains "Nombre de la empresa", "Cargo dentro de la organización"
  and "Tamaño de la empresa"

#### Scenario: No sensitive data is collected
- **GIVEN** the section "2. Datos Personales que Recopilamos"
- **WHEN** the closing paragraph is inspected
- **THEN** it states that no candidate data nor sensitive information is
  collected through the website

### Requirement: ARCO rights are presented with their action channel
Section 9 SHALL present the four ARCO rights (Acceso, Rectificación,
Cancelación, Oposición) of Ley 19.628 and SHALL indicate that requests are
exercised by emailing `contacto@maticesconsultora.cl`.

#### Scenario: The four ARCO rights are listed
- **GIVEN** the section "9. Derechos del Titular de los Datos (Derechos ARCO)"
- **WHEN** its list is inspected
- **THEN** it contains "Acceso", "Rectificación", "Cancelación" and "Oposición"

#### Scenario: ARCO requests point to the contact email
- **GIVEN** the section on ARCO rights
- **WHEN** the exercise instructions are inspected
- **THEN** they reference `contacto@maticesconsultora.cl`

### Requirement: Contact points are functional links
The page SHALL render the contact channels of section "12. Contacto" as real
anchors: an email link (`mailto:contacto@maticesconsultora.cl`) and a link to
the website `https://maticesconsultora.cl/`, both reachable without JavaScript.

#### Scenario: Email is a mailto link
- **GIVEN** the built `dist/privacidad/index.html`
- **WHEN** the contact section is inspected
- **THEN** it contains an `<a href="mailto:contacto@maticesconsultora.cl">`
  anchor displaying `contacto@maticesconsultora.cl`

#### Scenario: Website URL is a link
- **GIVEN** the built privacy policy page
- **WHEN** the contact section is inspected
- **THEN** it contains an anchor whose `href` is `https://maticesconsultora.cl/`

### Requirement: Design-system identity and accessibility
The page SHALL follow the site's design system and frontend standards: tokens
`bg-crema-calido` / `text-verde-bosque`, heading font token `font-heading`,
mobile-first paddings (`px-4 md:px-16`), semantic HTML (`h1`, `h2`, `p`, `ul`,
`ol`, `section`) and a readable single-column layout (`max-w-4xl`). It SHALL NOT
use inline styles, raw `<img>` tags, or untyped `any` code.

#### Scenario: Brand tokens are applied
- **GIVEN** the built privacy policy page
- **WHEN** its root classes are inspected
- **THEN** it uses `bg-crema-calido`, `text-verde-bosque` and `font-heading` tokens

#### Scenario: Mobile-first spacing is applied
- **GIVEN** the built privacy policy page
- **WHEN** its main container classes are inspected
- **THEN** it uses responsive utilities starting from mobile (`px-4 md:px-16`)

#### Scenario: No inline styles or raw img tags
- **GIVEN** the built privacy policy page
- **WHEN** the markup is scanned
- **THEN** it contains no raw `<img` tags and no inline `style="..."` attributes

