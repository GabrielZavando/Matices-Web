# Requisitos: restructure-page-content

> Change: TICKET-007 (provisional) — Trazabilidad REQ ↔ SC. Frontend
> (`smart | dumb`), servicio raíz `.specboot.json` `services: ["."]`.
> Sin entidades de data model ni endpoints de API.

## REQ-001: El showcase Scouthem se traslada de Inicio a Testing

**Prioridad**: alta | **Escenarios**: SC-001, SC-002, SC-003, SC-016

La home (`src/pages/index.astro`) NO DEBE renderizar la sección Scouthem (badge
"PLATAFORMA DE RECLUTAMIENTO Y SELECCIÓN") ni su CTA. La página `/testing` DEBE
renderizar `<ScouthemShowcase />` como la PRIMERA `<section>` de `<main>`. La
sección hero previa de `/testing` (badge "Rigor Técnico & Diagnóstico", párrafo
introductorio, CTA "Solicita tu Demo" e imagen `hero-business.webp`) DEBE
eliminarse por completo, sin dejar copy ni imágenes huérfanas en el HTML
generado. El `<section>` raíz del showcase DEBE declarar `id="scouthem"` para
que el enlace interno `/testing#scouthem` (CTA de la página `/talento`) resuelva
al destino correspondiente. La imagen del panel visual DEBE servirse con
`loading="eager"`, porque el showcase es la primera sección de `/testing` y su
imagen es el candidato a LCP (Largest Contentful Paint) de esa página.

## REQ-002: Semántica de encabezados preservada en Testing

**Prioridad**: alta | **Escenarios**: SC-004

La página `/testing` DEBE exponer exactamente un `<h1>` con el texto "Pruebas y
Testing Organizacional", visualmente oculto mediante `sr-only`, de modo que la
jerarquía h1 → h2 se mantenga y el showcase Scouthem conserve un único `<h2>`.

## REQ-003: Un único CTA de SCOUTHEM en el sitio

**Prioridad**: alta | **Escenarios**: SC-005

En todo el sitio DEBE existir exactamente un enlace "Conoce la plataforma
SCOUTHEM", dentro del showcase de `/testing`, apuntando a
`https://scouthem.com/es/pagina-de-inicio/` con `target="_blank"` y `rel`
incluyendo `noopener`. Su estilo NO DEBE incluir `link-underline` y DEBE
conservar `hover:bg-verde-bosque/5` y `transition-all`.

## REQ-004: Orden de secciones de Inicio

**Prioridad**: alta | **Escenarios**: SC-006, SC-007

La sección "Empresas que han confiado en nosotros" (`<CompanyLogos />`) DEBE
renderizarse como la SEGUNDA `<section>` de `<main>` en la home, inmediatamente
después del hero "Talento & Evolución B2B" y antes de "Nuestros Servicios". El
orden relativo de las demás secciones de Inicio DEBE preservarse y su copy,
layout y animaciones NO DEBEN cambiar.

## REQ-005: Proporción 3:2 de la imagen del hero de I+D

**Prioridad**: media | **Escenarios**: SC-008

La imagen lateral del hero "Innovación Científica & Futuro" (`src/pages/id.astro`)
DEBE renderizarse en un contenedor con clase `aspect-[3/2]` que ocupe todo el
ancho disponible de su columna (sin `max-w-md`), servida por `<Image>` de
`astro:assets` con `width`, `height`, `format`, `loading` y `sizes` explícitos,
y con `width`/`height` en proporción 3:2.

Para que la imagen se vea mayor sin romper las dos columnas, el grid del hero
(`lg:grid-cols-12`) DEBE reasignar el ancho: la columna de texto (`lg:col-span-7`
actual) pasa a `lg:col-span-5` (≈40 %) y la columna de la imagen (`lg:col-span-5`
actual) pasa a `lg:col-span-7` (≈60 %). El atributo `sizes` de `<Image>` DEBE
reflejar el nuevo ancho de columna (≈60 % del viewport en `lg`).

## REQ-006: Copy de la caja flotante del hero de I+D

**Prioridad**: media | **Escenarios**: SC-009

La caja flotante glassmorphism sobre la imagen del hero de I+D DEBE mostrar el
título "Proyecto FONDEF" y el párrafo "Innova I+D", conservando `animate-float`,
`max-w-[200px]` y el tratamiento `text-sm font-semibold text-verde-bosque/70` del
párrafo.

## REQ-007: Copy exacto y enlace interno en "Plataforma de Talento Inteligente"

**Prioridad**: alta | **Escenarios**: SC-010, SC-011

El párrafo de la sección "Plataforma de Talento Inteligente" de `/id` DEBE
contener exactamente el texto acordado en el ticket (solución tecnológica para
la gestión del talento, metodologías en investigación científica, respaldo
europeo de privacidad y manejo de datos, programa Scouthem con inteligencia
artificial y psicometría avanzada), sustituyendo al párrafo anterior. Su CTA
"CONOCER SCOUTHEM" DEBE apuntar a la ruta interna `/testing`, sin `target="_blank"`
ni atributos `rel` de apertura externa, conservando sus clases visuales.

## REQ-008: Binarios de imagen intocables

**Prioridad**: media | **Escenarios**: SC-012

`src/assets/hero-business.webp` DEBE permanecer en disco aunque quede huérfano
por la eliminación del hero de `/testing`; su eliminación requiere aprobación
previa del human owner. Ningún binario de `src/assets/` DEBE ser modificado,
eliminado, restaurado ni sometido a checkout por el agente.

## REQ-009: Suite del proyecto en verde

**Prioridad**: alta | **Escenarios**: SC-013

`npm run build`, `npm run lint` y `npm test` DEBEN terminar sin errores. El
contrato obsoleto `src/lib/homeScouthemSection.spec.ts` DEBE ser reemplazado por
`src/lib/testingScouthemSection.spec.ts`, y `src/lib/sections.spec.ts` DEBE
seguir exigiendo ≥7 `reveal--fade-up` en `dist/index.html` y ≥6 en
`dist/testing/index.html`.

## REQ-010: Cobertura de badges flotantes sin exigencia de presencia

**Prioridad**: media | **Escenarios**: SC-014

El contrato de badges flotantes DEBE seguir exigiendo que toda stat badge
renderizada (`max-w-[200px]`) por cualquier página lleve `animate-float` y su
párrafo con `text-sm font-semibold text-verde-bosque/70`, pero NO DEBE exigir
que cada página renderice al menos una: `/testing` deja de renderizar badges
tras eliminarse su hero y debe cumplir el contrato sin añadir uno.

## REQ-011: Alcance del contrato del carrusel acotado al hero

**Prioridad**: media | **Escenarios**: SC-015

El contrato del carrusel de la home DEBE inspeccionar el markup del HERO (la
primera `<section>` de `<main>`) y no un rango proxy que incluya secciones
posteriores: con los logos de clientes ahora bajo el hero, el rango anterior
("hasta 'Nuestros Servicios'") arrastra las fuentes de imagen de los logos. El
carrusel DEBE seguir resolviendo 3 imágenes a 2 fuentes únicas (track A-B-A) y
NO DEBE cambiar su markup, su máscara ni su animación.
