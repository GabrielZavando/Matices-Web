# Requisitos: add-scouthem-section

> Change: TICKET-005 — Trazabilidad REQ ↔ SC. Frontend (`smart | dumb`),
> servicio raíz `.specboot.json` `services: ["."]`.

## REQ-001: Sección Scouthem inmediatamente después del hero

**Prioridad**: alta | **Escenarios**: SC-001

La home DEBE renderizar la nueva sección Scouthem como segunda `<section>` de
`<main>`, inmediatamente después del hero "Reclutamiento y Selección Estratégica"
y antes de "Nuestros Servicios".

## REQ-002: El hero renderiza solo el CTA primario

**Prioridad**: alta | **Escenarios**: SC-002

El hero de la home NO DEBE contener el enlace "Conoce nuestra plataforma
SCOUTHEM"; su grupo de CTAs DEBE conservar únicamente "Comenzar Proceso"
(apuntando a `/contacto`).

## REQ-003: Un único CTA SCOUTHEM en la home con contrato preservado

**Prioridad**: alta | **Escenarios**: SC-003, SC-004

La home DEBE contener exactamente un enlace "Conoce nuestra plataforma
SCOUTHEM", dentro de la sección nueva, con `href`
`https://scouthem.com/es/pagina-de-inicio/`, `target="_blank"`,
`rel="noopener"`, sin clase `link-underline` y conservando
`hover:bg-verde-bosque/5 transition-all` (requisito de la spec `home-hero`).

## REQ-004: Contenido textual literal del mock aprobado

**Prioridad**: alta | **Escenarios**: SC-005

La sección DEBE reproducir literalmente `docs/assets/design/nueva-seccion.jpeg`:
badge "PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN", H2 "Revoluciona tu" con span
"Selección de Talento" en `text-verde-lima italic` sobre `font-heading` (Antic;
NO Playfair Display) y el párrafo de Scouthem tal cual.

## REQ-005: Layout mobile-first de una sola columna escalando a dos

**Prioridad**: alta | **Escenarios**: SC-006

La sección DEBE estructurarse mobile-first (`docs/frontend-standards.md` §2):
por defecto una columna con texto y CTA arriba y panel visual abajo; solo a
`lg:` (≥1024px) escala a grid de 2 columnas con el panel a la izquierda. Sin
desbordamiento horizontal en ningún breakpoint.

## REQ-006: Panel visual con token canónico y espacio reservado

**Prioridad**: alta | **Escenarios**: SC-007

El panel visual DEBE usar el token canónico `bg-verde-bosque` (sin hex
hardcodeados, spec `brand-design-system`) con relación de aspecto reservada, y
DEBE renderizarse aunque el asset `src/assets/scouthem-section.*` no exista
aún, sin romper `npm run build`.

## REQ-007: Imagen servida con astro:assets; asset inválido falla en build

**Prioridad**: media | **Escenarios**: SC-008, SC-011

Cuando el asset exista, la imagen DEBE servirse con `<Image>` de `astro:assets`
(`width`/`height`/`format`/`loading="lazy"`/`sizes` y `alt` descriptivo),
jamás con `<img>` nativo. Un asset no procesable DEBE romper el build con error
claro en lugar de publicar HTML con imagen rota.

## REQ-008: Semántica, jerarquía y animación consistentes

**Prioridad**: media | **Escenarios**: SC-009

La sección DEBE usar `<section>` con un único H2 (jerarquía h1 → h2 intacta),
envolver su contenido en el componente `Reveal` existente con
`variant="fade-up"` y mantener el contenido visible bajo
`prefers-reduced-motion: reduce`.

## REQ-009: Build, lint y suite sin errores

**Prioridad**: alta | **Escenarios**: SC-010

`npm run build`, `npm run lint` y `npm test` DEBEN terminar sin errores,
incluyendo el mínimo de `reveal--fade-up` que exige
`src/lib/sections.spec.ts` para `dist/index.html`.
