## ADDED Requirements

### Requirement: Innovation hero image uses a 3:2 full-width frame
The I+D hero ("Innovación Científica & Futuro") MUST render its lateral image
inside a container whose aspect-ratio class is `aspect-[3/2]`, and that
container MUST NOT be capped by `max-w-md`: the image occupies the full width
available in its grid column.
The image MUST keep being served by `<Image>` from `astro:assets` with explicit
`width`, `height`, `format`, `loading="eager"` and `sizes`, and the declared
`width`/`height` MUST express a 3:2 ratio.
To render the image larger without breaking the two-column layout, the hero grid
(`lg:grid-cols-12`) MUST give the copy column `lg:col-span-5` (≈40 %) and the
image column `lg:col-span-7` (≈60 %); the `sizes` attribute of the image MUST
reflect that wider column.

#### Scenario: the image container declares a 3:2 ratio
- **Given** the built I+D page `/id`
- **When** the container of the hero image is inspected
- **Then** its class list includes `aspect-[3/2]`
- **And** it does not include `aspect-[4/5]`

#### Scenario: the image is no longer capped to a max width
- **Given** the built I+D page `/id`
- **When** the container of the hero image is inspected
- **Then** its class list does not include `max-w-md`

#### Scenario: the image keeps its optimized astro:assets attributes
- **Given** the built I+D page `/id`
- **When** the hero image element is inspected
- **Then** it declares `width`, `height`, `sizes` and `loading="eager"`
- **And** the ratio between the declared `width` and `height` is 3:2
- **And** the image is served from `/_astro/` in an optimized format

#### Scenario: the hero grid gives the image column 60% of the width
- **Given** the built I+D page `/id`
- **When** the hero grid of "Innovación Científica & Futuro" is inspected
- **Then** the grid declares `lg:grid-cols-12`
- **And** the copy column declares `lg:col-span-5`
- **And** the image column declares `lg:col-span-7`

### Requirement: Innovation hero floating badge shows the FONDEF project
The floating glassmorphism badge overlaid on the I+D hero image MUST display the
title "Proyecto FONDEF" and the descriptive paragraph "Innova I+D", replacing
the previous "I+D" title and "Diseño de metodologías de vanguardia." paragraph.
The badge MUST keep its `animate-float` utility, its `max-w-[200px]` container
constraint, and the badge paragraph MUST keep the `text-sm font-semibold
text-verde-bosque/70` treatment required by capability `floating-badges`.

#### Scenario: the badge renders the new copy
- **Given** the built I+D page `/id`
- **When** the floating badge over the hero image is read
- **Then** its title is "Proyecto FONDEF"
- **And** its paragraph is "Innova I+D"

#### Scenario: the previous badge copy is gone
- **Given** the built I+D page `/id`
- **When** the hero floating badge is inspected
- **Then** it does not contain the title "I+D"
- **And** it does not contain the paragraph "Diseño de metodologías de vanguardia."

#### Scenario: the badge keeps its motion and legibility contract
- **Given** the built I+D page `/id`
- **When** the floating badge container and its paragraph classes are inspected
- **Then** the container includes `animate-float` and `max-w-[200px]`
- **And** the paragraph includes `text-sm`, `font-semibold` and `text-verde-bosque/70`

### Requirement: Scouthem section on I+D links to the testing page with the approved copy
The "Plataforma de Talento Inteligente" section of the I+D page MUST render its
descriptive paragraph with exactly the approved text: "Contamos con una
solución tecnológica para la gestión del talento. Diseñada en base a las
necesidades organizacionales y metodologías en investigación científica,
validadas bajo el respaldo de privacidad y manejo de datos europeo. El
programa Scouthem automatiza el reclutamiento, integrando la inteligencia
artificial y psicometría avanzada para procesos de evaluación y predicción del
desempeño organizacional." Its call to action, labelled "CONOCER SCOUTHEM", MUST
point to the internal route `/testing` and MUST NOT open a new browsing context
(no `target="_blank"`), keeping its current visual classes.

#### Scenario: the paragraph matches the approved copy
- **Given** the built I+D page `/id`
- **When** the paragraph of the "Plataforma de Talento Inteligente" section is read
- **Then** its normalized text is exactly the approved text
- **And** the previous paragraph text is no longer present

#### Scenario: the CTA points to the internal testing route
- **Given** the built I+D page `/id`
- **When** the link labelled "CONOCER SCOUTHEM" is inspected
- **Then** its `href` is `/testing`
- **And** it has no `target` attribute
- **And** it declares no `rel` attribute for external opening
