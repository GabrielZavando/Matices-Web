# Propuesta de Cambio: Carrusel de fotos del equipo en el hero (`hero-team-carousel`)

## Why

El hero de la página principal (`src/pages/index.astro`) muestra una única
imagen estática (`hero-business.webp`). El cliente quiere que el contenedor
gráfico del hero muestre dos fotografías reales del equipo
(`src/assets/team/team.jpeg` y `src/assets/team/team-one.jpg`) alternándose en
un carrusel infinito: cada imagen visible durante 5 segundos y luego un
desplazamiento horizontal suave hacia la siguiente, mostrando siempre una sola
imagen a la vez (máscara `overflow: hidden`).

## What Changes

- `src/pages/index.astro` (hero, solo bloque gráfico):
  - Se elimina el import y uso de `hero-business.webp` en esa página.
  - Se importan `team.jpeg` y `team-one.jpg` desde `src/assets/team/`.
  - El `<Image>` único se reemplaza por una franja horizontal (track) con las
    dos imágenes duplicadas (`team.jpeg`, `team-one.jpg`, `team.jpeg`,
    `team-one.jpg`) para lograr un bucle infinito sin salto visual, siguiendo el
    patrón marquee existente en `CompanyLogos.astro`.
  - Animación CSS pura (keyframes) en un bloque `<style>` scoped del archivo:
    cada imagen permanece 5 s y la transición horizontal dura ~1 s.
  - Bajo `prefers-reduced-motion: reduce` la animación se desactiva y se muestra
    la primera imagen estática (misma política que el resto del sitio).
  - Sin JS adicional; sin cambios en `global.css` ni en componentes compartidos.
- Se mantiene intacto el `Reveal` contenedor (`scale-in`, `delay={120}`), la
  máscara `aspect-[4/5] rounded-[3rem] overflow-hidden` y el badge flotante
  "98% Match". El hero de `testing.astro` NO se modifica (fuera de alcance).

## Capabilities

### New Capabilities
- `hero-team-carousel`: el contenedor de imagen del hero de la home renderiza
  un carrusel infinito de las dos fotos del equipo con desplazamiento
  horizontal cada 5 s, una imagen visible a la vez y guarda de
  `prefers-reduced-motion`.

### Modified Capabilities
<!-- Ninguna: el cambio no altera requisitos de specs existentes -->

## Impact

- Código: `src/pages/index.astro` (frontmatter + markup del hero + `<style>`
  scoped nuevo al final del archivo).
- Tests: nuevo `src/lib/heroCarousel.spec.ts` (TDD, inspecciona el build en
  `dist/` como `ambientAnimations.spec.ts`).
- Assets: `src/assets/team/team.jpeg`, `src/assets/team/team-one.jpg` (ya
  presentes en el repo, sin uso previo).
- `hero-business.webp` queda sin referencias tras el cambio (solo lo usaba
  `testing.astro`, que se conserva). No se borra el asset.
- Sin dependencias nuevas; sin cambios de API, datos o infraestructura.