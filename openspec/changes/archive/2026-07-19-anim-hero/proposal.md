# Propuesta de Cambio: Entrada Animada del Hero (`anim-hero`)

Aplica una **entrada escalonada (stagger)** a la sección *hero* de las 6 páginas
que la poseen, usando el componente `<Reveal>` y el helper `initReveal()`
creados en `anim-foundation`. Las páginas afectadas son: `index`, `talento`,
`psicologia`, `testing`, `id` y `formacion`.

## Alcance

* Envolver los hijos del hero (badge/eyebrow, `h1`, párrafos, bloque CTA e
  imagen + badge flotante) en `<Reveal>` con `delay` incremental para lograr una
  entrada suave "de abajo hacia arriba".
* La imagen principal del hero (`<Image loading="eager">`) se mantiene como
  elemento crítico de LCP: se revela con `delay` mínimo y duración corta.
* No se modifica el layout ni la jerarquía semántica; solo se añaden clases
  utilitarias de animación (criterio "aplicar en sitio", sin refactor de Hero).

## Justificación

El sitio carece de animación de entrada en el primer viewport. Una entrada
escalonada sutil (≤24px, ≤600ms, easing `cubic-bezier(0.16,1,0.3,1)`) refuerza
la identidad "Natural Vitality" sin perjudicar la percepción de carga. Al
reutilizar `<Reveal>`, se mantiene coherencia con `anim-foundation` y se respetan
las guardas de `prefers-reduced-motion` y el enhancement progresivo.

## Mapeo a RNF

* **RNF1 (Performance)**: solo `transform`/`opacity`; el helper `initReveal`
  revela los elementos in-view de inmediato (sin esperar scroll), por lo que el
  costo sobre el LCP es mínimo. La imagen `eager` no se retrasa.
* **RNF2 (Responsive)**: el hero ya es mobile-first; la animación es
  independiente del breakpoint.
* **RNF3 (Accessibility)**: bajo `prefers-reduced-motion: reduce` el contenido
  aparece estático y visible (garantizado por `anim-foundation`).

## Dependencias

* Requiere `anim-foundation` (componente `Reveal.astro`, tokens y `initReveal`).
* Es independiente de `anim-sections`, `anim-components`, `anim-ambient` y
  `anim-contact`.
