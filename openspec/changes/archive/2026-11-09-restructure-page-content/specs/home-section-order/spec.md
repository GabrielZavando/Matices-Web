## ADDED Requirements

### Requirement: Client logos section renders directly below the home hero
The home page (`src/pages/index.astro`) MUST render the client logos section
("Empresas que han confiado en nosotros", `<CompanyLogos />`) as the SECOND
`<section>` child of `<main>`, immediately after the hero section ("Talento &
Evolución B2B" / "Reclutamiento y Selección Estratégica") and before the
"Nuestros Servicios" section. The remaining home sections MUST keep their
relative order: services → empathy banner → specialization → team → gallery.

#### Scenario: the logos section is the second section of the home
- **Given** the built home page `/`
- **When** the `<section>` elements inside `<main>` are inspected in document order
- **Then** the second one contains the text "Empresas que han confiado en nosotros"
- **And** the first one is the hero containing "Reclutamiento y Selección Estratégica"
- **And** the third one is "Nuestros Servicios"

#### Scenario: the logos section is no longer placed after the team section
- **Given** the built home page `/`
- **When** the document order of the sections is inspected
- **Then** the logos section appears before the "Nuestro Equipo" section
- **And** the gallery section remains the last one

#### Scenario: the rest of the home keeps its order and content
- **Given** the built home page `/`
- **When** the section sequence is compared with the expected one
- **Then** it is hero → logos → "Nuestros Servicios" → empathy banner → specialization → "Nuestro Equipo" → "Galeria de imágenes"
- **And** no copy, layout class or reveal animation of those sections changes
